import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

/**
 * EXPERIENCE DATA (clean + scalable)
 */
const experienceData = [
  {
    title: "Frontend Foundations",
    company: "Core Learning Phase",
    period: "2024",
    description:
      "Built strong fundamentals in frontend development through structured practice.",
    points: [
      "HTML, CSS, JavaScript fundamentals",
      "Responsive UI and accessibility principles",
      "Modern layout and performance awareness",
    ],
    status: "completed",
  },
  {
    title: "React Development",
    company: "Advanced Skill Phase",
    period: "2025",
    description:
      "Focused on scalable component-based architecture using React.",
    points: [
      "Reusable component architecture",
      "Tailwind CSS in production workflows",
      "Clean code and maintainable structure",
    ],
    status: "completed",
  },
  {
    title: "Real-World Projects",
    company: "Production Practice",
    period: "2025 - Present",
    description:
      "Building production-level applications with modern engineering practices.",
    points: [
      "Full-stack & frontend applications",
      "Performance optimization",
      "UI/UX aligned with real product standards",
    ],
    status: "current",
  },
];

/**
 * TIMELINE ITEM
 */
const TimelineItem = ({ item }) => {
  const isCurrent = item.status === "current";

  return (
    <div className="relative pl-10">

      {/* DOT */}
      <div className="absolute left-0 top-2">
        <span
          className={`block h-3 w-3 rounded-full ${
            isCurrent ? "bg-sky-500" : "bg-slate-400 dark:bg-slate-600"
          }`}
        />
      </div>

      {/* CARD */}
      <Card className="p-6 hover:shadow-md transition-shadow">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
              {item.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {item.company}
            </p>
          </div>

          <Badge variant={isCurrent ? "primary" : "default"}>
            {isCurrent ? "Current" : item.period}
          </Badge>

        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-6">
          {item.description}
        </p>

        {/* POINTS */}
        <ul className="mt-4 space-y-2">
          {item.points.map((point, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">

              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />

              <span>{point}</span>

            </li>
          ))}
        </ul>

      </Card>
    </div>
  );
};

/**
 * MAIN COMPONENT
 */
export default function Experience() {
  return (
    <Section id="experience">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Experience
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Structured journey from fundamentals to production-level development.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="relative max-w-5xl mx-auto">

        {/* LINE */}
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-10">
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <TimelineItem item={item} />
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
}