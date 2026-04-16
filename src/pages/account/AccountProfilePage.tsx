import { useEffect, useState, type FormEvent } from "react";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import type { AuthUser } from "../../context/AuthContext";

export function AccountProfilePage() {
  const { user, accessToken, refreshMe } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name != null) setName(user.name);
  }, [user?.name]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      await apiFetch<{ user: AuthUser }>("/api/account/profile", {
        method: "PATCH",
        token: accessToken,
        body: JSON.stringify({ name: name.trim() }),
      });
      await refreshMe();
      setMessage("Your name has been updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-md border shadow-sm p-5 md:p-8"
      style={{
        backgroundColor: "var(--color-bg-white)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <h1
        className="text-2xl md:text-3xl mb-1 pb-4 border-b"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          borderColor: "var(--color-border-light)",
        }}
      >
        Profile information
      </h1>
      <p className="text-sm mt-4 mb-6" style={{ color: "var(--color-text-muted)" }}>
        Update how your name appears on orders and communications.
      </p>

      <form onSubmit={onSubmit} className="space-y-5 max-w-lg">
        <div>
          <label
            htmlFor="acc-name"
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Full name
          </label>
          <input
            id="acc-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={120}
            className="w-full px-3 py-2.5 rounded-md border text-sm"
            style={{
              borderColor: "var(--color-border-medium)",
              backgroundColor: "var(--color-bg-white)",
            }}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Email
          </label>
          <input
            type="email"
            value={user?.email ?? ""}
            disabled
            className="w-full px-3 py-2.5 rounded-md border text-sm opacity-70 cursor-not-allowed"
            style={{
              borderColor: "var(--color-border-light)",
              backgroundColor: "var(--color-bg-secondary)",
            }}
          />
          <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
            Email can’t be changed here yet. Contact support if you need help.
          </p>
        </div>
        {error && (
          <p className="text-sm" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}
        {message && (
          <p className="text-sm" style={{ color: "var(--color-accent-dark)" }}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-2.5 rounded-md text-sm font-semibold tracking-wide uppercase disabled:opacity-60"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-text-light)",
          }}
        >
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </div>
  );
}
