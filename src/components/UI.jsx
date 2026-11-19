import React, { forwardRef, useState } from "react";

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Joins class names, dropping falsy values and collapsing whitespace. */
export const cn = (...parts) =>
  parts.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

/** Shared focus ring (same as Navbar, Hero, Contact). Other files can import it. */
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

// Base (non-responsive) utilities in a caller's className. Used so a caller's
// `p-0` / `rounded-xl` replaces the default instead of fighting it in the CSS.
const BASE_PADDING_RE = /(^|\s)p[xytrbles]?-/;
const BASE_ROUNDED_RE =
  /(^|\s)rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|\[[^\]]+\]))?(?=\s|$)/;

// ─── Section ──────────────────────────────────────────────────────────────────

/**
 * Full-width band with a centered, padded container.
 *
 * - `background`, `padding`, `maxWidth` are class strings (unchanged API).
 * - `className` goes on the outer element, `containerClassName` on the inner one.
 * - `scroll-mt` keeps hash links (e.g. /#skills) clear of the fixed Navbar.
 */
export const Section = forwardRef(function Section(
  {
    as: Component = "section",
    id,
    children,
    className = "",
    containerClassName = "",
    background = "bg-canvas",
    padding = "py-16 sm:py-20 lg:py-24",
    maxWidth = "max-w-6xl",
    ...props
  },
  ref
) {
  return (
    <Component
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-[84px] px-4 sm:px-6 lg:px-8",
        background,
        padding,
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto w-full", maxWidth, containerClassName)}>
        {children}
      </div>
    </Component>
  );
});

// ─── Card ─────────────────────────────────────────────────────────────────────

const CARD_PADDING = {
  none: "p-0",
  sm: "p-4",
  md: "p-5",
  lg: "p-6 sm:p-8",
};

const CARD_VARIANTS = {
  default: "",
  elevated: "shadow-sm",
  // Lift + accent border + blue-tinted shadow (matches Skills/Projects cards).
  // If the Card is also animated with Framer Motion, put the motion element on a
  // wrapper: Framer's inline transform overrides this hover translate.
  interactive:
    "shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out " +
    "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-16px_rgba(37,99,235,0.35)] " +
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
};

/**
 * Surface container.
 *
 * - `padding`: "none" | "sm" | "md" | "lg", or any class string (e.g. "p-5").
 * - `variant`: "default" | "elevated" | "interactive".
 * - A base padding or radius utility in `className` replaces the default.
 */
