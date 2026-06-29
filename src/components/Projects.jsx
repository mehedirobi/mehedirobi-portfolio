import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projectData } from "../data/projectData";
import { Section, Card } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTERS = [
  { label: "All",        value: "all"       },
  { label: "Frontend",   value: "frontend"  },
  { label: "Next.js",    value: "next"      },
  { label: "Full Stack", value: "fullstack" },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const VIEWPORT = { once: true, amount: 0.2 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   { opacity: 0, y: 8,  scale: 0.97, transition: { duration: 0.25 } },
};

// ─── FilterBar ────────────────────────────────────────────────────────────────

const FilterBar = ({ active, onChange }) => (
  <div
    role="group"
    aria-label="Filter projects by category"
    className="flex justify-center flex-wrap gap-2 mb-10"
  >
    {FILTERS.map((f) => {
      const isActive = active === f.value;
      return (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          aria-pressed={isActive}
          className={`
            relative px-4 py-1.5 text-sm font-medium rounded-full
            border transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
            ${isActive
              ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
              : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white"
            }
          `}
        >
          {f.label}
          {isActive && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
        </button>
      );
    })}
  </div>
);

// ─── TechTag ──────────────────────────────────────────────────────────────────

const TechTag = ({ label }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-lg
                   border border-slate-200 dark:border-slate-800
                   text-slate-500 dark:text-slate-400
                   bg-slate-50 dark:bg-slate-900/60
                   cursor-default">
    {label}
  </span>
);

// ─── ProjectCard ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project }) => {
  const techStack = Array.isArray(project.tech) ? project.tech : [];
  const liveUrl   = project?.links?.live;
  const githubUrl = project?.links?.github;

  return (
    <motion.div variants={cardVariant} layout whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full flex flex-col overflow-hidden p-0">

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover
                       transition-transform duration-500 ease-out
                       group-hover:scale-[1.04]"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10
                          dark:group-hover:bg-slate-900/30
                          transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">

          <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
            {project.name}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          {techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-5 mb-4" />

          {/* Actions */}
          <div className="flex gap-2.5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} live demo`}
                className="flex-1 inline-flex items-center justify-center gap-2
                           px-4 py-2 rounded-lg text-sm font-medium
                           bg-slate-900 text-white dark:bg-white dark:text-slate-900
                           hover:opacity-80 active:scale-[0.97]
                           transition-all duration-150
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40"
              >
                <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Live
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} source code on GitHub`}
                className="flex-1 inline-flex items-center justify-center gap-2
                           px-4 py-2 rounded-lg text-sm font-medium
                           border border-slate-200 dark:border-slate-800
                           text-slate-600 dark:text-slate-300
                           hover:bg-slate-50 dark:hover:bg-slate-800/60
                           hover:border-slate-300 dark:hover:border-slate-700
                           active:scale-[0.97] transition-all duration-150
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30"
              >
                <FaGithub className="w-3.5 h-3.5" aria-hidden="true" />
                Code
              </a>
            )}
          </div>

        </div>
      </Card>
    </motion.div>
  );
};

// ─── Projects ─────────────────────────────────────────────────────────────────

export default function Projects() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    const all = projectData || [];
    return active === "all" ? all : all.filter((p) => p.category === active);
  }, [active]);

  return (
    <Section id="projects" aria-label="Selected projects">

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
          What I've built
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Selected Projects
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Real-world applications built with modern frontend and backend systems.
        </motion.p>
      </motion.div>

      {/* Filter Bar */}
      <FilterBar active={active} onChange={setActive} />

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <motion.p
              variants={fadeUp}
              className="col-span-full text-center py-16
                         text-slate-400 dark:text-slate-600 text-sm"
            >
              No projects in this category yet.
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

    </Section>
  );
}