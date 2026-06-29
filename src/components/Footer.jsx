import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { icon: FaGithub,   href: "https://github.com/mehedirobi",             label: "GitHub"   },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedirobii/",  label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/mehedirobii",                 label: "X"        },
];

const NAV_LINKS = [
  { label: "About",       id: "about"          },
  { label: "Projects",    id: "projects"       },
  { label: "Experience",  id: "experience"     },
  { label: "Contact",     id: "contact"        },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      className="border-t border-slate-200 dark:border-slate-800
                 bg-slate-50/80 dark:bg-slate-950"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-8"
        >

          {/* Brand */}
          <motion.div variants={fadeUp} className="text-center space-y-1.5">
            <button
              onClick={() => scrollTo("home")}
              className="text-lg font-semibold tracking-tight
                         text-slate-900 dark:text-white
                         hover:opacity-70 transition-opacity
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
                         rounded-sm"
              aria-label="Back to top"
            >
              Mehedi<span className="text-slate-400 dark:text-slate-600"> Robi</span>
            </button>

            <p className="text-xs text-slate-400 dark:text-slate-600 tracking-wide">
              Frontend Developer · React · Next.js · Full Stack
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            variants={fadeUp}
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-slate-500 dark:text-slate-500
                           hover:text-slate-900 dark:hover:text-white
                           transition-colors duration-150
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
                           rounded-sm"
              >
                {label}
              </button>
            ))}
          </motion.nav>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex gap-2.5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-xl
                           border border-slate-200 dark:border-slate-800
                           text-slate-500 dark:text-slate-400
                           hover:border-slate-400 dark:hover:border-slate-600
                           hover:text-slate-900 dark:hover:text-white
                           hover:-translate-y-0.5
                           transition-all duration-200
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30"
              >
                <Icon className="w-[17px] h-[17px]" aria-hidden="true" />
              </a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent
                       dark:via-slate-800"
            aria-hidden="true"
          />

          {/* Meta */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4
                       text-xs text-slate-400 dark:text-slate-600"
          >
            <span>© {year} Mehedi Robi. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-800" aria-hidden="true">·</span>
            <span>Built with React, Tailwind CSS & Framer Motion</span>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  );
}