import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/Container";
import { useAuth, type AuthUser } from "../context/AuthContext";

/**
 * Backend redirects here with token in the URL hash (not query) after Google OAuth.
 */
export function OauthSuccessPage() {
  const { setSessionFromOAuth, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const parsedRef = useRef(false);

  useEffect(() => {
    if (parsedRef.current || typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) {
      setError("Missing OAuth payload");
      parsedRef.current = true;
      return;
    }
    const params = new URLSearchParams(hash);
    const accessToken = params.get("accessToken");
    const userRaw = params.get("user");
    const expiresAtStr = params.get("expiresAt");
    if (!accessToken || !userRaw) {
      setError("Invalid OAuth payload");
      parsedRef.current = true;
      return;
    }
    try {
      const u = JSON.parse(userRaw) as AuthUser;
      const expiresAt = expiresAtStr ? Number(expiresAtStr) : undefined;
      setSessionFromOAuth(accessToken, u, expiresAt);
      window.history.replaceState(null, "", window.location.pathname);
    } catch {
      setError("Could not read account data");
    }
    parsedRef.current = true;
  }, [setSessionFromOAuth]);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Container className="max-w-md py-24 text-center">
        {error ? (
          <p style={{ color: "var(--color-text-secondary)" }}>{error}</p>
        ) : (
          <p style={{ color: "var(--color-text-muted)" }}>Completing sign-in…</p>
        )}
      </Container>
    </Layout>
  );
}
