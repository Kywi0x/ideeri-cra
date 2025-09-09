import { google } from "googleapis";

const REQUIRED_MIN = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_SCOPES"] as const;

function validateEnv(): string | null {
  for (const key of REQUIRED_MIN) {
    if (!process.env[key]) return key;
  }
  return null;
}

export function createOAuthClient(redirectUri: string) {
  const missing = validateEnv();
  if (missing) throw new Error(`${missing} is not set`);
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
}

export function buildAuthUrl({ state, redirectUri }: { state?: string; redirectUri: string }) {
  const client = createOAuthClient(redirectUri);
  const scopes = (process.env.GOOGLE_SCOPES || "").split(/\s+/).filter(Boolean);
  return client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
    prompt: "consent",
    state,
  });
}

