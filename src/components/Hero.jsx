import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineArrowRight, HiOutlineDownload } from "react-icons/hi";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";
import { OptimizedImage } from "./UI";

// ─── Data 
const HERO = {
  name:        "Mehedi Robi",
  firstName:   "Mehedi",
  role:        "MERN Stack Developer",
  tagline:     "I build fast, scalable full-stack web apps — from pixel-perfect UIs to production-ready APIs.",
  description: "Focused on React, Node.js, REST APIs, and clean architecture. Currently open to junior & mid-level roles.",
  resume:      "/mehedirobi-resume.pdf",
  image:       "/mehedirobi.png",
  socials: [
    { href: "https://github.com/mehedirobi",              icon: FaGithub,      label: "GitHub"   },
    { href: "https://www.linkedin.com/in/mehedirobii/",   icon: FaLinkedin,    label: "LinkedIn" },
    { href: "mailto:mehedirobidev@gmail.com",             icon: HiOutlineMail, label: "Email"    },
  ],
  stack: [
    { icon: SiMongodb,   label: "MongoDB",    color: "text-emerald-500 dark:text-emerald-400" },
    { icon: SiExpress,   label: "Express",    color: "text-slate-600   dark:text-slate-300"   },
    { icon: SiReact,     label: "React",      color: "text-cyan-500    dark:text-cyan-400"    },
    { icon: SiNodedotjs, label: "Node.js",    color: "text-green-600   dark:text-green-400"   },
  ],
};

// ─── Animation variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.92, rotate: -2 },
  show:   { opacity: 1, scale: 1,    rotate: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Floating orb background 
const BackgroundOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Top-left violet orb */}
    <motion.div
      animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full
                 bg-violet-400/10 dark:bg-violet-500/8 blur-[90px]"
    />
    {/* Bottom-right cyan orb */}
    <motion.div
      animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      className="absolute -bottom-40 -right-20 w-[420px] h-[420px] rounded-full
                 bg-cyan-400/10 dark:bg-cyan-500/8 blur-[80px]"
    />
    {/* Grid dot texture */}
    <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]
                    [background-image:radial-gradient(circle,_#64748b_1px,_transparent_1px)]
                    [background-size:28px_28px]" />
    {/* Bottom fade line */}
    <div className="absolute bottom-0 inset-x-0 h-px
                    bg-gradient-to-r from-transparent via-slate-200 to-transparent
                    dark:via-slate-800" />
  </div>
);

// Status badge
const StatusBadge = () => (
  <motion.div variants={fadeUp}>
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium
                     rounded-full border border-emerald-200/60 dark:border-emerald-800/50
                     bg-emerald-50 dark:bg-emerald-950/40
                     text-emerald-700 dark:text-emerald-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                         bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      Open to work · Available for hire
    </span>
  </motion.div>
);

// ─── MERN stack pills
const StackPills = () => (
  <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
    <span className="text-xs text-slate-400 dark:text-slate-600 font-medium tracking-wide uppercase mr-1">
      Stack
    </span>
    {HERO.stack.map(({ icon: Icon, label, color }) => (
      <span
        key={label}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
                   border border-slate-200/80 dark:border-slate-800/80
                   bg-white/70 dark:bg-slate-900/60
                   text-slate-600 dark:text-slate-400"
      >
        <Icon className={`w-3.5 h-3.5 ${color}`} aria-hidden="true" />
        {label}
      </span>
    ))}
  </motion.div>
);

//  Social links 
const SocialLink = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    whileHover={{ y: -2, scale: 1.08 }}
    whileTap={{ scale: 0.94 }}
    className="h-10 w-10 flex items-center justify-center rounded-xl
               border border-slate-200 dark:border-slate-800
               bg-white/80 dark:bg-slate-900/60
               text-slate-500 dark:text-slate-400
               hover:border-violet-300 dark:hover:border-violet-700
               hover:text-violet-600 dark:hover:text-violet-400
               hover:shadow-md hover:shadow-violet-500/10
               transition-all duration-200
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-violet-500/50"
  >
    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
  </motion.a>
);

