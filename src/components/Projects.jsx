import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiCode } from "react-icons/fi";
import { projectData } from "../data/projectData";
import { Section, Card } from "./UI";

// ─── Constants
const FILTERS = [
  { label: "All",        value: "all",       count: null },
  { label: "Frontend",   value: "frontend",  count: null },
  { label: "Full Stack", value: "fullstack", count: null },
];

// Category → accent color mapping (Tailwind classes)
const CATEGORY_COLORS = {
  frontend:  { dot: "bg-sky-400",    badge: "text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/30",    border: "border-sky-200 dark:border-sky-800"   },
  next:      { dot: "bg-violet-400", badge: "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30", border: "border-violet-200 dark:border-violet-800" },
  fullstack: { dot: "bg-emerald-400",badge: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30", border: "border-emerald-200 dark:border-emerald-800" },
  default:   { dot: "bg-slate-400",  badge: "text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-800",  border: "border-slate-200 dark:border-slate-800"  },
};

const CATEGORY_LABELS = {
  frontend:  "Frontend",
  next:      "Next.js",
  fullstack: "Full Stack",
};

// ─── Animations 

const VIEWPORT = { once: true, amount: 0.15 };

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: 10, scale: 0.96, transition: { duration: 0.2,  ease: "easeIn" } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22 } },
};

const overlayBtnVariants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } },
};

// ─── FilterBar 

