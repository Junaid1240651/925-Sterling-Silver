import { CreditCard } from "lucide-react";

export function AccountSavedCardsPage() {
  return (
    <div
      className="rounded-md border shadow-sm p-8 md:p-12 text-center"
      style={{
        backgroundColor: "var(--color-bg-white)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <CreditCard
        className="mx-auto mb-4 opacity-40"
        size={48}
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden
      />
      <h1
        className="text-2xl md:text-3xl mb-2"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
        }}
      >
        Saved cards
      </h1>
      <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
        Securely saved cards for quick payment will be available here soon.
      </p>
    </div>
  );
}
