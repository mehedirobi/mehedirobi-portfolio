import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const THEME_KEY    = "theme";
const DARK_CLASS   = "dark";
const DARK_QUERY   = "(prefers-color-scheme: dark)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getSystemTheme = () =>
  window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";

const applyTheme = (theme) =>
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");

const getInitialTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || getSystemTheme();
  } catch {
    return getSystemTheme();
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Lazy init — runs once, avoids a null → value re-render cycle
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  // Persist + apply on change
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // localStorage unavailable (private browsing, storage full) — silent fail
    }
  }, [theme]);

  // Sync with system preference changes (e.g. OS dark mode toggle)
  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;

    const handler = (e) => {
      // Only follow system if user hasn't set a manual preference
      const saved = (() => {
        try { return localStorage.getItem(THEME_KEY); } catch { return null; }
      })();
      if (!saved) setTheme(e.matches ? "dark" : "light");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};