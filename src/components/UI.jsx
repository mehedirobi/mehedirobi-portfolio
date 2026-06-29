// ─── UI.jsx — Shared design system components ─────────────────────────────────
import React from "react";

// ─── Section ──────────────────────────────────────────────────────────────────

export const Section = ({
  id,
  children,
  className = "",
  background = "bg-white dark:bg-slate-950",
  padding = "py-20 sm:py-24",
  maxWidth = "max-w-6xl",
  ...props
}) => (
  <section
    id={id}
    className={`${background} ${padding} px-5 sm:px-6 ${className}`}
    {...props}
  >
    <div className={`mx-auto ${maxWidth}`}>
      {children}
    </div>
  </section>
);

// ─── Card ─────────────────────────────────────────────────────────────────────
// Intentionally no default hover — each consumer controls hover behaviour
// to avoid double-transform conflicts with whileHover on motion wrappers.

export const Card = ({ children, className = "", padding = "p-5", ...props }) => (
  <div
    className={`
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      rounded-2xl
      ${padding} ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────

const BADGE_VARIANTS = {
  default:   "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  primary:   "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300",
  secondary: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
  success:   "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  warning:   "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
};

const BADGE_SIZES = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
  ...props
}) => (
  <span
    className={`
      inline-flex items-center font-medium rounded-lg tracking-wide
      ${BADGE_VARIANTS[variant] ?? BADGE_VARIANTS.default}
      ${BADGE_SIZES[size]   ?? BADGE_SIZES.sm}
      ${className}
    `}
    {...props}
  >
    {children}
  </span>
);

// ─── Button ───────────────────────────────────────────────────────────────────

const BUTTON_VARIANTS = {
  primary:   "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-80",
  secondary: "border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700",
  ghost:     "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800",
};

const BUTTON_SIZES = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = React.forwardRef(({
  as: Tag = "button",
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...props
}, ref) => (
  <Tag
    ref={ref}
    type={Tag === "button" ? type : undefined}
    disabled={Tag === "button" ? disabled : undefined}
    className={`
      inline-flex items-center justify-center gap-2
      font-semibold rounded-xl
      active:scale-[0.97] transition-all duration-150
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
      disabled:opacity-50 disabled:cursor-not-allowed
      ${BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary}
      ${BUTTON_SIZES[size]       ?? BUTTON_SIZES.md}
      ${className}
    `}
    {...props}
  >
    {children}
  </Tag>
));

Button.displayName = "Button";

// ─── OptimizedImage ───────────────────────────────────────────────────────────

export const OptimizedImage = ({ src, alt, className = "", ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={className}
    {...props}
  />
);