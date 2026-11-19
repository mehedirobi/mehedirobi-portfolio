import { useId, useState } from "react";
import { MotionConfig, m } from "framer-motion";
import { FaCss3Alt, FaGithub } from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowUp,
  FiCodepen,
  FiExternalLink,
} from "react-icons/fi";
import {
  SiExpress,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiStripe,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

import { projectData } from "../data/projectData";
import { Section, Card, OptimizedImage } from "./UI";

// --------------------------------------------------
// Config
// --------------------------------------------------

const INITIAL_PROJECTS = 3;
const MAX_TECH_TAGS = 6;

// Known technologies get their brand icon. Anything else renders as a plain tag,
// so unknown names in projectData never break. Keys are normalized names
// (lowercase, letters and digits only), e.g. "React.js" -> "reactjs".
const BRAND_DARK = "text-slate-900 dark:text-white";

const TECH_ICONS = {
  javascript: [SiJavascript, "text-yellow-500"],
  html: [SiHtml5, "text-orange-600"],
  html5: [SiHtml5, "text-orange-600"],
  css: [FaCss3Alt, "text-blue-600"],
  css3: [FaCss3Alt, "text-blue-600"],
  react: [SiReact, "text-cyan-500"],
  reactjs: [SiReact, "text-cyan-500"],
  nextjs: [SiNextdotjs, BRAND_DARK],
  vite: [SiVite, "text-violet-500"],
  tailwind: [SiTailwindcss, "text-sky-500"],
  tailwindcss: [SiTailwindcss, "text-sky-500"],
  node: [SiNodedotjs, "text-green-600"],
  nodejs: [SiNodedotjs, "text-green-600"],
  express: [SiExpress, "text-slate-800 dark:text-slate-200"],
  expressjs: [SiExpress, "text-slate-800 dark:text-slate-200"],
  mongodb: [SiMongodb, "text-emerald-500"],
  firebase: [SiFirebase, "text-amber-500"],
  firebaseauth: [SiFirebase, "text-amber-500"],
  firebaseauthentication: [SiFirebase, "text-amber-500"],
  jwt: [SiJsonwebtokens, "text-fuchsia-500"],
  stripe: [SiStripe, "text-indigo-500"],
};

const normalizeTech = (value) =>
  String(value).toLowerCase().replace(/[^a-z0-9]/g, "");

// --------------------------------------------------
// Shared styles (kept in sync with Navbar.jsx and Hero.jsx)
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

const ACTION_BASE =
  "group relative inline-flex h-10 min-w-0 items-center justify-center gap-2 overflow-hidden rounded-full px-4 text-[13px] font-semibold " +
  "transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 " +
  FOCUS_RING;

// Same blue -> indigo gradient as the Navbar resume button
const ACTION_PRIMARY =
  `${ACTION_BASE} w-full border border-white/20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white ` +
  "shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_4px_14px_-4px_rgba(37,99,235,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] " +
  "hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_8px_22px_-4px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]";

const ACTION_SECONDARY =
  `${ACTION_BASE} w-full border border-default bg-surface text-primary shadow-sm ` +
  "hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md";

// --------------------------------------------------
// Animation (lightweight: opacity + small y shift, runs once)
// --------------------------------------------------

const EASE = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// `custom` is the card's column index: cards in one row cascade slightly, and
// each card animates when it actually scrolls into view.
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (column) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: column * 0.07 },
  }),
};

// --------------------------------------------------
// Pieces
// --------------------------------------------------

function SectionHeader() {
  return (
    <m.header
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
    >
      <m.p
        variants={fadeUp}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
      >
        Selected Work
      </m.p>

      <m.h2
        id="projects-heading"
        variants={fadeUp}
        className="text-balance text-section font-bold tracking-tight text-strong"
      >
        Featured Projects
      </m.h2>

      <m.p
        variants={fadeUp}
        className="mt-4 text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
      >
        A selection of projects that showcase my development skills, technical
        experience, and practical problem-solving.
      </m.p>
    </m.header>
  );
}

function TechTag({ label }) {
  const match = TECH_ICONS[normalizeTech(label)];
  const Icon = match?.[0];
  const color = match?.[1];

  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-default bg-canvas px-2.5 py-1 text-xs font-medium leading-none text-muted">
      {Icon && <Icon aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${color}`} />}
      <span>{label}</span>
    </li>
  );
}

function ProjectAction({ href, icon: Icon, label, variant = "secondary", children }) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={isPrimary ? ACTION_PRIMARY : ACTION_SECONDARY}
    >
      {/* Primary: the deeper gradient crossfades in on hover (never lighter) */}
      {isPrimary && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <Icon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ${isPrimary ? "relative z-10" : ""}`}
      />
      <span className={`truncate ${isPrimary ? "relative z-10" : ""}`}>
        {children}
      </span>
    </a>
  );
}

