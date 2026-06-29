import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Section, Card } from "./UI";

// ─── Data 

const EDUCATION = [
  {
    id:          "diploma-cst",
    degree:      "Diploma in Computer Science & Technology",
    institution: "Ahsanullah Institute of Technical and Vocational Education and Training",
    shortInstitution: "Ahsanullah ITVET",
    year:        "2023 – Present",
    status:      "In Progress",
    description: "Focused on software development, web technologies, and practical engineering fundamentals.",
    focus:       ["Web Development", "Software Engineering",],
    current:     true,
    color:       "sky",
  },
  {
    id:          "ssc-science",
    degree:      "Secondary School Certificate (SSC)",
    institution: "Khepupara Govt. Model Secondary High School",
    shortInstitution: "Khepupara Govt. School",
    year:        "2022",
    status:      "Completed",
    description: "Science background with strong foundation in mathematics and analytical thinking.",
    focus:       ["Mathematics", "Physics", "Chemistry", "Analytical Thinking"],
    current:     false,
    color:       "violet",
  },
];

// ─── Color map ────────────────────────────────────────────────────────────────

const COLOR = {
  sky: {
    dot:    "bg-sky-500 dark:bg-sky-400",
    ring:   "ring-sky-100 dark:ring-sky-900/40",
    border: "border-l-sky-400 dark:border-l-sky-500",
    badge:  "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800",
    tag:    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/25 dark:text-sky-400 dark:border-sky-800/60",
    icon:   "group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-white",
    bullet: "bg-sky-400 dark:bg-sky-500",
  },
  violet: {
    dot:    "bg-violet-500 dark:bg-violet-400",
    ring:   "ring-violet-100 dark:ring-violet-900/40",
    border: "border-l-violet-400 dark:border-l-violet-500",
    badge:  "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-800",
    tag:    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/25 dark:text-violet-400 dark:border-violet-800/60",
    icon:   "group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500 dark:group-hover:text-white",
    bullet: "bg-violet-400 dark:bg-violet-500",
  },
};

// ─── Animations ───────────────────────────────────────────────────────────────

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

// ─── AnimatedLine ─────────────────────────────────────────────────────────────

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
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-sky-400 to-violet-400"
      />
    </div>
  );
};

// ─── TimelineDot ──────────────────────────────────────────────────────────────

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
          <span className={`relative inline-flex h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot}`} />
        </span>
      ) : (
        <span className={`h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot}`} />
      )}
    </div>
  );
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const StatusBadge = ({ item }) => {
  const c         = COLOR[item.color];
  const isCurrent = item.current;

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
      {item.status}
    </span>
  );
};

// ─── FocusTag ─────────────────────────────────────────────────────────────────

const FocusTag = ({ label, colorClass }) => (
  <span
    className={`
      px-2.5 py-1 text-[11px] font-medium rounded-md
      border cursor-default leading-none
      ${colorClass}
    `}
  >
    {label}
  </span>
);

// ─── EducationCard ────────────────────────────────────────────────────────────

const EducationCard = ({ item }) => {
  const c      = COLOR[item.color];
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative pl-10"
    >
      <TimelineDot color={item.color} isCurrent={item.current} />

      <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }}>
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
            <div className="flex items-start gap-3 min-w-0 flex-1">

              {/* Icon */}
              <div
                className={`
                  shrink-0 mt-0.5 flex items-center justify-center
                  w-9 h-9 rounded-xl
                  bg-slate-100 dark:bg-slate-800
                  text-slate-500 dark:text-slate-400
                  transition-colors duration-300
                  ${c.icon}
                `}
              >
                <HiOutlineAcademicCap className="w-4.5 h-4.5" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
                  {item.degree}
                </h3>
                {/* Full name visible, short name for tight spaces */}
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-snug">
                  <span className="hidden sm:inline">{item.institution}</span>
                  <span className="inline sm:hidden">{item.shortInstitution}</span>
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                  {item.year}
                </p>
              </div>
            </div>

            <StatusBadge item={item} />
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-slate-100 dark:border-slate-800 my-4" />

          {/* ── Description ── */}
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4">
            {item.description}
          </p>

          {/* ── Focus tags ── */}
          {item.focus?.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
                Focus areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.focus.map((f) => (
                  <FocusTag key={f} label={f} colorClass={c.tag} />
                ))}
              </div>
            </div>
          )}

        </Card>
      </motion.div>
    </motion.div>
  );
};

// ─── SectionHeader ────────────────────────────────────────────────────────────

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
        Background
        <span className="w-4 h-px bg-current opacity-60" />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
      >
        Education
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        Academic background supporting technical foundations and problem-solving ability.
      </motion.p>
    </motion.div>
  );
};

// ─── Education (main export) ──────────────────────────────────────────────────

export default function Education() {
  const timelineRef = useRef(null);

  return (
    <Section id="education" aria-label="Education">

      <SectionHeader />

      <div ref={timelineRef} className="relative max-w-2xl mx-auto">
        <AnimatedLine containerRef={timelineRef} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-7"
        >
          {EDUCATION.map((item) => (
            <EducationCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

    </Section>
  );
}