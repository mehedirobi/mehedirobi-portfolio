import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  m,
  useReducedMotion,
} from "framer-motion";
import {
  FiBookOpen,
  FiCode,
  FiDownload,
  FiFolder,
  FiHome,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

// --------------------------------------------------
// Config
// --------------------------------------------------

// Keep in the same order the sections appear on the page.
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: FiHome },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "education", label: "Education", icon: FiBookOpen },
  { id: "contact", label: "Contact", icon: FiMail },
];

const NAV_IDS = NAV_ITEMS.map(({ id }) => id);

const RESUME_PATH = "/Mehedi_Robi_Resume.pdf";
const RESUME_FILENAME = "Mehedi_Robi_Resume.pdf";

const HEADER_OFFSET = 84; // header height + breathing room
const ACTIVE_LINE_OFFSET = 24; // how far below the header a section becomes "active"
const SCROLL_SETTLE_MS = 150; // wait this long after the last scroll event
const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind `lg`

// --------------------------------------------------
// Shared styles
// --------------------------------------------------

// Symmetrical glass: no horizontal offset, so the left, middle and right pills
// all get the same soft edge on both sides. Layers: hairline ring, tight
// contact shadow, wide ambient shadow, top inner highlight.
const GLASS =
  "pointer-events-auto border border-white/50 bg-white/80 backdrop-blur-xl backdrop-saturate-150 " +
  "shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_2px_8px_rgba(15,23,42,0.06),0_12px_32px_-8px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.8)] " +
  "dark:border-white/10 dark:bg-slate-900/75 " +
  "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_2px_8px_rgba(0,0,0,0.3),0_12px_32px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]";

const GLASS_HOVER =
  "hover:border-accent/30 " +
  "hover:shadow-[0_0_0_1px_rgba(15,23,42,0.05),0_4px_12px_rgba(15,23,42,0.08),0_16px_40px_-8px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] " +
  "dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_12px_rgba(0,0,0,0.35),0_16px_40px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

// --------------------------------------------------
// Hook: active section tracking
// --------------------------------------------------