// Profile image 
const ProfileImage = ({ name, shouldReduce }) => (
  <motion.div
    variants={imageAnim}
    className="flex justify-center lg:justify-end"
  >
    <div className="relative group">

      {/* Rotating gradient ring */}
      <motion.div
        animate={shouldReduce ? {} : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[3px] rounded-full
                   bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400
                   dark:from-violet-400 dark:via-blue-400 dark:to-cyan-300
                   opacity-70 dark:opacity-50"
        aria-hidden="true"
      />

      {/* White gap ring */}
      <div className="absolute -inset-[2px] rounded-full bg-white dark:bg-slate-950"
           aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-full opacity-0 group-hover:opacity-100
                      bg-gradient-to-br from-violet-400/20 via-blue-400/15 to-transparent
                      blur-2xl transition-opacity duration-700"
           aria-hidden="true" />

      {/* Image container */}
      <div className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80
                      rounded-full overflow-hidden
                      shadow-2xl shadow-violet-500/15 dark:shadow-violet-500/10">
        <OptimizedImage
          src={HERO.image}
          alt={`Portrait of ${name}`}
          className="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-105"
        />
      </div>

      {/* Floating MERN badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.4, ease: "easeOut" }}
        className="absolute -bottom-3 -left-4 lg:-left-8
                   flex items-center gap-2 px-3 py-1.5 rounded-xl
                   bg-white dark:bg-slate-900
                   border border-slate-200 dark:border-slate-800
                   shadow-lg shadow-slate-200/60 dark:shadow-slate-900/60"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
          MERN Stack
        </span>
      </motion.div>

      {/* Floating exp badge — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.4, ease: "easeOut" }}
        className="absolute -top-3 -right-4 lg:-right-6
                   flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                   bg-white dark:bg-slate-900
                   border border-slate-200 dark:border-slate-800
                   shadow-lg shadow-slate-200/60 dark:shadow-slate-900/60"
      >
        <span className="text-base leading-none">🚀</span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
          Full-Stack Dev
        </span>
      </motion.div>

    </div>
  </motion.div>
);

// Hero
export default function Hero() {
  const shouldReduce = useReducedMotion();

  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[calc(100vh-4rem)] flex items-center
                 bg-white dark:bg-slate-950 overflow-hidden"
    >
      <BackgroundOrbs />

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6
                      py-24 lg:py-0
                      grid lg:grid-cols-2 items-center gap-14 lg:gap-20">

        {/* Left content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 order-2 lg:order-1"
        >
          <StatusBadge />

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]
                       font-extrabold leading-[1.08] tracking-tight
                       text-slate-950 dark:text-white"
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500
                               dark:from-violet-400 dark:via-blue-400 dark:to-cyan-400
                               bg-clip-text text-transparent">
                {HERO.firstName}
              </span>
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full
                           bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400
                           dark:from-violet-400 dark:via-blue-400 dark:to-cyan-300"
              />
            </span>
            <br />
            <span className="text-slate-700 dark:text-slate-300 font-bold">
              {HERO.role}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-400
                       leading-relaxed max-w-[46ch]"
          >
            {HERO.tagline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-[44ch]"
          >
            {HERO.description}
          </motion.p>

          {/* Stack pills */}
          <StackPills />

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            {/* Primary */}
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-sm font-semibold text-white
                         bg-gradient-to-r from-violet-600 to-blue-600
                         dark:from-violet-500 dark:to-blue-500
                         shadow-md shadow-violet-500/25
                         hover:shadow-lg hover:shadow-violet-500/35
                         transition-shadow duration-200
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-violet-500/50"
            >
              View Projects
              <HiOutlineArrowRight className="w-4 h-4" aria-hidden="true" />
            </motion.button>

            {/* Secondary */}
            <motion.a
              href={HERO.resume}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-sm font-semibold
                         border border-slate-200 dark:border-slate-700
                         bg-white/80 dark:bg-slate-900/60
                         text-slate-700 dark:text-slate-300
                         hover:border-violet-300 dark:hover:border-violet-700
                         hover:text-violet-700 dark:hover:text-violet-400
                         hover:shadow-sm
                         transition-all duration-200
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-violet-500/40"
            >
              Resume
              <HiOutlineDownload className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 pt-0.5">
            <span className="text-xs text-slate-400 dark:text-slate-600 font-medium">Find me on</span>
            <div className="flex gap-2">
              {HERO.socials.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-1 lg:order-2"
        >
          <ProfileImage name={HERO.name} shouldReduce={shouldReduce} />
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase text-slate-400 dark:text-slate-600 font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700"
        />
      </motion.div>

    </section>
  );
}