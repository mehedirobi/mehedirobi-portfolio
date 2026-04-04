// Education.jsx
import React from "react";
import { motion } from "framer-motion";

const educationData = [
  {
    icon: "fa-graduation-cap",
    title: "Diploma in Computer Science And Technology",
    institute: "Ahsanullah Institute of Technical and Vocational Education and Training",
    status: "In Progress",
    year: "2023 - Present",
    description: "Specialized in Web Development. Focused on practical projects and modern web technologies.",
  },
  {
    icon: "fa-book",
    title: "Web Development Certification",
    institute: "Programming Hero",
    status: "Completed",
    year: "2025",
    description: "Intensive bootcamp focusing on modern JavaScript frameworks and responsive design principles.",
  },
  {
    icon: "fa-school",
    title: "Higher Secondary Certificate",
    institute: "Khepupara Government Model Secondary High School",
    status: "Completed",
    year: "2018 - 2022",
    description: "Focus on Science (Physics, Chemistry, Mathematics).",
  },
];

const EducationCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 transform hover:scale-105 bg-white dark:bg-gray-800 border-gradient-to-b from-blue-400 to-purple-500"
  >
    {/* Top Row */}
    <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="text-blue-500 dark:text-blue-400 text-2xl mt-1 flex-shrink-0">
          <i className={`fas ${item.icon}`}></i>
        </div>
        <div className="min-w-0">
          <h3 className="text-xl md:text-2xl font-bold hover:text-blue-500 transition-colors text-gray-900 dark:text-gray-100">
            {item.title}
          </h3>
          <p className="text-sm md:text-base font-medium mt-1 text-gray-600 dark:text-gray-300">
            {item.institute}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold flex-shrink-0 ${
          item.status === "Completed"
            ? "bg-green-500 text-white dark:bg-green-600"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-500 dark:text-white"
        }`}
      >
        {item.status}
      </span>
    </div>

    {/* Details */}
    <div className="flex flex-col gap-2 pl-10">
      <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
        {item.year}
      </p>
      <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {item.description}
      </p>
    </div>
  </motion.div>
);

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto max-w-5xl">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl text-center mb-16 font-bold text-gray-900 dark:text-gray-100">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Education</span>
        </h2>

        {/* Education Cards */}
        <div className="space-y-8 md:space-y-12">
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}