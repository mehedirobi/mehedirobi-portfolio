import React, { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiCode, FiCodepen } from "react-icons/fi";

import { projectData } from "../data/projectData";
import { Section, Card, OptimizedImage } from "./UI";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Full Stack", value: "fullstack" },
];

const CATEGORY_CONFIG = {
  frontend: {
    label: "Frontend",
    dot: "bg-sky-400",
    badge:
      "text-sky-600 bg-sky-50 border-sky-200 dark:text-sky-400 dark:bg-sky-950/40 dark:border-sky-800/60",
  },

  fullstack: {
    label: "Full Stack",
    dot: "bg-emerald-400",
    badge:
      "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800/60",
  },

  next: {
    label: "Next.js",
    dot: "bg-violet-400",
    badge:
      "text-violet-600 bg-violet-50 border-violet-200 dark:text-violet-400 dark:bg-violet-950/40 dark:border-violet-800/60",
  },

  default: {
    label: "Project",
    dot: "bg-slate-400",
    badge:
      "text-slate-600 bg-slate-50 border-slate-200 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-800",
  },
};

/* -------------------------------------------------------------------------- */
/* Animation                                                                  */
/* -------------------------------------------------------------------------- */

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Section Header                                                             */
/* -------------------------------------------------------------------------- */

const SectionHeader = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    className="text-center mb-10 sm:mb-12"
  >
    <motion.p
      variants={fadeUp}
      className="
        inline-flex items-center gap-2
        text-[11px] font-semibold uppercase tracking-[0.18em]
        text-violet-500 dark:text-violet-400
        mb-3
      "
    >
      <span
        className="w-5 h-px bg-current opacity-60"
        aria-hidden="true"
      />

      Portfolio

      <span
        className="w-5 h-px bg-current opacity-60"
        aria-hidden="true"
      />
    </motion.p>

    <motion.h2
      variants={fadeUp}
      className="
        text-3xl sm:text-4xl
        font-bold tracking-tight
        text-slate-950 dark:text-white
      "
    >
      Selected Projects
    </motion.h2>

    <motion.p
      variants={fadeUp}
      className="
        mt-4 mx-auto max-w-2xl
        text-sm sm:text-base
        leading-7
        text-slate-500 dark:text-slate-400
      "
    >
      A selection of full-stack and frontend applications built to solve
      practical problems with modern web technologies.
    </motion.p>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* Filter Bar                                                                 */
/* -------------------------------------------------------------------------- */

