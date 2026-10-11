import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import {
  FiLock,
  FiRefreshCw,
  FiTool,
} from "react-icons/fi";

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
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";
import { Section } from "./UI";

const SKILLS = [
  {
    title: "Frontend Development",
    description:
      "Creating responsive, accessible, and user-friendly interfaces.",
    icon: TbLayoutDashboard,
    accent: "violet",
    skills: [
      { label: "JavaScript (ES6+)", icon: SiJavascript, color: "text-yellow-500" },
      { label: "React.js", icon: SiReact, color: "text-cyan-500" },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
      { label: "HTML5", icon: SiHtml5, color: "text-orange-500" },
      { label: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    ],
  },
  {
    title: "Backend & Databases",
    description:
      "Building APIs, handling application logic, and integrating databases.",
    icon: HiOutlineServerStack,
    accent: "blue",
    skills: [
      { label: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { label: "Express.js", icon: SiExpress, color: "text-slate-700" },
      { label: "MongoDB", icon: SiMongodb, color: "text-emerald-600" },
      { label: "REST APIs", icon: HiOutlineServerStack, color: "text-orange-500" },
      { label: "CRUD Operations", icon: FiRefreshCw, color: "text-blue-500" },
    ],
  },
  {
    title: "Authentication & Tools",
    description:
      "Managing authentication, version control, and modern development workflows.",
    icon: FiTool,
    accent: "cyan",
    skills: [
      { label: "Firebase Auth", icon: SiFirebase, color: "text-amber-500" },
      { label: "Protected Routes", icon: FiLock, color: "text-slate-600" },
      { label: "Git", icon: SiGit, color: "text-orange-600" },
      { label: "GitHub", icon: SiGithub, color: "text-slate-800" },
      { label: "VS Code", icon: VscVscode, color: "text-blue-500" },
      { label: "Responsive Design", icon: FaCss3Alt, color: "text-blue-500" },
    ],
  },
];

const ACCENTS = {
  violet: {
    icon: "bg-violet-50 text-violet-600",
    border: "hover:border-violet-200",
    line: "from-violet-500 to-blue-500",
  },
  blue: {
    icon: "bg-blue-50 text-blue-600",
    border: "hover:border-blue-200",
    line: "from-blue-500 to-cyan-500",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600",
    border: "hover:border-cyan-200",
    line: "from-cyan-500 to-emerald-500",
  },
};

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

function SkillTag({ label, icon: Icon, color }) {
  return (
    <span className="inline-flex select-none items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900">
      <Icon
        className={`h-3.5 w-3.5 shrink-0 ${color}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function SkillCard({ item, reduceMotion }) {
  const Icon = item.icon;
  const accent = ACCENTS[item.accent];

  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02] transition-[border-color,box-shadow] duration-200 hover:shadow-md ${accent.border}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-5 top-0 h-0.5 bg-gradient-to-r ${accent.line} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <div className="flex items-start gap-3.5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent.icon}`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            {item.description}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-slate-100" />

      <div className="flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <SkillTag key={skill.label} {...skill} />
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="skills"
      aria-labelledby="skills-heading"
      background="bg-slate-50"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <motion.p
            variants={fadeUp}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-violet-600"
          >
            Technical Expertise
          </motion.p>

          <motion.h2
            id="skills-heading"
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base"
          >
            The technologies, tools, and concepts I use to build modern
            full-stack web applications.
          </motion.p>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
            },
          }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((item) => (
            <SkillCard
              key={item.title}
              item={item}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}