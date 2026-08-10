import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const THEME_KEY  = "theme";
const DARK_CLASS = "dark";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getSystemTheme = () =>
  window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";

const applyTheme = (theme) =>
  document.documentElement.classList.toggle(DARK_CLASS, theme === "dark");

const readStorage = () => {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
};

const writeStorage = (value) => {
  try { localStorage.setItem(THEME_KEY, value); } catch { /* silent */ }
};

const clearStorage = () => {
  try { localStorage.removeItem(THEME_KEY); } catch { /* silent */ }
};

const getInitialTheme = () => {
  const saved = readStorage();
  return saved === "dark" || saved === "light" ? saved : getSystemTheme();
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

/**
 * useTheme — access theme state and controls.
 *
 * @returns {{
 *   theme:       "light" | "dark",
 *   isDark:      boolean,
 *   toggleTheme: () => void,
 *   setLight:    () => void,
 *   setDark:     () => void,
 *   resetToSystem: () => void,
 * }}
 */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    // Lazy init — apply immediately to avoid flash of wrong theme
    const initial = getInitialTheme();
    applyTheme(initial);
    return initial;
  });

  // Persist + apply whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    writeStorage(theme);
  }, [theme]);

  // Sync with OS-level dark mode changes (only when no manual preference saved)
  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return;

    const handler = (e) => {
      if (!readStorage()) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // ── Controls ────────────────────────────────────────────────────────────────

  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  const setLight = useCallback(() => setThemeState("light"), []);
  const setDark  = useCallback(() => setThemeState("dark"),  []);

  // Clear saved preference → follow system from now on
  const resetToSystem = useCallback(() => {
    clearStorage();
    setThemeState(getSystemTheme());
  }, []);

  // ── Value ───────────────────────────────────────────────────────────────────

  const value = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setLight,
    setDark,
    resetToSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};