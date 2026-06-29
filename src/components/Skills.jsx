import React from "react";
import { motion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { FiTool } from "react-icons/fi";
import {
  SiJavascript, SiReact, SiTailwindcss, SiHtml5, SiCss3,
  SiFramer, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiJsonwebtokens,
  SiGit, SiGithub, SiVite, SiFigma, SiVercel, SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Section } from "./UI";

// ─── Data ──────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    icon:        TbLayoutDashboard,
    title:       "Frontend",
    description: "Pixel-perfect, responsive UIs with smooth animations and great UX.",
    accent:      "violet",
    gradientBar: "from-violet-500 to-blue-500",
    iconBg:      "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
    iconHover:   "group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 dark:group-hover:text-white",
    borderHover: "hover:border-violet-200 dark:hover:border-violet-800/60",
    shadow:      "hover:shadow-violet-500/10",
    skills: [
      { label: "JavaScript (ES6+)", icon: SiJavascript,  color: "text-yellow-500" },
      { label: "React.js",          icon: SiReact,        color: "text-cyan-500"   },
      { label: "Tailwind CSS",      icon: SiTailwindcss,  color: "text-sky-500"    },
      { label: "HTML5",             icon: SiHtml5,        color: "text-orange-500" },
      { label: "CSS3",              icon: SiCss3,         color: "text-blue-500"   },
      { label: "Framer Motion",     icon: SiFramer,       color: "text-pink-500"   },
      { label: "Next.js",           icon: SiNextdotjs,    color: "text-slate-700 dark:text-slate-300" },
    ],
  },
  {
    icon:        HiOutlineServerStack,
    title:       "Backend & APIs",
    description: "REST APIs, auth systems, and database integration — production-ready.",
    accent:      "blue",
    gradientBar: "from-blue-500 to-cyan-500",
    iconBg:      "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    iconHover:   "group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white",
    borderHover: "hover:border-blue-200 dark:hover:border-blue-800/60",
    shadow:      "hover:shadow-blue-500/10",
    skills: [
      { label: "Node.js",    icon: SiNodedotjs,     color: "text-green-500"  },
      { label: "Express.js", icon: SiExpress,       color: "text-slate-600 dark:text-slate-300" },
      { label: "MongoDB",    icon: SiMongodb,       color: "text-emerald-500"},
      { label: "Firebase",   icon: SiFirebase,      color: "text-amber-500"  },
      { label: "JWT Auth",   icon: SiJsonwebtokens, color: "text-rose-500"   },
      { label: "REST APIs",  icon: SiPostman,       color: "text-orange-500" },
    ],
  },
  {
    icon:        FiTool,
    title:       "Tools & Workflow",
    description: "The toolchain I rely on for efficient development and shipping fast.",
    accent:      "cyan",
    gradientBar: "from-cyan-500 to-emerald-500",
    iconBg:      "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400",
    iconHover:   "group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500 dark:group-hover:text-white",
    borderHover: "hover:border-cyan-200 dark:hover:border-cyan-800/60",
    shadow:      "hover:shadow-cyan-500/10",
    skills: [
      { label: "Git",     icon: SiGit,    color: "text-orange-600" },
      { label: "GitHub",  icon: SiGithub, color: "text-slate-700 dark:text-slate-300" },
      { label: "VS Code", icon: VscVscode, color: "text-blue-500"  },
      { label: "Vite",    icon: SiVite,   color: "text-violet-500" },
      { label: "Figma",   icon: SiFigma,  color: "text-pink-500"   },
      { label: "Vercel",  icon: SiVercel, color: "text-slate-700 dark:text-slate-300" },
    ],
  },
];

// ─── Animations ────────────────────────────────────────────────────────────
const VIEWPORT = { once: true, amount: 0.15 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── SkillTag with icon ────────────────────────────────────────────────────
const SkillTag = ({ label, icon: Icon, color }) => (
  <motion.span
    whileHover={{ scale: 1.05, y: -1 }}
    transition={{ duration: 0.15 }}
    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium
               rounded-lg border border-slate-200 dark:border-slate-800
               bg-white dark:bg-slate-900/80
               text-slate-600 dark:text-slate-400
               hover:border-slate-300 dark:hover:border-slate-700
               hover:text-slate-900 dark:hover:text-slate-200
               hover:shadow-sm
               transition-all duration-150 cursor-default select-none"
  >
    <Icon className={`w-3.5 h-3.5 shrink-0 ${color}`} aria-hidden="true" />
    {label}
  </motion.span>
);

// ─── SkillCard ─────────────────────────────────────────────────────────────
const SkillCard = ({
  icon: Icon, title, description, skills,
  gradientBar, iconBg, iconHover, borderHover, shadow,
}) => (
  <motion.div variants={fadeUp} whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
    <div className={`
      group relative h-full rounded-2xl p-6
      bg-white dark:bg-slate-900/60
      border border-slate-200/80 dark:border-slate-800/80
      ${borderHover}
      hover:shadow-xl ${shadow}
      dark:hover:shadow-slate-900/60
      transition-all duration-300
    `}>
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full
                       bg-gradient-to-r ${gradientBar}
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-300`}
           aria-hidden="true" />

      {/* Icon + Title row */}
      <div className="flex items-start gap-4 mb-5">
        <div className={`shrink-0 flex items-center justify-center
                         w-11 h-11 rounded-xl transition-all duration-300
                         ${iconBg} ${iconHover}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 pt-0.5">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-800/60 mb-4" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill.label} {...skill} />
        ))}
      </div>

      {/* Skill count badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60
                      flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest font-semibold
                         text-slate-400 dark:text-slate-600">
          Technologies
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                          bg-gradient-to-r ${gradientBar}
                          text-white`}>
          {skills.length}
        </span>
      </div>
    </div>
  </motion.div>
);

// ─── Skills ────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <Section id="skills" aria-label="Skills and technologies">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-violet-500 dark:text-violet-400 mb-3"
        >
          What I work with
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Skills & Technologies
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          The full MERN stack and surrounding tools I use to build and ship
          production-ready web applications.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILLS.map((item) => (
          <SkillCard key={item.title} {...item} />
        ))}
      </motion.div>

    </Section>
  );
}