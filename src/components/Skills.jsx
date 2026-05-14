import React from "react";
import { motion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { FiTool } from "react-icons/fi";
import { Section, Card } from "./UI";

const skillsData = [
  {
    title: "Frontend Engineering",
    description:
      "Building scalable, performant and maintainable UI systems with modern React architecture.",
    icon: TbLayoutDashboard,
    skills: ["JavaScript (ES6+)", "React", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend & APIs",
    description:
      "Developing REST APIs and handling server-side logic with database integration.",
    icon: HiOutlineServerStack,
    skills: ["Node.js", "Express.js", "MongoDB", "Firebase"],
  },
  {
    title: "Development Tools",
    description:
      "Tooling and workflows for efficient development and collaboration.",
    icon: FiTool,
    skills: ["Git", "GitHub", "VS Code", "Figma", "Vite"],
  },
];

const SkillCard = ({ title, description, icon: Icon, skills }) => {
  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex gap-4 items-start">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-6">
            {description}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default function Skills() {
  return (
    <Section id="skills">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Skills & Technologies
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Technologies and tools I use to build scalable, production-ready web applications.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillsData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <SkillCard {...item} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}