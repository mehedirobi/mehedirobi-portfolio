import { Component, createRef } from "react";
import { FiAlertTriangle, FiRefreshCw, FiRotateCw } from "react-icons/fi";

// --------------------------------------------------
// Config
// --------------------------------------------------

const ERROR_TITLE = "Something went wrong | Mehedi Robi";

// Replaced by the bundler at build time, so the details panel never ships to visitors
const IS_DEV = import.meta.env.DEV;

// --------------------------------------------------
// Styles (kept in sync with Navbar, Hero, NotFound).
// Plain Tailwind only: no Framer Motion and no UI.jsx imports, so the fallback
// still works if the provider or a shared component is what failed.
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
// Fallback UI
// --------------------------------------------------

function renderErrorFallback({
  headingRef,
  attempts,
  error,
  componentStack,
  onRetry,
  onRefresh,
}) {
  const hasRetried = attempts > 0;

  return (
    <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden bg-canvas px-4 py-16 text-strong sm:px-6">
      {/* Background: soft brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="w-full max-w-lg text-center">
        <div
          aria-hidden="true"
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-default bg-surface text-accent shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.06),0_12px_32px_-8px_rgba(15,23,42,0.16)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.3),0_12px_32px_-8px_rgba(0,0,0,0.6)]"
        >
          <FiAlertTriangle className="h-7 w-7" />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Unexpected error
        </p>

        {/* role="alert" announces the failure; focus moves to the heading */}
        <div role="alert">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-strong outline-none sm:text-4xl"
          >
            This page could not load
          </h1>

          <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {hasRetried
              ? "That didn’t fix it. Refreshing the page usually does."
              : "Please try again. If the problem continues, refresh the page."}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* After a failed retry, make Refresh the primary action */}
          {hasRetried ? (
            <>
              <button type="button" onClick={onRefresh} className={BUTTON_PRIMARY}>
                {/* Deeper gradient crossfades in on hover (never lighter) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <FiRefreshCw aria-hidden="true" className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Refresh page</span>
              </button>

              <button type="button" onClick={onRetry} className={BUTTON_SECONDARY}>
                <FiRotateCw aria-hidden="true" className="h-4 w-4" />
                Try again
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={onRetry} className={BUTTON_PRIMARY}>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <FiRotateCw aria-hidden="true" className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Try again</span>
              </button>

              <button type="button" onClick={onRefresh} className={BUTTON_SECONDARY}>
                <FiRefreshCw aria-hidden="true" className="h-4 w-4" />
                Refresh page
              </button>
            </>
          )}
        </div>

        {/* Development only: never rendered in production builds */}
        {IS_DEV && error && (
          <details className="mt-10 rounded-2xl border border-default bg-surface p-4 text-left shadow-sm">
            <summary
              className={`cursor-pointer rounded-sm text-sm font-semibold text-strong ${FOCUS_RING}`}
            >
              Error details (development only)
            </summary>

            <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-canvas p-3 font-mono text-xs leading-5 text-red-600 dark:text-red-400">
              {String(error?.stack || error?.message || error)}
              {componentStack ? `\n\nComponent stack:${componentStack}` : ""}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}

// --------------------------------------------------
// Error boundary
// --------------------------------------------------

/**
 * Catches render-time errors in its subtree.
 *
 * Props:
 * - children
 * - onError(error, errorInfo): optional hook for an error reporting service
 * - onReset(): optional, called before "Try again" re-renders the children
 *
 * Note: error boundaries do not catch errors in event handlers, async code, or
 * the boundary itself. Those still go to window "error" / "unhandledrejection".
 */
export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    componentStack: null,
    attempts: 0,
  };

  headingRef = createRef();
  previousTitle = null;

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Always log (visible in the browser console and in any log collector)
    console.error("[ErrorBoundary] Uncaught render error:", error, {
      componentStack: errorInfo?.componentStack,
    });

    if (IS_DEV) {
      this.setState({ componentStack: errorInfo?.componentStack ?? null });
    }

    // A faulty reporter must never cause a second crash
    try {
      this.props.onError?.(error, errorInfo);
    } catch (reportingError) {
      console.error("[ErrorBoundary] onError handler failed:", reportingError);
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    const justFailed = this.state.hasError && !prevState.hasError;
    const justRecovered = !this.state.hasError && prevState.hasError;

    if (justFailed) {
      this.previousTitle = document.title;
      document.title = ERROR_TITLE;
      // Move focus so keyboard and screen reader users land on the message
      this.headingRef.current?.focus({ preventScroll: true });
    }

    if (justRecovered) {
      this.restoreTitle();
    }
  }

  componentWillUnmount() {
    this.restoreTitle();
  }

  restoreTitle() {
    if (this.previousTitle !== null) {
      document.title = this.previousTitle;
      this.previousTitle = null;
    }
  }

  handleRetry = () => {
    try {
      this.props.onReset?.();
    } catch (resetError) {
      console.error("[ErrorBoundary] onReset handler failed:", resetError);
    }

    this.setState((state) => ({
      hasError: false,
      error: null,
      componentStack: null,
      attempts: state.attempts + 1,
    }));
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return renderErrorFallback({
      headingRef: this.headingRef,
      attempts: this.state.attempts,
      error: this.state.error,
      componentStack: this.state.componentStack,
      onRetry: this.handleRetry,
      onRefresh: this.handleRefresh,
    });
  }
}