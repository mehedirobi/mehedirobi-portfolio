import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiSend } from "react-icons/fi";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const HEADER_HEIGHT = 64;
const SCROLL_OFFSET = HEADER_HEIGHT + 16;
const DESKTOP_BREAKPOINT = 1280;

const NAV_LINK_BASE =
  "relative rounded-full px-3 py-2 text-[13px] font-medium " +
  "transition-colors duration-200 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-violet-500 " +
  "focus-visible:ring-offset-2";

function Brand({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Mehedi Robi — Home"
      className="shrink-0 rounded-sm text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-4"
    >
      <span className="text-slate-950">Mehedi</span>
      <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
        {" "}Robi
      </span>
    </button>
  );
}

function NavItem({ id, label, active, onClick }) {
  const isActive = active === id;

  return (
    <button
      type="button"
      onClick={(event) => onClick(event, id)}
      aria-current={isActive ? "location" : undefined}
      className={`${NAV_LINK_BASE} ${
        isActive
          ? "text-violet-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="navbar-active-indicator"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className="absolute inset-0 rounded-full bg-violet-200"
        />
      )}

      <span className="relative z-10">{label}</span>
    </button>
  );
}

function MobileNavItem({ id, label, active, onClick }) {
  const isActive = active === id;

  return (
    <button
      type="button"
      onClick={(event) => onClick(event, id)}
      aria-current={isActive ? "location" : undefined}
      className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 ${
        isActive
          ? "bg-violet-50 text-violet-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          isActive ? "bg-violet-600" : "bg-slate-300"
        }`}
      />
      {label}
    </button>
  );
}

function HireMeButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:bg-violet-800 ${className}`}
    >
      <FiSend aria-hidden="true" className="h-3.5 w-3.5" />
      <span>Hire Me</span>
    </button>
  );
}

function MenuToggle({ open, onClick, buttonRef }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="mobile-navigation"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 xl:hidden"
    >
      <span className="sr-only">
        {open ? "Close menu" : "Open menu"}
      </span>

      <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
        <motion.span
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.18 }}
          className="h-0.5 w-5 rounded-full bg-current"
        />
        <motion.span
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.12 }}
          className="h-0.5 w-5 rounded-full bg-current"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.18 }}
          className="h-0.5 w-5 rounded-full bg-current"
        />
      </span>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const menuButtonRef = useRef(null);
  const previousOverflowRef = useRef("");
  const reduceMotion = useReducedMotion();

  const scrollTo = useCallback(
    (event, id) => {
      event?.preventDefault();

      const section = document.getElementById(id);

      setOpen(false);

      if (!section) return;

      setActive(id);

      const targetPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        SCROLL_OFFSET;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion]
  );

  // Keep the active link and header appearance in sync with scrolling.
  useEffect(() => {
    let frameId = 0;

    const updateNavigation = () => {
      frameId = 0;

      setScrolled(window.scrollY > 12);

      const sections = NAV_ITEMS
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean)
        .map((element) => ({
          id: element.id,
          top: element.getBoundingClientRect().top + window.scrollY,
        }))
        .sort((a, b) => a.top - b.top);

      if (!sections.length) return;

      const isAtPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const threshold = window.scrollY + SCROLL_OFFSET + 24;
      let currentSection = sections[0].id;

      for (const section of sections) {
        if (section.top <= threshold) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActive(currentSection);
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Close the mobile menu with Escape or when entering desktop layout.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!open) return;

    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [open]);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 transition-[border-color,box-shadow] duration-200 ${
          scrolled
            ? "border-slate-200 shadow-sm shadow-slate-900/[0.04]"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Brand onClick={(event) => scrollTo(event, "home")} />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                {...item}
                active={active}
                onClick={scrollTo}
              />
            ))}
          </nav>

          <div className="hidden xl:block">
            <HireMeButton
              onClick={(event) => scrollTo(event, "contact")}
            />
          </div>

          <MenuToggle
            open={open}
            onClick={() => setOpen((previous) => !previous)}
            buttonRef={menuButtonRef}
          />
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduceMotion ? 0 : 0.16 }}
              className="absolute inset-x-0 top-full border-t border-slate-200 bg-white shadow-lg shadow-slate-900/[0.06] xl:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 py-3 sm:px-6"
              >
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <MobileNavItem
                      key={item.id}
                      {...item}
                      active={active}
                      onClick={scrollTo}
                    />
                  ))}
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3">
                  <HireMeButton
                    onClick={(event) => scrollTo(event, "contact")}
                    className="w-full"
                  />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            onClick={closeMenu}
            className="fixed inset-x-0 bottom-0 top-16 z-40 cursor-default bg-slate-950/20 xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Optional shortcut for returning to the top is intentionally omitted. */}
      <span className="sr-only">
        <FiArrowUpRight aria-hidden="true" />
      </span>
    </>
  );
}