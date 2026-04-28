import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

const experienceData = [
  {
    title: "Frontend Foundations",
    company: "Core Learning Phase",
    period: "2024",
    description:
      "Built a strong foundation in frontend development through structured practice and real implementation.",
    details: [
      "HTML, CSS, JavaScript fundamentals with responsive design",
      "Semantic UI and accessibility-focused development",
      "Modern layout building with performance awareness",
    ],
    current: false,
  },
  {
    title: "React Development",
    company: "Advanced Skill Phase",
    period: "2025",
    description:
      "Focused on component-based architecture and scalable frontend systems using React.",
    details: [
      "Reusable component architecture",
      "Tailwind CSS integration in production workflows",
      "Improved code structure and maintainability",
    ],
    current: false,
  },
  {
    title: "Real-World Projects",
    company: "Production Practice",
    period: "2025 - Present",
    description:
      "Building production-level applications with modern engineering practices and UI standards.",
    details: [
      "Full-stack and frontend-focused applications",
      "Performance optimization and clean architecture",
      "UI/UX aligned with real-world product requirements",
    ],
    current: true,
  },
];

const TimelineItem = ({ item }) => {
  return (
    <div className="relative pl-10">
      {/* Dot */}
      <div className="absolute left-0 top-2">
        <span
          className={`h-3 w-3 rounded-full block ${
            item.current ? "bg-sky-500" : "bg-slate-400 dark:bg-slate-600"
          }`}
        />
      </div>

      {/* Card */}
      <Card className="hover:shadow-sm transition-shadow duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {item.company}
            </p>
          </div>

          <Badge variant={item.current ? "primary" : "default"}>
            {item.current ? "Current" : item.period}
          </Badge>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {item.description}
        </p>

        {/* Details */}
        <ul className="mt-4 space-y-2">
          {item.details.map((detail, idx) => (
            <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default function Experience() {
  return (
    <Section id="experience">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Experience
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          A structured journey from fundamentals to real-world application development.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Line */}
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-10">
          {experienceData.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
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