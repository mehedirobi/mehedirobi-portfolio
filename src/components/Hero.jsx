import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlineDownload,
} from "react-icons/hi";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";
import { OptimizedImage } from "./UI";

const HERO = {
  name: "Mehedi Robi",
  firstName: "Mehedi",
  role: "MERN Stack Developer",
  tagline:
    "I build responsive, user-focused web applications with React, Node.js, Express.js, and MongoDB.",
  description:
    "I focus on reusable UI components, REST APIs, authentication, and database-driven features with clean, maintainable code.",
  resume: "/mehedirobi-resume.pdf",
  image: "/projects/Mehedi-Robi-Professional.jpg",

  socials: [
    {
      href: "https://github.com/mehedirobi",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/mehedirobii/",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:mehedirobidev@gmail.com",
      icon: HiOutlineMail,
      label: "Email",
    },
  ],

  stack: [
    {
      icon: SiMongodb,
      label: "MongoDB",
      color: "text-emerald-600",
    },
    {
      icon: SiExpress,
      label: "Express.js",
      color: "text-slate-300",
    },
    {
      icon: SiReact,
      label: "React",
      color: "text-cyan-600",
    },
    {
      icon: SiNodedotjs,
      label: "Node.js",
      color: "text-green-500",
    },
  ],
};

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-emerald-400/100"
      />
      Open to opportunities
    </div>
  );
}

function StackList() {
  return (
    <div
      role="group"
      aria-label="Primary technology stack"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Tech stack
      </span>

      {HERO.stack.map(({ icon: Icon, label, color }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-300"
        >
          <Icon
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${color}`}
          />
          {label}
        </span>
      ))}
    </div>
  );
}

function SocialLinks({ reduceMotion }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium text-slate-400">
        Connect
      </span>

      <div className="flex items-center gap-2">
        {HERO.socials.map(({ href, icon: Icon, label }) => {
          const isEmail = href.startsWith("mailto:");

          return (
            <motion.a
              key={label}
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={label}
              title={label}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
            >
              <Icon
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

function ProfileImage({ reduceMotion }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="mx-auto w-full max-w-[360px] lg:max-w-[390px]"
    >
      <div className="relative mx-auto aspect-square w-[min(72vw,280px)] sm:w-[min(65vw,320px)] lg:w-full">
        {/* Decorative outline */}
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-full border border-violet-200"
        />

        {/* Portrait */}
        <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-[#111318] bg-[#181a21] shadow-xl shadow-black/40 ring-1 ring-white/10">
          <OptimizedImage
            src={HERO.image}
            alt={`Portrait of ${HERO.name}, ${HERO.role}`}
            loading="eager"
            fetchPriority="high"
            className={`h-full w-full object-cover ${
              reduceMotion
                ? ""
                : "transition-transform duration-500 ease-out hover:scale-[1.03]"
            }`}
          />
        </div>

        {/* Role label */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#111318] px-4 py-2 text-xs font-semibold text-slate-200 shadow-md shadow-black/30 sm:left-auto sm:right-0 sm:translate-x-0">
          <span
            aria-hidden="true"
            className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400/100"
          />
          {HERO.role}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToProjects = useCallback(() => {
    const projects = document.getElementById("projects");

    if (!projects) return;

    const targetPosition =
      projects.getBoundingClientRect().top +
      window.scrollY -
      80;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate scroll-mt-16 overflow-hidden bg-[#09090b]"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl sm:h-[380px] sm:w-[380px]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-12 xl:gap-16">
        {/* Left: Hero content */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="order-1 flex min-w-0 flex-col items-start gap-5"
        >
          <motion.div variants={fadeUpVariants}>
            <StatusBadge />
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUpVariants}
            className="max-w-3xl text-[2.65rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-slate-50 sm:text-5xl lg:text-[3.35rem] xl:text-[3.8rem]"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">
              {HERO.firstName}
            </span>

            <span className="mt-2 block text-slate-200">
              {HERO.role}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
          >
            {HERO.tagline}
          </motion.p>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7"
          >
            {HERO.description}
          </motion.p>

          <motion.div variants={fadeUpVariants}>
            <StackList />
          </motion.div>

          {/* Primary actions */}
          <motion.div
            variants={fadeUpVariants}
            className="flex w-full flex-wrap gap-3 pt-1"
          >
            <motion.button
              type="button"
              onClick={scrollToProjects}
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
            >
              View Projects
              <HiOutlineArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </motion.button>

            <a
              href={HERO.resume}
              download
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
            >
              Download Resume
              <HiOutlineDownload
                aria-hidden="true"
                className="h-4 w-4"
              />
            </a>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="pt-1">
            <SocialLinks reduceMotion={reduceMotion} />
          </motion.div>
        </motion.div>

        {/* Right: Profile image */}
        <div className="order-2 flex items-center justify-center lg:justify-end">
          <ProfileImage reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}