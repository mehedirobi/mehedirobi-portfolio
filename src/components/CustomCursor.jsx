import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, summary, [role=button], [tabindex]:not([tabindex='-1'])";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: -40, y: -40 });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const updateEnabled = () => setIsEnabled(finePointer.matches);

    updateEnabled();
    finePointer.addEventListener("change", updateEnabled);

    return () => {
      finePointer.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const style = document.createElement("style");

    style.dataset.customCursor = "true";

    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        body,
        body * {
          cursor: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    const setTransform = (element, x, y) => {
      if (!element) return;

      element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(var(--cursor-scale))`;
    };

    const animate = () => {
      const { x, y } = pointerRef.current;

      setTransform(cursorRef.current, x, y);

      frameRef.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerOver = (event) => {
      const interactiveElement =
        event.target.closest?.(INTERACTIVE_SELECTOR);

      if (interactiveElement) {
        cursorRef.current?.classList.add("custom-cursor--active");
      }
    };

    const handlePointerOut = (event) => {
      const nextElement =
        event.relatedTarget?.closest?.(INTERACTIVE_SELECTOR);

      if (!nextElement) {
        cursorRef.current?.classList.remove(
          "custom-cursor--active"
        );
      }
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });

    document.addEventListener("pointerout", handlePointerOut, {
      passive: true,
    });

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);

      document.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerover",
        handlePointerOver
      );

      document.removeEventListener(
        "pointerout",
        handlePointerOut
      );

      style.remove();
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <svg
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor"
        viewBox="0 0 24 28"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "20px",
          height: "24px",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2147483647,
          transform:
            "translate3d(-40px, -40px, 0) scale(1)",
          transformOrigin: "0 0",
          willChange: "transform",
          "--cursor-scale": 1,
        }}
      >
        <path
          d="M2 2L21 11.5L13 14L10 25L2 2Z"
          fill="#ffffff"
          stroke="#0a0a0a"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        <path
          d="M3.5 3.5L13 14"
          fill="none"
          stroke="rgba(0, 0, 0, 0.35)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>

      <style>{`
        .custom-cursor {
          --cursor-scale: 1;
          transition: transform 120ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .custom-cursor--active {
          --cursor-scale: 1.12;
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}