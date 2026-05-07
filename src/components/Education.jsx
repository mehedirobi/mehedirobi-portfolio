import React from "react";
import { motion } from "framer-motion";
import { Section, Card, Badge } from "./UI";

/**
 * EDUCATION DATA (clean + scalable)
 */
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

/**
 * EDUCATION CARD
 */
const EducationCard = ({ item }) => {
  const isCurrent = item.current;

  return (
    <Card className="p-7 hover:shadow-md transition-shadow duration-300">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">

        <div>
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
            {item.degree}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {item.institution}
          </p>
        </div>

        <Badge variant={isCurrent ? "primary" : "default"}>
          {item.status}
        </Badge>

      </div>

      {/* META */}
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {item.year}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {item.description}
      </p>

    </Card>
  );
};

/**
 * MAIN COMPONENT
 */
export default function Education() {
  return (
    <Section id="education">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Education
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Academic background supporting problem-solving skills and technical growth.
        </p>
      </motion.div>

      {/* TIMELINE STYLE WRAPPER */}
      <div className="relative max-w-4xl mx-auto">

        {/* vertical line */}
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="space-y-10">

          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-10"
            >

              {/* DOT */}
              <div className="absolute left-0 top-2">
                <span
                  className={`block h-3 w-3 rounded-full ${
                    item.current
                      ? "bg-sky-500"
                      : "bg-slate-400 dark:bg-slate-600"
                  }`}
                />
              </div>

              {/* CARD */}
              <EducationCard item={item} />

            </motion.div>
          ))}

        </div>

      </div>

    </Section>
  );
}