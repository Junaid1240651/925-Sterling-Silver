import { useState, useCallback, useEffect, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthPasswordInput } from "../components/auth/AuthPasswordInput";
import { AuthPageLayout } from "../components/layout/AuthPageLayout";
import { Container } from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

type Step = "email" | "reset";

const RESEND_SECONDS = 60;

function isValidEmailFormat(value: string): boolean {
  if (!value || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ForgotPasswordPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [googleOnlyAccount, setGoogleOnlyAccount] = useState(false);

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
    setInfo(null);
    setGoogleOnlyAccount(false);
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError("Email is required.");
      return;
    }
    if (!isValidEmailFormat(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{
        message: string;
        codeSent: boolean;
        flow?: "google_only";
      }>("/api/auth/password/forgot/send-otp", {
        method: "POST",
        body: JSON.stringify({ email: trimmed }),
      });
      setInfo(res.message);
      if (res.flow === "google_only") {
        setGoogleOnlyAccount(true);
        return;
      }
      if (!res.codeSent) {
        return;
      }
      setStep("reset");
      setCode("");
      startResendCooldown();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ message: string }>(
        "/api/auth/password/forgot/reset",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            code,
            newPassword,
          }),
        },
      );
      setInfo(res.message);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (done) {
    return (
      <AuthPageLayout>
        <Container className="max-w-md w-full py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-6 md:p-8 shadow-lg text-center"
            style={{
              backgroundColor: "var(--color-bg-white)",
              borderColor: "var(--color-border-light)",
            }}
          >
            <h1
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Password updated
            </h1>
            <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
              {info}
            </p>
            <Link
              to="/login"
              className="inline-block w-full py-3 rounded-md text-sm font-medium text-center"
              style={{
                backgroundColor: "var(--color-btn-primary-bg)",
                color: "var(--color-btn-primary-text)",
              }}
            >
              Sign in
            </Link>
          </motion.div>
        </Container>
      </AuthPageLayout>
    );
  }

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
          <h1
            className="text-3xl md:text-4xl text-center mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {step === "email" ? "Forgot password" : "Reset password"}
          </h1>
          <p
            className="text-center text-sm mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            {step === "email"
              ? "We’ll email you a 6-digit code if an account exists with a password."
              : "Enter the code and choose a new password."}
          </p>

          {step === "email" && (
            <p
              className="text-xs text-center mb-6 px-1 leading-relaxed rounded-md py-2.5 px-2"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-secondary)",
              }}
            >
              <strong className="font-medium" style={{ color: "var(--color-text-primary)" }}>
                Signed up with Google?
              </strong>{" "}
              Use the Google button on the sign-in page. Password reset only works for accounts that use email and password.
            </p>
          )}

          {step === "email" ? (
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border text-sm"
                  style={{
                    borderColor: "var(--color-border-medium)",
                    backgroundColor: "var(--color-bg-white)",
                  }}
                />
              </div>
              {info && (
                <div
                  className="text-sm rounded-md px-3 py-3 leading-relaxed space-y-3"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    color: "var(--color-text-secondary)",
                  }}
                  role="status"
                >
                  <p>{info}</p>
                  {googleOnlyAccount && (
                    <Link
                      to="/login"
                      className="inline-block font-medium underline-offset-2 hover:underline"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Back to sign in (use Google)
                    </Link>
                  )}
                </div>
              )}
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
                {loading ? "Sending…" : "Send reset code"}
              </button>
            </form>
          ) : (
            <form onSubmit={resetPassword} className="space-y-4">
              {info && (
                <p className="text-sm px-2 py-2 rounded-md" style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-text-secondary)" }}>
                  {info}
                </p>
              )}
              <div>
                <label
                  htmlFor="forgot-otp"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  6-digit code
                </label>
                <input
                  id="forgot-otp"
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
              <AuthPasswordInput
                id="forgot-new"
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                autoComplete="new-password"
                minLength={6}
              />
              <AuthPasswordInput
                id="forgot-confirm"
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
                minLength={6}
              />
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
                {loading ? "Updating…" : "Update password"}
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
                  setStep("email");
                  setCode("");
                  setError(null);
                  setInfo(null);
                  setGoogleOnlyAccount(false);
                }}
                className="w-full py-2 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                ← Use a different email
              </button>
            </form>
          )}

          <p
            className="text-center text-sm mt-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            <Link
              to="/login"
              className="font-medium underline-offset-2 hover:underline"
              style={{ color: "var(--color-accent)" }}
            >
              Back to sign in
            </Link>
          </p>
        </motion.div>
      </Container>
    </AuthPageLayout>
  );
}