function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const headingId = useId();

  const tech = Array.isArray(project.tech) ? project.tech : [];
  const links = project.links ?? {};

  const liveUrl = links.live;
  const clientUrl = links.client ?? links.github;
  const serverUrl = links.server;

  const category = project.category?.toLowerCase().replace(/[\s-]/g, "");
  const isFullStack = category === "fullstack" || Boolean(serverUrl);

  // Only real links become buttons. Server appears only if a server URL exists.
  const repos = [
    clientUrl && {
      href: clientUrl,
      label: `View ${project.name} client repository`,
      text: isFullStack ? "Client" : "GitHub",
    },
    isFullStack &&
      serverUrl && {
        href: serverUrl,
        label: `View ${project.name} server repository`,
        text: "Server",
      },
  ].filter(Boolean);

  const hasActions = Boolean(liveUrl) || repos.length > 0;
  const hiddenTech = tech.slice(MAX_TECH_TAGS);

  return (
    // The motion element only handles entrance; hover styles live on the inner
    // Card so Framer's inline transform never overrides them.
    <m.article
      variants={cardVariants}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      aria-labelledby={headingId}
      className="h-full min-w-0"
    >
      <Card className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-default bg-surface p-0 shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-16px_rgba(37,99,235,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-default bg-canvas-alt">
          {project.image && !imageFailed ? (
            <OptimizedImage
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 384px"
              alt={`${project.name} project preview`}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 text-accent"
            >
              <FiCodepen className="h-9 w-9" />
              <span className="px-6 text-center text-base font-semibold text-strong">
                {project.name}
              </span>
            </div>
          )}

          {/* Soft bottom fade on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          {project.category && (
            <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[11px] font-semibold leading-none text-slate-800 shadow-sm dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-100">
              {project.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3
            id={headingId}
            className="text-lg font-semibold tracking-tight text-strong"
          >
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
            {project.description}
          </p>

          {tech.length > 0 && (
            <ul
              aria-label={`${project.name} technologies`}
              className="mt-4 flex flex-wrap gap-1.5"
            >
              {tech.slice(0, MAX_TECH_TAGS).map((item, i) => (
                <TechTag key={`${item}-${i}`} label={item} />
              ))}

              {hiddenTech.length > 0 && (
                <li
                  title={hiddenTech.join(", ")}
                  aria-label={`and ${hiddenTech.length} more: ${hiddenTech.join(", ")}`}
                  className="inline-flex items-center px-1 text-xs font-medium text-muted"
                >
                  +{hiddenTech.length} more
                </li>
              )}
            </ul>
          )}

          {/* Actions: pinned to the card bottom so every card lines up */}
          {hasActions && (
            <div className="mt-auto pt-6">
              <div className="space-y-2 border-t border-default pt-5">
                {liveUrl && (
                  <ProjectAction
                    href={liveUrl}
                    icon={FiExternalLink}
                    variant="primary"
                    label={`View ${project.name} live demo`}
                  >
                    Live Demo
                  </ProjectAction>
                )}

                {repos.length > 0 && (
                  <div
                    className={`grid gap-2 ${
                      repos.length > 1 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {repos.map((repo) => (
                      <ProjectAction
                        key={repo.text}
                        href={repo.href}
                        icon={FaGithub}
                        label={repo.label}
                      >
                        {repo.text}
                      </ProjectAction>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </m.article>
  );
}

// --------------------------------------------------
// Main Projects section
// --------------------------------------------------

export default function Projects({ id = "projects" }) {
  const [showAll, setShowAll] = useState(false);

  const projects = Array.isArray(projectData) ? projectData : [];
  const hasMore = projects.length > INITIAL_PROJECTS;
  const visibleProjects = showAll
    ? projects
    : projects.slice(0, INITIAL_PROJECTS);

  return (
    <MotionConfig reducedMotion="user">
      {/* bg-canvas (not -alt) so it alternates with the Skills section above */}
      <Section
        id={id}
        aria-labelledby="projects-heading"
        background="bg-canvas"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader />

          {projects.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted">
              No projects found. Please check your project data.
            </p>
          ) : (
            <div
              id="projects-grid"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id ?? project.name ?? index}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                aria-expanded={showAll}
                aria-controls="projects-grid"
                className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-default bg-surface px-6 text-sm font-semibold text-strong shadow-sm transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 ${FOCUS_RING}`}
              >
                {showAll ? "Show Less" : "View All Projects"}

                {showAll ? (
                  <FiArrowUp
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  />
                ) : (
                  <FiArrowDown
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  />
                )}
              </button>
            </div>
          )}

          {/* Screen reader status */}
          <p className="sr-only" aria-live="polite">
            Showing {visibleProjects.length} of {projects.length} projects.
          </p>
        </div>
      </Section>
    </MotionConfig>
  );
}