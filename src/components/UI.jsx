// UI.jsx — Shared UI primitives
import React from "react";

// ─── Shared Styles ────────────────────────────────────────────────────────────

const focusRing = `
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-slate-900/30
  dark:focus-visible:ring-white/30
`;

const surface = `
  bg-white dark:bg-slate-900
  border border-slate-200 dark:border-slate-800
`;

// ─── Section ──────────────────────────────────────────────────────────────────

export const Section = ({
  id,
  children,
  className = "",
  background = "bg-white dark:bg-slate-950",
  padding = "py-20 sm:py-24",
  maxWidth = "max-w-6xl",
  ...props
}) => {
  return (
    <section
      id={id}
      className={`${background} ${padding} px-5 sm:px-6 ${className}`}
      {...props}
    >
      <div className={`mx-auto w-full ${maxWidth}`}>
        {children}
      </div>
    </section>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = ({
  as: Component = "div",
  children,
  className = "",
  padding = "p-5",
  ...props
}) => {
  return (
    <Component
      className={`${surface} rounded-2xl ${padding} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// ─── Badge ────────────────────────────────────────────────────────────────────

const BADGE_VARIANTS = {
  default: `
    bg-slate-100 text-slate-600
    border-slate-200
    dark:bg-slate-800 dark:text-slate-400
    dark:border-slate-700
  `,

  primary: `
    bg-sky-50 text-sky-700
    border-sky-200
    dark:bg-sky-900/30 dark:text-sky-400
    dark:border-sky-800/60
  `,

  secondary: `
    bg-violet-50 text-violet-700
    border-violet-200
    dark:bg-violet-900/30 dark:text-violet-400
    dark:border-violet-800/60
  `,

  success: `
    bg-emerald-50 text-emerald-700
    border-emerald-200
    dark:bg-emerald-900/30 dark:text-emerald-400
    dark:border-emerald-800/60
  `,

  warning: `
    bg-amber-50 text-amber-700
    border-amber-200
    dark:bg-amber-900/30 dark:text-amber-400
    dark:border-amber-800/60
  `,
};

const BADGE_SIZES = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3 py-1.5 text-xs",
};

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-lg border
        font-medium tracking-wide
        select-none
        ${BADGE_VARIANTS[variant] ?? BADGE_VARIANTS.default}
        ${BADGE_SIZES[size] ?? BADGE_SIZES.sm}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

// ─── Button ───────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS = {
  primary: `
    bg-slate-900 text-white
    dark:bg-white dark:text-slate-900
    hover:opacity-85
  `,

  secondary: `
    border border-slate-200
    text-slate-700
    hover:bg-slate-50
    hover:border-slate-300

    dark:border-slate-800
    dark:text-slate-300
    dark:hover:bg-slate-900
    dark:hover:border-slate-700
  `,

  ghost: `
    text-slate-600
    hover:bg-slate-100
    hover:text-slate-900

    dark:text-slate-400
    dark:hover:bg-slate-800
    dark:hover:text-white
  `,
};

const BUTTON_SIZES = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef(
  (
    {
      as: Component = "button",
      children,
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        type={Component === "button" ? type : undefined}
        disabled={Component === "button" ? isDisabled : undefined}
        aria-busy={loading || undefined}
        aria-disabled={Component !== "button" && isDisabled ? true : undefined}
        className={`
          inline-flex items-center justify-center
          gap-2
          rounded-xl
          font-semibold
          transition-all duration-150
          active:scale-[0.97]

          ${focusRing}

          disabled:cursor-not-allowed
          disabled:opacity-50

          ${BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary}
          ${BUTTON_SIZES[size] ?? BUTTON_SIZES.md}

          ${className}
        `}
        {...props}
      >
        {loading && (
          <span
            className="
              h-4 w-4
              shrink-0
              animate-spin
              rounded-full
              border-2
              border-current
              border-t-transparent
            "
            aria-hidden="true"
          />
        )}

        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

// ─── OptimizedImage ───────────────────────────────────────────────────────────

export const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
};