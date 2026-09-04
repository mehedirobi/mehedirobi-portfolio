import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { FiTool } from "react-icons/fi";

import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVite,
  SiFigma,
  SiVercel,
  SiPostman,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";

import { Section } from "./UI";

// ======================================================
// Skills Data
// ======================================================

const SKILLS = [
  {
    icon: TbLayoutDashboard,
    title: "Frontend Development",
    description:
      "Building responsive, accessible interfaces with reusable React components and modern UI practices.",

    gradientBar: "from-violet-500 to-blue-500",

    iconBg:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",

    iconHover:
      "group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500",

    borderHover:
      "hover:border-violet-200 dark:hover:border-violet-800/60",

    shadow:
      "hover:shadow-violet-500/10",

    skills: [
      {
        label: "JavaScript (ES6+)",
        icon: SiJavascript,
        color: "text-yellow-500",
      },
      {
        label: "React.js",
        icon: SiReact,
        color: "text-cyan-500",
      },
      {
        label: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-sky-500",
      },
      {
        label: "HTML5",
        icon: SiHtml5,
        color: "text-orange-500",
      },
      {
        label: "CSS3",
        icon: FaCss3Alt,
        color: "text-blue-500",
      },
    ],
  },

  {
    icon: HiOutlineServerStack,
    title: "Backend & APIs",
    description:
      "Developing RESTful APIs and connecting applications with authentication services and databases.",

    gradientBar: "from-blue-500 to-cyan-500",

    iconBg:
      "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",

    iconHover:
      "group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500",

    borderHover:
      "hover:border-blue-200 dark:hover:border-blue-800/60",

    shadow:
      "hover:shadow-blue-500/10",

    skills: [
      {
        label: "Node.js",
        icon: SiNodedotjs,
        color: "text-green-500",
      },
      {
        label: "Express.js",
        icon: SiExpress,
        color: "text-slate-600 dark:text-slate-300",
      },
      {
        label: "MongoDB",
        icon: SiMongodb,
        color: "text-emerald-500",
      },
      {
        label: "Firebase",
        icon: SiFirebase,
        color: "text-amber-500",
      },
      {
        label: "REST APIs",
        icon: SiPostman,
        color: "text-orange-500",
      },
    ],
  },

  {
    icon: FiTool,
    title: "Tools & Workflow",
    description:
      "Using modern development tools for version control, API testing, design collaboration, and deployment.",

    gradientBar: "from-cyan-500 to-emerald-500",

    iconBg:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",

    iconHover:
      "group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500",

    borderHover:
      "hover:border-cyan-200 dark:hover:border-cyan-800/60",

    shadow:
      "hover:shadow-cyan-500/10",

    skills: [
      {
        label: "Git",
        icon: SiGit,
        color: "text-orange-600",
      },
      {
        label: "GitHub",
        icon: SiGithub,
        color: "text-slate-700 dark:text-slate-300",
      },
      {
        label: "VS Code",
        icon: VscVscode,
        color: "text-blue-500",
      },
      {
        label: "Vite",
        icon: SiVite,
        color: "text-violet-500",
      },
      {
        label: "Vercel",
        icon: SiVercel,
        color: "text-slate-700 dark:text-slate-300",
      },
    ],
  },
];

// ======================================================
// Animation
// ======================================================

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
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
// Skill Tag
// ======================================================

const SkillTag = ({
  label,
  icon: Icon,
  color,
  reduceMotion,
}) => {
  return (
    <motion.span
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -1,
            }
      }
      transition={{
        duration: 0.18,
      }}
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        border
        border-slate-200
        bg-white
        px-2.5
        py-1.5
        text-xs
        font-medium
        text-slate-600

        transition-[border-color,box-shadow,color]
        duration-200

        hover:border-slate-300
        hover:text-slate-900
        hover:shadow-sm

        dark:border-slate-800
        dark:bg-slate-950/50
        dark:text-slate-400
        dark:hover:border-slate-700
        dark:hover:text-slate-200

        select-none
      "
    >
      <Icon
        className={`h-3.5 w-3.5 shrink-0 ${color}`}
        aria-hidden="true"
      />

      {label}
    </motion.span>
  );
};

// ======================================================
// Skill Card
// ======================================================

const SkillCard = ({
  icon: Icon,
  title,
  description,
  skills,
  gradientBar,
  iconBg,
  iconHover,
  borderHover,
  shadow,
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
      className={`
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

        ${borderHover}
        hover:shadow-lg
        ${shadow}

        dark:border-slate-800/80
        dark:bg-slate-900/40
        dark:hover:shadow-black/20

        transition-[border-color,box-shadow]
        duration-300
      `}
    >
      {/* Subtle gradient accent */}

      <div
        aria-hidden="true"
        className={`
          absolute
          left-6
          right-6
          top-0
          h-px
          rounded-full
          bg-gradient-to-r
          ${gradientBar}
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        `}
      />

      {/* Header */}

      <div className="flex items-start gap-4">
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-colors
            duration-200
            ${iconBg}
            ${iconHover}
          `}
        >
          <Icon
            className="h-5 w-5"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h3
            className="
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
              mt-1.5
              text-sm
              leading-6
              text-slate-500

              dark:text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>

      {/* Divider */}

      <div
        className="
          my-5
          border-t
          border-slate-100

          dark:border-slate-800/70
        "
      />

      {/* Technologies */}

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag
            key={skill.label}
            {...skill}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </motion.article>
  );
};

// ======================================================
// Skills Section
// ======================================================

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
    >
      {/* ==================================================
          Header
      ================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
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
          What I work with
        </motion.p>

        <motion.h2
          id="skills-heading"
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
          Skills & Technologies
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
          Technologies and tools I use to design, develop, test,
          and deploy modern web applications.
        </motion.p>
      </motion.div>

      {/* ==================================================
          Skill Cards
      ================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="
          mx-auto
          grid
          max-w-6xl
          gap-4

          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {SKILLS.map((item) => (
          <SkillCard
            key={item.title}
            {...item}
            reduceMotion={reduceMotion}
          />
        ))}
      </motion.div>
    </Section>
  );
}