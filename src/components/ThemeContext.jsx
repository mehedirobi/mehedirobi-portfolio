import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia?.(MEDIA_QUERY).matches
    ? "dark"
    : "light";
};

const isValidTheme = (value) =>
  value === "light" || value === "dark";

const getStoredTheme = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

const getInitialTheme = () =>
  getStoredTheme() ?? getSystemTheme();

const applyTheme = (theme) => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const isDark = theme === "dark";

  root.classList.toggle(DARK_CLASS, isDark);
  root.style.colorScheme = theme;
};

const saveTheme = (theme) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors.
  }
};

const removeStoredTheme = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }

  return context;
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply + persist theme
  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  // Follow system theme when there is no saved preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia?.(MEDIA_QUERY);

    if (!media) return;

    const handleChange = (event) => {
      const hasManualPreference = getStoredTheme();

      if (!hasManualPreference) {
        setTheme(event.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  // ─── Controls ──────────────────────────────────────────────────────────────

  const toggleTheme = useCallback(() => {
    setTheme((current) =>
      current === "dark" ? "light" : "dark"
    );
  }, []);

  const resetToSystem = useCallback(() => {
    removeStoredTheme();
    setTheme(getSystemTheme());
  }, []);

  // ─── Context value ─────────────────────────────────────────────────────────

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
      toggleTheme,
      resetToSystem,
    }),
    [theme, toggleTheme, resetToSystem]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};