import React from "react";
import { motion } from "framer-motion";
import { Section, Card } from "./UI";

import {
  RiLightbulbFlashLine,
} from "react-icons/ri";
import {
  FiCode,
} from "react-icons/fi";
import {
  HiOutlineColorSwatch,
} from "react-icons/hi";

/**
 * DATA (kept inside same file as requested)
 */
const ABOUT = {
  title: "About Me",

  summary:
    "Frontend developer focused on scalable UI systems, performance-first architecture, and production-grade React applications.",

  story:
    "I build modern web interfaces using JavaScript, React, and Tailwind CSS. My focus is engineering clean, maintainable, and reusable frontend systems that perform well in real-world applications.",

  highlights: [
    {
      icon: RiLightbulbFlashLine,
      title: "Problem Solving",
      description:
        "Breaking complex UI problems into scalable, maintainable frontend solutions.",
    },
    {
      icon: FiCode,
      title: "Engineering Focus",
      description:
        "Building modular React systems with clean architecture and predictable patterns.",
    },
    {
      icon: HiOutlineColorSwatch,
      title: "UI Engineering",
      description:
        "Crafting consistent, accessible interfaces with strong UX principles.",
    },
  ],
};

/**
 * Animation presets (reusable, cleaner)
 */
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <Section id="about">

      {/* HEADER */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.08 }}
        className="text-center mb-12"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white"
        >
          {ABOUT.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base sm:text-lg"
        >
          {ABOUT.summary}
        </motion.p>
      </motion.div>

      {/* STORY */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-7 text-base sm:text-lg">
          {ABOUT.story}
        </p>
      </motion.div>

      {/* HIGHLIGHTS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT.highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card className="h-full hover:-translate-y-1 transition-all duration-300">

              {/* ICON */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <item.icon className="h-6 w-6" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>

            </Card>
          </motion.div>
        ))}
      </div>

    </Section>
  );
}