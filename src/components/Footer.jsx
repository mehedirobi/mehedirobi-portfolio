import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialLinks = [
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          
          {/* Name */}
          <div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              Mehedi Robi
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Frontend Developer
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Bottom text */}
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <p>© {year} Mehedi Robi. All rights reserved.</p>
            <p>Built with React, Tailwind CSS & Framer Motion</p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
}