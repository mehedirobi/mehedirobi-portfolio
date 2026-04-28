import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { Globe } from "lucide-react";
import { projectData } from "../data/projectData";
import { Section, Card, Button, OptimizedImage } from "./UI";

const filters = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Next", value: "next" },
  { label: "Full-stack", value: "fullstack" },
];

const ProjectCard = ({ project }) => {
  const techStack = project.techStack.split(", ").map((t) => t.trim());

  return (
    <Card className="group h-full flex flex-col overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <OptimizedImage
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        
        {/* label */}
        <div className="flex items-center gap-2 text-sky-500 mb-2">
          <Globe className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400">
            Featured Project
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
          {project.name}
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-6 flex-1">
          {project.description}
        </p>

        {/* Tech */}
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

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              className="w-full"
              icon={<FiExternalLink className="h-4 w-4" />}
            >
              Live
            </Button>
          </a>

          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              variant="secondary"
              className="w-full"
              icon={<FaGithub className="h-4 w-4" />}
            >
              Code
            </Button>
          </a>

        </div>
      </div>
    </Card>
  );
};

export default function Projects() {
  const [active, setActive] = useState("all");

  const filteredProjects = useMemo(() => {
    if (active === "all") return projectData;

    return projectData.filter((p) => {
      const tech = p.tech?.join?.(" ") || p.techStack?.toLowerCase() || "";

      if (active === "fullstack") {
        return (
          tech.includes("node") ||
          tech.includes("express") ||
          tech.includes("mongodb") ||
          tech.includes("firebase")
        );
      }

      return tech.includes(active);
    });
  }, [active]);

  return (
    <Section id="projects">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Projects
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Selected work demonstrating frontend engineering, UI design, and full-stack development.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${
              active === f.value
                ? "bg-sky-500 text-white border-sky-500"
                : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}