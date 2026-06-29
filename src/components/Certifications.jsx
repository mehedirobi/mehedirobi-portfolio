import React from "react";
import { motion } from "framer-motion";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Section, Card, Badge } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CERTIFICATIONS = [
  {
    title:       "Complete Web Development Course",
    issuer:      "Programming Hero",
    year:        "2026",
    status:      "Completed",
    description: "Full-stack training covering modern frontend, backend, and real-world production workflows with hands-on projects.",
    skills:      ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "MERN"],
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

// ─── SkillTag ─────────────────────────────────────────────────────────────────

const SkillTag = ({ label }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-lg
                   border border-slate-200 dark:border-slate-800
                   text-slate-500 dark:text-slate-400
                   bg-slate-50 dark:bg-slate-900/60
                   cursor-default">
    {label}
  </span>
);

// ─── CertificationCard ────────────────────────────────────────────────────────

const CertificationCard = ({ item }) => (
  <motion.div variants={fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
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
            <HiOutlineBadgeCheck className="w-5 h-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {item.issuer}
            </p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <Badge variant="secondary">{item.status}</Badge>
          <span className="text-xs text-slate-400 dark:text-slate-600 font-medium">
            {item.year}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-800 mb-4" />

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-5">
        {item.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {item.skills.map((skill) => (
          <SkillTag key={skill} label={skill} />
        ))}
      </div>

    </Card>
  </motion.div>
);

// ─── Certifications ───────────────────────────────────────────────────────────

export default function Certifications() {
  return (
    <Section id="certifications" aria-label="Certifications">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-slate-400 dark:text-slate-600 mb-3"
        >
          Credentials
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Certifications
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Professional training and verified learning achievements in modern web development.
        </motion.p>
      </motion.div>

      {/* List */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="max-w-2xl mx-auto space-y-4"
      >
        {CERTIFICATIONS.map((item) => (
          <CertificationCard key={item.title} item={item} />
        ))}
      </motion.div>

    </Section>
  );
}