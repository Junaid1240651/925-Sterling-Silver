// Lazy load sections for code splitting
import { lazy } from "react";

export const Hero = lazy(() =>
  import("./Hero").then((module) => ({ default: module.Hero }))
);

export const FeaturedProducts = lazy(() =>
  import("./FeaturedProducts").then((module) => ({
    default: module.FeaturedProducts,
  }))
);

export const About = lazy(() =>
  import("./About").then((module) => ({ default: module.About }))
);

export const Collections = lazy(() =>
  import("./Collections").then((module) => ({ default: module.Collections }))
);

export const Newsletter = lazy(() =>
  import("./Newsletter").then((module) => ({ default: module.Newsletter }))
);
