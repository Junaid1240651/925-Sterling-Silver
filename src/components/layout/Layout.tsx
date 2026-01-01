import { memo, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      {/* 
        Header heights:
        - Announcement bar: ~24px (mobile) / ~28px (sm) / ~32px (md) / ~36px (lg)
        - Main header: ~48px (mobile) / ~56px (sm) / ~64px (md) / ~80px (lg)
        Total: ~72px (mobile) / ~84px (sm) / ~96px (md) / ~116px (lg)
      */}
      <main className="flex-1 pt-[72px] sm:pt-[84px] md:pt-[96px] lg:pt-[116px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export const Layout = memo(LayoutComponent);
