const raw = import.meta.env.VITE_API_URL as string | undefined;

export const API_BASE_URL = (raw || "http://localhost:8000").replace(/\/$/, "");

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string | null },
): Promise<T> {
  const { token, headers: h, ...rest } = init ?? {};
  const headers = new Headers(h);
  if (!headers.has("Content-Type") && rest.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers,
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    let msg = res.statusText;
    if (data && typeof data === "object" && "message" in data) {
      const m = (data as { message: unknown }).message;
      if (typeof m === "string") msg = m;
      else if (Array.isArray(m) && m.every((x) => typeof x === "string"))
        msg = m.join(", ");
    }
    throw new Error(msg || `Request failed: ${res.status}`);
  }
  return data as T;
}