/**
 * Tracks which section is currently in view.
 * `activateSection(id)` sets the active item immediately and pauses scroll
 * tracking until the programmatic scroll settles, so the highlight doesn't
 * flicker through every section it passes.
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const isLockedRef = useRef(false);
  const releaseTimerRef = useRef(0);

  const scheduleRelease = useCallback(() => {
    window.clearTimeout(releaseTimerRef.current);
    releaseTimerRef.current = window.setTimeout(() => {
      isLockedRef.current = false;
    }, SCROLL_SETTLE_MS);
  }, []);

  const activateSection = useCallback(
    (id) => {
      isLockedRef.current = true;
      setActive(id);
      scheduleRelease(); // fallback in case no scroll happens
    },
    [scheduleRelease]
  );

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      frameId = 0;

      const scrollY = window.scrollY;

      const sections = ids
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return { id, top: element.getBoundingClientRect().top + scrollY };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

      if (!sections.length) return;

      const isAtBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const threshold = scrollY + HEADER_OFFSET + ACTIVE_LINE_OFFSET;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.top <= threshold) current = section.id;
        else break;
      }

      setActive(current);
    };

    const handleScroll = () => {
      if (isLockedRef.current) {
        scheduleRelease(); // still scrolling programmatically
        return;
      }
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
      window.clearTimeout(releaseTimerRef.current);
    };
  }, [ids, scheduleRelease]);

  return [active, activateSection];
}

// --------------------------------------------------
// Left: Brand
// --------------------------------------------------

function Brand({ onClick }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="Mehedi Robi - Home"
      className={`group inline-flex h-12 items-center gap-2.5 justify-self-start rounded-full pl-2 pr-5 transition-[border-color,box-shadow] duration-300 ${GLASS} ${GLASS_HOVER} ${FOCUS_RING}`}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[11px] font-bold tracking-wide text-white shadow-sm shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      >
        MR
      </span>

      <span className="text-base font-bold tracking-tight text-strong">
        Mehedi <span className="text-accent">Robi</span>
      </span>
    </a>
  );
}

// --------------------------------------------------
// Middle: Desktop navigation
// --------------------------------------------------

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <a
      href={`#${item.id}`}
      onClick={(event) => onClick(event, item.id)}
      aria-current={isActive ? "location" : undefined}
      className={`relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors duration-200 ${FOCUS_RING} focus-visible:ring-inset ${
        isActive
          ? "text-accent"
          : "text-muted hover:bg-overlay/5 hover:text-strong"
      }`}
    >
      {isActive && (
        <m.span
          layoutId="navbar-active"
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent/10 ring-1 ring-inset ring-accent/20"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}

      <Icon aria-hidden="true" className="relative z-10 h-4 w-4" />
      <span className="relative z-10">{item.label}</span>
    </a>
  );
}

function DesktopNavigation({ active, onClick }) {
  return (
    <nav
      aria-label="Primary navigation"
      className={`hidden h-12 items-center rounded-full p-1 lg:flex ${GLASS}`}
    >
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <NavItem
              item={item}
              isActive={active === item.id}
              onClick={onClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

// --------------------------------------------------
// Right: Resume download
// --------------------------------------------------

// "header": icon-only below `sm`, labelled from `sm` up
// "menu":   full-width labelled button inside the mobile panel
//
// Colors are explicit (not theme tokens) so the button stays vibrant in both
// themes. Hover goes DEEPER and glows more; it never gets lighter.
function ResumeButton({ variant = "header", onClick }) {
  const isMenu = variant === "menu";

  return (
    <a
      href={RESUME_PATH}
      download={RESUME_FILENAME}
      onClick={onClick}
      className={`group pointer-events-auto relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_6px_20px_-4px_rgba(37,99,235,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_28px_-4px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
        isMenu ? "w-full px-5" : "w-12 sm:w-auto sm:px-5"
      }`}
    >
      {/* Deeper gradient fades in on hover (opacity only, so no color banding or washed-out frames) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Light sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[450%] group-hover:opacity-100 motion-reduce:hidden"
      />

      <FiDownload
        aria-hidden="true"
        className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0"
      />
      <span
        className={`relative z-10 ${isMenu ? "" : "sr-only sm:not-sr-only"}`}
      >
        Download Resume
      </span>
    </a>
  );
}

// --------------------------------------------------
// Mobile: navigation item
// --------------------------------------------------

function MobileNavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <a
      href={`#${item.id}`}
      onClick={(event) => onClick(event, item.id)}
      aria-current={isActive ? "location" : undefined}
      className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors duration-200 ${FOCUS_RING} focus-visible:ring-inset ${
        isActive
          ? "bg-accent/10 text-accent"
          : "text-primary hover:bg-overlay/5"
      }`}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      <span>{item.label}</span>

      {isActive && (
        <span
          aria-hidden="true"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
        />
      )}
    </a>
  );
}

// --------------------------------------------------
// Mobile: menu toggle
// --------------------------------------------------

function MenuToggle({ open, onClick, buttonRef, controlsId }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={controlsId}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-primary transition-[color,border-color,box-shadow] duration-200 hover:text-accent lg:hidden ${GLASS} ${GLASS_HOVER} ${FOCUS_RING}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={open ? "close" : "menu"}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="inline-flex"
        >
          {open ? (
            <FiX aria-hidden="true" className="h-5 w-5" />
          ) : (
            <FiMenu aria-hidden="true" className="h-5 w-5" />
          )}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

// --------------------------------------------------
// Main Navbar
// --------------------------------------------------

export default function Navbar() {
  const menuId = useId();
  const menuButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, activateSection] = useActiveSection(NAV_IDS);

  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      const section = document.getElementById(id);
      if (!section) return;

      activateSection(id);

      const top =
        section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [activateSection, reduceMotion]
  );

  const handleNavClick = useCallback(
    (event, id) => {
      event.preventDefault();
      scrollToSection(id);
      if (open) closeMenu();
    },
    [scrollToSection, open, closeMenu]
  );

  // Close the mobile menu when the viewport reaches the desktop layout
  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const handleChange = (event) => {
      if (event.matches) setOpen(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // While the menu is open: lock background scroll and close on Escape
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeMenu]);

  return (
    // Respects the user's "reduce motion" setting for all animations below
    <MotionConfig reducedMotion="user">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        {/* Flex on mobile, 3-column grid on desktop so the nav is truly centered */}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Brand onClick={(event) => handleNavClick(event, "home")} />

          <DesktopNavigation active={active} onClick={handleNavClick} />

          <div className="flex items-center justify-end gap-2 lg:justify-self-end">
            <ResumeButton />
            <MenuToggle
              open={open}
              onClick={() => setOpen((previous) => !previous)}
              buttonRef={menuButtonRef}
              controlsId={menuId}
            />
          </div>

          {/* Mobile / tablet menu */}
          <AnimatePresence>
            {open && (
              <m.div
                id={menuId}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={`absolute right-0 top-full mt-3 w-full origin-top-right rounded-3xl p-3 sm:w-80 lg:hidden ${GLASS}`}
              >
                <nav
                  aria-label="Mobile navigation"
                  className="max-h-[calc(100dvh-7rem)] overflow-y-auto"
                >
                  <ul className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.id}>
                        <MobileNavItem
                          item={item}
                          isActive={active === item.id}
                          onClick={handleNavClick}
                        />
                      </li>
                    ))}
                  </ul>

                  {/* The header button is icon-only on small phones, so repeat it with a label */}
                  <div className="mt-3 border-t border-default pt-3 sm:hidden">
                    <ResumeButton variant="menu" onClick={closeMenu} />
                  </div>
                </nav>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile backdrop (decorative; Escape and the toggle are the keyboard paths) */}
      <AnimatePresence>
        {open && (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-slate-950/20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}