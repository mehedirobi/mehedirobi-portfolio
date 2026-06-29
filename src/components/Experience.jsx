import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Section, Card, Badge } from "./UI";

// ─── Data

const EXPERIENCE = [
  {
    id:          "foundations",
    title:       "Frontend Developer",
    company:     "Self-Driven Development",
    type:        "Learning",
    period:      "2024",
    description: "Built strong fundamentals in modern frontend development with focus on real-world UI implementation.",
    points: [
      "HTML, CSS, JavaScript (ES6+) — core web standards",
      "Responsive UI with accessibility principles",
      "Layout systems, design consistency, and performance basics",
    ],
    status: "completed",
    color:  "emerald",
  },
  {
    id:          "react",
    title:       "React Developer",
    company:     "Project-Based Learning",
    type:        "Practice",
    period:      "2025",
    description: "Transitioned into component-based architecture using React for scalable frontend systems.",
    points: [
      "Reusable component architecture in React",
      "State management and REST API integration",
      "Tailwind CSS-based production UI workflows",
    ],
    status: "completed",
    color:  "sky",
  },
  {
    id:          "fullstack",
    title:       "Full-Stack Developer",
    company:     "Production-Level Practice",
    type:        "Active",
    period:      "2025 – Present",
    description: "Building production-style full-stack applications with real-world engineering practices.",
    points: [
      "Full-stack apps with authentication & CRUD operations",
      "Backend API development with Node.js & Express",
      "Database design and structured project architecture",
    ],
    status: "current",
    color:  "violet",
  },
];

// ─── Color map

const COLOR = {
  emerald: {
    dot:    "bg-emerald-500 dark:bg-emerald-400",
    ring:   "ring-emerald-100 dark:ring-emerald-900/40",
    border: "border-l-emerald-400 dark:border-l-emerald-500",
    badge:  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    bullet: "bg-emerald-400 dark:bg-emerald-500",
    icon:   "text-emerald-500 dark:text-emerald-400",
  },
  sky: {
    dot:    "bg-sky-500 dark:bg-sky-400",
    ring:   "ring-sky-100 dark:ring-sky-900/40",
    border: "border-l-sky-400 dark:border-l-sky-500",
    badge:  "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800",
    bullet: "bg-sky-400 dark:bg-sky-500",
    icon:   "text-sky-500 dark:text-sky-400",
  },
  violet: {
    dot:    "bg-violet-500 dark:bg-violet-400",
    ring:   "ring-violet-100 dark:ring-violet-900/40",
    border: "border-l-violet-400 dark:border-l-violet-500",
    badge:  "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
    bullet: "bg-violet-400 dark:bg-violet-500",
    icon:   "text-violet-500 dark:text-violet-400",
  },
};

// ─── Animations

const VIEWPORT = { once: true, amount: 0.2 };

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0,   transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── AnimatedLine

const AnimatedLine = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ["start 80%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="absolute left-[5px] top-5 bottom-5 w-px overflow-hidden"
      aria-hidden="true"
    >
      {/* Base track */}
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-emerald-400 via-sky-400 to-violet-400"
      />
    </div>
  );
};

// ─── TimelineDot

const TimelineDot = ({ color, isCurrent }) => {
  const c = COLOR[color];
  return (
    <div
      className="absolute left-0 top-[1.15rem] flex items-center justify-center"
      aria-hidden="true"
    >
      {isCurrent ? (
        <span className="relative flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${c.dot}`} />
          <span className={`relative inline-flex h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot} ${c.ring}`} />
        </span>
      ) : (
        <span className={`h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot}`} />
      )}
    </div>
  );
};

// ─── PeriodBadge

const PeriodBadge = ({ item }) => {
  const c = COLOR[item.color];
  const isCurrent = item.status === "current";

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full text-[11px] font-semibold
        border shrink-0 select-none
        ${c.badge}
      `}
    >
      {isCurrent && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${c.dot}`} />
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${c.dot}`} />
        </span>
      )}
      {isCurrent ? "Active" : item.period}
    </span>
  );
};

// ─── TypeChip

const TypeChip = ({ label }) => (
  <span className="
    px-2 py-0.5 rounded-md text-[10px] font-medium
    bg-slate-100 dark:bg-slate-800
    text-slate-500 dark:text-slate-400
    border border-slate-200 dark:border-slate-700
    leading-none select-none
  ">
    {label}
  </span>
);

// ─── TimelineItem 

const TimelineItem = ({ item }) => {
  const isCurrent = item.status === "current";
  const c         = COLOR[item.color];
  const ref       = useRef(null);
  const inView    = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative pl-10"
    >
      <TimelineDot color={item.color} isCurrent={isCurrent} />

      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
      >
        <Card
          className={`
            group h-full
            border-l-2 ${c.border}
            transition-shadow duration-300
            hover:shadow-md hover:shadow-slate-100 dark:hover:shadow-black/20
          `}
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <TypeChip label={item.type} />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.company}
              </p>
            </div>
            <PeriodBadge item={item} />
          </div>

          {/* ── Description ── */}
          <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {item.description}
          </p>

          {/* ── Divider ── */}
          <div className="border-t border-slate-100 dark:border-slate-800 my-4" />

          {/* ── Points ── */}
          <ul className="space-y-2.5" aria-label="Key highlights">
            {item.points.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <span
                  className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${c.bullet}`}
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>

        </Card>
      </motion.div>
    </motion.div>
  );
};

// ─── SectionHeader 

const SectionHeader = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="text-center mb-14"
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
        Journey
        <span className="w-4 h-px bg-current opacity-60" />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
      >
        Experience
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        A structured progression from frontend fundamentals to production-level full-stack development.
      </motion.p>
    </motion.div>
  );
};

// ─── Experience (main export) 

export default function Experience() {
  const timelineRef = useRef(null);

  return (
    <Section id="experience" aria-label="Work experience">

      <SectionHeader />

      <div
        ref={timelineRef}
        className="relative max-w-3xl mx-auto"
      >
        <AnimatedLine containerRef={timelineRef} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-7"
        >
          {EXPERIENCE.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

    </Section>
  );
}