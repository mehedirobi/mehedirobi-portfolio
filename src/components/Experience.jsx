import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  const experienceData = [
    // {
    //   title: "Senior Frontend Developer",
    //   company: "TechCorp Inc.",
    //   period: "2021 - Present",
    //   status: "Current",
    //   description:
    //     "Leading the frontend migration to React 18, improving site performance by 40%. Mentoring junior developers and implementing comprehensive design systems.",
    //   skills: ["React", "TypeScript", "Tailwind"],
    //   color: "green",
    // },
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
    // {
    //   title: "Freelance Developer",
    //   company: "Self-Employed",
    //   period: "2018 - 2019",
    //   status: "1 Year",
    //   description:
    //     "Built custom WordPress themes and plugins for small businesses. Managed client communication and project timelines effectively.",
    //   skills: ["WordPress", "jQuery", "CSS3"],
    //   color: "gray",
    // },
  ];

  return (
    <section id="experience" className="py-20 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-heading-1 text-center mb-12" style={{ color: 'var(--text-primary)' }}>
          My <span style={{ color: 'var(--accent-color)' }}>Experience</span>
        </h2>

        {/* Timeline */}
        <div className="relative space-y-8 pl-2">
          <div className="absolute top-4 left-[21px] h-[calc(100%-32px)] w-0.5 -z-10" style={{ backgroundColor: 'var(--border-color)' }}></div>

          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-10 group"
            >
              <div
                className={`absolute left-[13px] top-1.5 size-4 rounded-full ${
                  item.color === "green" ? "bg-green-400 border-2 border-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.2)]" : "bg-gray-500 border-2 border-gray-500 shadow-[0_0_0_4px_rgba(100,116,139,0.2)]"
                }`}
              ></div>

              <div
                className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 transform hover:scale-105`}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: item.color === "green" ? "#4ade80" : "#64748b",
                  boxShadow: 'var(--shadow-color)'
                }}
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.color === "green" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{item.company}</span>
                  <span>•</span>
                  <span>{item.period}</span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, idx) => (
                    <SkillTag key={idx} label={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillTag = ({ label }) => (
  <span className="px-3 py-1 text-xs rounded border" style={{
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    borderColor: 'var(--border-color)'
  }}>
    {label}
  </span>
);

export default Experience;
