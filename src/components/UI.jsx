import React from "react";

// ─── Shared Styles ────────────────────────────────────────────────────────────

const focusRing = `
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-violet-400/60
`;

const surface = `
  bg-[#111318]
  border border-white/10
`;

// ─── Section ──────────────────────────────────────────────────────────────────

export const Section = ({
  id,
  children,
  className = "",
  background = "bg-[#09090b]",
  padding = "py-16 sm:py-20",
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
    bg-[#181a21] text-slate-300
    border-slate-700
  `,

  primary: `
    bg-sky-900/30 text-sky-300
    border-sky-800/60
  `,

  secondary: `
    bg-violet-900/30 text-violet-300
    border-violet-800/60
  `,

  success: `
    bg-emerald-900/30 text-emerald-300
    border-emerald-800/60
  `,

  warning: `
    bg-amber-900/30 text-amber-300
    border-amber-800/60
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
    bg-violet-600 text-white
    hover:opacity-85
  `,

  secondary: `
    border border-white/15
    text-slate-300
    hover:bg-white/5
    hover:border-white/25
  `,

  ghost: `
    text-slate-400
    hover:bg-white/5
    hover:text-white
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