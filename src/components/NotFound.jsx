import { useEffect, useRef, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";

// --------------------------------------------------
// Config
// --------------------------------------------------

const HOME_PATH = "/";

// Real section anchors from the portfolio (same ids as the Navbar)
const QUICK_LINKS = [
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const MAX_PATH_LENGTH = 40;

// --------------------------------------------------
// Shared styles (kept in sync with Navbar, Hero, Contact)
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

const BUTTON_BASE =
  "group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold sm:w-auto " +
  "transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 " +
  FOCUS_RING;

// Same blue -> indigo gradient as the Navbar resume button
const BUTTON_PRIMARY =
  `${BUTTON_BASE} border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white ` +
  "shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_6px_20px_-4px_rgba(37,99,235,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] " +
  "hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_28px_-4px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.3)]";

const BUTTON_SECONDARY =
  `${BUTTON_BASE} border border-default bg-surface text-strong shadow-sm ` +
  "hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md";

// --------------------------------------------------
// Animation (opacity + small transforms; MotionConfig disables transforms
// for visitors who prefer reduced motion)
// --------------------------------------------------

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const digitVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.15 + index * 0.1 },
  }),
};

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function getRequestedPath() {
  if (typeof window === "undefined") return "/";

  const { pathname } = window.location;

  return pathname.length > MAX_PATH_LENGTH
    ? `${pathname.slice(0, MAX_PATH_LENGTH)}…`
    : pathname;
}

function hasSameOriginHistory() {
  if (typeof window === "undefined") return false;
  if (window.history.length <= 1) return false;

  // Only go back if the previous page is on this site; otherwise "back" would
  // send the visitor to an unrelated website or an empty tab.
  try {
    return (
      document.referrer !== "" &&
      new URL(document.referrer).origin === window.location.origin
    );
  } catch {
    return false;
  }
}

// --------------------------------------------------
// Illustration: a minimal browser window showing the failed request
// --------------------------------------------------

function ErrorIllustration({ path }) {
  return (
    // Purely decorative: the <h1> and text below carry the meaning
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      {/* Soft brand glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-3xl" />

      <m.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="overflow-hidden rounded-2xl border border-default bg-surface shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.06),0_24px_48px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.3),0_24px_48px_-12px_rgba(0,0,0,0.6)]"
      >
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-default bg-canvas-alt px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>

          <div className="min-w-0 flex-1 truncate rounded-full border border-default bg-surface px-3 py-1 text-left font-mono text-[11px] text-muted">
            {path}
          </div>
        </div>

        {/* Window body */}
        <div className="px-6 pb-7 pt-8 sm:px-8 sm:pb-9 sm:pt-10">
          <div className="flex items-center justify-center gap-1 text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl">
            {["4", "0", "4"].map((digit, index) => (
              <m.span
                key={index}
                custom={index}
                variants={digitVariants}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                {digit}
              </m.span>
            ))}
          </div>

          <p className="mt-6 text-left font-mono text-xs leading-6 text-muted sm:text-[13px]">
            <span className="text-accent">GET</span> {path}
            <br />
            <span className="text-red-500 dark:text-red-400">
              404 Not Found
            </span>
          </p>
        </div>
      </m.div>
    </div>
  );
}

// --------------------------------------------------
// Main page
// --------------------------------------------------

export default function NotFound() {
  const headingRef = useRef(null);
  const [path] = useState(getRequestedPath);

  // Keep the original document title behavior
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page not found | Mehedi Robi";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  // Move focus to the heading so screen readers announce the new page
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const handleGoBack = () => {
    if (hasSameOriginHistory()) {
      window.history.back();
    } else {
      window.location.assign(HOME_PATH);
    }
  };

  return (
    // FIX: `m` components only animate inside a LazyMotion provider. This page can
    // render outside the app's provider (router error/catch-all route), so it
    // brings its own. Without it, every `m` element stays at its `hidden`
    // state (opacity: 0) forever.
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden bg-canvas px-4 py-16 text-strong sm:px-6">
          {/* Background: soft brand glows + faint grid that fades out toward the edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          </div>

          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-xl text-center"
          >
            <m.div variants={fadeUp}>
              <ErrorIllustration path={path} />
            </m.div>

            <m.p
              variants={fadeUp}
              className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Error 404
            </m.p>

            <m.h1
              ref={headingRef}
              tabIndex={-1}
              variants={fadeUp}
              className="mt-3 text-balance text-3xl font-bold tracking-tight text-strong outline-none sm:text-4xl"
            >
              Page not found
            </m.h1>

            <m.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-md text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have
              been moved. Let&rsquo;s get you back on track.
            </m.p>

            <m.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a href={HOME_PATH} className={BUTTON_PRIMARY}>
                {/* Deeper gradient crossfades in on hover (never lighter) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <FiHome aria-hidden="true" className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Back to Home</span>
              </a>

              <button
                type="button"
                onClick={handleGoBack}
                className={BUTTON_SECONDARY}
              >
                <FiArrowLeft
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                />
                Go Back
              </button>
            </m.div>

            <m.nav
              variants={fadeUp}
              aria-label="Portfolio sections"
              className="mt-10 border-t border-default pt-6"
            >
              <p className="text-xs font-medium text-muted">
                Or jump straight to
              </p>

              <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {QUICK_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className={`relative rounded-sm py-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-strong after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none ${FOCUS_RING}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </m.nav>
          </m.div>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}