const FilterBar = ({ active, onChange, counts }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    role="group"
    aria-label="Filter projects by category"
    className="flex justify-center flex-wrap gap-2 mb-10"
  >
    {FILTERS.map((f) => {
      const isActive = active === f.value;
      const count = counts[f.value];
      return (
        <motion.button
          key={f.value}
          variants={fadeUp}
          onClick={() => onChange(f.value)}
          aria-pressed={isActive}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`
            relative px-4 py-1.5 text-sm font-medium rounded-full
            border transition-colors duration-200 select-none
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:ring-slate-900/40
            dark:focus-visible:ring-white/40
            ${isActive
              ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
              : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white"
            }
          `}
        >
          {isActive && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white -z-10"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className="flex items-center gap-1.5">
            {f.label}
            {count !== undefined && count > 0 && (
              <span
                className={`
                  inline-flex items-center justify-center
                  min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold
                  transition-colors duration-200
                  ${isActive
                    ? "bg-white/20 text-white dark:bg-black/20 dark:text-slate-900"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }
                `}
              >
                {count}
              </span>
            )}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

// ─── TechTag 

const TechTag = ({ label }) => (
  <span
    className="
      px-2.5 py-1 text-[11px] font-medium rounded-md
      border border-slate-200 dark:border-slate-700/80
      text-slate-500 dark:text-slate-400
      bg-slate-50/80 dark:bg-slate-800/60
      leading-none cursor-default
    "
  >
    {label}
  </span>
);

// CategoryBadge 

const CategoryBadge = ({ category }) => {
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
  const label  = CATEGORY_LABELS[category] ?? category;
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-0.5 rounded-full text-[11px] font-medium
        border ${colors.border} ${colors.badge}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
      {label}
    </span>
  );
};

// ─── ProjectCard 

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  const techStack  = Array.isArray(project.tech)  ? project.tech  : [];
  const liveUrl    = project?.links?.live;
  const githubUrl  = project?.links?.github;
  const isFeatured = project?.featured === true;

  return (
    <motion.article
      variants={cardVariants}
      layout
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="h-full"
    >
      <Card
        className={`
          group h-full flex flex-col overflow-hidden p-0
          transition-shadow duration-300
          hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30
          ${isFeatured ? "ring-1 ring-slate-900/10 dark:ring-white/10" : ""}
        `}
      >
        {/* ── Image ── */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
          <motion.img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            decoding="async"
            animate={{ scale: hovered ? 1.045 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay with CTA buttons */}
          <AnimatePresence>
            {hovered && (liveUrl || githubUrl) && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="
                  absolute inset-0 flex items-center justify-center gap-3
                  bg-slate-900/60 dark:bg-slate-950/70
                  backdrop-blur-[2px]
                "
              >
                {liveUrl && (
                  <motion.a
                    variants={overlayBtnVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Live demo: ${project.name}`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2 rounded-lg text-sm font-medium
                      bg-white text-slate-900
                      hover:bg-slate-100
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                    "
                  >
                    <FiExternalLink className="w-3.5 h-3.5" aria-hidden />
                    Live Demo
                  </motion.a>
                )}
                {githubUrl && (
                  <motion.a
                    variants={overlayBtnVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub: ${project.name}`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="
                      inline-flex items-center gap-2
                      px-4 py-2 rounded-lg text-sm font-medium
                      bg-white/10 text-white border border-white/20
                      hover:bg-white/20
                      transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                    "
                  >
                    <FaGithub className="w-3.5 h-3.5" aria-hidden />
                    Code
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Featured badge */}
          {isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="
                inline-flex items-center gap-1
                px-2.5 py-0.5 rounded-full text-[10px] font-semibold
                bg-slate-900/90 text-white dark:bg-white/90 dark:text-slate-900
                backdrop-blur-sm
              ">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5">

          {/* Category badge + title row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
              {project.name}
            </h3>
            {project.category && (
              <CategoryBadge category={project.category} />
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          {techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {techStack.slice(0, 6).map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
              {techStack.length > 6 && (
                <span className="px-2.5 py-1 text-[11px] font-medium text-slate-400 dark:text-slate-500 leading-none">
                  +{techStack.length - 6} more
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-4 mb-3.5" />

          {/* Footer actions (fallback for non-hover devices) */}
          <div className="flex gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} live`}
                className="
                  flex-1 inline-flex items-center justify-center gap-1.5
                  px-3 py-2 rounded-lg text-xs font-medium
                  bg-slate-900 text-white dark:bg-white dark:text-slate-900
                  hover:opacity-85 active:scale-[0.97]
                  transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
                "
              >
                <FiExternalLink className="w-3 h-3" aria-hidden />
                Live
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} source code`}
                className="
                  flex-1 inline-flex items-center justify-center gap-1.5
                  px-3 py-2 rounded-lg text-xs font-medium
                  border border-slate-200 dark:border-slate-700
                  text-slate-600 dark:text-slate-300
                  hover:bg-slate-50 dark:hover:bg-slate-800/50
                  hover:border-slate-300 dark:hover:border-slate-600
                  active:scale-[0.97] transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
                "
              >
                <FaGithub className="w-3 h-3" aria-hidden />
                GitHub
              </a>
            )}
            {/* If no links, show a placeholder */}
            {!liveUrl && !githubUrl && (
              <span className="
                flex-1 inline-flex items-center justify-center gap-1.5
                px-3 py-2 rounded-lg text-xs font-medium
                border border-dashed border-slate-200 dark:border-slate-700
                text-slate-400 dark:text-slate-600 cursor-default
              ">
                <FiCode2 className="w-3 h-3" aria-hidden />
                Coming soon
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
};

//  EmptyState 

const EmptyState = () => (
  <motion.div
    variants={fadeUp}
    className="col-span-full flex flex-col items-center justify-center py-20 gap-3"
  >
    <div className="
      w-14 h-14 rounded-2xl
      bg-slate-100 dark:bg-slate-800
      flex items-center justify-center
      text-2xl text-slate-300 dark:text-slate-600
    ">
      <FiCode2 />
    </div>
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
      Nothing here yet
    </p>
    <p className="text-xs text-slate-400 dark:text-slate-600 text-center max-w-xs">
      Projects in this category are on the way. Check back soon.
    </p>
  </motion.div>
);

//  SectionHeader 

const SectionHeader = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="text-center mb-12"
    >
      <motion.p
        variants={fadeUp}
        className="
          inline-flex items-center gap-2
          text-[11px] font-semibold uppercase tracking-widest
          text-slate-400 dark:text-slate-500 mb-3
        "
      >
        <span className="w-4 h-px bg-current opacity-60" />
        Portfolio
        <span className="w-4 h-px bg-current opacity-60" />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
      >
        Selected Projects
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        Real-world apps built with modern frontend and full-stack technologies.
      </motion.p>
    </motion.div>
  );
};

// ─── Projects (main export) 

export default function Projects() {
  const [active, setActive] = useState("all");

  const all = useMemo(() => projectData ?? [], []);

  // Project counts per category (for filter badges)
  const counts = useMemo(() => {
    const map = { all: all.length };
    FILTERS.filter((f) => f.value !== "all").forEach((f) => {
      map[f.value] = all.filter((p) => p.category === f.value).length;
    });
    return map;
  }, [all]);

  const filtered = useMemo(
    () => (active === "all" ? all : all.filter((p) => p.category === active)),
    [active, all]
  );

  return (
    <Section id="projects" aria-label="Selected projects">

      <SectionHeader />

      <FilterBar active={active} onChange={setActive} counts={counts} />

      {/* Result count */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active + "-count"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-slate-400 dark:text-slate-600 mb-7 -mt-4"
        >
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </motion.p>
      </AnimatePresence>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          ) : (
            <EmptyState />
          )}
        </motion.div>
      </AnimatePresence>

    </Section>
  );
}