import { useState, useCallback, useEffect, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthPageLayout } from "../components/layout/AuthPageLayout";
import { Container } from "../components/ui/Container";
import { useAuth, type LoginResponse } from "../context/AuthContext";
import { API_BASE_URL, apiFetch } from "../lib/api";

type Step = "details" | "otp";

const RESEND_SECONDS = 60;

export function SignupPage() {
  const navigate = useNavigate();
  const { applyLoginResponse, user } = useAuth();
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  const startResendCooldown = useCallback(() => {
    setResendIn(RESEND_SECONDS);
  }, []);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  async function sendOtp(e?: FormEvent) {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiFetch<{ message: string }>("/api/auth/signup/send-otp", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });
      setStep("otp");
      setCode("");
      startResendCooldown();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch<LoginResponse>("/api/auth/signup/verify", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), code }),
      });
      applyLoginResponse(data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const maskedEmail =
    email.length > 3
      ? `${email.slice(0, 2)}•••@${email.split("@")[1] ?? ""}`
      : email;

  return (
    <AuthPageLayout>
      <Container className="max-w-md w-full py-4 md:py-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border p-6 md:p-8 shadow-lg"
          style={{
            backgroundColor: "var(--color-bg-white)",
            borderColor: "var(--color-border-light)",
          }}
        >
          {step === "details" ? (
            <>
              <h1
                className="text-3xl md:text-4xl text-center mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Create account
              </h1>
              <p
                className="text-center text-sm mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                We’ll email you a 6-digit code to verify your address
              </p>

              <form onSubmit={sendOtp} className="space-y-4">
                <div>
                  <label
                    htmlFor="signup-name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border text-sm"
                    style={{
                      borderColor: "var(--color-border-medium)",
                      backgroundColor: "var(--color-bg-white)",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Email
                  </label>
                  <input
                    id="signup-email"
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
                    htmlFor="signup-password"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-md border text-sm"
                    style={{
                      borderColor: "var(--color-border-medium)",
                      backgroundColor: "var(--color-bg-white)",
                    }}
                  />
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    At least 6 characters
                  </p>
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
                  {loading ? "Sending code…" : "Send verification code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1
                className="text-3xl md:text-4xl text-center mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Check your email
              </h1>
              <p
                className="text-center text-sm mb-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                Enter the 6-digit code we sent to{" "}
                <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  {maskedEmail}
                </span>
              </p>
              <p
                className="text-center text-xs mb-8"
                style={{ color: "var(--color-text-muted)" }}
              >
                Code expires in 10 minutes
              </p>

              <form onSubmit={verifyOtp} className="space-y-4">
                <div>
                  <label
                    htmlFor="signup-otp"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Verification code
                  </label>
                  <input
                    id="signup-otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000000"
                    maxLength={6}
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="w-full px-3 py-3 rounded-md border text-center text-2xl tracking-[0.4em] font-mono"
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
                  disabled={loading || code.length !== 6}
                  className="w-full py-3 rounded-md text-sm font-medium transition-colors disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--color-btn-primary-bg)",
                    color: "var(--color-btn-primary-text)",
                  }}
                >
                  {loading ? "Verifying…" : "Verify and create account"}
                </button>
                <button
                  type="button"
                  disabled={loading || resendIn > 0}
                  onClick={() => void sendOtp()}
                  className="w-full py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                  style={{ color: "var(--color-accent)" }}
                >
                  {resendIn > 0 ? `Resend code in ${resendIn}s` : "Resend code"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setCode("");
                    setError(null);
                  }}
                  className="w-full py-2 text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  ← Change email or details
                </button>
              </form>
            </>
          )}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center" aria-hidden>
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium underline-offset-2 hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </Container>
    </AuthPageLayout>
  );
}
