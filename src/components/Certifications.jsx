import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

const certifications = [
  {
    title: "Complete Web Development Course",
    institution: "Programming Hero",
    year: "2026",
    status: "Completed",
    description:
      "Full-stack web development training covering modern frontend and backend workflows with real project implementation.",
    skills: ["React", "Node.js", "JavaScript", "Full-Stack"],
  },
];

const CertificationCard = ({ item }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {item.institution}
          </p>
        </div>

        <Badge variant="secondary">{item.status}</Badge>
      </div>

      {/* Meta */}
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default function Certifications() {
  return (
    <Section id="certifications">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Certifications
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Professional training and certifications supporting full-stack development expertise.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto space-y-6">
        {certifications.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <CertificationCard item={item} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}