import { lazy, useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import DeferredSection from "./components/DeferredSection";
import NotFound from "./components/NotFound";

const About = lazy(() => import("./components/About"));
const Certifications = lazy(() => import("./components/Certifications"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark"
  );

  useEffect(() => {
    const color = theme === "light" ? "#f8fafc" : "#09090b";
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      color
    );
  }, [theme]);

  useEffect(() => {
    let preference;

    try {
      if (window.localStorage.getItem("portfolio-theme")) return undefined;
      preference = window.matchMedia("(prefers-color-scheme: light)");
    } catch {
      return undefined;
    }

    const syncSystemTheme = (event) => {
      const nextTheme = event.matches ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    preference.addEventListener("change", syncSystemTheme);
    return () => preference.removeEventListener("change", syncSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      nextTheme === "light" ? "#f8fafc" : "#09090b"
    );

    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // Keep the selected theme active for this session if storage is unavailable.
    }

    setTheme(nextTheme);
  };

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

          <Navbar theme={theme} onToggleTheme={toggleTheme} />

          <main
            id="main-content"
            tabIndex="-1"
            className="pt-16 focus:outline-none"
          >
            <Hero />
            <DeferredSection
              id="about"
              Component={About}
              minHeight="min-h-[22rem]"
            />
            <Skills />
            <Projects />
            <DeferredSection
              id="certifications"
              Component={Certifications}
              minHeight="min-h-[28rem]"
            />
            <DeferredSection
              id="education"
              Component={Education}
              minHeight="min-h-[28rem]"
            />
            <DeferredSection
              id="contact"
              Component={Contact}
              minHeight="min-h-[44rem]"
            />
          </main>

          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}