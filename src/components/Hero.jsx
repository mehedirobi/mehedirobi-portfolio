import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineArrowRight, HiOutlineDownload } from "react-icons/hi";
import { OptimizedImage } from "./UI";

const socials = [
  {
    href: "https://github.com/mehedirobi",
    icon: FaGithub,
    label: "GitHub",
    color: "text-black dark:text-white",
    hover: "hover:bg-slate-100 dark:hover:bg-slate-800",
  },
  {
    href: "https://www.linkedin.com/in/mehedirobii/",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "text-[#0A66C2]",
    hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    href: "mailto:mehedirobidev@gmail.com",
    icon: HiOutlineMail,
    label: "Email",
    color: "text-slate-700 dark:text-slate-200",
    hover: "hover:bg-slate-100 dark:hover:bg-slate-800",
  },
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
      className="relative overflow-hidden bg-white dark:bg-slate-950"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 via-transparent to-violet-100/30 dark:from-sky-500/10 dark:to-violet-500/10" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            <h1 className="text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
                Mehedi
              </span>
            </h1>

            <h2 className="text-lg text-slate-600 dark:text-slate-300 sm:text-xl lg:text-2xl">
              Building clean, scalable & high-performance web interfaces.
            </h2>

            <p className="max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
              I specialize in React, Tailwind CSS, and modern frontend engineering.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={scrollToProjects}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-violet-500 hover:scale-[1.03] transition"
              >
                View Projects
                <HiOutlineArrowRight className="h-4 w-4" />
              </button>

              <a
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:scale-[1.03] transition"
              >
                Resume
                <HiOutlineDownload className="h-4 w-4" />
              </a>
            </div>

            {/* SOCIALS - FIXED CENTER ALIGN */}
            <div className="w-full flex justify-center lg:justify-start pt-4">
              <div className="flex items-center justify-center gap-4">
                {socials.map(({ href, icon: Icon, label, color, hover }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`group flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${hover}`}
                  >
                    <Icon
                      className={`h-6 w-6 ${color} transition-transform duration-300 group-hover:scale-110`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-violet-400/20 blur-2xl" />

              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-slate-800">
                <OptimizedImage
                  src="https://i.ibb.co/yn3q9rhd/mehedirobi.png"
                  alt="Mehedi Hasan"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}