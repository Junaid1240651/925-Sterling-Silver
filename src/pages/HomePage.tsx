import { Suspense, lazy, memo } from "react";
import { PageLoader } from "../components/ui/PageLoader";
import { Collections } from "../components/sections/Collections";
import { TrustBadges } from "../components/ui/TrustBadges";
import { Testimonials } from "../components/sections/Testimonials";

const Layout = lazy(() =>
  import("../components/layout/Layout").then((module) => ({
    default: module.Layout,
  })),
);

const Hero = lazy(() =>
  import("../components/sections/Hero").then((module) => ({
    default: module.Hero,
  })),
);

const FeaturedProducts = lazy(() =>
  import("../components/sections/FeaturedProducts").then((module) => ({
    default: module.FeaturedProducts,
  })),
);

const About = lazy(() =>
  import("../components/sections/About").then((module) => ({
    default: module.About,
  })),
);

const Newsletter = lazy(() =>
  import("../components/sections/Newsletter").then((module) => ({
    default: module.Newsletter,
  })),
);

const SectionWrapper = memo(function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-[50vh] flex items-center justify-center"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{
                borderColor: "var(--color-primary-light)",
                borderTopColor: "var(--color-primary)",
              }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Loading...
            </span>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
});

export function HomePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Layout>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>

        <TrustBadges />

        <SectionWrapper>
          <FeaturedProducts />
        </SectionWrapper>

        <SectionWrapper>
          <About />
        </SectionWrapper>

        <Collections />

        <Testimonials />

        <SectionWrapper>
          <Newsletter />
        </SectionWrapper>
      </Layout>
    </Suspense>
  );
}
