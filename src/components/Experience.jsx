// Experience.jsx
import React from "react";
import { motion } from "framer-motion";

const experienceData = [
  {
    title: "Junior Web Developer",
    company: "Self-Employed",
    period: "2023 - 2025",
    status: "2 Years",
    description:
      "Collaborated with cross-functional teams to deliver responsive websites. Optimized legacy codebases for better SEO and accessibility compliance.",
    skills: ["HTML", "JavaScript", "React"],
    color: "gray",
  },
];

const SkillTag = ({ label }) => (
  <span
    className="px-3 py-1 text-xs rounded border transition-all duration-200 hover:bg-blue-500 hover:text-white"
    style={{
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-secondary)',
      borderColor: 'var(--border-color)'
    }}
  >
    {label}
  </span>
);

const ExperienceCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="relative pl-10 group"
  >
    {/* Timeline Dot */}
    <div
      className={`absolute left-[13px] top-1.5 w-4 h-4 rounded-full ${
        item.color === "green"
          ? "bg-green-400 border-2 border-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.2)]"
          : "bg-gray-500 border-2 border-gray-500 shadow-[0_0_0_4px_rgba(100,116,139,0.2)]"
      }`}
    ></div>

    {/* Card */}
    <div
      className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 transform hover:scale-105"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: item.color === "green" ? "#4ade80" : "#64748b",
      }}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            item.color === "green"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
          }`}
        >
          {item.status}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm mb-4 text-gray-600 dark:text-gray-400">
        <span className="font-medium">{item.company}</span>
        <span>•</span>
        <span>{item.period}</span>
      </div>

      <p className="text-sm leading-relaxed mb-4 text-gray-700 dark:text-gray-300">{item.description}</p>

      <div className="flex flex-wrap gap-2">
        {item.skills.map((skill, idx) => (
          <SkillTag key={idx} label={skill} />
        ))}
      </div>
    </div>
  </motion.div>
);

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl text-center mb-12 font-bold text-gray-900 dark:text-gray-100">
          My <span className="text-blue-500">Experience</span>
        </h2>

        <div className="relative space-y-8 pl-2">
          {/* Timeline vertical line */}
          <div className="absolute top-4 left-[21px] h-[calc(100%-32px)] w-0.5 -z-10 bg-gray-300 dark:bg-gray-700"></div>

          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}