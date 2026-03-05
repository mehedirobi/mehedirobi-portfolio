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
    <section id="experience" className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-5xl font-extrabold text-white text-center mb-12">
          My <span className="text-green-400">Experience</span>
        </h2>

        {/* Timeline */}
        <div className="relative space-y-8 pl-2">
          <div className="absolute top-4 left-[21px] h-[calc(100%-32px)] w-0.5 bg-gray-700 -z-10"></div>

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
                className={`bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${
                  item.color === "green" ? "border-green-400" : "border-gray-500"
                } transform hover:scale-105`}
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.color === "green" ? "bg-green-600 text-white" : "bg-gray-600 text-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <span className="font-medium text-gray-300">{item.company}</span>
                  <span>•</span>
                  <span>{item.period}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.description}</p>

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
  <span className="px-3 py-1 bg-gray-600 text-gray-200 text-xs rounded border border-gray-500">
    {label}
  </span>
);

export default Experience;
