import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiCode, FiLayers } from "react-icons/fi";
import { RiLightbulbFlashLine } from "react-icons/ri";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { Section } from "./UI";

// ======================================================
// About Data
// ======================================================

const ABOUT = {
  eyebrow: "Who I am",
  title: "About Me",

  summary:
    "A developer focused on building modern, responsive, and maintainable web applications with React, Node.js, Express.js, and MongoDB.",

  story: [
    "I'm Mehedi Robi, a web developer focused on building modern and user-friendly web applications. I enjoy turning ideas and real-world requirements into practical digital products that are clean, responsive, and easy to use.",

    "My primary focus is frontend development with React, where I build reusable components, responsive interfaces, and interactive user experiences. I also work with Node.js, Express.js, REST APIs, and MongoDB to connect applications with reliable backend services.",

    "I care about more than just making an application work. I focus on clean code, reusable architecture, responsive design, accessibility, performance, and maintainability. I continuously improve my skills by building real-world projects and solving practical development problems.",

    "My goal is to grow into a professional software engineer who can design, build, and maintain reliable full-stack applications while following modern engineering practices.",
  ],

  focusAreas: [
    {
      icon: FiCode,
      title: "Frontend Development",
      description:
        "Building responsive React interfaces with reusable components, clean UI structure, and thoughtful user interactions.",
    },
    {
      icon: FiLayers,
      title: "Full-Stack Development",
      description:
        "Developing complete web applications using React, Node.js, Express.js, REST APIs, and MongoDB.",
    },
    {
      icon: RiLightbulbFlashLine,
      title: "Problem Solving",
      description:
        "Turning requirements into practical solutions while keeping code clean, maintainable, and scalable.",
    },
  ],

  techRow: [
    {
      icon: SiReact,
      label: "React",
      color: "text-cyan-500 dark:text-cyan-400",
    },
    {
      icon: SiNodedotjs,
      label: "Node.js",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: SiMongodb,
      label: "MongoDB",
      color: "text-emerald-500 dark:text-emerald-400",
    },
    {
      icon: SiTailwindcss,
      label: "Tailwind CSS",
      color: "text-sky-500 dark:text-sky-400",
    },
  ],
};

// ======================================================
// Animation
// ======================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ======================================================
// Section Header
// ======================================================

const SectionHeader = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <motion.p
        variants={fadeUpVariants}
        className="
          mb-3 text-[11px] font-semibold uppercase
          tracking-[0.16em] text-violet-600
          dark:text-violet-400
        "
      >
        {ABOUT.eyebrow}
      </motion.p>

      <motion.h2
        id="about-heading"
        variants={fadeUpVariants}
        className="
          text-3xl font-bold tracking-[-0.025em]
          text-slate-950 sm:text-4xl
          dark:text-white
        "
      >
        {ABOUT.title}
      </motion.h2>

      <motion.p
        variants={fadeUpVariants}
        className="
          mx-auto mt-4 max-w-xl text-sm leading-7
          text-slate-500 sm:text-base
          dark:text-slate-400
        "
      >
        {ABOUT.summary}
      </motion.p>
    </motion.div>
  );
};

// ======================================================
// Technology Row
// ======================================================

const TechnologyRow = () => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {ABOUT.techRow.map(({ icon: Icon, label, color }) => (
        <span
          key={label}
          className="
            inline-flex items-center gap-1.5
            text-xs font-medium text-slate-500
            dark:text-slate-400
          "
        >
          <Icon
            className={`h-4 w-4 ${color}`}
            aria-hidden="true"
          />

          {label}
        </span>
      ))}
    </div>
  );
};

// ======================================================
// Focus Card
// ======================================================

const FocusCard = ({
  icon: Icon,
  title,
  description,
  reduceMotion,
}) => {
  return (
    <motion.article
      variants={fadeUpVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
            }
      }
      className="
        group relative h-full overflow-hidden
        rounded-2xl border border-slate-200/80
        bg-white p-6
        shadow-sm shadow-slate-900/[0.02]
        transition-[border-color,box-shadow] duration-300
        hover:border-slate-300
        hover:shadow-lg hover:shadow-slate-900/[0.05]
        dark:border-slate-800/80
        dark:bg-slate-900/40
        dark:hover:border-slate-700
        dark:hover:shadow-black/20
      "
    >
      {/* Top accent */}

      <div
        aria-hidden="true"
        className="
          absolute left-6 right-6 top-0 h-px
          bg-gradient-to-r from-violet-500
          via-blue-500 to-cyan-400
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Icon */}

      <div
        className="
          mb-5 flex h-11 w-11 items-center
          justify-center rounded-xl
          border border-violet-100
          bg-violet-50 text-violet-600
          transition-colors duration-200
          group-hover:bg-violet-100
          dark:border-violet-900/40
          dark:bg-violet-950/40
          dark:text-violet-400
          dark:group-hover:bg-violet-950/60
        "
      >
        <Icon
          className="h-5 w-5"
          aria-hidden="true"
        />
      </div>

      {/* Content */}

      <h3
        className="
          mb-2 text-base font-semibold
          tracking-tight text-slate-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          text-sm leading-6 text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>
    </motion.article>
  );
};

// ======================================================
// About
// ======================================================

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Section Header */}

      <SectionHeader />

      {/* About Content */}

      <motion.article
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          mx-auto max-w-5xl rounded-2xl
          border border-slate-200/80
          bg-slate-50/80 p-6
          sm:p-8 lg:p-9
          dark:border-slate-800/80
          dark:bg-slate-900/40
        "
      >
        {/* Label */}

        <div className="mb-6 flex items-center gap-2">
          <span
            aria-hidden="true"
            className="
              h-1.5 w-1.5 rounded-full
              bg-violet-500
              dark:bg-violet-400
            "
          />

          <span
            className="
              text-[11px] font-semibold uppercase
              tracking-[0.14em] text-slate-500
              dark:text-slate-500
            "
          >
            A little about me
          </span>
        </div>

        {/* Story */}

        <div className="max-w-4xl space-y-4">
          {ABOUT.story.map((paragraph, index) => (
            <p
              key={index}
              className="
                text-sm leading-7 text-slate-600
                sm:text-[15px]
                dark:text-slate-300
              "
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Technologies */}

        <div
          className="
            mt-8 border-t border-slate-200
            pt-6 dark:border-slate-800
          "
        >
          <p
            className="
              mb-4 text-[10px] font-semibold
              uppercase tracking-[0.14em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Core technologies
          </p>

          <TechnologyRow />
        </div>
      </motion.article>

      {/* Focus Areas */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="mt-14"
      >
        <motion.div
          variants={fadeUpVariants}
          className="mb-5"
        >
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.14em] text-slate-400
              dark:text-slate-500
            "
          >
            What I focus on
          </p>

          <h3
            className="
              mt-1.5 text-xl font-bold
              tracking-tight text-slate-900
              dark:text-white
            "
          >
            Building useful software
          </h3>
        </motion.div>

        <div
          className="
            grid gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {ABOUT.focusAreas.map((item) => (
            <FocusCard
              key={item.title}
              {...item}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}