const FilterBar = ({ active, onChange, counts }) => (
  <div
    className="flex justify-center flex-wrap gap-2 mb-10"
    role="group"
    aria-label="Filter projects by category"
  >
    {FILTERS.map((filter) => {
      const isActive = active === filter.value;
      const count = counts[filter.value] ?? 0;

      return (
        <motion.button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          aria-pressed={isActive}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          className={`
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            text-xs sm:text-sm font-medium
            border
            transition-all duration-200
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-500/40
            ${
              isActive
                ? `
                  bg-slate-900
                  text-white
                  border-slate-900
                  dark:bg-white
                  dark:text-slate-900
                  dark:border-white
                `
                : `
                  bg-white
                  text-slate-500
                  border-slate-200
                  hover:text-slate-900
                  hover:border-slate-300
                  dark:bg-slate-900/50
                  dark:text-slate-400
                  dark:border-slate-800
                  dark:hover:text-white
                  dark:hover:border-slate-700
                `
            }
          `}
        >
          {filter.label}

          {count > 0 && (
            <span
              className={`
                min-w-[18px] h-[18px]
                px-1
                inline-flex items-center justify-center
                rounded-full
                text-[10px] font-semibold
                ${
                  isActive
                    ? "bg-white/15 text-white dark:bg-slate-900/10 dark:text-slate-900"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }
              `}
            >
              {count}
            </span>
          )}
        </motion.button>
      );
    })}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Tech Tag                                                                   */
/* -------------------------------------------------------------------------- */

const TechTag = ({ label }) => (
  <span
    className="
      inline-flex
      px-2.5 py-1
      rounded-md
      border border-slate-200/80
      dark:border-slate-800
      bg-slate-50/80
      dark:bg-slate-900/70
      text-[11px]
      font-medium
      leading-none
      text-slate-500
      dark:text-slate-400
      whitespace-nowrap
    "
  >
    {label}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Category Badge                                                             */
/* -------------------------------------------------------------------------- */

const CategoryBadge = ({ category }) => {
  const config =
    CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.default;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        shrink-0
        px-2.5 py-1
        rounded-full
        border
        text-[10px]
        font-semibold
        ${config.badge}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
        aria-hidden="true"
      />

      {config.label}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Action Button                                                              */
/* -------------------------------------------------------------------------- */

const ProjectAction = ({
  href,
  icon: Icon,
  children,
  primary = false,
  label,
}) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        inline-flex flex-1
        items-center justify-center gap-1.5
        px-3 py-2
        rounded-lg
        text-xs font-semibold
        transition-all duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/40
        ${
          primary
            ? `
              bg-slate-900
              text-white
              hover:bg-slate-800
              dark:bg-white
              dark:text-slate-900
              dark:hover:bg-slate-100
            `
            : `
              border border-slate-200
              text-slate-600
              hover:bg-slate-50
              hover:border-slate-300
              dark:border-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-800/70
              dark:hover:border-slate-700
            `
        }
      `}
    >
      <Icon
        className="w-3.5 h-3.5"
        aria-hidden="true"
      />

      {children}
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Project Card                                                               */
/* -------------------------------------------------------------------------- */

const ProjectCard = ({ project, shouldReduce }) => {
  const techStack = Array.isArray(project.tech)
    ? project.tech
    : [];

  const liveUrl = project?.links?.live;
  const githubUrl = project?.links?.github;
  const isFeatured = project?.featured === true;

  return (
    <motion.article
      variants={cardVariants}
      layout
      className="h-full"
    >
      <Card
        className={`
          group
          relative
          h-full
          flex flex-col
          overflow-hidden
          p-0
          bg-white
          dark:bg-slate-900/60
          border
          border-slate-200/80
          dark:border-slate-800/80
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-slate-200/60
          dark:hover:shadow-black/30
          ${
            isFeatured
              ? "ring-1 ring-violet-500/20 dark:ring-violet-400/20"
              : ""
          }
        `}
      >
        {/* Image */}
        <div className="
          relative
          aspect-video
          overflow-hidden
          bg-slate-100
          dark:bg-slate-800
        ">
          <OptimizedImage
            src={project.image}
            alt={`${project.name} project preview`}
            loading="lazy"
            decoding="async"
            className={`
              w-full h-full
              object-cover
              transition-transform
              duration-700
              ease-out
              ${
                shouldReduce
                  ? ""
                  : "group-hover:scale-[1.035]"
              }
            `}
          />

          {/* Image overlay */}
          <div
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-slate-950/20
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity duration-300
            "
            aria-hidden="true"
          />

          {/* Featured */}
          {isFeatured && (
            <div className="absolute top-3 left-3">
              <span
                className="
                  inline-flex items-center gap-1.5
                  px-2.5 py-1
                  rounded-full
                  bg-slate-950/85
                  text-white
                  text-[10px]
                  font-semibold
                  backdrop-blur-sm
                "
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-violet-400"
                  aria-hidden="true"
                />

                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">

          {/* Title */}
          <div className="flex items-start justify-between gap-3">
            <h3
              className="
                min-w-0
                text-base
                font-semibold
                leading-snug
                text-slate-900
                dark:text-white
              "
            >
              {project.name}
            </h3>

            {project.category && (
              <CategoryBadge category={project.category} />
            )}
          </div>

          {/* Description */}
          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
              line-clamp-3
            "
          >
            {project.description}
          </p>

          {/* Tech */}
          {techStack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {techStack.slice(0, 6).map((tech) => (
                <TechTag
                  key={tech}
                  label={tech}
                />
              ))}

              {techStack.length > 6 && (
                <span
                  className="
                    inline-flex
                    items-center
                    px-2
                    text-[11px]
                    font-medium
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  +{techStack.length - 6}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div
            className="
              mt-5 mb-4
              border-t
              border-slate-100
              dark:border-slate-800
            "
          />

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
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
              label={`View ${project.name} source code on GitHub`}
            >
              Source
            </ProjectAction>

            {!liveUrl && !githubUrl && (
              <div
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  px-3 py-2
                  rounded-lg
                  border border-dashed
                  border-slate-200
                  dark:border-slate-800
                  text-xs font-medium
                  text-slate-400
                  dark:text-slate-500
                "
              >
                <FiCode
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />

                Coming soon
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
};

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

const EmptyState = () => (
  <motion.div
    variants={fadeUp}
    className="
      col-span-full
      flex flex-col
      items-center justify-center
      py-20
      text-center
    "
  >
    <div
      className="
        w-14 h-14
        flex items-center justify-center
        rounded-2xl
        bg-slate-100
        dark:bg-slate-900
        border border-slate-200
        dark:border-slate-800
        text-slate-400
        dark:text-slate-600
      "
    >
      <FiCodepen
        className="w-6 h-6"
        aria-hidden="true"
      />
    </div>

    <h3
      className="
        mt-4
        text-sm font-semibold
        text-slate-700
        dark:text-slate-300
      "
    >
      No projects found
    </h3>

    <p
      className="
        mt-1.5
        max-w-sm
        text-xs
        leading-5
        text-slate-400
        dark:text-slate-600
      "
    >
      There are no projects available in this category yet.
    </p>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

export default function Projects() {
  const [active, setActive] = useState("all");
  const shouldReduce = useReducedMotion();

  const projects = useMemo(
    () => (Array.isArray(projectData) ? projectData : []),
    []
  );

  const counts = useMemo(() => {
    const result = {
      all: projects.length,
    };

    FILTERS.forEach((filter) => {
      if (filter.value === "all") return;

      result[filter.value] = projects.filter(
        (project) =>
          project.category === filter.value
      ).length;
    });

    return result;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (active === "all") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === active
    );
  }, [active, projects]);

  return (
    <Section
      id="projects"
      aria-label="Selected projects"
    >
      <SectionHeader />

      <FilterBar
        active={active}
        onChange={setActive}
        counts={counts}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={
            shouldReduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  transition: {
                    duration: 0.15,
                  },
                }
          }
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id ?? project.name}
                project={project}
                shouldReduce={shouldReduce}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}