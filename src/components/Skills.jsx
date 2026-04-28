import React from "react";
import { motion } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import { FiTool } from "react-icons/fi";
import { Section, Card } from "./UI";

const categories = [
  {
    title: "Frontend",
    description:
      "Building responsive, scalable, and accessible user interfaces.",
    icon: TbLayoutDashboard,
    tags: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    accent: "text-sky-500",
    bg: "bg-sky-100 dark:bg-sky-500/10",
  },
  {
    title: "Backend",
    description: "API design, server logic, and data-driven architecture.",
    icon: HiOutlineServerStack,
    tags: ["Node.js", "Express", "MongoDB", "Firebase", "REST APIs"],
    accent: "text-violet-500",
    bg: "bg-violet-100 dark:bg-violet-500/10",
  },
  {
    title: "Tools",
    description:
      "Development workflow, version control, and productivity tools.",
    icon: FiTool,
    tags: ["Git", "GitHub", "VS Code", "Figma", "Vite"],
    accent: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
  },
];

const SkillCard = ({ title, description, icon: Icon, tags, accent, bg }) => {
  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className={`mt-1 flex h-11 w-11 items-center justify-center rounded-2xl ${bg} ${accent}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
              {title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default function Skills() {
  return (
    <Section id="skills">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
          Skills
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          A practical toolkit focused on building scalable and production-ready
          web applications.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <SkillCard {...item} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}