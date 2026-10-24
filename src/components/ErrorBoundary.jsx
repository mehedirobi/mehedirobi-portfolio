import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-dvh place-items-center bg-canvas px-6 text-strong">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold">This page could not load</h1>
            <p className="mt-3 text-muted">
              Please try again. If the problem continues, refresh the page.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 min-h-11 rounded-xl bg-accent-button px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Refresh page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
