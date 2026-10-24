import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowUp,
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
    <m.header
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-8 text-center sm:mb-10"
    >
      <m.p
        variants={fadeUp}
        className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-accent"
      >
        Portfolio
      </m.p>

      <m.h2
        id="projects-heading"
        variants={fadeUp}
        className="text-section font-bold tracking-tight text-strong"
      >
        Featured Projects
      </m.h2>

      <m.p
        variants={fadeUp}
        className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base"
      >
        A selection of projects showcasing my full-stack development
        skills, modern UI design, and practical problem-solving.
      </m.p>
    </m.header>
  );
}

function TechTag({ children }) {
  return (
    <span className="rounded-md border border-default bg-canvas-alt px-2.5 py-1 text-[11px] font-medium text-muted">
      {children}
    </span>
  );
}

function ProjectAction({
  href,
  icon: Icon,
  children,
  primary,
  label,
}) {
  if (!href) return null;

  const baseClass = `inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
    primary
      ? "bg-accent-button text-white hover:bg-accent-button-hover"
      : "border border-default text-muted hover:border-line-strong hover:bg-overlay/5 hover:text-strong"
  }`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={baseClass}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}

function ProjectCard({ project, reduceMotion }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const tech = Array.isArray(project.tech) ? project.tech : [];
  const links = project.links ?? {};

  const isFullStack = project.category?.toLowerCase() === "fullstack";

  const liveUrl = links.live;
  const clientUrl = links.client ?? links.github;
  const serverUrl = links.server;

  return (
    <m.article
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeUp}
      className="h-full min-w-0"
    >
      <Card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-default bg-surface p-0 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-lg">
        <div className="relative aspect-video overflow-hidden bg-surface-raised">
          {project.image && !imageFailed ? (
            <OptimizedImage
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              alt={`${project.name} project preview`}
              width={project.imageWidth}
              height={project.imageHeight}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
              className={`h-full w-full object-cover transition-opacity duration-200 ${
                imageLoaded ? "opacity-100" : "animate-pulse opacity-0"
              } ${
                reduceMotion ? "" : "transition-transform group-hover:scale-[1.03]"
              }`}
            />
          ) : (
            <div
              className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-violet-500/10 to-surface-raised text-primary"
              aria-hidden="true"
            >
              <FiCodepen className="h-8 w-8 text-accent" />
              <span className="px-4 text-center text-lg font-semibold">
                {project.name}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold tracking-tight text-strong">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
            {project.description}
          </p>

          {tech.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {tech.slice(0, 6).map((item, index) => (
                <TechTag key={`${item}-${index}`}>{item}</TechTag>
              ))}

              {tech.length > 6 && (
                <span className="self-center px-1 text-[11px] text-muted">
                  +{tech.length - 6} more
                </span>
              )}
            </div>
          )}

          <div className="my-4 mt-auto border-t border-default" />

          <div className="flex flex-wrap gap-2">
            <ProjectAction
              href={liveUrl}
              icon={FiExternalLink}
              primary
              label={`View ${project.name} live demo`}
            >
              Live Demo
            </ProjectAction>

            <ProjectAction
              href={clientUrl}
              icon={FaGithub}
              label={
                isFullStack
                  ? `View ${project.name} client source code`
                  : `View ${project.name} GitHub repository`
              }
            >
              {isFullStack ? "Client" : "GitHub"}
            </ProjectAction>

            {isFullStack && serverUrl && (
              <ProjectAction
                href={serverUrl}
                icon={FaGithub}
                label={`View ${project.name} server source code`}
              >
                Server
              </ProjectAction>
            )}
          </div>
        </div>
      </Card>
    </m.article>
  );
}

export default function Projects({ id = "projects" }) {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();

  const projects = Array.isArray(projectData) ? projectData : [];

  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

  const hasMore = projects.length > INITIAL_PROJECTS;

  return (
    <Section
      id={id}
      aria-labelledby="projects-heading"
      background="bg-canvas-alt"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader reduceMotion={reduceMotion} />

        <div
          id="projects-grid"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.name ?? index}
              project={project}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">
            No projects found. Please check your project data.
          </p>
        )}

        {hasMore && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <m.button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              aria-expanded={showAll}
              aria-controls="projects-grid"
              className="inline-flex items-center gap-2 rounded-lg border border-default bg-surface px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-line-strong hover:bg-overlay/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            >
              {showAll ? "Show Less" : "View More Projects"}

              {showAll ? (
                <FiArrowUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <FiArrowDown className="h-4 w-4" aria-hidden="true" />
              )}
            </m.button>
          </div>
        )}

        <p className="sr-only" aria-live="polite">
          Showing {visibleProjects.length} of {projects.length} projects.
        </p>
      </div>
    </Section>
  );
}