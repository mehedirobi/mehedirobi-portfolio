import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

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

const SocialIcon = ({ icon: Icon, href, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        h-10 w-10 flex items-center justify-center
        rounded-lg border border-slate-200 dark:border-slate-800
        text-slate-600 dark:text-slate-300
        hover:bg-slate-900 hover:text-white
        dark:hover:bg-white dark:hover:text-slate-900
        transition-colors duration-300
      "
    >
      <Icon className="h-5 w-5" />
    </a>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">

      <div className="mx-auto max-w-6xl px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-6"
        >

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              Mehedi Robi
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Frontend Developer • React • Next.js • Full Stack Learner
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex justify-center gap-4">
            {SOCIALS.map((item) => (
              <SocialIcon key={item.label} {...item} />
            ))}
          </div>

          {/* DIVIDER */}
          <div className="h-px w-full bg-slate-200 dark:bg-slate-800" />

          {/* META */}
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>© {year} Mehedi Robi. All rights reserved.</p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
}