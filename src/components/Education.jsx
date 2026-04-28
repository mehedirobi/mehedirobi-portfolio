import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

const education = [
  {
    degree: "Diploma in Computer Science and Technology",
    institution:
      "Ahsanullah Institute of Technical and Vocational Education and Training",
    year: "2023 - Present",
    status: "In Progress",
    description:
      "Focused on software development, web technologies, and practical engineering fundamentals.",
    current: true,
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Khepupara Government Model Secondary High School",
    year: "2022",
    status: "Completed",
    description:
      "Science background with strong foundation in mathematics and analytical thinking.",
    current: false,
  },
];

const EducationCard = ({ item }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            {item.degree}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {item.institution}
          </p>
        </div>

        <Badge variant={item.current ? "primary" : "default"}>
          {item.status}
        </Badge>
      </div>

      {/* Year */}
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>
    </Card>
  );
};

export default function Education() {
  return (
    <Section id="education">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Education
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Academic background supporting technical growth and problem-solving foundation.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <EducationCard item={item} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}