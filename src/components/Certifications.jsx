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
    skills: ["JavaScript", "React", "Node.js", "Express js", "MongoDB", "Mern Stack"],
  },
];

const CertificationCard = ({ item }) => {
  return (
    <Card className="p-8 hover:shadow-lg transition-all duration-300">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">

        <div>
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {item.issuer}
          </p>
        </div>

        <Badge variant="secondary">{item.status}</Badge>

      </div>

      {/* META */}
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>

      {/* SKILLS */}
      <div className="mt-6 flex flex-wrap gap-2">
        {item.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
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
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Certifications
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Professional training and structured learning achievements in modern web development.
        </p>
      </motion.div>

      {/* LAYOUT (BIGGER + CLEAN SPACING) */}
      <div className="max-w-4xl mx-auto space-y-8">

        {certifications.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
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