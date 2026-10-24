import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page not found | Mehedi Robi";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-6 text-strong">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted">
          The page you requested does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-accent-button px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Return to the portfolio
        </a>
      </div>
    </main>
  );
}
