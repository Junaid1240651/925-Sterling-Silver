import { Package } from "lucide-react";

export function AccountOrdersPage() {
  return (
    <div
      className="rounded-md border shadow-sm p-8 md:p-12 text-center"
      style={{
        backgroundColor: "var(--color-bg-white)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <Package
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
        My orders
      </h1>
      <p className="text-sm max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
        You don’t have any orders yet. When you shop with us, your order history and tracking will
        show up here.
      </p>
    </div>
  );
}
