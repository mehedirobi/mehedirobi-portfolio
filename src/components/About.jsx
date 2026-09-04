import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FiCode, FiLayers, FiCheckCircle } from "react-icons/fi";
import {
  HiOutlineColorSwatch,
  HiOutlineDatabase,
} from "react-icons/hi";
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
    "I'm a MERN Stack Developer focused on building responsive, maintainable, and user-focused web applications with modern JavaScript technologies.",

  story: [
    "I enjoy turning ideas and real-world requirements into clean, functional web products. My primary focus is building modern interfaces with React and connecting them with reliable REST APIs and MongoDB-backed services.",

    "I care about more than making an application look good. I focus on reusable components, responsive design, clear code structure, accessibility, performance, and a consistent user experience across devices.",

    "I'm continuously strengthening my full-stack engineering skills through hands-on projects and practical problem solving, with the goal of building software that is reliable, maintainable, and ready for real users.",
  ],

  focusAreas: [
    {
      icon: FiCode,
      title: "Frontend Engineering",
      description:
        "Building responsive React interfaces with reusable components, clean state management, and thoughtful user interactions.",
    },
    {
      icon: FiLayers,
      title: "Full-Stack Development",
      description:
        "Connecting frontend applications with REST APIs, Node.js, Express.js, and MongoDB to build complete web experiences.",
    },
    {
      icon: RiLightbulbFlashLine,
      title: "Problem Solving",
      description:
        "Breaking requirements into practical solutions with an emphasis on clean architecture, maintainability, and scalability.",
    },
  ],

  principles: [
    {
      icon: FiCheckCircle,
      title: "Clean & Maintainable",
      description:
        "I prefer reusable patterns and straightforward code that remains easy to understand and extend.",
    },
    {
      icon: HiOutlineColorSwatch,
      title: "User-Centered UI",
      description:
        "I focus on responsive layouts, visual consistency, accessibility, and intuitive interactions.",
    },
    {
      icon: HiOutlineDatabase,
      title: "Practical Engineering",
      description:
        "I learn by building real projects and applying engineering practices to solve practical problems.",
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

const SectionHeader = ({
  reduceMotion,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="
        mx-auto
        mb-12
        max-w-2xl
        text-center
      "
    >
      <motion.p
        variants={fadeUpVariants}
        className="
          mb-3
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.16em]
          text-violet-600

          dark:text-violet-400
        "
      >
        {ABOUT.eyebrow}
      </motion.p>

      <motion.h2
        variants={fadeUpVariants}
        className="
          text-3xl
          font-bold
          tracking-[-0.025em]
          text-slate-950

          sm:text-4xl

          dark:text-white
        "
      >
        {ABOUT.title}
      </motion.h2>

      <motion.p
        variants={fadeUpVariants}
        className="
          mx-auto
          mt-4
          max-w-xl
          text-sm
          leading-7
          text-slate-500

          sm:text-base

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
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-x-5
        gap-y-3
      "
    >
      {ABOUT.techRow.map(
        ({ icon: Icon, label, color }) => (
          <span
            key={label}
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-medium
              text-slate-500

              dark:text-slate-400
            "
          >
            <Icon
              className={`h-4 w-4 ${color}`}
              aria-hidden="true"
            />

            {label}
          </span>
        )
      )}
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
      transition={{
        duration: 0.2,
      }}
      className="
        group
        relative
        h-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        p-6

        shadow-sm
        shadow-slate-900/[0.02]

        transition-[border-color,box-shadow]
        duration-300

        hover:border-slate-300
        hover:shadow-lg
        hover:shadow-slate-900/[0.05]

        dark:border-slate-800/80
        dark:bg-slate-900/40
        dark:hover:border-slate-700
        dark:hover:shadow-black/20
      "
    >
      {/* Subtle top accent */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-6
          right-6
          top-0
          h-px
          bg-gradient-to-r
          from-violet-500
          via-blue-500
          to-cyan-400
          opacity-0
          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      {/* Icon */}
      <div
        className="
          mb-5
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-violet-100
          bg-violet-50
          text-violet-600

          transition-colors
          duration-200

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

      <h3
        className="
          mb-2
          text-base
          font-semibold
          tracking-tight
          text-slate-900

          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          text-sm
          leading-6
          text-slate-500

          dark:text-slate-400
        "
      >
        {description}
      </p>
    </motion.article>
  );
};

// ======================================================
// Principle Item
// ======================================================

const PrincipleItem = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-3">
      <div
        className="
          mt-0.5
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-100
          text-slate-600

          dark:bg-slate-800
          dark:text-slate-300
        "
      >
        <Icon
          className="h-4 w-4"
          aria-hidden="true"
        />
      </div>

      <div>
        <h3
          className="
            text-sm
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-slate-500

            dark:text-slate-400
          "
        >
          {description}
        </p>
      </div>
    </div>
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
      {/* ==================================================
          Header
      ================================================== */}

      <div id="about-heading">
        <SectionHeader
          reduceMotion={reduceMotion}
        />
      </div>

      {/* ==================================================
          Main About Content
      ================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="
          mx-auto
          mb-12
          grid
          max-w-5xl
          gap-5

          lg:grid-cols-[1.5fr_1fr]
        "
      >
        {/* ------------------------------------------------
            Story
        ------------------------------------------------ */}

        <motion.article
          variants={fadeUpVariants}
          className="
            rounded-2xl
            border
            border-slate-200/80
            bg-slate-50/80
            p-6

            sm:p-7

            dark:border-slate-800/80
            dark:bg-slate-900/40
          "
        >
          {/* Label */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-violet-500
                dark:bg-violet-400
              "
            />

            <span
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-500

                dark:text-slate-500
              "
            >
              A little about me
            </span>
          </div>

          {/* Story */}

          <div className="space-y-4">
            {ABOUT.story.map(
              (paragraph, index) => (
                <p
                  key={index}
                  className="
                    text-sm
                    leading-7
                    text-slate-600

                    sm:text-[15px]

                    dark:text-slate-300
                  "
                >
                  {paragraph}
                </p>
              )
            )}
          </div>

          {/* Technology */}

          <div
            className="
              mt-7
              border-t
              border-slate-200
              pt-5

              dark:border-slate-800
            "
          >
            <p
              className="
                mb-3
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-400

                dark:text-slate-600
              "
            >
              Core technologies
            </p>

            <TechnologyRow />
          </div>
        </motion.article>

        {/* ------------------------------------------------
            Engineering Principles
        ------------------------------------------------ */}

        <motion.aside
          variants={fadeUpVariants}
          className="
            rounded-2xl
            border
            border-slate-200/80
            bg-white
            p-6

            shadow-sm
            shadow-slate-900/[0.02]

            dark:border-slate-800/80
            dark:bg-slate-900/40
          "
        >
          <div className="mb-6">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-violet-600

                dark:text-violet-400
              "
            >
              How I work
            </p>

            <h3
              className="
                mt-2
                text-xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-white
              "
            >
              Engineering with purpose
            </h3>
          </div>

          <div className="space-y-6">
            {ABOUT.principles.map(
              (principle) => (
                <PrincipleItem
                  key={principle.title}
                  {...principle}
                />
              )
            )}
          </div>
        </motion.aside>
      </motion.div>

      {/* ==================================================
          Focus Areas
      ================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
      >
        <motion.div
          variants={fadeUpVariants}
          className="
            mb-5
            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-400

                dark:text-slate-600
              "
            >
              What I focus on
            </p>

            <h3
              className="
                mt-1.5
                text-xl
                font-bold
                tracking-tight
                text-slate-900

                dark:text-white
              "
            >
              Building useful software
            </h3>
          </div>
        </motion.div>

        <div
          className="
            grid
            gap-4

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