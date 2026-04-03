import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const SkillCategory = ({ icon, title, color, skills, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <Card
      className={`border-t-4 ${color} hover:shadow-2xl transition-all duration-300 flex flex-col h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <i className={`fas ${icon} text-2xl text-white`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3 mt-auto">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            className="text-sm px-4 py-2 rounded-full shadow-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300 cursor-default"
            whileHover={{
              scale: 1.1,
              backgroundColor: 'var(--tw-bg-opacity)', // maintain gradient fallback
              borderColor: 'var(--tw-border-opacity)',
            }}
            transition={{ delay: idx * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </Card>
  </motion.div>
);

export default function Skills() {
  const skillsData = [
    {
      icon: 'fa-code',
      title: 'Frontend',
      color: 'border-blue-400',
      gradient: 'from-blue-500 to-cyan-500',
      skills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'],
    },
    {
      icon: 'fa-server',
      title: 'Backend',
      color: 'border-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Firebase'],
    },
    {
      icon: 'fa-wrench',
      title: 'Tools & Workflow',
      color: 'border-green-400',
      gradient: 'from-green-500 to-emerald-500',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vite'],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            My <span className="bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text">Skills</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.map((category, idx) => (
            <SkillCategory key={idx} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}