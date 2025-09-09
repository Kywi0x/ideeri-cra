import { NextResponse } from "next/server";
import { createOAuthClient } from "@/lib/google";
import { encryptToBytes } from "@/lib/crypto";
import { xanoUpsertUserByEmail, xanoPatchUserGoogleOauth } from "@/lib/xano";
import { google } from "googleapis";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  if (error) return NextResponse.json({ error }, { status: 400 });
  if (!code) return NextResponse.json({ error: "missing code" }, { status: 400 });
  // CSRF state validation
  const cookieStore = cookies();
  const cookieState = cookieStore.get("g_csrf_state")?.value;
  if (!state || !cookieState || state !== cookieState) {
    return NextResponse.json({ error: "invalid state" }, { status: 400 });
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:" + (process.env.PORT || 3000)}/api/auth/google/callback`;
  const oauth2 = createOAuthClient(redirectUri);
  const { tokens } = await oauth2.getToken({ code });

  oauth2.setCredentials(tokens);
  const oauth2Api = google.oauth2({ auth: oauth2, version: "v2" });
  const me = await oauth2Api.userinfo.get();
  const email = me.data.email || undefined;
  const name = me.data.name || undefined;
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const user = await xanoUpsertUserByEmail(email, name);

  const hasEncryption = Boolean(process.env.ENCRYPTION_KEY);
  const accessEnc = hasEncryption && tokens.access_token ? encryptToBytes(tokens.access_token) : undefined;
  const refreshEnc = hasEncryption && tokens.refresh_token ? encryptToBytes(tokens.refresh_token) : undefined;

  await xanoPatchUserGoogleOauth(user.id, hasEncryption
    ? {
        id: "google",
        name,
        email,
        access_token_enc: accessEnc ? accessEnc.toString("base64") : null,
        refresh_token_enc: refreshEnc ? refreshEnc.toString("base64") : null,
        expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        scope: tokens.scope ?? null,
      }
    : {
        id: "google",
        name,
        email,
        access_token: tokens.access_token ?? null,
        refresh_token: tokens.refresh_token ?? null,
        expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        scope: tokens.scope ?? null,
      }
  );

  const res = NextResponse.redirect(new URL("/ui/events", req.url));
  // Clear CSRF cookie
  res.cookies.set("g_csrf_state", "", { path: "/", maxAge: 0 });
  const cookieValue = Buffer.from(
    JSON.stringify({ id: user.id, email, name })
  ).toString("base64url");
  res.cookies.set("user", cookieValue, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

