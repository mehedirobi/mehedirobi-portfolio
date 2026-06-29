import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { TbCertificate } from "react-icons/tb";
import { Section } from "./UI";

// ─── Data

const CERTIFICATIONS = [
  {
    id:          "ph-fullstack",
    title:       "Complete Web Development Course",
    issuer:      "Programming Hero",
    year:        "2026",
    status:      "Completed",
    description:
      "Full-stack training covering modern frontend, backend, and real-world production workflows with hands-on projects.",
    skills: [
      { label: "JavaScript", color: "amber"   },
      { label: "React",      color: "sky"     },
      { label: "Node.js",    color: "emerald" },
      { label: "Express.js", color: "emerald" },
      { label: "MongoDB",    color: "emerald" },
      { label: "MERN",       color: "violet"  },
    ],
    highlights: [
      "60+ hours of structured curriculum",
      "10+ real-world projects built and deployed",
      "Authentication, CRUD, REST APIs covered",
    ],
  },
];

// ─── Color map 

const SKILL_COLORS = {
  amber:   "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/25 dark:text-amber-400 dark:border-amber-800/60",
  sky:     "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/25 dark:text-sky-400 dark:border-sky-800/60",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/25 dark:text-emerald-400 dark:border-emerald-800/60",
  violet:  "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/25 dark:text-violet-400 dark:border-violet-800/60",
  default: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700",
};

// ─── Animations 

const VIEWPORT = { once: true, amount: 0.2 };

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1,   transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const checkVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  show:   { pathLength: 1, opacity: 1, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
};

// ─── VerifiedBadge 

const VerifiedBadge = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="
        relative flex items-center gap-2
        px-3 py-1.5 rounded-full
        bg-emerald-50 dark:bg-emerald-900/30
        border border-emerald-200 dark:border-emerald-800/60
        text-emerald-700 dark:text-emerald-400
        text-xs font-semibold select-none
      "
    >
      {/* Animated checkmark SVG */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6.5" className="stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="1" />
        <motion.path
          d="M4 7l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={checkVariant}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        />
      </svg>
      Completed
    </motion.div>
  );
};

// ─── SkillTag 

const SkillTag = ({ skill }) => {
  const colorClass = SKILL_COLORS[skill.color] ?? SKILL_COLORS.default;
  return (
    <span
      className={`
        px-2.5 py-1 text-[11px] font-medium rounded-md
        border cursor-default leading-none
        ${colorClass}
      `}
    >
      {skill.label}
    </span>
  );
};

// ─── HighlightItem 

const HighlightItem = ({ text }) => (
  <li className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
    <HiOutlineBadgeCheck
      className="mt-0.5 w-4 h-4 shrink-0 text-emerald-500 dark:text-emerald-400"
      aria-hidden="true"
    />
    {text}
  </li>
);

// ─── CertCard 

const CertCard = ({ item }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -4, transition: { duration: 0.22 } }}
    className="
      group relative overflow-hidden rounded-2xl
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-800
      transition-shadow duration-300
      hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-black/30
    "
  >
    {/* Top accent bar */}
    <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400" />

    <div className="p-6 sm:p-8">

      {/* ── Top row ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

        {/* Icon + title */}
        <div className="flex items-start gap-4">
          <motion.div
            variants={scaleIn}
            className="
              shrink-0 flex items-center justify-center
              w-12 h-12 rounded-xl
              bg-slate-100 dark:bg-slate-800
              text-slate-500 dark:text-slate-400
              group-hover:bg-slate-900 group-hover:text-white
              dark:group-hover:bg-white dark:group-hover:text-slate-900
              transition-colors duration-300
            "
          >
            <TbCertificate className="w-6 h-6" aria-hidden="true" />
          </motion.div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
              {item.title}
            </h3>
            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.issuer}
              </p>
              <span className="text-slate-300 dark:text-slate-700 text-xs">·</span>
              <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                {item.year}
              </p>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        <VerifiedBadge />
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-slate-100 dark:border-slate-800 mb-6" />

      {/* ── Body: 2-col on md ── */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Left: description + highlights */}
        <div>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            {item.description}
          </p>
          {item.highlights?.length > 0 && (
            <ul className="space-y-2.5">
              {item.highlights.map((h) => (
                <HighlightItem key={h} text={h} />
              ))}
            </ul>
          )}
        </div>

        {/* Right: skills */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-3">
            Skills covered
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <SkillTag key={skill.label} skill={skill} />
            ))}
          </div>
        </div>

      </div>
    </div>
  </motion.div>
);

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
        Credentials
        <span className="w-4 h-px bg-current opacity-60" />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
      >
        Certifications
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        Professional training and verified achievements in modern web development.
      </motion.p>
    </motion.div>
  );
};

// ─── Certifications (main export) 

export default function Certifications() {
  return (
    <Section id="certifications" aria-label="Certifications">

      <SectionHeader />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="max-w-3xl mx-auto space-y-5"
      >
        {CERTIFICATIONS.map((item) => (
          <CertCard key={item.id} item={item} />
        ))}
      </motion.div>

    </Section>
  );
}