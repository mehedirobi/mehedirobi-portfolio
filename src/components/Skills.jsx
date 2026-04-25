<<<<<<< HEAD
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
      className={`border-t-4 ${color} hover:shadow-2xl transition-all duration-300 flex flex-col h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-2xl`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <i className={`fas ${icon} text-2xl text-white`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-3 mt-auto">
        {skills.map((skill, idx) => (
          <motion.span
            key={skill}
            className="text-sm px-4 py-2 rounded-full shadow-sm border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.08 }}
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
=======
import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", icon: "fab fa-html5", color: "#E34C26", bgColor: "#E34C2620", level: "Expert" },
  { name: "CSS", icon: "fab fa-css3-alt", color: "#1572B6", bgColor: "#1572B620", level: "Expert" },
  { name: "JavaScript", icon: "fab fa-js-square", color: "#F7DF1E", bgColor: "#F7DF1E20", level: "Advanced" },
  { name: "React", icon: "fab fa-react", color: "#61DAFB", bgColor: "#61DAFB20", level: "Advanced" },
  { name: "Tailwind CSS", icon: "fas fa-wind", color: "#06B6D4", bgColor: "#06B6D420", level: "Advanced" },
  { name: "Git", icon: "fab fa-git-alt", color: "#F1502F", bgColor: "#F1502F20", level: "Intermediate" },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };
>>>>>>> a8ffe3d (upgarted my portfolio)

  return (
    <section
      id="skills"
<<<<<<< HEAD
      className="py-24 md:py-36 px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            My <span className="bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text">Skills</span>
          </h2>
          <motion.div
            className="h-1 w-24 mx-auto rounded bg-gradient-to-r from-green-400 to-green-800 mt-4"
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
=======
      className="py-20 px-6 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Technologies I'm proficient with
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              {/* Glow effect background */}
              <div
                className="absolute inset-0 bg-gradient-to-r rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${skill.color}30, ${skill.color}10)`,
                }}
              />

              {/* Card */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 text-center border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center">
                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className="mb-4 p-3 rounded-xl transition-all duration-300"
                  style={{ backgroundColor: skill.bgColor }}
                >
                  <i
                    className={`${skill.icon} text-5xl`}
                    style={{ color: skill.color }}
                  />
                </motion.div>

                {/* Skill Name */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {skill.name}
                </h3>

                {/* Level Badge - Cleaner design */}
                <motion.span
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs font-medium px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: skill.bgColor,
                    color: skill.color,
                  }}
                >
                  {skill.level}
                </motion.span>
              </div>
            </motion.div>
>>>>>>> a8ffe3d (upgarted my portfolio)
          ))}
        </motion.div>
      </div>
    </section>
  );
}