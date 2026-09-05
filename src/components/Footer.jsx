import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter, FaReact } from "react-icons/fa6";
import { SiTailwindcss, SiFramer } from "react-icons/si";
import { FiArrowUp } from "react-icons/fi";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const SOCIALS = [
  {
    icon: FaGithub,
    href: "https://github.com/mehedirobi",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mehedirobii/",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/mehedirobii",
    label: "X",
  },
];

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const STACK = [
  {
    icon: FaReact,
    label: "React",
    className: "text-sky-500 dark:text-sky-400",
  },
  {
    icon: SiTailwindcss,
    label: "Tailwind CSS",
    className: "text-teal-500 dark:text-teal-400",
  },
  {
    icon: SiFramer,
    label: "Framer Motion",
    className: "text-violet-500 dark:text-violet-400",
  },
];

/* -------------------------------------------------------------------------- */
/* Animation                                                                  */
/* -------------------------------------------------------------------------- */

const FOOTER_VIEWPORT = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Back To Top                                                                */
/* -------------------------------------------------------------------------- */

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{
            opacity: 0,
            y: 10,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.9,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            shadow-lg
            shadow-slate-900/10
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-slate-300
            hover:text-slate-950
            active:scale-95
            dark:border-slate-800
            dark:bg-slate-900
            dark:text-slate-300
            dark:shadow-black/30
            dark:hover:border-slate-700
            dark:hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-slate-900/30
            dark:focus-visible:ring-white/30
          "
        >
          <FiArrowUp
            className="h-4 w-4"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* Footer Social Link                                                         */
/* -------------------------------------------------------------------------- */

const SocialLink = ({ icon: Icon, href, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        text-slate-500
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-400
        hover:text-slate-900
        dark:border-slate-800
        dark:text-slate-400
        dark:hover:border-slate-600
        dark:hover:text-white
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-900/30
        dark:focus-visible:ring-white/30
      "
    >
      <Icon
        className="h-[17px] w-[17px]"
        aria-hidden="true"
      />
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <BackToTop />

      <footer
        role="contentinfo"
        className="
          border-t
          border-slate-200
          bg-white
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        {/* Accent */}
        <div
          className="
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-slate-300
            to-transparent
            dark:via-slate-700
          "
          aria-hidden="true"
        />

        <div
          className="
            mx-auto
            max-w-5xl
            px-5
            py-12
            sm:px-6
            sm:py-14
          "
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={FOOTER_VIEWPORT}
            className="flex flex-col items-center"
          >
            {/* ---------------------------------------------------------------- */}
            {/* Brand                                                             */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              variants={fadeUp}
              className="text-center"
            >
              <button
                type="button"
                onClick={() => scrollToSection("home")}
                aria-label="Go to homepage"
                className="
                  rounded-sm
                  text-lg
                  font-semibold
                  tracking-tight
                  text-slate-900
                  transition-opacity
                  duration-200
                  hover:opacity-70
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-slate-900/30
                  dark:text-white
                  dark:focus-visible:ring-white/30
                "
              >
                Mehedi
                <span className="text-slate-400 dark:text-slate-600">
                  {" "}Robi
                </span>
              </button>

              <p
                className="
                  mt-2
                  text-xs
                  tracking-wide
                  text-slate-400
                  dark:text-slate-600
                "
              >
                Frontend Developer · React · MERN Stack
              </p>
            </motion.div>

            {/* ---------------------------------------------------------------- */}
            {/* Navigation                                                        */}
            {/* ---------------------------------------------------------------- */}

            <motion.nav
              variants={fadeUp}
              aria-label="Footer navigation"
              className="
                mt-8
                flex
                flex-wrap
                justify-center
                gap-x-6
                gap-y-3
              "
            >
              {NAV_LINKS.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="
                    rounded-sm
                    text-sm
                    text-slate-500
                    transition-colors
                    duration-150
                    hover:text-slate-950
                    dark:text-slate-500
                    dark:hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-slate-900/30
                    dark:focus-visible:ring-white/30
                  "
                >
                  {label}
                </button>
              ))}
            </motion.nav>

            {/* ---------------------------------------------------------------- */}
            {/* Socials                                                           */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              variants={fadeUp}
              className="mt-7 flex items-center gap-2.5"
            >
              {SOCIALS.map((social) => (
                <SocialLink
                  key={social.label}
                  {...social}
                />
              ))}
            </motion.div>

            {/* ---------------------------------------------------------------- */}
            {/* Divider                                                           */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              variants={fadeUp}
              className="
                my-8
                h-px
                w-full
                bg-gradient-to-r
                from-transparent
                via-slate-200
                to-transparent
                dark:via-slate-800
              "
              aria-hidden="true"
            />

            {/* ---------------------------------------------------------------- */}
            {/* Bottom                                                            */}
            {/* ---------------------------------------------------------------- */}

            <motion.div
              variants={fadeUp}
              className="
                flex
                w-full
                flex-col
                items-center
                justify-between
                gap-4
                sm:flex-row
              "
            >
              {/* Copyright */}
              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-slate-600
                "
              >
                © {currentYear} Mehedi Robi. All rights reserved.
              </p>

              {/* Tech Stack */}
              <div className="flex items-center gap-2">
                <span
                  className="
                    text-xs
                    text-slate-400
                    dark:text-slate-600
                  "
                >
                  Built with
                </span>

                <div
                  className="flex items-center gap-1.5"
                  aria-label="Built with React, Tailwind CSS and Framer Motion"
                >
                  {STACK.map(
                    ({ icon: Icon, label, className }) => (
                      <span
                        key={label}
                        title={label}
                        className={`
                          ${className}
                          transition-opacity
                          duration-200
                          hover:opacity-70
                        `}
                      >
                        <Icon
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}