type XanoUser = {
  id: number;
  email?: string;
  name?: string;
  created_at?: string;
  role?: string;
  google_oauth?: Record<string, unknown>;
};

function getBase(): string {
  const base = process.env.XANO_BASE_URL;
  if (!base) throw new Error("XANO_BASE_URL is not set");
  return base.replace(/\/?$/, "");
}

function authHeaders(): Record<string, string> {
  const key = process.env.XANO_API_KEY;
  return key ? { Authorization: `Bearer ${key}` } : {};
}

export async function xanoFindUserByEmail(email: string): Promise<XanoUser | null> {
  const url = `${getBase()}/user?email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error(`Xano GET /user failed: ${res.status}`);
  const data = await res.json();
  // Xano returns array for list endpoints
  if (Array.isArray(data) && data.length > 0) return data[0] as XanoUser;
  return null;
}

export async function xanoCreateUser(input: { email: string; name?: string }): Promise<XanoUser> {
  const url = `${getBase()}/user`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ email: input.email, name: input.name }),
  });
  if (!res.ok) throw new Error(`Xano POST /user failed: ${res.status}`);
  return (await res.json()) as XanoUser;
}

export async function xanoPatchUserGoogleOauth(userId: number, payload: Record<string, unknown>): Promise<XanoUser> {
  const url = `${getBase()}/user/${userId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ google_oauth: payload }),
  });
  if (!res.ok) throw new Error(`Xano PATCH /user/{id} failed: ${res.status}`);
  return (await res.json()) as XanoUser;
}

export async function xanoUpsertUserByEmail(email: string, name?: string): Promise<XanoUser> {
  const existing = await xanoFindUserByEmail(email);
  if (existing) return existing;
  return xanoCreateUser({ email, name });
}

