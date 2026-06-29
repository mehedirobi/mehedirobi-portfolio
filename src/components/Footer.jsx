import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter, FaReact } from "react-icons/fa6";
import { SiTailwindcss, SiFramer } from "react-icons/si";
import { FiArrowUp } from "react-icons/fi";

// ─── Data 

const SOCIALS = [
  { icon: FaGithub,   href: "https://github.com/mehedirobi",            label: "GitHub"   },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedirobii/", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/mehedirobii",                label: "X"        },
];

const NAV_LINKS = [
  { label: "About",       id: "about"      },
  { label: "Projects",    id: "projects"   },
  { label: "Experience",  id: "experience" },
  { label: "Contact",     id: "contact"    },
];

const STACK = [
  { icon: FaReact,       label: "React",         color: "text-sky-500 dark:text-sky-400"     },
  { icon: SiTailwindcss, label: "Tailwind CSS",   color: "text-teal-500 dark:text-teal-400"   },
  { icon: SiFramer,      label: "Framer Motion",  color: "text-violet-500 dark:text-violet-400" },
];

// ─── Animations 

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── BackToTop 

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.85, y: 8  }}
          transition={{ duration: 0.2 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="
            fixed bottom-6 right-6 z-50
            w-10 h-10 flex items-center justify-center
            rounded-xl
            bg-slate-900 text-white
            dark:bg-white dark:text-slate-900
            hover:opacity-80 active:scale-95
            transition-all duration-200
            shadow-lg shadow-slate-900/20 dark:shadow-black/30
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
          "
        >
          <FiArrowUp className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ─── Footer 

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <BackToTop />

      <footer
        role="contentinfo"
        className="
          border-t border-slate-200 dark:border-slate-800
          bg-slate-50/80 dark:bg-slate-950
        "
      >
        {/* Top gradient accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-8"
          >

            {/* ── Brand + tagline ── */}
            <motion.div variants={fadeUp} className="text-center space-y-2">
              <button
                onClick={() => scrollTo("home")}
                className="
                  text-lg font-semibold tracking-tight
                  text-slate-900 dark:text-white
                  hover:opacity-70 transition-opacity
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
                  rounded-sm
                "
                aria-label="Back to top"
              >
                Mehedi<span className="text-slate-400 dark:text-slate-600"> Robi</span>
              </button>

              <p className="text-xs text-slate-400 dark:text-slate-600 tracking-wide">
                Frontend Developer · React · MERN Stack
              </p>

              {/* Availability indicator */}
              
            </motion.div>

            {/* ── Nav links ── */}
            <motion.nav
              variants={fadeUp}
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="
                    text-sm text-slate-500 dark:text-slate-500
                    hover:text-slate-900 dark:hover:text-white
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
                    rounded-sm
                  "
                >
                  {label}
                </button>
              ))}
            </motion.nav>

            {/* ── Socials ── */}
            <motion.div variants={fadeUp} className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="
                    h-9 w-9 flex items-center justify-center rounded-xl
                    border border-slate-200 dark:border-slate-800
                    text-slate-500 dark:text-slate-400
                    hover:border-slate-400 dark:hover:border-slate-600
                    hover:text-slate-900 dark:hover:text-white
                    hover:-translate-y-0.5
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
                  "
                >
                  <Icon className="w-[17px] h-[17px]" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* ── Divider ── */}
            <motion.div
              variants={fadeUp}
              className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800"
              aria-hidden="true"
            />

            {/* ── Bottom meta ── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:justify-between w-full"
            >
              {/* Copyright */}
              <p className="text-xs text-slate-400 dark:text-slate-600 order-2 sm:order-1">
                © {year} Mehedi Robi. All rights reserved.
              </p>

              {/* Built with stack icons */}
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <span className="text-xs text-slate-400 dark:text-slate-600">
                  Built with
                </span>
                <div className="flex items-center gap-1.5">
                  {STACK.map(({ icon: Icon, label, color }) => (
                    <span
                      key={label}
                      title={label}
                      aria-label={label}
                      className={`transition-opacity duration-200 hover:opacity-70 ${color}`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </footer>
    </>
  );
}