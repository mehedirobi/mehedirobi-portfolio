import { lazy } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import DeferredSection from "./components/DeferredSection";
import NotFound from "./components/NotFound";

const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const isNotFound =
    window.location.pathname.replace(/\/+$/, "") !== "" &&
    window.location.pathname !== "/index.html";

  if (isNotFound) return <NotFound />;

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-dvh bg-canvas text-strong antialiased">
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-lg bg-accent-button px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
          >
            Skip to main content
          </a>

          <Navbar />

          <main
            id="main-content"
            tabIndex="-1"
            className="pt-16 focus:outline-none"
          >
            <Hero />

            <Skills />

            <Projects />

            <DeferredSection
              id="education"
              Component={Education}
              minHeight="min-h-[22rem]"
            />

            <DeferredSection
              id="contact"
              Component={Contact}
              minHeight="min-h-[32rem]"
            />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}