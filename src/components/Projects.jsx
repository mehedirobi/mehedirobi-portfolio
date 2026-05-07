import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projectData } from "../data/projectData";
import { Section, Card } from "./UI";

/**
 * FILTERS
 */
const FILTERS = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "next" },
  { label: "Full Stack", value: "fullstack" },
];

/**
 * FULLSTACK PROJECTS (STRICT BY NAME ONLY)
 * match against project.name instead of id
 */
const FULLSTACK_PROJECTS = new Set([
  "urban fix website",
  "pawmart website",
  "toyverse website",
]);

/**
 * SAFE TECH CHECK
 */
const hasTech = (techArr = [], target) =>
  techArr.some((t) => String(t).toLowerCase().includes(target));

/**
 * PROJECT CARD
 */
const ProjectCard = ({ project }) => {
  const techStack = useMemo(() => {
    if (Array.isArray(project.tech)) return project.tech;
    return String(project.techStack || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [project.tech, project.techStack]);

  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">

        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          {project.name}
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-6 flex-1">
          {project.description}
        </p>

        {/* TECH */}
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-5 flex gap-3">

          <a href={project?.links?.live} target="_blank" rel="noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90">
              <FiExternalLink className="w-4 h-4" />
              Live
            </button>
          </a>

          <a href={project?.links?.github} target="_blank" rel="noreferrer" className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
              <FaGithub className="w-4 h-4" />
              Code
            </button>
          </a>

        </div>

      </div>
    </Card>
  );
};

/**
 * MAIN COMPONENT
 */
export default function Projects() {
  const [active, setActive] = useState("all");

  const filteredProjects = useMemo(() => {
    const projects = projectData || [];

    switch (active) {

      case "react":
        return projects.filter((p) =>
          hasTech(p.tech, "react") && !hasTech(p.tech, "nextjs")
        );

      case "next":
        return projects.filter((p) =>
          hasTech(p.tech, "nextjs")
        );

      case "fullstack":
        return projects.filter((p) =>
          FULLSTACK_PROJECTS.has(p.name.toLowerCase())
        );

      default:
        return projects;
    }
  }, [active]);

  return (
    <Section id="projects">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Selected Projects
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Real-world applications built with modern frontend and backend technologies.
        </p>
      </motion.div>

      {/* FILTERS */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-4 py-2 text-sm rounded-full border transition ${
              active === f.value
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black"
                : "border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {active === "next" ? (
        <div className="text-center text-slate-500 dark:text-slate-400 py-10">
          Next.js projects will be added soon.
        </div>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}

    </Section>
  );
}