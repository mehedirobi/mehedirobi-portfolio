import { useEffect, useState } from "react";
import {
  AnimatePresence,
  m,
  useReducedMotion,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaXTwitter,
} from "react-icons/fa6";
import { SiTailwindcss, SiFramer } from "react-icons/si";
import { FiArrowUp } from "react-icons/fi";

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
    label: "X",
    href: "https://x.com/mehedirobii",
    icon: FaXTwitter,
  },
];

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const STACK = [
  { label: "React", icon: FaReact, color: "text-sky-500" },
  {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-teal-500",
  },
  {
    label: "Framer Motion",
    icon: SiFramer,
    color: "text-accent",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

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
    let ticking = false;

    const updateVisibility = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 500);
        ticking = false;
      });
    };

    updateVisibility();

    window.addEventListener("scroll", updateVisibility, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8, scale: 0.95 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 8, scale: 0.95 }
          }
          transition={{ duration: 0.18 }}
          onClick={() => scrollToSection("home", reduceMotion)}
          aria-label="Back to top"
          title="Back to top"
          className="
            fixed bottom-5 right-5 z-50
            flex h-11 w-11 items-center justify-center
            rounded-xl border border-default
            bg-surface text-primary shadow-lg shadow-slate-900/10
            transition-colors hover:border-violet-400/40
            hover:bg-accent/10 hover:text-accent
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent focus-visible:ring-offset-2
            sm:bottom-6 sm:right-6
          "
        >
          <FiArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}

function SocialLink({ label, href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit my ${label} profile`}
      title={label}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl border border-default bg-surface
        text-muted transition-colors duration-200
        hover:border-violet-400/40 hover:bg-accent/10
        hover:text-accent
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent
      "
    >
      <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
    </a>
  );
}

function FooterNavigation({ reduceMotion }) {
  return (
    <nav
      aria-label="Footer navigation"
      className="flex flex-wrap justify-center gap-x-5 gap-y-3 sm:gap-x-7"
    >
      {NAV_LINKS.map(({ label, id }) => (
        <button
          key={id}
          type="button"
          onClick={() => scrollToSection(id, reduceMotion)}
          className="
            rounded-sm text-sm text-muted
            transition-colors hover:text-accent
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-accent
          "
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

function BuiltWith() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted">Built with</span>

      <div className="flex items-center gap-2">
        {STACK.map(({ label, icon: Icon, color }) => (
          <span
            key={label}
            title={label}
            className={`${color} transition-opacity hover:opacity-70`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop reduceMotion={reduceMotion} />

      <footer className="border-t border-default bg-surface">
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-violet-300 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12">
          <m.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Brand */}
            <m.div variants={fadeUp} className="text-center">
              <button
                type="button"
                onClick={() => scrollToSection("home", reduceMotion)}
                aria-label="Back to homepage"
                className="
                  rounded-sm text-lg font-bold tracking-tight
                  text-strong transition-colors
                  hover:text-accent
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-accent
                "
              >
                Mehedi <span className="text-accent">Robi</span>
              </button>

              <p className="mt-2 text-xs tracking-wide text-muted">
                MERN Stack Developer
              </p>
            </m.div>

            {/* Navigation */}
            <m.div variants={fadeUp} className="mt-7 w-full">
              <FooterNavigation reduceMotion={reduceMotion} />
            </m.div>

            {/* Social links */}
            <m.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-2.5"
            >
              {SOCIALS.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </m.div>

            {/* Divider */}
            <m.div
              variants={fadeUp}
              className="my-7 h-px w-full bg-surface-raised"
              aria-hidden="true"
            />

            {/* Footer bottom */}
            <m.div
              variants={fadeUp}
              className="
                flex w-full flex-col items-center gap-4
                text-center sm:flex-row sm:justify-between
              "
            >
              <p className="text-xs leading-5 text-muted">
                © {currentYear} Mehedi Robi. All rights reserved.
              </p>

              <BuiltWith />
            </m.div>
          </m.div>
        </div>
      </footer>
    </>
  );
}