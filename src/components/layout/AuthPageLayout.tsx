import { memo, type ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
}

function AuthPageLayoutComponent({ children }: AuthPageLayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="flex-1 flex items-center justify-center px-4 pb-12 sm:pb-16">
        {children}
      </div>
    </div>
  );
}

export const AuthPageLayout = memo(AuthPageLayoutComponent);
