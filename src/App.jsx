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
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

const getSystemTheme = () => {
  if (typeof window === "undefined") return "dark";

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  return mediaQuery.matches ? "light" : "dark";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Ignore storage access issues and fall back to system preference.
  }

  return getSystemTheme();
};

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const resolvedTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = resolvedTheme;

    const color = resolvedTheme === "light" ? "#f8fafc" : "#09090b";
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      color
    );
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const preference = window.matchMedia("(prefers-color-scheme: light)");

    const syncSystemTheme = (event) => {
      try {
        const savedTheme = window.localStorage.getItem("portfolio-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
          return;
        }
      } catch {
        // Ignore storage access issues.
      }

      const nextTheme = event.matches ? "light" : "dark";
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
