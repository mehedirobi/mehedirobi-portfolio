import { m, useReducedMotion } from "framer-motion";
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
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";
import { Section } from "./UI";

const SKILLS = [
  {
    title: "Frontend Development",
    description: "Building responsive, user-focused interfaces.",
    icon: TbLayoutDashboard,
    skills: [
      { label: "JavaScript (ES6+)", icon: SiJavascript, color: "text-yellow-500" },
      { label: "React.js", icon: SiReact, color: "text-cyan-500" },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
      { label: "HTML5", icon: SiHtml5, color: "text-orange-500" },
      { label: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    ],
  },
  {
    title: "Backend Development",
    description: "Developing server-side features and REST APIs.",
    icon: HiOutlineServerStack,
    skills: [
      { label: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { label: "Express.js", icon: SiExpress, color: "text-primary" },
      { label: "REST APIs", icon: HiOutlineServerStack, color: "text-orange-500" },
      { label: "CRUD Operations", icon: FiRefreshCw, color: "text-blue-500" },
    ],
  },
  {
    title: "Database",
    description: "Working with document databases and application data.",
    icon: HiOutlineServerStack,
    skills: [
      { label: "MongoDB", icon: SiMongodb, color: "text-emerald-600" },
    ],
  },
  {
    title: "Tools",
    description: "Using modern tools for development and version control.",
    icon: FiTool,
    skills: [
      { label: "Git", icon: SiGit, color: "text-orange-600" },
      { label: "GitHub", icon: SiGithub, color: "text-primary" },
      { label: "VS Code", icon: VscVscode, color: "text-blue-500" },
      { label: "Vite", icon: SiVite, color: "text-accent" },
    ],
  },
  {
    title: "Core Competencies",
    description: "Applying maintainable patterns and user-focused practices.",
    icon: FiLock,
    skills: [
      { label: "Firebase Auth", icon: SiFirebase, color: "text-amber-500" },
      { label: "Protected Routes", icon: FiLock, color: "text-muted" },
      { label: "Responsive Design", icon: TbLayoutDashboard, color: "text-blue-500" },
      { label: "Reusable Components", icon: FiTool, color: "text-accent" },
    ],
  },
];

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
    <span className="inline-flex select-none items-center gap-1.5 rounded-md border border-default bg-overlay/5 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:border-line-strong hover:text-strong">
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

  return (
    <m.article
      variants={fadeUp}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group relative overflow-hidden rounded-xl border border-default bg-surface p-5 shadow-sm shadow-black/20 transition-[border-color,box-shadow] duration-200 hover:border-violet-500/40 hover:shadow-md"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-0.5 bg-violet-400 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <div className="flex items-start gap-3.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-strong">
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-5 text-muted">
            {item.description}
          </p>
        </div>
      </div>

      <div className="my-4 border-t border-default" />

      <div className="flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <SkillTag key={skill.label} {...skill} />
        ))}
      </div>
    </m.article>
  );
}

export default function Skills({ id = "skills" }) {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id={id}
      aria-labelledby="skills-heading"
      background="bg-canvas-alt"
    >
      <div className="mx-auto max-w-6xl">
        <m.header
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
          <m.p
            variants={fadeUp}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-accent"
          >
            Technical Expertise
          </m.p>

          <m.h2
            id="skills-heading"
            variants={fadeUp}
            className="text-section font-bold tracking-tight text-strong"
          >
            Skills & Technologies
          </m.h2>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base"
          >
            The technologies, tools, and concepts I use to build modern
            full-stack web applications.
          </m.p>
        </m.header>

        <m.div
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
            },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((item) => (
            <SkillCard
              key={item.title}
              item={item}
              reduceMotion={reduceMotion}
            />
          ))}
        </m.div>
      </div>
    </Section>
  );
}