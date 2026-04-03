import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthPageLayout } from "../components/layout/AuthPageLayout";
import { Container } from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../lib/api";

export function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { loginWithPassword, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const googleError = params.get("error");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithPassword(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthPageLayout>
      <Container className="max-w-md w-full py-4 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border p-6 md:p-8 shadow-lg"
          style={{
            backgroundColor: "var(--color-bg-white)",
            borderColor: "var(--color-border-light)",
          }}
        >
          <h1
            className="text-3xl md:text-4xl text-center mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Welcome back
          </h1>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Sign in to your 925 Sterling Silver account
          </p>

          {googleError === "google_signin_failed" && (
            <p
              className="text-sm text-center mb-4 px-2 py-2 rounded-md"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-secondary)",
              }}
            >
              Google sign-in did not complete. Try again or use email.
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border text-sm"
                style={{
                  borderColor: "var(--color-border-medium)",
                  backgroundColor: "var(--color-bg-white)",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium mb-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md border text-sm"
                style={{
                  borderColor: "var(--color-border-medium)",
                  backgroundColor: "var(--color-bg-white)",
                }}
              />
            </div>
            {error && (
              <p className="text-sm" style={{ color: "#b91c1c" }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
              style={{
                backgroundColor: "var(--color-btn-primary-bg)",
                color: "var(--color-btn-primary-text)",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm underline-offset-2 hover:underline"
                style={{ color: "var(--color-text-muted)" }}
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="relative my-8">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden
            >
              <div
                className="w-full border-t"
                style={{ borderColor: "var(--color-border-light)" }}
              />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span
                className="px-3"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  color: "var(--color-text-muted)",
                }}
              >
                Or continue with
              </span>
            </div>
          </div>

          <a
            href={`${API_BASE_URL}/api/auth/google`}
            className="flex w-full justify-center items-center gap-2 py-3 rounded-md border text-sm font-medium transition-colors"
            style={{
              borderColor: "var(--color-border-dark)",
              color: "var(--color-text-primary)",
            }}
          >
            Google
          </a>

          <p
            className="text-center text-sm mt-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            New here?{" "}
            <Link
              to="/signup"
              className="font-medium underline-offset-2 hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </Container>
    </AuthPageLayout>
  );
}
