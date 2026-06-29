import React from "react";
import { motion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { FiTool } from "react-icons/fi";
import { Section, Card } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    icon:        TbLayoutDashboard,
    title:       "Frontend Engineering",
    description: "Building scalable, performant and maintainable UI systems with modern React architecture.",
    skills:      ["JavaScript (ES6+)", "React", "Tailwind CSS", "Responsive UI"],
  },
  {
    icon:        HiOutlineServerStack,
    title:       "Backend & APIs",
    description: "Developing REST APIs and handling server-side logic with database integration.",
    skills:      ["Node.js", "Express.js", "MongoDB", "Firebase"],
  },
  {
    icon:        FiTool,
    title:       "Development Tools",
    description: "Tooling and workflows for efficient development and collaboration.",
    skills:      ["Git", "GitHub", "VS Code", "Figma", "Vite"],
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const VIEWPORT = { once: true, amount: 0.2 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── SkillTag ─────────────────────────────────────────────────────────────────

const SkillTag = ({ label }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-lg
                   border border-slate-200 dark:border-slate-800
                   text-slate-600 dark:text-slate-400
                   bg-slate-50 dark:bg-slate-900/60
                   hover:border-slate-400 dark:hover:border-slate-600
                   hover:text-slate-900 dark:hover:text-slate-200
                   transition-colors duration-150 cursor-default">
    {label}
  </span>
);

// ─── SkillCard ────────────────────────────────────────────────────────────────

const SkillCard = ({ icon: Icon, title, description, skills }) => (
  <motion.div variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Card className="h-full group">

      {/* Icon + Title */}
      <div className="flex items-start gap-4 mb-5">
        <div className="shrink-0 flex items-center justify-center
                        w-11 h-11 rounded-xl
                        bg-slate-100 dark:bg-slate-800/80
                        text-slate-600 dark:text-slate-300
                        group-hover:bg-slate-900 group-hover:text-white
                        dark:group-hover:bg-white dark:group-hover:text-slate-900
                        transition-colors duration-300">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-800 mb-4" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>

    </Card>
  </motion.div>
);

// ─── Skills ───────────────────────────────────────────────────────────────────

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
                     text-slate-400 dark:text-slate-600 mb-3"
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
          className="mt-4 max-w-xl mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Technologies and tools I use to build scalable, production-ready web applications.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SKILLS.map((item) => (
          <SkillCard key={item.title} {...item} />
        ))}
      </motion.div>

    </Section>
  );
}