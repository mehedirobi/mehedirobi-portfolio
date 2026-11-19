import { Suspense, lazy } from "react";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import DeferredSection from "./components/DeferredSection";

function lazyWithPreload(factory) {
  let promise;

  const load = () => {
    if (!promise) {
      promise = factory().catch((error) => {
        promise = undefined;
        throw error;
      });
    }
    return promise;
  };

  const Lazy = lazy(load);
  Lazy.preload = load;
  return Lazy;
}

// --------------------------------------------------
// Code splitting (module level, never inside a component)
// --------------------------------------------------

// Only needed for unknown URLs
const NotFound = lazy(() => import("./components/NotFound"));

// Below the fold: loaded near the viewport, prefetched while the browser is idle
const Skills = lazyWithPreload(() => import("./components/Skills"));
const Projects = lazyWithPreload(() => import("./components/Projects"));
const Education = lazyWithPreload(() => import("./components/Education"));
const Contact = lazyWithPreload(() => import("./components/Contact"));

// Order matches the page and the Navbar. `background` alternates with the Hero
// (canvas) so the skeleton never flashes a different color. `minHeight` reserves
// space until the section renders; these are estimates, so adjust them to your
// measured section heights.
const SECTIONS = [
  { id: "skills", Component: Skills, minHeight: "min-h-[40rem]", background: "bg-canvas-alt" },
  { id: "projects", Component: Projects, minHeight: "min-h-[48rem]", background: "bg-canvas" },
  { id: "education", Component: Education, minHeight: "min-h-[22rem]", background: "bg-canvas-alt" },
  { id: "contact", Component: Contact, minHeight: "min-h-[32rem]", background: "bg-canvas" },
];

// --------------------------------------------------
// Routing helpers
// --------------------------------------------------

// "/", "", "/index.html" (with or without a trailing slash) are the portfolio
function isHomePath(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized === "" || normalized === "/index.html";
}

// Neutral placeholder while the 404 chunk downloads (same background, no flash)
function PageFallback() {
  return <div aria-hidden="true" className="min-h-dvh bg-canvas" />;
}

// --------------------------------------------------
// Portfolio
// --------------------------------------------------

function Portfolio() {
  return (
    // domMax (not domAnimation) because the Navbar's sliding active pill uses
    // `layoutId`. If you ever remove layoutId, switch back to domAnimation.
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-dvh bg-canvas text-strong antialiased">
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700 motion-reduce:transition-none"
          >
            Skip to main content
          </a>

          <Navbar />

          {/*
            No top padding here: the Hero already clears the fixed Navbar.
            Adding it again creates a double gap above the Hero.
          */}
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            {/* Eager: above the fold */}
            <Hero />

            {SECTIONS.map(({ id, Component, minHeight, background }) => (
              <DeferredSection
                key={id}
                id={id}
                Component={Component}
                minHeight={minHeight}
                background={background}
              />
            ))}
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

// --------------------------------------------------
// App
// --------------------------------------------------

export default function App() {
  if (!isHomePath(window.location.pathname)) {
    return (
      <Suspense fallback={<PageFallback />}>
        <NotFound />
      </Suspense>
    );
  }

  return <Portfolio />;
}