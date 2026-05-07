import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineArrowRight, HiOutlineDownload } from "react-icons/hi";
import { OptimizedImage } from "./UI";

const socials = [
  { href: "https://github.com/mehedirobi", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mehedirobii/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "mailto:mehedirobidev@gmail.com", icon: HiOutlineMail, label: "Email" },
];

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/30 via-transparent to-violet-100/20 dark:from-sky-500/10 dark:to-violet-500/10" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 items-center gap-14">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 text-xs rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            Frontend Developer • React
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-950 dark:text-white">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
              Mehedi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            I build fast, scalable and clean web applications with modern frontend architecture.
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg">
            Focused on performance, UI engineering, and production-ready React systems.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={scrollToProjects}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              View Projects
              <HiOutlineArrowRight className="w-4 h-4" />
            </button>

            <a
              href="resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition"
            >
              Resume
              <HiOutlineDownload className="w-4 h-4" />
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3 pt-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 hover:text-black dark:hover:text-white transition"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-violet-400/20 blur-3xl" />

            {/* Image frame */}
            <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <OptimizedImage
                src="https://i.ibb.co/yn3q9rhd/mehedirobi.png"
                alt="Mehedi Hasan"
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}