import { useLayoutEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Copy,
  Headphones,
  HelpCircle,
  Mail,
  MessageSquare,
  Package,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/Container";
import { useAuth } from "../context/AuthContext";
import {
  CONTACT_INQUIRY_TYPES,
  PUBLIC_SUPPORT_EMAIL,
  contactStatusLabel,
  isContactTicketAdminEmail,
  lookupContactTicket,
  submitContactTicket,
  updateContactTicketStatusAsAdmin,
  type ContactInquiryType,
  type ContactSubmitPayload,
  type ContactTicketWorkflowStatus,
} from "../lib/contactApi";

const INQUIRY_ICONS: Record<ContactInquiryType, typeof MessageSquare> = {
  "Order & delivery": Package,
  "Returns & refunds": Shield,
  "Product question": Sparkles,
  "Website or account": HelpCircle,
  General: MessageSquare,
};

function buildForm(isSignedIn: boolean): ContactSubmitPayload {
  return {
    inquiryType: "General",
    message: "",
    ...(isSignedIn ? {} : { name: "", email: "" }),
  };
}

export function ContactPage() {
  const location = useLocation();
  const { user, accessToken } = useAuth();
  const isSignedIn = Boolean(user?.email);
  const isTicketAdmin = isContactTicketAdminEmail(user?.email);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.key]);
  const [form, setForm] = useState<ContactSubmitPayload>(() => buildForm(isSignedIn));
  const [errors, setErrors] = useState<Partial<Record<keyof ContactSubmitPayload | "root", string>>>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [trackTicket, setTrackTicket] = useState("");
  const [trackEmail, setTrackEmail] = useState("");
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackResult, setTrackResult] = useState<{
    ticketNumber: string;
    status: string;
    inquiryType: string;
    createdAt: string;
  } | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const [adminTicket, setAdminTicket] = useState("");
  const [adminStatus, setAdminStatus] = useState<ContactTicketWorkflowStatus>("in_progress");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  function validate(data: ContactSubmitPayload): Partial<Record<keyof ContactSubmitPayload, string>> {
    const e: Partial<Record<keyof ContactSubmitPayload, string>> = {};
    if (!CONTACT_INQUIRY_TYPES.includes(data.inquiryType)) {
      e.inquiryType = "Please choose a topic";
    }
    if (!data.message.trim()) e.message = "Message is required";
    if (!isSignedIn) {
      if (!data.name?.trim()) e.name = "Name is required";
      if (!data.email?.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Please enter a valid email";
    }
    return e;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const payload: ContactSubmitPayload = {
        inquiryType: form.inquiryType,
        message: form.message.trim(),
        ...(isSignedIn
          ? {}
          : { name: form.name?.trim(), email: form.email?.trim().toLowerCase() }),
      };
      const res = await submitContactTicket(payload, accessToken);
      setSuccessTicket(res.ticketNumber);
      setForm(buildForm(isSignedIn));
      setErrors({});
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function onTrack(e: FormEvent) {
    e.preventDefault();
    setTrackError(null);
    setTrackResult(null);
    if (!trackTicket.trim() || !trackEmail.trim()) {
      setTrackError("Enter both ticket number and email.");
      return;
    }
    setTrackLoading(true);
    try {
      const res = await lookupContactTicket(trackTicket, trackEmail);
      setTrackResult(res);
    } catch (err) {
      setTrackError(err instanceof Error ? err.message : "Could not find that ticket.");
    } finally {
      setTrackLoading(false);
    }
  }

  async function copyTicket() {
    if (!successTicket) return;
    try {
      await navigator.clipboard.writeText(successTicket);
    } catch {
      /* ignore */
    }
  }

  async function onAdminUpdateStatus(status: ContactTicketWorkflowStatus) {
    if (!accessToken || !adminTicket.trim()) {
      setAdminError("Enter a ticket number.");
      return;
    }
    setAdminLoading(true);
    setAdminError(null);
    setAdminMessage(null);
    try {
      const res = await updateContactTicketStatusAsAdmin(adminTicket, status, accessToken);
      setAdminMessage(`Updated ${res.ticketNumber} → ${contactStatusLabel(res.status)}`);
    } catch (err) {
      setAdminError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setAdminLoading(false);
    }
  }

  return (
    <Layout>
      <div
        className="py-8 md:py-12 lg:py-14"
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-8 md:mb-10">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-sm mb-4"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              {isTicketAdmin ? (
                <ShieldCheck className="w-6 h-6" style={{ color: "var(--color-accent)" }} aria-hidden />
              ) : (
                <Headphones className="w-6 h-6" style={{ color: "var(--color-accent)" }} aria-hidden />
              )}
            </div>
            <h1
              className="text-3xl md:text-4xl tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-primary)",
              }}
            >
              {isTicketAdmin ? "Support" : "Contact us"}
            </h1>
            <p className="mt-2 text-sm md:text-base max-w-xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              {isTicketAdmin
                ? "Look up customer tickets and update their status. The public contact form is hidden for this account."
                : "Orders, hallmarks, sizing, or anything else — we’re here to help. Every message gets a ticket number so you can track it."}
            </p>
          </div>

          {isTicketAdmin ? (
            <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                <div
                  className="rounded-sm border p-5 shadow-sm"
                  style={{
                    backgroundColor: "var(--color-bg-white)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} aria-hidden />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        Public inbox
                      </p>
                      <a
                        href={`mailto:${PUBLIC_SUPPORT_EMAIL}`}
                        className="text-sm hover:underline break-all"
                        style={{ color: "var(--color-accent-dark)" }}
                      >
                        {PUBLIC_SUPPORT_EMAIL}
                      </a>
                    </div>
                  </div>
                  <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    Shown to customers on this page. Replies usually go out within 1–2 business days.
                  </p>
                </div>

                <div
                  className="rounded-sm border p-5 shadow-sm"
                  style={{
                    backgroundColor: "var(--color-bg-white)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  <h3
                    className="text-sm font-semibold mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
                  >
                    Track a request
                  </h3>
                  <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
                    Ticket number plus the email stored on the ticket (as the customer entered it).
                  </p>
                  <form onSubmit={onTrack} className="space-y-3">
                    <input
                      value={trackTicket}
                      onChange={(e) => setTrackTicket(e.target.value.toUpperCase())}
                      placeholder="925-20260402-AB12"
                      aria-label="Ticket number"
                      className="w-full px-3 py-2 rounded-sm border text-sm font-mono"
                      style={{ borderColor: "var(--color-border-medium)" }}
                    />
                    <input
                      type="email"
                      value={trackEmail}
                      onChange={(e) => setTrackEmail(e.target.value)}
                      placeholder="Email on the ticket"
                      aria-label="Email on ticket"
                      className="w-full px-3 py-2 rounded-sm border text-sm"
                      style={{ borderColor: "var(--color-border-medium)" }}
                    />
                    {trackError && <p className="text-xs text-red-600">{trackError}</p>}
                    {trackResult && (
                      <div
                        className="text-xs rounded-sm border p-3 space-y-1"
                        style={{
                          borderColor: "var(--color-border-light)",
                          backgroundColor: "var(--color-bg-secondary)",
                        }}
                      >
                        <p>
                          <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                            Status:{" "}
                          </span>
                          {contactStatusLabel(trackResult.status)}
                        </p>
                        <p style={{ color: "var(--color-text-muted)" }}>Topic: {trackResult.inquiryType}</p>
                        <p style={{ color: "var(--color-text-muted)" }}>
                          Submitted: {new Date(trackResult.createdAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={trackLoading}
                      className="w-full py-2.5 rounded-sm text-sm font-medium border cursor-pointer disabled:opacity-60"
                      style={{
                        borderColor: "var(--color-accent)",
                        color: "var(--color-accent-dark)",
                      }}
                    >
                      {trackLoading ? "Checking…" : "Check status"}
                    </button>
                  </form>
                </div>
              </div>

              <div
                className="rounded-sm border p-5 md:p-6 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  borderColor: "var(--color-accent)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden />
                  <h2
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
                  >
                    Update ticket status
                  </h2>
                </div>
                <p className="text-xs mb-5 max-w-2xl leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  Customers see the new status when they track with their email. Use{" "}
                  <strong className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    Resolved
                  </strong>{" "}
                  to close a ticket.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-5 md:items-end">
                  <div>
                    <label htmlFor="admin-ticket" className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
                      Ticket number
                    </label>
                    <input
                      id="admin-ticket"
                      value={adminTicket}
                      onChange={(e) => setAdminTicket(e.target.value.toUpperCase())}
                      placeholder="925-20260416-AB12"
                      className="w-full px-3 py-2.5 rounded-sm border text-sm font-mono"
                      style={{ borderColor: "var(--color-border-medium)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-status" className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
                      New status
                    </label>
                    <select
                      id="admin-status"
                      value={adminStatus}
                      onChange={(e) => setAdminStatus(e.target.value as ContactTicketWorkflowStatus)}
                      className="w-full px-3 py-2.5 rounded-sm border text-sm bg-transparent cursor-pointer"
                      style={{ borderColor: "var(--color-border-medium)", color: "var(--color-text-primary)" }}
                    >
                      <option value="open">Open (received)</option>
                      <option value="in_progress">In progress</option>
                      <option value="resolved">Resolved / closed</option>
                    </select>
                  </div>
                </div>
                {adminError && <p className="text-xs text-red-600 mt-3">{adminError}</p>}
                {adminMessage && (
                  <p className="text-xs mt-3" style={{ color: "var(--color-accent-dark)" }}>
                    {adminMessage}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  <button
                    type="button"
                    disabled={adminLoading}
                    onClick={() => void onAdminUpdateStatus(adminStatus)}
                    className="flex-1 py-2.5 rounded-sm text-sm font-semibold cursor-pointer disabled:opacity-60"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-text-light)",
                    }}
                  >
                    {adminLoading ? "Saving…" : "Save status"}
                  </button>
                  <button
                    type="button"
                    disabled={adminLoading}
                    onClick={() => void onAdminUpdateStatus("resolved")}
                    className="flex-1 py-2.5 rounded-sm text-sm font-medium border cursor-pointer disabled:opacity-60"
                    style={{
                      borderColor: "var(--color-border-dark)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Close ticket (resolved)
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 max-w-5xl mx-auto items-start">
            <div
              className="rounded-md border shadow-sm p-5 md:p-8 order-2 lg:order-1"
              style={{
                backgroundColor: "var(--color-bg-white)",
                borderColor: "var(--color-border-light)",
              }}
            >
              {successTicket ? (
                <div className="text-center py-4 px-1">
                  <CheckCircle2
                    className="w-14 h-14 mx-auto mb-4"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden
                  />
                  <h2
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Message received
                  </h2>
                  <p className="text-sm mt-2 max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                    We’ve emailed you a copy. Save this ticket number for your records:
                  </p>

                  <div className="mt-6 max-w-md mx-auto w-full space-y-5">
                    <div
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 rounded-md border text-left"
                      style={{
                        borderColor: "var(--color-border-medium)",
                        backgroundColor: "var(--color-bg-secondary)",
                      }}
                    >
                      <code
                        className="text-base sm:text-lg font-semibold tracking-wide break-all min-w-0 flex-1"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {successTicket}
                      </code>
                      <button
                        type="button"
                        onClick={() => void copyTicket()}
                        className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md border shrink-0 self-stretch sm:self-center cursor-pointer transition-opacity hover:opacity-90"
                        style={{
                          borderColor: "var(--color-border-light)",
                          backgroundColor: "var(--color-bg-white)",
                          color: "var(--color-accent-dark)",
                        }}
                      >
                        <Copy size={14} aria-hidden />
                        Copy
                      </button>
                    </div>

                    <button
                      type="button"
                      className="block w-full text-center text-sm font-medium py-2 rounded-md cursor-pointer border border-transparent hover:border-[var(--color-border-light)] transition-colors"
                      style={{ color: "var(--color-accent)" }}
                      onClick={() => setSuccessTicket(null)}
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 mb-1">
                    <MessageSquare className="w-5 h-5 shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden />
                    <h2
                      className="text-lg font-medium"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
                    >
                      Send a message
                    </h2>
                  </div>

                  {isSignedIn && user && (
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                      Signed in as{" "}
                      <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                        {user.email}
                      </span>
                    </p>
                  )}

                  {submitError && (
                    <p className="text-sm rounded-md border px-3 py-2" style={{ borderColor: "#fecaca", color: "#b91c1c", backgroundColor: "#fef2f2" }}>
                      {submitError}
                    </p>
                  )}

                  {!isSignedIn && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="c-name" className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                          Name
                        </label>
                        <input
                          id="c-name"
                          name="name"
                          value={form.name ?? ""}
                          onChange={(ev) => setForm((f) => ({ ...f, name: ev.target.value }))}
                          className="w-full px-3 py-2.5 rounded-md border text-sm"
                          style={{ borderColor: "var(--color-border-medium)" }}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-xs mt-1 text-red-600">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-email" className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                          Email
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          name="email"
                          value={form.email ?? ""}
                          onChange={(ev) => setForm((f) => ({ ...f, email: ev.target.value }))}
                          className="w-full px-3 py-2.5 rounded-md border text-sm"
                          style={{ borderColor: "var(--color-border-medium)" }}
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-xs mt-1 text-red-600">{errors.email}</p>}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-secondary)" }}>
                      What’s this about?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_INQUIRY_TYPES.map((type) => {
                        const Icon = INQUIRY_ICONS[type];
                        const selected = form.inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, inquiryType: type }))}
                            className="flex flex-col items-center gap-1.5 rounded-md border px-2.5 py-3 min-w-[100px] max-w-[140px] flex-1 sm:flex-none transition-colors cursor-pointer text-center"
                            style={{
                              borderColor: selected ? "var(--color-accent)" : "var(--color-border-light)",
                              backgroundColor: selected ? "var(--color-bg-secondary)" : "transparent",
                            }}
                          >
                            <Icon
                              className="w-5 h-5 shrink-0"
                              style={{ color: selected ? "var(--color-accent-dark)" : "var(--color-text-muted)" }}
                              aria-hidden
                            />
                            <span className="text-[11px] font-medium leading-tight" style={{ color: "var(--color-text-secondary)" }}>
                              {type}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.inquiryType && <p className="text-xs mt-1 text-red-600">{errors.inquiryType}</p>}
                  </div>

                  <div>
                    <label htmlFor="c-msg" className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                      Message
                    </label>
                    <textarea
                      id="c-msg"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(ev) => setForm((f) => ({ ...f, message: ev.target.value }))}
                      className="w-full px-3 py-2.5 rounded-md border text-sm resize-y min-h-[120px]"
                      style={{ borderColor: "var(--color-border-medium)" }}
                      placeholder="Order number, product name, or details help us respond faster."
                    />
                    {errors.message && <p className="text-xs mt-1 text-red-600">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold tracking-wide uppercase disabled:opacity-60 cursor-pointer"
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-text-light)",
                    }}
                  >
                    <Send size={16} aria-hidden />
                    {loading ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </div>

            <aside className="space-y-4 order-1 lg:order-2">
              <div
                className="rounded-md border p-5 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }} aria-hidden />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${PUBLIC_SUPPORT_EMAIL}`}
                      className="text-sm hover:underline break-all"
                      style={{ color: "var(--color-accent-dark)" }}
                    >
                      {PUBLIC_SUPPORT_EMAIL}
                    </a>
                  </div>
                </div>
                <p className="text-xs mt-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  We usually reply within 1–2 business days. For order issues, include your order ID if you have one.
                </p>
              </div>

              <div
                className="rounded-md border p-5 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
                >
                  Track a request
                </h3>
                <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
                  Enter the ticket number from your confirmation email and the same email address you used on the form.
                </p>
                <form onSubmit={onTrack} className="space-y-3">
                  <div>
                    <label htmlFor="t-num" className="sr-only">
                      Ticket number
                    </label>
                    <input
                      id="t-num"
                      value={trackTicket}
                      onChange={(e) => setTrackTicket(e.target.value.toUpperCase())}
                      placeholder="925-20260402-AB12"
                      className="w-full px-3 py-2 rounded-md border text-sm font-mono"
                      style={{ borderColor: "var(--color-border-medium)" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="t-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="t-email"
                      type="email"
                      value={trackEmail}
                      onChange={(e) => setTrackEmail(e.target.value)}
                      placeholder="Email on the ticket"
                      className="w-full px-3 py-2 rounded-md border text-sm"
                      style={{ borderColor: "var(--color-border-medium)" }}
                    />
                  </div>
                  {trackError && <p className="text-xs text-red-600">{trackError}</p>}
                  {trackResult && (
                    <div
                      className="text-xs rounded-md border p-3 space-y-1"
                      style={{
                        borderColor: "var(--color-border-light)",
                        backgroundColor: "var(--color-bg-secondary)",
                      }}
                    >
                      <p>
                        <span className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
                          Status:{" "}
                        </span>
                        {contactStatusLabel(trackResult.status)}
                      </p>
                      <p style={{ color: "var(--color-text-muted)" }}>
                        Topic: {trackResult.inquiryType}
                      </p>
                      <p style={{ color: "var(--color-text-muted)" }}>
                        Submitted: {new Date(trackResult.createdAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={trackLoading}
                    className="w-full py-2 rounded-md text-sm font-medium border cursor-pointer disabled:opacity-60"
                    style={{
                      borderColor: "var(--color-accent)",
                      color: "var(--color-accent-dark)",
                    }}
                  >
                    {trackLoading ? "Checking…" : "Check status"}
                  </button>
                </form>
              </div>

            </aside>
            </div>
          )}
        </Container>
      </div>
    </Layout>
  );
}
