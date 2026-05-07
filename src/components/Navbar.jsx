import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const NavbarItem = ({ id, label, active, onClick }) => {
  const isActive = active === id;

  return (
    <button
      onClick={(e) => onClick(e, id)}
      className="relative px-3 py-2 text-sm font-medium transition-colors rounded-full"
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span
        className={`relative z-10 ${
          isActive
            ? "text-white dark:text-black"
            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

const Hamburger = ({ open }) => (
  <div className="flex flex-col justify-center w-6 h-6">
    <motion.span
      animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      className="h-0.5 w-6 bg-current"
    />
    <motion.span
      animate={open ? { opacity: 0 } : { opacity: 1 }}
      className="h-0.5 w-6 bg-current my-1"
    />
    <motion.span
      animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      className="h-0.5 w-6 bg-current"
    />
  </div>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const scrollToSection = useCallback((e, id) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-slate-200/40 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <button
          onClick={(e) => scrollToSection(e, "home")}
          className="text-lg font-semibold tracking-tight"
        >
          Mehedi Robi
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={item.id}
              {...item}
              active={active}
              onClick={scrollToSection}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">

          <button
            onClick={(e) => scrollToSection(e, "contact")}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-slate-900 dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            <FiSend className="w-4 h-4" />
            Hire Me
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="p-2 border rounded-lg border-slate-200 dark:border-slate-800"
            aria-label="Toggle menu"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden px-6 pb-6"
          >
            <div className="flex flex-col gap-2 p-4 rounded-2xl border bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">

              {NAV_ITEMS.map((item) => (
                <NavbarItem
                  key={item.id}
                  {...item}
                  active={active}
                  onClick={scrollToSection}
                />
              ))}

              <button
                onClick={(e) => scrollToSection(e, "contact")}
                className="mt-3 flex justify-center items-center gap-2 px-5 py-2 rounded-full text-white bg-slate-900 dark:bg-white dark:text-black"
              >
                <FiSend className="w-4 h-4" />
                Hire Me
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}