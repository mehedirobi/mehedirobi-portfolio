<<<<<<< HEAD
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
    color: "blue",
  },
];

const SkillTag = ({ label }) => (
  <span className="px-3 py-1 text-xs md:text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 cursor-default hover:bg-blue-500 hover:text-white">
    {label}
  </span>
);

const ExperienceCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="relative pl-10 group"
  >
    {/* Timeline Dot */}
    <div className="absolute left-0 top-6 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400 shadow-md"></div>

    {/* Card */}
    <div className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 transform hover:scale-105 bg-white dark:bg-gray-800`}
      style={{ borderColor: "#3b82f6" }}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
          item.color === "green"
            ? "bg-green-600 text-white"
            : "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white"
        }`}>
          {item.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-sm md:text-base mb-4 text-gray-600 dark:text-gray-400">
        <span className="font-medium">{item.company}</span>
        <span>•</span>
        <span>{item.period}</span>
      </div>

      <p className="text-sm md:text-base leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
        {item.description}
      </p>

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
    <section id="experience" className="py-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl text-center mb-16 font-bold text-gray-900 dark:text-gray-100">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Experience</span>
        </h2>

        <div className="relative space-y-10 pl-2">
          {/* Timeline vertical line */}
          <div className="absolute top-6 left-2 w-0.5 h-[calc(100%-24px)] bg-gray-300 dark:bg-gray-700 -z-10"></div>

          {experienceData.map((item, index) => (
            <ExperienceCard key={index} item={item} index={index} />
=======
import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    responsibilities: [
      "Developed responsive web applications using React and Tailwind CSS",
      "Collaborated with clients to deliver custom web solutions",
      "Optimized code for performance and accessibility"
    ]
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>
        </motion.div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {exp.company}
                  </p>
                </div>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                  {exp.period}
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </motion.div>
>>>>>>> a8ffe3d (upgarted my portfolio)
          ))}
        </div>
      </div>
    </section>
  );
}