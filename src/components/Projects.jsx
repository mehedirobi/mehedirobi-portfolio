import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowUp,
  FiCode,
  FiExternalLink,
} from "react-icons/fi";
import { FiCodepen } from "react-icons/fi";

import { projectData } from "../data/projectData";
import { Section, Card, OptimizedImage } from "./UI";

const INITIAL_PROJECTS = 3;

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

function SectionHeader({ reduceMotion }) {
  return (
    <motion.header
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-8 text-center sm:mb-10"
    >
      <motion.p
        variants={fadeUp}
        className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-violet-600"
      >
        Portfolio
      </motion.p>

      <motion.h2
        id="projects-heading"
        variants={fadeUp}
        className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
      >
        Featured Projects
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base"
      >
        A selection of projects showcasing my full-stack development
        skills, modern UI design, and practical problem-solving.
      </motion.p>
    </motion.header>
  );
}

function TechTag({ children }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
      {children}
    </span>
  );
}

function ProjectAction({ href, icon: Icon, children, primary, label }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
        primary
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

function ProjectCard({ project, reduceMotion }) {
  const tech = Array.isArray(project.tech) ? project.tech : [];
  const liveUrl = project.links?.live;
  const githubUrl = project.links?.github;
  const serverUrl = project.links?.server;

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeUp}
      className="h-full min-w-0"
    >
      <Card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-0 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          {project.image ? (
            <OptimizedImage
              src={project.image}
              alt={`${project.name} project preview`}
              width="1000"
              height="440"
              className={`h-full w-full object-cover ${
                reduceMotion
                  ? ""
                  : "transition-transform duration-500 group-hover:scale-[1.03]"
              }`}
            />
          ) : (
            <div
              className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-50 to-slate-100 text-slate-600"
              aria-hidden="true"
            >
              <FiCodepen className="h-8 w-8 text-violet-500" />
              <span className="px-4 text-center text-lg font-semibold">
                {project.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {project.description}
          </p>

          {tech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tech.slice(0, 6).map((item, index) => (
                <TechTag key={`${item}-${index}`}>{item}</TechTag>
              ))}

              {tech.length > 6 && (
                <span className="self-center px-1 text-[11px] text-slate-500">
                  +{tech.length - 6} more
                </span>
              )}
            </div>
          )}

          <div className="my-4 mt-auto border-t border-slate-100" />

          <div className="flex gap-2">
            <ProjectAction
              href={liveUrl}
              icon={FiExternalLink}
              primary
              label={`View ${project.name} live demo`}
            >
              Live Demo
            </ProjectAction>

            <ProjectAction
              href={githubUrl}
              icon={FaGithub}
              label={`View ${project.name} source code`}
            >
              {serverUrl ? "Client" : "GitHub"}
            </ProjectAction>

            {serverUrl && (
              <ProjectAction
                href={serverUrl}
                icon={FaGithub}
                label={`View ${project.name} server source code`}
              >
                Server
              </ProjectAction>
            )}

            {!liveUrl && !githubUrl && !serverUrl && (
              <span className="flex-1 rounded-lg border border-dashed border-slate-200 px-2 py-2 text-center text-xs text-slate-400">
                Links coming soon
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  // Keep the full source array; never truncate the source data.
  const projects = Array.isArray(projectData) ? projectData : [];

  // Show the first three initially, or the complete array after clicking.
  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

  const hasMore = projects.length > INITIAL_PROJECTS;

  return (
    <Section
      id="projects"
      aria-labelledby="projects-heading"
      background="bg-slate-50"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader reduceMotion={reduceMotion} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.name ?? index}
              project={project}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            No projects found. Please check your project data.
          </p>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <motion.button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              aria-expanded={showAll}
              aria-controls="projects-grid"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
            >
              {showAll ? "Show Less" : "View More Projects"}

              {showAll ? (
                <FiArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <FiArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        )}

        <div id="projects-grid" className="sr-only" aria-live="polite">
          Showing {visibleProjects.length} of {projects.length} projects.
        </div>
      </div>
    </Section>
  );
}