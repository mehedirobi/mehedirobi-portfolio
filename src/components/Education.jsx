import React from "react";
import { motion } from "framer-motion";

const Education = () => {
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

  return (
    <section id="education" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto max-w-4xl">
        {/* Section Heading */}
        <h2 className="text-heading-1 text-center mb-12" style={{ color: 'var(--text-primary)' }}>
          My <span style={{ color: 'var(--accent-color)' }}>Education</span>
        </h2>

        {/* Education Cards */}
        <div className="space-y-8">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 transform hover:scale-105"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderLeftColor: 'var(--accent-color)',
                boxShadow: 'var(--shadow-color)'
              }}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="text-blue-400 text-2xl mt-1 flex-shrink-0">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl font-bold hover:text-blue-300 transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {item.institute}
                    </p>
                  </div>
                </div>

                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  item.status === "Completed"
                    ? "bg-green-600 text-white"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-500 dark:text-white"
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2 pl-10">
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{item.year}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
