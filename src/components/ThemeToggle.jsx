import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

// ─── Animation variants ───────────────────────────────────────────────────────

const iconVariants = {
  // entering icon drops in from above
  enter: (direction) => ({
    opacity: 0,
    y:       direction === "down" ? -8 : 8,
    scale:   0.75,
  }),
  center: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  // exiting icon drops out downward
  exit: (direction) => ({
    opacity: 0,
    y:       direction === "down" ? 8 : -8,
    scale:   0.75,
    transition: { duration: 0.18, ease: "easeIn" },
  }),
};

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  // Sun enters from bottom (going light), Moon enters from top (going dark)
  const direction = isDark ? "down" : "up";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      whileHover={{ scale: 1.06 }}
      whileTap={{   scale: 0.93 }}
      transition={{ duration: 0.15 }}
      className="
        relative flex h-9 w-9 items-center justify-center
        rounded-xl overflow-hidden
        border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-400
        hover:bg-slate-100 dark:hover:bg-slate-800/80
        hover:border-slate-300 dark:hover:border-slate-700
        hover:text-slate-900 dark:hover:text-white
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
      "
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        {isDark ? (
          <motion.span
            key="moon"
            custom={direction}
            variants={iconVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute flex items-center justify-center
                       text-slate-300 dark:text-slate-300"
          >
            <Moon className="w-[17px] h-[17px]" aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            custom={direction}
            variants={iconVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute flex items-center justify-center
                       text-amber-500"
          >
            <Sun className="w-[17px] h-[17px]" aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}