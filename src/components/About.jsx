import React from "react";
import { motion } from "framer-motion";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FiCode } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Section, Card } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ABOUT = {
  title:   "About Me",
  summary: "Frontend developer focused on scalable UI systems, performance-first architecture, and production-grade React applications.",
  story:   "I build modern web interfaces using JavaScript, React, and Tailwind CSS. My focus is engineering clean, maintainable, and reusable frontend systems that perform well in real-world applications.",
  highlights: [
    {
      icon:        RiLightbulbFlashLine,
      title:       "Problem Solving",
      description: "Breaking complex UI problems into scalable, maintainable frontend solutions.",
    },
    {
      icon:        FiCode,
      title:       "Engineering Focus",
      description: "Building modular React systems with clean architecture and predictable patterns.",
    },
    {
      icon:        HiOutlineColorSwatch,
      title:       "UI Engineering",
      description: "Crafting consistent, accessible interfaces with strong UX principles.",
    },
  ],
};

// ─── Animation ────────────────────────────────────────────────────────────────

const VIEWPORT = { once: true, amount: 0.25 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── HighlightCard ────────────────────────────────────────────────────────────

const HighlightCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full group">
      {/* Icon */}
      <div className="mb-5 inline-flex items-center justify-center
                      w-11 h-11 rounded-xl
                      bg-slate-100 dark:bg-slate-800/80
                      text-slate-600 dark:text-slate-300
                      group-hover:bg-slate-900 group-hover:text-white
                      dark:group-hover:bg-white dark:group-hover:text-slate-900
                      transition-colors duration-300">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </Card>
  </motion.div>
);

// ─── About ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <Section id="about" aria-label="About me">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-10"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-slate-400 dark:text-slate-600 mb-3"
        >
          Who I am
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          {ABOUT.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base sm:text-lg
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          {ABOUT.summary}
        </motion.p>
      </motion.div>

      {/* Story */}
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeUp}
        viewport={VIEWPORT}
        className="max-w-2xl mx-auto mb-14"
      >
        <div className="relative px-6 py-5 rounded-2xl
                        bg-slate-50 dark:bg-slate-900/60
                        border border-slate-100 dark:border-slate-800/80">
          {/* Decorative quote mark */}
          <span
            className="absolute -top-3 left-6 text-4xl leading-none
                       text-slate-200 dark:text-slate-800 select-none font-serif"
            aria-hidden="true"
          >
            "
          </span>
          <p className="text-center text-slate-600 dark:text-slate-300
                        leading-7 text-base sm:text-[1.05rem]">
            {ABOUT.story}
          </p>
        </div>
      </motion.div>

      {/* Highlights */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ABOUT.highlights.map((item, index) => (
          <HighlightCard key={item.title} {...item} index={index} />
        ))}
      </motion.div>

    </Section>
  );
}