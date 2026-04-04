import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "education",
  "experience",
  "projects",
  "contact",
];

// Reusable NavLink
const NavLink = ({ id, active, onClick }) => {
  const isActive = active === id;

  return (
    <a
      href={`#${id}`}
      onClick={(e) => onClick(e, id)}
      className={`
        relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
        ${isActive ? "text-white font-semibold" : "text-gray-700 dark:text-gray-300 hover:text-blue-500"}
      `}
    >
      {isActive && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </a>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Smooth scroll with offset
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);

    if (el) {
      const yOffset = -80; // navbar height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setOpen(false);
  }, []);

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
          whileHover={{ scale: 1.05 }}
        >
          Mehedi Robi
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {SECTIONS.map((link) => (
            <NavLink key={link} id={link} active={active} onClick={handleNavClick} />
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <div className="w-5 h-5 relative">
              <span
                className={`absolute w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  open ? "rotate-45 top-2" : "top-1"
                }`}
              />
              <span
                className={`absolute w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  open ? "opacity-0" : "top-2"
                }`}
              />
              <span
                className={`absolute w-full h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                  open ? "-rotate-45 top-2" : "top-3"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-2">
              {SECTIONS.map((link) => (
                <NavLink key={link} id={link} active={active} onClick={handleNavClick} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}