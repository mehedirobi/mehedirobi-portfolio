import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

// ─── Animation ────────────────────────────────────────────────────────────────

const iconVariants = {
  initial: {
    opacity: 0,
    scale: 0.7,
    rotate: -20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    rotate: 20,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      className="
        relative
        flex h-9 w-9
        items-center justify-center
        overflow-hidden
        rounded-xl
        border border-slate-200
        text-slate-600
        transition-colors duration-200

        hover:border-slate-300
        hover:bg-slate-100
        hover:text-slate-900

        dark:border-slate-800
        dark:text-slate-400
        dark:hover:border-slate-700
        dark:hover:bg-slate-800
        dark:hover:text-white

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-900/30
        dark:focus-visible:ring-white/30
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon
              className="h-[17px] w-[17px]"
              aria-hidden="true"
            />
          ) : (
            <Sun
              className="h-[17px] w-[17px] text-amber-500"
              aria-hidden="true"
            />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}