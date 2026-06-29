import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home",           label: "Home"         },
  { id: "about",          label: "About"        },
  { id: "skills",         label: "Skills"       },
  { id: "projects",       label: "Projects"     },
  { id: "experience",     label: "Experience"   },
  { id: "certifications", label: "Certifications" },
  { id: "education",      label: "Education"    },
  { id: "contact",        label: "Contact"      },
];

// ─── NavItem ────────────────────────────────────────────────────────────────

const NavItem = ({ id, label, active, onClick }) => {
  const isActive = active === id;

  return (
    <button
      onClick={(e) => onClick(e, id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50
        dark:focus-visible:ring-white/50
        ${isActive
          ? "text-white dark:text-black"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

// ─── HireMe Button ──────────────────────────────────────────────────────────

const HireMeButton = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
      bg-slate-900 text-white dark:bg-white dark:text-slate-900
      hover:opacity-80 active:scale-95 transition-all duration-150
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50
      dark:focus-visible:ring-white/50
      ${className}
    `}
    aria-label="Go to contact section"
  >
    <FiSend className="w-3.5 h-3.5" aria-hidden="true" />
    Hire Me
  </button>
);

// ─── Hamburger ──────────────────────────────────────────────────────────────

const Hamburger = ({ open }) => (
  <div className="relative flex flex-col justify-center w-5 h-5 gap-[5px]" aria-hidden="true">
    <motion.span
      animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="h-px w-5 bg-current"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.15 }}
      className="h-px w-5 bg-current"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="h-px w-5 bg-current"
    />
  </div>
);

// ─── Navbar ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const scrollTo = useCallback((e, id) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -55% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      role="banner"
      ref={menuRef}
      className={`
        fixed top-0 inset-x-0 z-50
        bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl
        border-b transition-colors duration-300
        ${scrolled
          ? "border-slate-200/60 dark:border-slate-800/60"
          : "border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={(e) => scrollTo(e, "home")}
          aria-label="Go to home"
          className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white
                     hover:opacity-70 transition-opacity focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
                     rounded-sm"
        >
          Mehedi<span className="text-slate-400 dark:text-slate-500"> Robi</span>
        </button>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.id} {...item} active={active} onClick={scrollTo} />
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <HireMeButton onClick={(e) => scrollTo(e, "contact")} />
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400
                       hover:bg-slate-100 dark:hover:bg-slate-800/60
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
                       transition-colors"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="lg:hidden border-t border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
              <div className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800/80
                              bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm overflow-hidden">

                {/* Nav links */}
                <div className="flex flex-col p-2">
                  {NAV_ITEMS.map((item) => (
                    <NavItem key={item.id} {...item} active={active} onClick={scrollTo} />
                  ))}
                </div>

                {/* Divider + CTA */}
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <HireMeButton
                    onClick={(e) => scrollTo(e, "contact")}
                    className="w-full justify-center mt-3"
                  />
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}