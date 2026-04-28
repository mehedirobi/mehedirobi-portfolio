import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className="
        relative flex h-10 w-10 items-center justify-center
        rounded-xl border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        text-slate-700 dark:text-slate-200
        transition-all duration-300
        hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-sky-500/40
        overflow-hidden
      "
      aria-label="Toggle theme"
    >
      {/* Sun */}
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark
            ? "opacity-0 scale-50 rotate-90"
            : "opacity-100 scale-100 rotate-0 text-amber-400 drop-shadow-sm"
        }`}
      />

      {/* Moon */}
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark
            ? "opacity-100 scale-100 rotate-0 text-sky-300 drop-shadow-sm"
            : "opacity-0 scale-50 -rotate-90"
        }`}
      />

      {/* subtle glow effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isDark
            ? "opacity-20 bg-sky-500"
            : "opacity-0"
        }`}
      />
    </motion.button>
  );
}