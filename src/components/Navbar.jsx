
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  FiDownload,
  FiHome,
  FiCode,
  FiFolder,
  FiBookOpen,
  FiMail,
} from "react-icons/fi";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "contact", label: "Contact", icon: FiMail },
];

const HEADER_HEIGHT = 64;
const SCROLL_OFFSET = HEADER_HEIGHT + 20;
const DESKTOP_BREAKPOINT = 1280;

const RESUME_PATH = "/MehediRobi_Resume.pdf";

function Brand({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Mehedi Robi - Home"
      className="shrink-0 rounded-lg text-lg font-bold tracking-tight text-strong transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
    >
      <span>Mehedi</span>
      <span className="text-accent"> Robi</span>
    </button>
  );
}

function ResumeButton({ mobile = false, onClick }) {
  return (
    <a
      href={RESUME_PATH}
      download="MehediRobi_Resume.pdf"
      onClick={onClick}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        mobile ? "w-full" : ""
      }`}
    >
      <FiDownload aria-hidden="true" className="h-4 w-4" />
      <span>Download Resume</span>
    </a>
  );
}

function NavItem({ item, active, onClick }) {
  const isActive = active === item.id;
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={(event) => onClick(event, item.id)}
      aria-current={isActive ? "location" : undefined}
      className={`relative inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        isActive
          ? "text-accent"
          : "text-muted hover:bg-overlay/5 hover:text-strong"
      }`}
    >
      {isActive && (
        <m.span
          layoutId="active-nav-indicator"
          className="absolute inset-0 rounded-full bg-accent/10"
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      <Icon className="relative z-10 h-3.5 w-3.5" aria-hidden="true" />
      <span className="relative z-10">{item.label}</span>
    </button>
  );
}

function MobileNavItem({ item, active, onClick }) {
  const isActive = active === item.id;
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={(event) => onClick(event, item.id)}
      aria-current={isActive ? "location" : undefined}
      className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
        isActive
          ? "bg-accent/10 text-accent"
          : "text-primary hover:bg-overlay/5 hover:text-strong"
      }`}
    >
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 ${
          isActive ? "text-accent" : "text-muted"
        }`}
      />

      <span>{item.label}</span>

      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
      )}
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-default text-primary transition-colors duration-200 hover:bg-overlay/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent xl:hidden"
    >
      <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true">
        <m.span
          animate={
            open
              ? { rotate: 45, y: 6.5 }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.2 }}
          className="h-0.5 w-4 rounded-full bg-current"
        />

        <m.span
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.12 }}
          className="h-0.5 w-4 rounded-full bg-current"
        />

        <m.span
          animate={
            open
              ? { rotate: -45, y: -6.5 }
              : { rotate: 0, y: 0 }
          }
          transition={{ duration: 0.2 }}
          className="h-0.5 w-4 rounded-full bg-current"
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

  // Scroll to the selected section.
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

  // Detect active section and navbar scroll state.
  useEffect(() => {
    let frameId = 0;

    const updateNavigation = () => {
      frameId = 0;

      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 12);

      const sections = NAV_ITEMS.map(({ id }) => {
        const element = document.getElementById(id);

        if (!element) return null;

        return {
          id,
          top: element.getBoundingClientRect().top + currentScroll,
        };
      })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

      if (!sections.length) return;

      const isAtPageBottom =
        window.innerHeight + currentScroll >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const threshold = currentScroll + SCROLL_OFFSET + 24;

      let currentSection = sections[0].id;

      for (const section of sections) {
        if (section.top <= threshold) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActive((previous) =>
        previous === currentSection ? previous : currentSection
      );
    };

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Close mobile menu using Escape or desktop breakpoint.
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

  // Prevent background scrolling while mobile menu is open.
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
    menuButtonRef.current?.focus();
  }, []);

  const handleMobileNavigation = (event, id) => {
    scrollTo(event, id);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-default bg-surface/90 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              : "border-default/70 bg-surface/75 backdrop-blur-lg"
          }`}
        >
          {/* Brand */}
          <Brand onClick={(event) => scrollTo(event, "home")} />

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 xl:flex"
          >
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                active={active}
                onClick={scrollTo}
              />
            ))}
          </nav>

          {/* Desktop Resume */}
          <div className="hidden shrink-0 xl:block">
            <ResumeButton />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <ResumeButton mobile={false} />
            <MenuToggle
              open={open}
              onClick={() => setOpen((previous) => !previous)}
              buttonRef={menuButtonRef}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id="mobile-navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
              className="absolute inset-x-4 top-full mt-3 overflow-hidden rounded-2xl border border-default bg-surface/95 shadow-xl backdrop-blur-xl sm:inset-x-6 xl:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="max-h-[calc(100dvh-6rem)] overflow-y-auto p-3"
              >
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <MobileNavItem
                      key={item.id}
                      item={item}
                      active={active}
                      onClick={handleMobileNavigation}
                    />
                  ))}
                </div>

                <div className="mt-3 border-t border-default pt-3">
                  <ResumeButton
                    mobile
                    onClick={closeMenu}
                  />
                </div>
              </nav>
            </m.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {open && (
          <m.button
            type="button"
            aria-label="Close navigation menu"
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.15 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px] xl:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
