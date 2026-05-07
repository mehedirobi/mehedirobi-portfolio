import React from "react";
import { motion } from "framer-motion";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FiCode } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Section, Card } from "./UI";

const highlights = [
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
      "Writing modular, reusable, and production-ready React code with clean architecture.",
  },
  {
    icon: HiOutlineColorSwatch,
    title: "UI Engineering",
    description:
      "Designing interfaces with strong UX principles, clarity, and visual consistency.",
  },
];

export default function About() {
  return (
    <Section id="about">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          About Me
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          A frontend developer focused on building scalable UI systems and
          high-performance web applications.
        </p>
      </motion.div>

      {/* Story Section */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <p className="text-slate-600 dark:text-slate-300 leading-7 text-base sm:text-lg">
          I work primarily with JavaScript, React, and Tailwind CSS. My focus is
          on building clean, maintainable frontend systems that scale in real
          production environments. I care about performance, usability, and
          structured code more than visual complexity.
        </p>
      </motion.div>

      {/* Highlights */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full group hover:-translate-y-1 transition-all duration-300">

              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <item.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}
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