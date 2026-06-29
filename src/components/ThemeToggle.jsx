import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 items-center justify-center
                 rounded-xl overflow-hidden
                 border border-slate-200 dark:border-slate-800
                 text-slate-600 dark:text-slate-400
                 hover:border-slate-400 dark:hover:border-slate-600
                 hover:text-slate-900 dark:hover:text-white
                 active:scale-95
                 transition-all duration-150
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate:  30,  scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute"
          >
            <Moon className="w-[17px] h-[17px]" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate:  30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate: -30,  scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute"
          >
            <Sun className="w-[17px] h-[17px]" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}