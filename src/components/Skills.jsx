import { MotionConfig, m } from "framer-motion";
import { TbLayoutDashboard } from "react-icons/tb";
import { HiOutlineServerStack } from "react-icons/hi2";
import {
  FiCode,
  FiDatabase,
  FiKey,
  FiLayers,
  FiLink,
  FiMonitor,
  FiRefreshCw,
  FiShield,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import {
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";
import { Section } from "./UI";

// --------------------------------------------------
// Content
// --------------------------------------------------

// Brand icons use their brand color. Black/white brand marks (Next.js,
// Express, GitHub, Vercel) use a light/dark pair so they stay visible in both
// themes. Concept chips (no brand) use the portfolio accent color.
const BRAND_DARK = "text-slate-900 dark:text-white";
const CONCEPT = "text-accent";

const SKILLS = [
  {
    title: "Programming Languages",
    description:
      "Core languages I use to build and reason about modern web applications.",
    icon: FiCode,
    skills: [
      { label: "JavaScript (ES6+)", icon: SiJavascript, color: "text-yellow-500" },
      { label: "HTML5", icon: SiHtml5, color: "text-orange-600" },
      { label: "CSS3", icon: FaCss3Alt, color: "text-blue-600" },
    ],
  },
  {
    title: "Frontend Development",
    description: "Building responsive interfaces and polished user experiences.",
    icon: TbLayoutDashboard,
    skills: [
      { label: "React.js", icon: SiReact, color: "text-cyan-500" },
      { label: "Next.js (Basic)", icon: SiNextdotjs, color: BRAND_DARK },
      { label: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
      { label: "Responsive Web Design", icon: FiMonitor, color: CONCEPT },
    ],
  },
  {
    title: "Backend Development",
    description: "Developing server-side logic and API-driven features.",
    icon: HiOutlineServerStack,
    skills: [
      { label: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
      { label: "Express.js", icon: SiExpress, color: "text-slate-800 dark:text-slate-200" },
      { label: "RESTful APIs", icon: FiLink, color: CONCEPT },
    ],
  },
  {
    title: "Database & Authentication",
    description:
      "Working with data storage and secure access flows for web apps.",
    icon: FiDatabase,
    skills: [
      { label: "MongoDB", icon: SiMongodb, color: "text-emerald-500" },
      { label: "Firebase Authentication", icon: SiFirebase, color: "text-amber-500" },
    ],
  },
  {
    title: "Tools & Platforms",
    description: "Using developer tools and deployment platforms effectively.",
    icon: FiTool,
    skills: [
      { label: "Git", icon: SiGit, color: "text-orange-600" },
      { label: "GitHub", icon: SiGithub, color: BRAND_DARK },
      { label: "VS Code", icon: VscVscode, color: "text-blue-500" },
      { label: "Netlify", icon: SiNetlify, color: "text-teal-500" },
      { label: "Vercel", icon: SiVercel, color: BRAND_DARK },
    ],
  },
  {
    title: "Core Technical Concepts",
    description:
      "Applying maintainable patterns and practical engineering thinking.",
    icon: FiLayers,
    skills: [
      { label: "REST API Integration", icon: FiRefreshCw, color: CONCEPT },
      { label: "Authentication & Authorization", icon: FiKey, color: CONCEPT },
      { label: "Role-Based Access Control", icon: FiShield, color: CONCEPT },
      { label: "CRUD Operations", icon: FiUsers, color: CONCEPT },
      { label: "Full-Stack Development", icon: FiLayers, color: CONCEPT },
    ],
  },
];

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

// `custom` is the card's column index, so cards in one row cascade slightly
// and each card animates when it actually scrolls into view.
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (column) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: column * 0.07 },
  }),
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// --------------------------------------------------
// Pieces
// --------------------------------------------------

function SkillChip({ label, icon: Icon, color }) {
  return (
    <li className="inline-flex select-none items-center gap-2 rounded-full border border-default bg-canvas px-3 py-1.5 text-[13px] font-medium leading-none text-primary shadow-sm transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-px hover:border-accent/40 hover:bg-accent/5 hover:text-strong motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Icon aria-hidden="true" className={`h-4 w-4 shrink-0 ${color}`} />
      <span>{label}</span>
    </li>
  );
}

function SkillCard({ item, index }) {
  const Icon = item.icon;
  const headingId = `skills-${slugify(item.title)}`;

  return (
    <m.article
      variants={cardVariants}
      custom={index % 3}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby={headingId}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-default bg-surface p-5 shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-16px_rgba(37,99,235,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
    >
      {/* Gradient accent line that draws in on hover (same blue -> indigo as Navbar/Hero) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />

      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:ring-transparent">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h3
            id={headingId}
            className="text-base font-semibold tracking-tight text-strong"
          >
            {item.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-muted">
            {item.description}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="my-5 h-px bg-[linear-gradient(to_right,transparent,theme(colors.slate.300/60%),transparent)] dark:bg-[linear-gradient(to_right,transparent,theme(colors.slate.600/60%),transparent)]" />

      <ul
        aria-label={`${item.title} skills`}
        className="flex flex-wrap gap-2"
      >
        {item.skills.map((skill) => (
          <SkillChip key={skill.label} {...skill} />
        ))}
      </ul>
    </m.article>
  );
}

// --------------------------------------------------
// Main Skills section
// --------------------------------------------------

export default function Skills({ id = "skills" }) {
  return (
    <MotionConfig reducedMotion="user">
      <Section
        id={id}
        aria-labelledby="skills-heading"
        background="bg-canvas-alt"
      >
        <div className="mx-auto max-w-6xl">
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
              Technical Expertise
            </m.p>

            <m.h2
              id="skills-heading"
              variants={fadeUp}
              className="text-balance text-section font-bold tracking-tight text-strong"
            >
              Skills &amp; Technologies
            </m.h2>

            <m.p
              variants={fadeUp}
              className="mt-4 text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              The languages, frameworks, and tools I use to build responsive
              interfaces, secure REST APIs, and full-stack web applications.
            </m.p>
          </m.header>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {SKILLS.map((item, index) => (
              <SkillCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </MotionConfig>
  );
}