import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineArrowRight, HiOutlineDownload } from "react-icons/hi";
import { OptimizedImage } from "./UI";

// ─── Data 

const HERO = {
  name:        "Mehedi",
  role:        "MERN Stack Developer",
  headline:    "Building modern, responsive, and scalable full-stack web applications with the MERN Stack.",
  description: "Passionate MERN Stack Developer focused on building responsive user interfaces, RESTful APIs, authentication systems, and performant full-stack applications with clean architecture and modern development practices.",
  resume:      "/mehedirobi-resume.pdf",
  socials: [
    { href: "https://github.com/mehedirobi",                  icon: FaGithub,       label: "GitHub"   },
    { href: "https://www.linkedin.com/in/mehedirobii/",       icon: FaLinkedin,     label: "LinkedIn" },
    { href: "mailto:mehedirobidev@gmail.com",                 icon: HiOutlineMail,  label: "Email"    },
  ],
};

// ─── Animation 

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── Sub-components 
const RoleBadge = ({ role }) => (
  <motion.div variants={fadeUp}>
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full
                     border border-slate-200 dark:border-slate-800
                     text-slate-600 dark:text-slate-400
                     bg-slate-50 dark:bg-slate-900/60">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
      {role}
    </span>
  </motion.div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="group h-10 w-10 flex items-center justify-center rounded-xl
               border border-slate-200 dark:border-slate-800
               text-slate-500 dark:text-slate-400
               hover:border-slate-400 dark:hover:border-slate-600
               hover:text-slate-900 dark:hover:text-white
               hover:-translate-y-0.5
               transition-all duration-200"
  >
    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
  </a>
);

const ProfileImage = ({ name }) => (
  <motion.div
    variants={imageVariant}
    className="flex justify-center lg:justify-end"
  >
    <div className="relative">
      {/* Ambient glow */}
      <div
        className="absolute -inset-4 rounded-full opacity-60
                   bg-gradient-to-br from-sky-400/25 via-violet-400/20 to-transparent
                   blur-2xl dark:opacity-40"
        aria-hidden="true"
      />

      {/* Decorative ring */}
      <div
        className="absolute -inset-1.5 rounded-full
                   bg-gradient-to-br from-sky-400/30 to-violet-500/30
                   dark:from-sky-500/20 dark:to-violet-500/20"
        aria-hidden="true"
      />

      {/* Image */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80
                      rounded-full overflow-hidden
                      border-4 border-white dark:border-slate-900
                      shadow-2xl shadow-slate-200/60 dark:shadow-slate-900/60">
        <OptimizedImage
          src="/mehedirobi.png"
          alt={`Portrait of ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);


export default function Hero() {
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[calc(100vh-4rem)] flex items-center
                 overflow-hidden bg-white dark:bg-slate-950"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(186,230,255,0.25),transparent)]
                        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.07),transparent)]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent
                        dark:via-slate-800" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-5 sm:px-6
                      py-24 lg:py-0
                      grid lg:grid-cols-2 items-center gap-12 lg:gap-20">

        {/* ── Left ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 order-2 lg:order-1"
        >
          <RoleBadge role={HERO.role} />

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold
                       text-slate-950 dark:text-white leading-[1.1] tracking-tight"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-500 to-violet-500
                             dark:from-sky-400 dark:to-violet-400
                             bg-clip-text text-transparent">
              {HERO.name}
            </span>
          </motion.h1>

          {/* Headline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300
                       leading-relaxed max-w-[48ch]"
          >
            {HERO.headline}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-sm text-slate-500 dark:text-slate-500 max-w-[44ch]"
          >
            {HERO.description}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-sm font-semibold text-white
                         bg-slate-900 dark:bg-white dark:text-slate-900
                         hover:opacity-80 active:scale-[0.97]
                         transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-slate-900/50 dark:focus-visible:ring-white/50"
            >
              View Projects
              <HiOutlineArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href="./mehedirobi-resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         text-sm font-semibold
                         border border-slate-200 dark:border-slate-800
                         text-slate-700 dark:text-slate-300
                         hover:bg-slate-50 dark:hover:bg-slate-900
                         hover:border-slate-300 dark:hover:border-slate-700
                         active:scale-[0.97] transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30"
            >
              Resume
              <HiOutlineDownload className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="flex gap-2.5 pt-1">
            {HERO.socials.map((social) => (
              <SocialLink key={social.label} {...social} />
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-1 lg:order-2"
        >
          <ProfileImage name={HERO.name} />
        </motion.div>

      </div>
    </section>
  );
}