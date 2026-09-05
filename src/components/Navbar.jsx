import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FiSend } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const HEADER_HEIGHT = 64;

// ------------------------------------------------------
// Scroll Progress
// ------------------------------------------------------

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "left",
      }}
      className="
        absolute
        bottom-0
        left-0
        right-0
        z-10
        h-px
        bg-gradient-to-r
        from-violet-500
        via-blue-500
        to-cyan-400
        dark:from-violet-400
        dark:via-blue-400
        dark:to-cyan-300
      "
    />
  );
};

// ------------------------------------------------------
// Desktop Navigation Item
// ------------------------------------------------------

const NavItem = ({ id, label, active, onClick }) => {
  const isActive = active === id;

  return (
    <button
      type="button"
      onClick={(event) => onClick(event, id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        relative
        rounded-full
        px-3
        py-1.5
        text-[13px]
        font-medium
        tracking-[-0.01em]
        transition-colors
        duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/40
        dark:focus-visible:ring-violet-400/40

        ${
          isActive
            ? "text-white dark:text-slate-950"
            : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        }
      `}
    >
      {isActive && (
        <motion.span
          layoutId="navbar-active-pill"
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 32,
          }}
          className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-r
            from-violet-600
            to-blue-600
            dark:from-violet-400
            dark:to-blue-400
          "
        />
      )}

      <span className="relative z-10">{label}</span>
    </button>
  );
};

// ------------------------------------------------------
// Mobile Navigation Item
// ------------------------------------------------------

const MobileNavItem = ({
  id,
  label,
  active,
  onClick,
  index,
  reduceMotion,
}) => {
  const isActive = active === id;

  return (
    <motion.button
      type="button"
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: -8,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              delay: index * 0.025,
              duration: 0.2,
              ease: "easeOut",
            }
      }
      onClick={(event) => onClick(event, id)}
      aria-current={isActive ? "page" : undefined}
      className={`
        group
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-2.5
        text-left
        text-sm
        font-medium
        transition-colors
        duration-200

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/40
        dark:focus-visible:ring-violet-400/40

        ${
          isActive
            ? "bg-violet-500/[0.08] text-violet-600 dark:bg-violet-400/[0.08] dark:text-violet-400"
            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
        }
      `}
    >
      <span
        aria-hidden="true"
        className={`
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          transition-all
          duration-200

          ${
            isActive
              ? "scale-100 bg-violet-500 dark:bg-violet-400"
              : "scale-75 bg-slate-300 group-hover:scale-100 dark:bg-slate-700"
          }
        `}
      />

      <span>{label}</span>
    </motion.button>
  );
};

// ------------------------------------------------------
// Hire Me Button
// ------------------------------------------------------

const HireMeButton = ({
  onClick,
  className = "",
  reduceMotion = false,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{
        duration: 0.15,
      }}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        bg-gradient-to-r
        from-violet-600
        to-blue-600
        px-4
        py-2
        text-sm
        font-semibold
        text-white

        shadow-md
        shadow-violet-500/20

        transition-[box-shadow,transform]
        duration-200

        hover:shadow-lg
        hover:shadow-violet-500/25

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/40
        focus-visible:ring-offset-2
        focus-visible:ring-offset-white

        dark:from-violet-500
        dark:to-blue-500
        dark:shadow-violet-500/15
        dark:focus-visible:ring-violet-400/40
        dark:focus-visible:ring-offset-slate-950

        ${className}
      `}
      aria-label="Go to contact section"
    >
      <FiSend
        className="h-3.5 w-3.5"
        aria-hidden="true"
      />

      <span>Hire Me</span>
    </motion.button>
  );
};

// ------------------------------------------------------
// Hamburger
// ------------------------------------------------------

const Hamburger = ({ open }) => {
  return (
    <div
      className="flex h-4 w-5 flex-col justify-center gap-[5px]"
      aria-hidden="true"
    >
      <motion.span
        animate={
          open
            ? {
                rotate: 45,
                y: 6.5,
              }
            : {
                rotate: 0,
                y: 0,
              }
        }
        transition={{
          duration: 0.22,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="h-px w-5 origin-center rounded-full bg-current"
      />

      <motion.span
        animate={
          open
            ? {
                opacity: 0,
                scaleX: 0,
              }
            : {
                opacity: 1,
                scaleX: 1,
              }
        }
        transition={{
          duration: 0.16,
        }}
        className="h-px w-5 rounded-full bg-current"
      />

      <motion.span
        animate={
          open
            ? {
                rotate: -45,
                y: -6.5,
              }
            : {
                rotate: 0,
                y: 0,
              }
        }
        transition={{
          duration: 0.22,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="h-px w-5 origin-center rounded-full bg-current"
      />
    </div>
  );
};

// ------------------------------------------------------
// Navbar
// ------------------------------------------------------

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const previousOverflow = useRef("");
  const scrollAnimationRef = useRef(null);

  const reduceMotion = useReducedMotion();

  // ----------------------------------------------------
  // Smooth section navigation
  // ----------------------------------------------------

  const scrollTo = useCallback(
    (event, id) => {
      event?.preventDefault();

      const element = document.getElementById(id);

      if (!element) {
        setOpen(false);
        return;
      }

      // Cancel any previous scroll animation
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }

      const targetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        HEADER_HEIGHT -
        16;

      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const absoluteDistance = Math.abs(distance);

      // Close menu and update active state immediately
      setOpen(false);
      setActive(id);

      // Respect reduced motion preference
      if (reduceMotion || absoluteDistance < 4) {
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "auto",
        });

        return;
      }

      /*
       * Professional adaptive duration:
       *
       * Short distance  → ~420ms
       * Medium distance → ~600ms
       * Long distance   → ~760ms max
       *
       * This avoids both the "instant jump" and
       * the slow/laggy feeling.
       */
      const duration = Math.min(
        760,
        Math.max(
          420,
          420 + absoluteDistance * 0.18
        )
      );

      const startTime = performance.now();

      // Smooth ease-in-out cubic curve
      const easeInOutCubic = (progress) => {
        if (progress < 0.5) {
          return 4 * progress * progress * progress;
        }

        return (
          1 -
          Math.pow(-2 * progress + 2, 3) / 2
        );
      };

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const easedProgress =
          easeInOutCubic(progress);

        const currentPosition =
          startPosition +
          distance * easedProgress;

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          scrollAnimationRef.current =
            requestAnimationFrame(
              animateScroll
            );
        } else {
          scrollAnimationRef.current = null;
        }
      };

      scrollAnimationRef.current =
        requestAnimationFrame(animateScroll);
    },
    [reduceMotion]
  );

  // ----------------------------------------------------
  // Cleanup scroll animation
  // ----------------------------------------------------

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(
          scrollAnimationRef.current
        );
      }
    };
  }, []);

  // ----------------------------------------------------
  // Active section detection
  // ----------------------------------------------------

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visibleSections[0]) {
          setActive(
            visibleSections[0].target.id
          );
        }
      },
      {
        root: null,
        rootMargin: `-${HEADER_HEIGHT + 20}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  // ----------------------------------------------------
  // Navbar scroll state
  // ----------------------------------------------------

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });

        ticking = true;
      }
    };

    updateScrollState();

    window.addEventListener(
      "scroll",
      updateScrollState,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScrollState
      );
    };
  }, []);

  // ----------------------------------------------------
  // Escape key
  // ----------------------------------------------------

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  // ----------------------------------------------------
  // Body scroll lock
  // ----------------------------------------------------

  useEffect(() => {
    if (open) {
      previousOverflow.current =
        document.body.style.overflow;

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow =
        previousOverflow.current;
    }

    return () => {
      document.body.style.overflow =
        previousOverflow.current;
    };
  }, [open]);

  return (
    <>
      {/* ==================================================
          Header
      ================================================== */}

      <motion.header
        ref={headerRef}
        initial={
          reduceMotion
            ? false
            : {
                y: -16,
                opacity: 0,
              }
        }
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              }
        }
        role="banner"
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          h-16

          border-b

          bg-white/80
          backdrop-blur-xl
          backdrop-saturate-150

          dark:bg-slate-950/80

          transition-[border-color,box-shadow]
          duration-300

          ${
            scrolled
              ? "border-slate-200/70 shadow-sm shadow-slate-900/[0.04] dark:border-slate-800/70 dark:shadow-black/20"
              : "border-transparent"
          }
        `}
      >
        {/* Scroll Progress */}
        <ScrollProgress />

        <div
          className="
            mx-auto
            flex
            h-full
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* ==================================================
              Logo
          ================================================== */}

          <button
            type="button"
            onClick={(event) =>
              scrollTo(event, "home")
            }
            aria-label="Go to home section"
            className="
              shrink-0
              rounded-sm
              text-xl
              font-bold
              tracking-tight

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500/40
              focus-visible:ring-offset-4
              focus-visible:ring-offset-white

              dark:focus-visible:ring-violet-400/40
              dark:focus-visible:ring-offset-slate-950
            "
          >
            <span className="text-slate-950 dark:text-white">
              Mehedi
            </span>

            <span
              className="
                bg-gradient-to-r
                from-violet-600
                to-blue-500
                bg-clip-text
                text-transparent

                dark:from-violet-400
                dark:to-blue-400
              "
            >
              Robi
            </span>
          </button>

          {/* ==================================================
              Desktop Navigation
          ================================================== */}

          <nav
            aria-label="Primary navigation"
            className="
              hidden
              xl:flex
              items-center
              gap-0.5
            "
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

          {/* ==================================================
              Desktop Actions
          ================================================== */}

          <div
            className="
              hidden
              xl:flex
              items-center
              gap-3
            "
          >
            <ThemeToggle />

            <HireMeButton
              onClick={(event) =>
                scrollTo(event, "contact")
              }
              reduceMotion={reduceMotion}
            />
          </div>

          {/* ==================================================
              Mobile / Tablet Controls
          ================================================== */}

          <div
            className="
              flex
              items-center
              gap-1.5
              xl:hidden
            "
          >
            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                setOpen((previous) => !previous)
              }
              aria-label={
                open
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="
                rounded-lg
                p-2
                text-slate-700

                transition-colors
                duration-200

                hover:bg-slate-100
                dark:text-slate-300
                dark:hover:bg-slate-800/70

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/40

                dark:focus-visible:ring-violet-400/40
              "
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>

        {/* ==================================================
            Mobile / Tablet Menu
        ================================================== */}

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              role="navigation"
              aria-label="Mobile navigation"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }
              }
              className="
                border-t
                border-slate-200/60
                bg-white/80
                backdrop-blur-xl

                dark:border-slate-800/60
                dark:bg-slate-950/80

                xl:hidden
              "
            >
              <div
                className="
                  mx-auto
                  max-w-7xl
                  px-4
                  py-3
                  sm:px-6
                  lg:px-8
                "
              >
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white/95

                    shadow-xl
                    shadow-slate-900/[0.08]

                    dark:border-slate-800/80
                    dark:bg-slate-950/95
                    dark:shadow-black/30
                  "
                >
                  {/* Navigation Links */}

                  <div className="flex flex-col gap-0.5 p-2">
                    {NAV_ITEMS.map((item, index) => (
                      <MobileNavItem
                        key={item.id}
                        {...item}
                        active={active}
                        onClick={scrollTo}
                        index={index}
                        reduceMotion={reduceMotion}
                      />
                    ))}
                  </div>

                  {/* CTA */}

                  <div
                    className="
                      border-t
                      border-slate-100
                      px-3
                      pb-3
                      pt-3

                      dark:border-slate-800/70
                    "
                  >
                    <HireMeButton
                      onClick={(event) =>
                        scrollTo(event, "contact")
                      }
                      className="w-full"
                      reduceMotion={reduceMotion}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ==================================================
          Mobile Backdrop
      ================================================== */}

      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={
              reduceMotion
                ? false
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.18,
            }}
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-x-0
              bottom-0
              top-16
              z-40
              cursor-default

              bg-slate-950/20
              backdrop-blur-[2px]

              dark:bg-slate-950/55

              xl:hidden
            "
          />
        )}
      </AnimatePresence>
    </>
  );
}