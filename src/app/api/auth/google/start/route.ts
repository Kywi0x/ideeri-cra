import { NextResponse } from "next/server";
import { buildAuthUrl } from "@/lib/google";
import { randomBytes } from "node:crypto";

export async function GET() {
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:" + (process.env.PORT || 3000)}/api/auth/google/callback`;
  const state = randomBytes(16).toString("hex");
  const url = buildAuthUrl({ redirectUri, state });
  const res = NextResponse.redirect(url);
  res.cookies.set("g_csrf_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  return res;
}

