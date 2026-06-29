import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home",           label: "Home"           },
  { id: "about",          label: "About"          },
  { id: "skills",         label: "Skills"         },
  { id: "projects",       label: "Projects"       },
  { id: "experience",     label: "Experience"     },
  { id: "certifications", label: "Certifications" },
  { id: "education",      label: "Education"      },
  { id: "contact",        label: "Contact"        },
];

// ─── Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="absolute bottom-0 left-0 right-0 h-[2px] z-10
                 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400
                 dark:from-violet-400 dark:via-blue-400 dark:to-cyan-300"
    />
  );
};

// ─── Desktop NavItem
const NavItem = ({ id, label, active, onClick }) => {
  const isActive = active === id;

  return (
    <button
      onClick={(e) => onClick(e, id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative px-3 py-1.5 text-sm font-medium rounded-full
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-violet-500/50 dark:focus-visible:ring-violet-400/50
        ${isActive
          ? "text-white dark:text-slate-900"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full
                     bg-gradient-to-r from-violet-600 to-blue-600
                     dark:from-violet-400 dark:to-blue-400"
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

// ─── Mobile NavItem
const MobileNavItem = ({ id, label, active, onClick, index }) => {
  const isActive = active === id;

  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.045, duration: 0.22, ease: "easeOut" }}
      onClick={(e) => onClick(e, id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
        text-sm font-medium text-left transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-violet-500/50 dark:focus-visible:ring-violet-400/50
        ${isActive
          ? "bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-violet-600 dark:text-violet-400"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      {/* Active indicator dot */}
      <span className={`
        w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200
        ${isActive
          ? "bg-gradient-to-r from-violet-500 to-blue-500 scale-100"
          : "bg-slate-300 dark:bg-slate-700 scale-75"
        }
      `} />
      <span>{label}</span>
    </motion.button>
  );
};

// ─── Hire Me Button
const HireMeButton = ({ onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className={`
      inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
      bg-gradient-to-r from-violet-600 to-blue-600
      dark:from-violet-500 dark:to-blue-500
      text-white shadow-md shadow-violet-500/25 dark:shadow-violet-500/20
      hover:shadow-lg hover:shadow-violet-500/35
      transition-shadow duration-200
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-violet-500/50 dark:focus-visible:ring-violet-400/50
      ${className}
    `}
    aria-label="Go to contact section"
  >
    <FiSend className="w-3.5 h-3.5" aria-hidden="true" />
    Hire Me
  </motion.button>
);

// ─── Animated Hamburger
const Hamburger = ({ open }) => (
  <div className="flex flex-col justify-center w-5 h-4 gap-[5px]" aria-hidden="true">
    <motion.span
      animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-[1.5px] w-5 bg-current rounded-full"
    />
    <motion.span
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.18 }}
      className="h-[1.5px] w-5 bg-current rounded-full"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-[1.5px] w-5 bg-current rounded-full"
    />
  </div>
);

// ─── Navbar 
export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const scrollTo = useCallback((e, id) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  // Active section via IntersectionObserver
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

  // Scroll shadow trigger
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

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        role="banner"
        ref={menuRef}
        className={`
          fixed top-0 inset-x-0 z-50
          bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl
          border-b transition-all duration-300
          ${scrolled
            ? "border-slate-200/70 dark:border-slate-800/70 shadow-sm shadow-slate-900/5 dark:shadow-slate-900/30"
            : "border-transparent"
          }
        `}
      >
        {/* Scroll progress bar */}
        <ScrollProgress />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={(e) => scrollTo(e, "home")}
            aria-label="Go to home"
            className="group flex items-center gap-0.5 text-xl font-bold tracking-tight
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-violet-500/50 rounded-sm"
          >
            <span className="text-slate-900 dark:text-white transition-colors duration-200">
              Mehedi
            </span>
            <span className="
              text-transparent bg-clip-text
              bg-gradient-to-r from-violet-600 to-blue-500
              dark:from-violet-400 dark:to-blue-400
            ">
              Robi
            </span>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              className="
                ml-1 w-1.5 h-1.5 rounded-full shrink-0
                bg-gradient-to-r from-violet-500 to-blue-500
              "
            />
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.id} {...item} active={active} onClick={scrollTo} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <HireMeButton onClick={(e) => scrollTo(e, "contact")} />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300
                         hover:bg-slate-100 dark:hover:bg-slate-800/60
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-violet-500/40 dark:focus-visible:ring-violet-400/40
                         transition-colors duration-200"
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel — lives INSIDE header so ref works */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden border-t border-slate-200/60 dark:border-slate-800/60"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div className="
                  rounded-2xl border border-slate-200/80 dark:border-slate-800/80
                  bg-white/95 dark:bg-slate-950/95 backdrop-blur-md
                  shadow-xl shadow-slate-900/10 dark:shadow-slate-900/50
                  overflow-hidden
                ">
                  {/* Nav links with stagger */}
                  <div className="flex flex-col p-2 gap-0.5">
                    {NAV_ITEMS.map((item, index) => (
                      <MobileNavItem
                        key={item.id}
                        {...item}
                        active={active}
                        onClick={scrollTo}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Divider + CTA */}
                  <div className="px-3 pb-3 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <HireMeButton
                      onClick={(e) => scrollTo(e, "contact")}
                      className="w-full justify-center mt-2.5"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Backdrop — outside header so it covers full page */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40
                       bg-slate-950/20 dark:bg-slate-950/50
                       backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}