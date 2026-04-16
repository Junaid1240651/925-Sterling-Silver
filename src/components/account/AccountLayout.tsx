import { memo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  ChevronRight,
  CreditCard,
  Package,
  Smartphone,
  UserCircle,
} from "lucide-react";
import { Layout } from "../layout/Layout";
import { Container } from "../ui/Container";
import { useAuth } from "../../context/AuthContext";

function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const w = parts[0] || "?";
  return w.slice(0, 2).toUpperCase();
}

const navClass =
  "flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors";
const navInactive = {
  color: "var(--color-text-secondary)",
  borderLeft: "3px solid transparent",
};
const navActive = {
  color: "var(--color-accent-dark)",
  backgroundColor: "var(--color-bg-secondary)",
  borderLeft: "3px solid var(--color-accent)",
};

function AccountLayoutComponent() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Layout>
      <div
        className="flex-1 min-h-[60vh]"
        style={{ backgroundColor: "var(--color-bg-primary)" }}
      >
        <Container className="py-6 md:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            <aside className="w-full lg:w-64 shrink-0">
              <div
                className="rounded-md border p-4 mb-4 shadow-sm"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <div className="flex items-center gap-3">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover border"
                      style={{ borderColor: "var(--color-border-light)" }}
                    />
                  ) : (
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {profileInitials(user.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p
                      className="text-xs uppercase tracking-wide"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Hello,
                    </p>
                    <p
                      className="font-medium truncate"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {user.name}
                    </p>
                  </div>
                </div>
              </div>

              <nav
                className="rounded-md border shadow-sm p-1.5 flex flex-col gap-0.5"
                style={{
                  backgroundColor: "var(--color-bg-white)",
                  borderColor: "var(--color-border-light)",
                }}
              >
                <NavLink
                  to="/account/orders"
                  className={`${navClass} justify-between`}
                  style={({ isActive }) => ({
                    ...(isActive ? navActive : navInactive),
                  })}
                >
                  <span className="inline-flex items-center gap-2">
                    <Package size={16} className="shrink-0 opacity-80" aria-hidden />
                    My orders
                  </span>
                  <ChevronRight size={16} className="shrink-0 opacity-50" aria-hidden />
                </NavLink>

                <div
                  className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase border-t border-b mt-1 rounded-sm"
                  style={{
                    color: "var(--color-accent)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <UserCircle size={14} className="shrink-0" aria-hidden />
                    Account settings
                  </span>
                </div>
                <NavLink
                  to="/account/profile"
                  className={navClass}
                  style={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                  Profile information
                </NavLink>
                <NavLink
                  to="/account/addresses"
                  className={navClass}
                  style={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                  Manage addresses
                </NavLink>

                <div
                  className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase border-t border-b mt-1 rounded-sm"
                  style={{
                    color: "var(--color-accent)",
                    borderColor: "var(--color-border-light)",
                  }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <CreditCard size={14} className="shrink-0" aria-hidden />
                    Payments
                  </span>
                </div>
                <NavLink
                  to="/account/payments/upi"
                  className={navClass}
                  style={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                  <Smartphone size={16} className="shrink-0 opacity-70" />
                  Saved UPI
                </NavLink>
                <NavLink
                  to="/account/payments/cards"
                  className={navClass}
                  style={({ isActive }) => (isActive ? navActive : navInactive)}
                >
                  <CreditCard size={16} className="shrink-0 opacity-70" />
                  Saved cards
                </NavLink>
              </nav>
            </aside>

            <main className="flex-1 min-w-0">
              <Outlet />
            </main>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export const AccountLayout = memo(AccountLayoutComponent);
