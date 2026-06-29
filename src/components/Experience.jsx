import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    title:       "Frontend Developer (Foundations)",
    company:     "Self-Driven Development",
    period:      "2024",
    description: "Built strong fundamentals in modern frontend development with focus on real-world UI implementation.",
    points: [
      "Core web technologies: HTML, CSS, JavaScript (ES6+)",
      "Responsive UI development with accessibility principles",
      "Layout systems, design consistency and performance basics",
    ],
    status: "completed",
  },
  {
    title:       "React Developer",
    company:     "Project-Based Learning",
    period:      "2025",
    description: "Transitioned into component-based architecture using React for scalable frontend systems.",
    points: [
      "Reusable component architecture in React",
      "State management and API integration",
      "Tailwind CSS-based production UI workflows",
    ],
    status: "completed",
  },
  {
    title:       "Full-Stack Project Development",
    company:     "Production-Level Practice",
    period:      "2025 – Present",
    description: "Building production-style full-stack applications with modern engineering practices.",
    points: [
      "Full-stack applications with authentication & CRUD systems",
      "Backend API development with Node.js & Express",
      "Database design and real-world project structuring",
    ],
    status: "current",
  },
];

// ─── Animation ────────────────────────────────────────────────────────────────

const VIEWPORT = { once: true, amount: 0.2 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── TimelineItem ─────────────────────────────────────────────────────────────

const TimelineItem = ({ item, index }) => {
  const isCurrent = item.status === "current";

  return (
    <motion.div variants={fadeUp} className="relative pl-10">

      {/* Timeline dot */}
      <div className="absolute left-0 top-[1.1rem] flex items-center justify-center" aria-hidden="true">
        {isCurrent ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500" />
          </span>
        ) : (
          <span className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-950" />
        )}
      </div>

      {/* Card */}
      <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
        <Card className="group h-full">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.company}
              </p>
            </div>

            <Badge variant={isCurrent ? "primary" : "default"} className="shrink-0">
              {isCurrent ? "Current" : item.period}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            {item.description}
          </p>

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800 mb-4" />

          {/* Points */}
          <ul className="space-y-2.5" aria-label="Key highlights">
            {item.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <span
                  className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full
                             bg-sky-500 dark:bg-sky-400"
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

// ─── Experience ───────────────────────────────────────────────────────────────

export default function Experience() {
  return (
    <Section id="experience" aria-label="Work experience">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-14"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-slate-400 dark:text-slate-600 mb-3"
        >
          My journey
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Experience
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          A structured progression from frontend fundamentals to production-level full-stack development.
        </motion.p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative max-w-3xl mx-auto"
      >
        {/* Vertical line */}
        <div
          className="absolute left-[5px] top-5 bottom-5 w-px
                     bg-gradient-to-b from-slate-200 via-slate-200 to-transparent
                     dark:from-slate-800 dark:via-slate-800 dark:to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-7">
          {EXPERIENCE.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </motion.div>

    </Section>
  );
}