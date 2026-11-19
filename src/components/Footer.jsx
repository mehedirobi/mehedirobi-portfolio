import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, m, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp, FiMail } from "react-icons/fi";

// --------------------------------------------------
// Config & content
// --------------------------------------------------

const HEADER_OFFSET = 84; // keep in sync with Navbar.jsx
const BACK_TO_TOP_THRESHOLD = 500;

// Same ids and order as the Navbar
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/mehedirobi",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehedirobii/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: "mailto:mehedirobidev@gmail.com",
    icon: FiMail,
  },
];

// --------------------------------------------------
// Shared styles (kept in sync with Navbar, Hero, Contact)
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

const EASE = [0.22, 1, 0.36, 1];

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function useSectionScroll() {
  const reduceMotion = useReducedMotion();

  return (event, id) => {
    event.preventDefault();

    const behavior = reduceMotion ? "auto" : "smooth";

    if (id === "home") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: Math.max(0, top), behavior });
  };
}

// --------------------------------------------------
// Pieces
// --------------------------------------------------

function Brand({ onClick }) {
  return (
    <a
      href="#home"
      onClick={(event) => onClick(event, "home")}
      aria-label="Mehedi Robi - Back to top"
      className={`group inline-flex items-center gap-2.5 rounded-full ${FOCUS_RING}`}
    >
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-[11px] font-bold tracking-wide text-white shadow-sm shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      >
        MR
      </span>

      <span className="text-base font-bold tracking-tight text-strong">
        Mehedi <span className="text-accent">Robi</span>
      </span>
    </a>
  );
}

function FooterNav({ onNavigate }) {
  return (
    <nav aria-label="Footer navigation">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {NAV_LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(event) => onNavigate(event, id)}
              className={`relative rounded-sm py-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-strong after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none ${FOCUS_RING}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinks() {
  return (
    <ul aria-label="Social links" className="flex items-center gap-2.5">
      {SOCIALS.map(({ label, href, icon: Icon }) => {
        const isExternal = !href.startsWith("mailto:");

        return (
          <li key={label}>
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={
                isExternal
                  ? `Visit my ${label} profile (opens in a new tab)`
                  : "Send me an email"
              }
              title={label}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-default bg-canvas text-muted shadow-sm transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
            >
              <Icon aria-hidden="true" className="h-[17px] w-[17px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function BackToTop({ onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Same-value updates are ignored by React, so this only re-renders when it flips
    const update = () => setVisible(window.scrollY > BACK_TO_TOP_THRESHOLD);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(event) => onClick(event, "home")}
          aria-label="Back to top"
          className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-default bg-surface text-primary shadow-lg shadow-slate-900/10 transition-[border-color,background-color,color,box-shadow] duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-xl motion-reduce:transition-none sm:right-6 ${FOCUS_RING}`}
        >
          <FiArrowUp aria-hidden="true" className="h-[18px] w-[18px]" />
        </m.button>
      )}
    </AnimatePresence>
  );
}

// --------------------------------------------------
// Main Footer
// --------------------------------------------------

export default function Footer() {
  const scrollToSection = useSectionScroll();
  const currentYear = new Date().getFullYear();

  return (
    <MotionConfig reducedMotion="user">
      <BackToTop onClick={scrollToSection} />

      <footer className="relative border-t border-default bg-surface">
        {/* Subtle brand hairline along the top edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />

        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8"
        >
          {/* Top row: brand | navigation | socials */}
          <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Brand onClick={scrollToSection} />
              <p className="text-xs tracking-wide text-muted">
                Aspiring Software Engineer
              </p>
            </div>

            <FooterNav onNavigate={scrollToSection} />

            <div className="md:justify-self-end">
              <SocialLinks />
            </div>
          </div>

          {/* Bottom row: copyright */}
          <div className="mt-8 border-t border-default pt-6 text-center">
            <p className="text-xs leading-5 text-muted">
              &copy; {currentYear} Mehedi Robi. All rights reserved.
            </p>
          </div>
        </m.div>
      </footer>
    </MotionConfig>
  );
}