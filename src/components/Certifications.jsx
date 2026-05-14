import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

const certifications = [
  {
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    year: "2026",
    status: "Completed",
    description:
      "Full-stack training covering modern frontend, backend, and real-world production workflows with hands-on projects.",
    skills: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "MERN"],
  },
];

const CertificationCard = ({ item }) => {
  return (
    <Card className="p-6 sm:p-7 hover:shadow-md transition-all duration-300">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {item.issuer}
          </p>
        </div>

        <Badge variant="secondary">
          {item.status}
        </Badge>
      </div>

      {/* META */}
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>

      {/* SKILLS */}
      <div className="mt-5 flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
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

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Certifications
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Professional training and verified learning achievements in modern web development.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-3xl mx-auto space-y-6">
        {certifications.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <CertificationCard item={item} />
          </motion.div>
        ))}
      </div>

    </Section>
  );
}