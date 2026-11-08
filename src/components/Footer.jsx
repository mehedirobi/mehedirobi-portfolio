import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp, FiMail } from "react-icons/fi";

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

function scrollToSection(id, reduceMotion) {
  const target = document.getElementById(id);

  if (!target) return;

  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

function BackToTop({ reduceMotion }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > 500);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <m.button
      type="button"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      onClick={() => scrollToSection("home", reduceMotion)}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-default bg-surface text-primary shadow-lg shadow-slate-900/10 transition-colors hover:border-violet-400/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <FiArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
    </m.button>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop reduceMotion={reduceMotion} />

      <footer className="border-t border-default bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="flex flex-col items-center gap-5 text-center">
            <button
              type="button"
              onClick={() => scrollToSection("home", reduceMotion)}
              aria-label="Back to homepage"
              className="rounded-sm text-lg font-bold tracking-tight text-strong transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Mehedi <span className="text-accent">Robi</span>
            </button>

            <p className="text-xs tracking-wide text-muted">Aspiring Software Engineer</p>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${label} profile`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-default bg-surface text-muted transition-colors hover:border-violet-400/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                </a>
              ))}
            </div>

            <p className="text-xs leading-5 text-muted">
              © {currentYear} Mehedi Robi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}