export const Card = forwardRef(function Card(
  {
    as: Component = "div",
    variant = "default",
    padding = "md",
    className = "",
    children,
    ...props
  },
  ref
) {
  const paddingClass = BASE_PADDING_RE.test(className)
    ? ""
    : (CARD_PADDING[padding] ?? padding);
  const roundedClass = BASE_ROUNDED_RE.test(className) ? "" : "rounded-2xl";

  return (
    <Component
      ref={ref}
      className={cn(
        "border border-default bg-surface",
        roundedClass,
        paddingClass,
        CARD_VARIANTS[variant] ?? CARD_VARIANTS.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

// ─── Badge ────────────────────────────────────────────────────────────────────

const BADGE_VARIANTS = {
  default: "border-line-strong bg-surface-raised text-primary",
  primary: "border-info/30 bg-info/10 text-info",
  secondary: "border-accent/30 bg-accent/10 text-accent",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

const BADGE_SIZES = {
  sm: "px-2.5 py-1 text-[11px] leading-4",
  md: "px-3 py-1.5 text-xs leading-4",
};

/** Pill-shaped label (same shape as the Hero and Skills tags). */
export const Badge = ({
  children,
  variant = "default",
  size = "sm",
  className = "",
  ...props
}) => (
  <span
    className={cn(
      "inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-full border font-medium tracking-wide",
      BADGE_VARIANTS[variant] ?? BADGE_VARIANTS.default,
      BADGE_SIZES[size] ?? BADGE_SIZES.sm,
      className
    )}
    {...props}
  >
    {children}
  </span>
);

// ─── Button ───────────────────────────────────────────────────────────────────

const BUTTON_BASE =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-semibold " +
  "transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out";

// Only applied while the button is usable (never when disabled or loading)
const BUTTON_INTERACTIVE =
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

// `overlay` is a deeper gradient that crossfades in on hover. Hover always
// gets richer, never paler.
const BUTTON_VARIANTS = {
  primary: {
    base:
      "border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white " +
      "shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_6px_20px_-4px_rgba(37,99,235,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]",
    hover:
      "hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_28px_-4px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.3)]",
    overlay: "from-blue-700 to-indigo-700",
  },
  secondary: {
    base: "border border-default bg-surface text-strong shadow-sm",
    hover:
      "hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md",
  },
  ghost: {
    base: "border border-transparent text-muted",
    hover: "hover:bg-overlay/5 hover:text-strong",
  },
  danger: {
    base:
      "border border-white/20 bg-gradient-to-r from-red-600 to-rose-600 text-white " +
      "shadow-[0_0_0_1px_rgba(220,38,38,0.15),0_6px_20px_-4px_rgba(220,38,38,0.5),inset_0_1px_0_rgba(255,255,255,0.25)]",
    hover:
      "hover:shadow-[0_0_0_1px_rgba(220,38,38,0.25),0_12px_28px_-4px_rgba(220,38,38,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]",
    overlay: "from-red-700 to-rose-700",
  },
};

const BUTTON_SIZES = {
  sm: "min-h-9 px-4 text-xs",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-sm",
};

/**
 * Button (or link, via `as="a"`).
 *
 * - `loading`: shows a spinner and blocks clicks but keeps keyboard focus
 *   (aria-disabled + aria-busy), so focus isn't lost mid-request.
 * - `loadingText`: optional label shown while loading.
 * - `disabled`: native `disabled` for buttons; for other elements it uses
 *   aria-disabled, removes the tab stop and blocks navigation.
 */
export const Button = forwardRef(function Button(
  {
    as: Component = "button",
    children,
    variant = "primary",
    size = "md",
    className = "",
    loading = false,
    loadingText,
    disabled = false,
    fullWidth = false,
    type = "button",
    onClick,
    ...props
  },
  ref
) {
  const isNativeButton = Component === "button";
  const isBlocked = disabled || loading;
  const styles = BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.primary;

  const handleClick = (event) => {
    if (isBlocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <Component
      {...props}
      ref={ref}
      type={isNativeButton ? type : undefined}
      disabled={isNativeButton && disabled ? true : undefined}
      aria-disabled={isBlocked ? true : undefined}
      aria-busy={loading || undefined}
      tabIndex={!isNativeButton && isBlocked ? -1 : props.tabIndex}
      onClick={handleClick}
      className={cn(
        BUTTON_BASE,
        FOCUS_RING,
        BUTTON_SIZES[size] ?? BUTTON_SIZES.md,
        styles.base,
        isBlocked
          ? disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-wait"
          : [BUTTON_INTERACTIVE, styles.hover],
        fullWidth && "w-full",
        className
      )}
    >
      {styles.overlay && !isBlocked && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100",
            styles.overlay
          )}
        />
      )}

      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
          />
        )}
        {loading && loadingText ? loadingText : children}
      </span>
    </Component>
  );
});

// ─── OptimizedImage ───────────────────────────────────────────────────────────

// React 19 supports `fetchPriority`; React 18 only accepts the lowercase DOM
// attribute and warns about the camelCase prop. Pick the right one once.
const FETCH_PRIORITY_PROP =
  Number.parseInt(React.version, 10) >= 19 ? "fetchPriority" : "fetchpriority";

/**
 * Responsive <img> with sensible loading defaults.
 *
 * - `srcSet` / `sizes` go straight on the <img> (no hard-coded image type).
 * - `priority`: for above-the-fold images (eager + high fetch priority).
 *   Explicit `loading` / `fetchPriority` props still win.
 * - `fallback`: optional node rendered if the image is missing or fails to load.
 * - `onError` still fires, so existing error handling keeps working.
 * - Always pass `width` and `height` (or an aspect-ratio box) to avoid layout shift.
 */
export const OptimizedImage = forwardRef(function OptimizedImage(
  {
    src,
    srcSet,
    sizes,
    alt = "",
    className = "",
    width,
    height,
    priority = false,
    loading,
    decoding = "async",
    fetchPriority,
    fallback = null,
    onLoad,
    onError,
    ...props
  },
  ref
) {
  // Tracks which src failed, so a new src is tried again without an effect
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) return fallback;

  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedPriority = fetchPriority ?? (priority ? "high" : undefined);

  const handleError = (event) => {
    setFailedSrc(src);
    onError?.(event);
  };

  return (
    <img
      {...(resolvedPriority ? { [FETCH_PRIORITY_PROP]: resolvedPriority } : null)}
      {...props}
      ref={ref}
      src={src}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={resolvedLoading}
      decoding={decoding}
      onLoad={onLoad}
      onError={handleError}
      className={className}
    />
  );
});