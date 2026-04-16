import { apiFetch } from "./api";

/** Shown on Contact page, footer, and should match backend `CONTACT_PUBLIC_EMAIL` (default). */
export const PUBLIC_SUPPORT_EMAIL = "925sterlingvibes@gmail.com";

/** Emails that see the ticket admin panel on /contact (must match backend `CONTACT_ADMIN_UI_EMAILS`). */
function adminUiEmailAllowlist(): string[] {
  const raw = import.meta.env.VITE_CONTACT_ADMIN_UI_EMAILS as string | undefined;
  if (typeof raw === "string" && raw.trim()) {
    return raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }
  return [PUBLIC_SUPPORT_EMAIL.toLowerCase()];
}

export function isContactTicketAdminEmail(email: string | null | undefined): boolean {
  const e = email?.trim().toLowerCase();
  if (!e) return false;
  return adminUiEmailAllowlist().includes(e);
}

export const CONTACT_INQUIRY_TYPES = [
  "Order & delivery",
  "Returns & refunds",
  "Product question",
  "Website or account",
  "General",
] as const;

export type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number];

export interface ContactSubmitPayload {
  inquiryType: ContactInquiryType;
  message: string;
  name?: string;
  email?: string;
}

export async function submitContactTicket(
  payload: ContactSubmitPayload,
  token?: string | null,
) {
  return apiFetch<{ message: string; ticketNumber: string; status: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
    token: token ?? undefined,
  });
}

export async function lookupContactTicket(ticket: string, email: string) {
  const q = new URLSearchParams({
    ticket: ticket.trim().toUpperCase(),
    email: email.trim().toLowerCase(),
  });
  return apiFetch<{
    ticketNumber: string;
    status: string;
    inquiryType: string;
    createdAt: string;
  }>(`/api/contact/lookup?${q.toString()}`);
}

export type ContactTicketWorkflowStatus = "open" | "in_progress" | "resolved";

export async function updateContactTicketStatusAsAdmin(
  ticketNumber: string,
  status: ContactTicketWorkflowStatus,
  accessToken: string | null,
) {
  const tn = encodeURIComponent(ticketNumber.trim());
  return apiFetch<{ ticketNumber: string; status: string; message: string }>(
    `/api/contact/admin/tickets/${tn}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
      token: accessToken,
    },
  );
}

export function contactStatusLabel(status: string): string {
  switch (status) {
    case "open":
      return "Received — we’ll reply soon";
    case "in_progress":
      return "In progress";
    case "resolved":
      return "Resolved";
    default:
      return status;
  }
}
