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
    <Card className="p-6 sm:p-7 hover:shadow-md transition-all duration-300">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {item.degree}
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {item.institution}
          </p>
        </div>

        <Badge variant={item.current ? "primary" : "default"}>
          {item.status}
        </Badge>

      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>

    </Card>
  );
};

export default function Education() {
  return (
    <Section id="education">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Education
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Academic background supporting technical foundations and problem-solving ability.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <div className="relative max-w-4xl mx-auto">

        {/* LINE */}
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-10">

          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-10"
            >

              {/* DOT */}
              <div className="absolute left-0 top-2">
                <span
                  className={`h-3 w-3 rounded-full block ${
                    item.current
                      ? "bg-sky-500"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                />
              </div>

              <EducationCard item={item} />

            </motion.div>
          ))}

        </div>

      </div>
    </Section>
  );
}