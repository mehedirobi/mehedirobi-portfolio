import {
  Component as ReactComponent,
  Suspense,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

// Run `callback` once the page has finished loading and the browser is idle, so
// prefetching never competes with the Hero and first paint. Returns a cancel function.
function scheduleIdle(callback) {
  let cancelled = false;
  let cancelPending = () => {};

  const run = () => {
    if (cancelled) return;

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(callback, { timeout: 5000 });
      cancelPending = () => window.cancelIdleCallback(handle);
    } else {
      // Safari
      const handle = window.setTimeout(callback, 2000);
      cancelPending = () => window.clearTimeout(handle);
    }
  };

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    cancelPending();
  };
}

const prefersLessData = () => Boolean(navigator.connection?.saveData);

const isTargetedByHash = (id) =>
  Boolean(id) &&
  typeof window !== "undefined" &&
  window.location.hash === `#${id}`;

// --------------------------------------------------
// Skeleton: mirrors Section's padding and header so the swap doesn't shift layout
// --------------------------------------------------

function SectionSkeleton() {
  const bar = "animate-pulse rounded-lg bg-surface-raised motion-reduce:animate-none";

  return (
    <div
      aria-hidden="true"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Header: eyebrow, title, subtitle */}
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3 sm:mb-12">
          <div className={`h-3 w-28 ${bar}`} />
          <div className={`h-9 w-56 max-w-full ${bar}`} />
          <div className={`h-4 w-full max-w-md ${bar}`} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-44 animate-pulse rounded-2xl border border-default bg-surface motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Per-section error boundary: a failed chunk shouldn't replace the whole page
// --------------------------------------------------

class SectionErrorBoundary extends ReactComponent {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("[DeferredSection] Section failed to load:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <p className="text-base font-semibold text-strong">
          This section couldn’t load.
        </p>
        <p className="max-w-md text-sm leading-6 text-muted">
          Check your connection and reload the page to try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={`mt-2 inline-flex h-11 items-center justify-center rounded-full border border-default bg-surface px-6 text-sm font-semibold text-strong shadow-sm transition-[border-color,background-color,color] duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent ${FOCUS_RING}`}
        >
          Reload page
        </button>
      </div>
    );
  }
}

// Mounts only once the lazy section has actually rendered (a suspended
// <Suspense> boundary commits none of its children), so it marks "ready".
function ReadySignal({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

// --------------------------------------------------
// DeferredSection
// --------------------------------------------------

/**
 * Renders a below-the-fold section only when it nears the viewport.
 *
 * Props (unchanged): id, Component, minHeight
 * - id: the anchor id (Navbar and Footer look this up with getElementById).
 * - Component: a lazy component; use lazyWithPreload for idle prefetching.
 * - minHeight: a Tailwind class (e.g. "min-h-[640px]") that reserves space
 *   until the section is rendered, then is released so it can't leave a gap.
 *
 * New, optional:
 * - background: same class as the real section ("bg-canvas" | "bg-canvas-alt")
 *   so the placeholder doesn't flash a different color.
 * - rootMargin: how early to start loading (default 600px above/below).
 *
 * Never wrap above-the-fold content (the Hero) in this.
 */
function DeferredSection({
  id,
  Component,
  minHeight,
  background = "",
  rootMargin = "600px 0px",
}) {
  const sectionRef = useRef(null);

  // Without IntersectionObserver, or when a hash link targets this section, load now
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === "undefined" || isTargetedByHash(id)
  );
  const [isReady, setIsReady] = useState(false);

  const markReady = useCallback(() => setIsReady(true), []);

  // Viewport-based loading
  useEffect(() => {
    const node = sectionRef.current;
    if (isVisible || !node) return undefined;

    const reveal = () => setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);

    const handleHashChange = () => {
      if (isTargetedByHash(id)) reveal();
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isVisible, rootMargin, id]);

  // Download the chunk during idle time, long before the section is needed
  useEffect(() => {
    if (isVisible || !Component?.preload || prefersLessData()) return undefined;

    return scheduleIdle(() => {
      Component.preload().catch(() => {}); // a failed prefetch retries on render
    });
  }, [Component, isVisible]);

  const wrapperClass = [
    "scroll-mt-[84px]", // keeps hash links clear of the fixed Navbar
    background,
    !isReady && minHeight, // reserve space until the real section has rendered
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id={id} ref={sectionRef} aria-busy={!isReady} className={wrapperClass}>
      {isVisible ? (
        <SectionErrorBoundary>
          <Suspense fallback={<SectionSkeleton />}>
            <Component id={null} />
            <ReadySignal onReady={markReady} />
          </Suspense>
        </SectionErrorBoundary>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
}

export default memo(DeferredSection);