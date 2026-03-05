import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

// Enhanced Skill Category Card
const SkillCategory = ({ icon, title, color, skills, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <Card className={`border-t-4 ${color} hover:shadow-2xl transition-all duration-300 flex flex-col h-full bg-gray-800 border-l-0 border-r-0 border-b-0`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <i className={`fas ${icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3 mt-auto">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            className="bg-gray-700 text-gray-200 text-sm px-4 py-2 rounded-full shadow-md border border-gray-600 hover:border-blue-400 transition-all duration-300"
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: '#374151',
              borderColor: '#3B82F6' 
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

  const proficiency = [
    { skill: 'React & JavaScript', level: 90, color: 'from-blue-500 to-blue-900' },
    { skill: 'Tailwind CSS & UI Design', level: 95, color: 'from-purple-500 to-purple-900' },
    { skill: 'Node.js & Backend', level: 80, color: 'from-green-500 to-green-900' },
    { skill: 'Web Performance & Optimization', level: 85, color: 'from-orange-500 to-orange-900' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="skills" className="py-20 md:py-32 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
            My <span className="bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text">Skills</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Skill Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.map((category, index) => (
            <SkillCategory key={index} {...category} />
          ))}
        </motion.div>

        {/* Proficiency Levels Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12 shadow-lg"
        >
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Proficiency Levels</h3>
          <div className="space-y-8">
            {proficiency.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-semibold text-lg">{item.skill}</span>
                  <motion.span
                    className={`bg-gradient-to-r ${item.color} text-white font-bold px-3 py-1 rounded-full text-sm`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.4 }}
                  >
                    {item.level}%
                  </motion.span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                  <motion.div
                    className={`bg-gradient-to-r ${item.color} h-4 rounded-full shadow-lg`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
