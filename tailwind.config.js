export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        "canvas-alt": "rgb(var(--color-canvas-alt) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",
        strong: "rgb(var(--color-strong) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        default: "rgb(var(--color-border) / <alpha-value>)",
        "line-strong": "rgb(var(--color-border-strong) / <alpha-value>)",
        overlay: "rgb(var(--color-overlay) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-button": "rgb(var(--color-accent-button) / <alpha-value>)",
        "accent-button-hover":
          "rgb(var(--color-accent-button-hover) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        "success-solid":
          "rgb(var(--color-success-solid) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 3.8rem)",
          { lineHeight: "1.08", letterSpacing: "-0.045em" },
        ],
        section: [
          "clamp(1.875rem, 3vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.025em" },
        ],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 8px 28px rgb(0 0 0 / 0.12)",
        lift: "0 16px 36px rgb(0 0 0 / 0.2)",
      },
    },
  },
  plugins: [],
};