import React from "react";
import { motion } from "framer-motion";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FiCode } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { Section, Card } from "./UI";

const highlights = [
  {
    icon: RiLightbulbFlashLine,
    title: "Problem Solver",
    description:
      "Breaking complex problems into simple, scalable engineering solutions.",
    iconStyle:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  {
    icon: FiCode,
    title: "Clean Code",
    description:
      "Writing maintainable, reusable, and production-ready codebases.",
    iconStyle:
      "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  },
  {
    icon: HiOutlineColorSwatch,
    title: "UI/UX Focus",
    description:
      "Building interfaces that balance usability, clarity, and visual polish.",
    iconStyle:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
];

export default function About() {
  return (
    <Section id="about">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
          About Me
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          Frontend developer focused on building fast, scalable, and
          user-centered web experiences.
        </p>
      </motion.div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-14"
      >
        <p className="mx-auto max-w-3xl text-center text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
          I work with modern frontend stacks like React and Tailwind CSS,
          focusing on performance, accessibility, and real-world usability.
          My goal is to build interfaces that are not only visually clean but
          also engineered for scale and maintainability.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              {/* Icon */}
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconStyle}`}
              >
                <item.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}