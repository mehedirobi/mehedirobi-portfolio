import React from "react";
import { motion } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Section, Card, Badge } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EDUCATION = [
  {
    degree:      "Diploma in Computer Science and Technology",
    institution: "Ahsanullah Institute of Technical and Vocational Education and Training",
    year:        "2023 – Present",
    status:      "In Progress",
    description: "Focused on software development, web technologies, and practical engineering fundamentals.",
    current:     true,
  },
  {
    degree:      "Higher Secondary Certificate (Science)",
    institution: "Khepupara Government Model Secondary High School",
    year:        "2022",
    status:      "Completed",
    description: "Science background with strong foundation in mathematics and analytical thinking.",
    current:     false,
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

// ─── EducationCard ────────────────────────────────────────────────────────────

const EducationCard = ({ item }) => (
  <motion.div variants={fadeUp} className="relative pl-10">

    {/* Timeline dot */}
    <div className="absolute left-0 top-[1.1rem] flex items-center justify-center" aria-hidden="true">
      {item.current ? (
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
      <Card className="group">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">

            {/* Icon */}
            <div className="shrink-0 mt-0.5 flex items-center justify-center
                            w-10 h-10 rounded-xl
                            bg-slate-100 dark:bg-slate-800/80
                            text-slate-500 dark:text-slate-400
                            group-hover:bg-slate-900 group-hover:text-white
                            dark:group-hover:bg-white dark:group-hover:text-slate-900
                            transition-colors duration-300">
              <HiOutlineAcademicCap className="w-5 h-5" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                {item.degree}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-snug">
                {item.institution}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <Badge variant={item.current ? "primary" : "default"}>
              {item.status}
            </Badge>
            <span className="text-xs text-slate-400 dark:text-slate-600 font-medium">
              {item.year}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800 mb-4" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {item.description}
        </p>

      </Card>
    </motion.div>
  </motion.div>
);

// ─── Education ────────────────────────────────────────────────────────────────

export default function Education() {
  return (
    <Section id="education" aria-label="Education">

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
          Background
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Education
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Academic background supporting technical foundations and problem-solving ability.
        </motion.p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative max-w-2xl mx-auto"
      >
        {/* Vertical line */}
        <div
          className="absolute left-[5px] top-5 bottom-5 w-px
                     bg-gradient-to-b from-slate-200 via-slate-200 to-transparent
                     dark:from-slate-800 dark:via-slate-800 dark:to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-7">
          {EDUCATION.map((item) => (
            <EducationCard key={item.degree} item={item} />
          ))}
        </div>
      </motion.div>

    </Section>
  );
}