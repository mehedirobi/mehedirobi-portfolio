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
    <Card className={`border-t-4 ${color} hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-l-0 border-r-0 border-b-0`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <i className={`fas ${icon} text-2xl`} style={{ color: 'var(--text-primary)' }}></i>
        </div>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3 mt-auto">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            className="text-sm px-4 py-2 rounded-full shadow-md border hover:border-blue-400 transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-color)'
            }}
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
    <section id="skills" className="py-20 md:py-32 px-4" style={{
      background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))'
    }}>
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-1 mb-4" style={{ color: 'var(--text-primary)' }}>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillsData.map((category, index) => (
            <SkillCategory key={index} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}