import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlineDownload,
} from "react-icons/hi";
import { OptimizedImage } from "./UI";

/**
 * DATA (same file, scalable)
 */
const HERO = {
  name: "Mehedi",
  role: "Frontend Developer",

  headline:
    "I build fast, scalable and clean web applications with modern frontend architecture.",

  description:
    "Focused on performance, UI engineering, and production-ready React systems.",

  resume: "/resume.pdf",

  socials: [
    { href: "https://github.com/mehedirobi", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/mehedirobii/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "mailto:mehedirobidev@gmail.com", icon: HiOutlineMail, label: "Email" },
  ],
};

/**
 * Animation presets
 */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 via-transparent to-violet-100/20 dark:from-sky-500/10 dark:to-violet-500/10" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 items-center gap-14">

        {/* LEFT */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="space-y-6"
        >

          {/* ROLE BADGE */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center px-3 py-1 text-xs rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {HERO.role}
          </motion.span>

          {/* NAME */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 dark:text-white leading-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              {HERO.name}
            </span>
          </motion.h1>

          {/* HEADLINE */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-xl"
          >
            {HERO.headline}
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-slate-500 dark:text-slate-400 max-w-lg"
          >
            {HERO.description}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">

            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              View Projects
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>

            <a
              href={HERO.resume}
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Resume
              <HiOutlineDownload className="w-4 h-4" />
            </a>

          </motion.div>

          {/* SOCIALS */}
          <motion.div variants={fadeUp} className="flex gap-3 pt-3">
            {HERO.socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 hover:text-black dark:hover:text-white transition"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">

            {/* GLOW */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-violet-400/20 blur-3xl" />

            {/* IMAGE */}
<div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-800">
  <OptimizedImage
    src="/mehedirobi.png"
    alt={HERO.name}
    className="h-full w-full object-cover"
  />
</div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}