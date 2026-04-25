import React from "react";
import { motion } from "framer-motion";
<<<<<<< HEAD
import Card from "./Card";

const stats = [
  { value: "30+", label: "Projects", gradient: "from-blue-500 to-blue-600" },
  { value: "2+", label: "Years Exp.", gradient: "from-green-500 to-emerald-600" },
  { value: "100%", label: "Commitment", gradient: "from-purple-500 to-pink-600" },
];

const highlights = [
  { icon: "⚛️", label: "React Expert" },
  { icon: "📱", label: "Responsive Design" },
  { icon: "⚡", label: "Performance Focus" },
  { icon: "🧹", label: "Clean Code" },
  { icon: "✨", label: "UX Advocate" },
  { icon: "🔧", label: "Problem Solver" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.8 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-36 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <motion.div
        className="max-w-6xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Me</span>
          </h2>
          <motion.div
            className="h-1 w-24 mx-auto rounded bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: "96px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Turning ideas into beautiful, functional digital experiences
          </p>
        </motion.div>

        {/* About Card */}
        <motion.div variants={itemVariants}>
          <Card className="space-y-12 p-10 md:p-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl hover:shadow-3xl rounded-2xl transition-all duration-300">
            
            {/* Description */}
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base md:text-lg">
              <p>
                <span className="text-blue-400 font-semibold">👨‍💻 Frontend Specialist:</span> React, JavaScript, Tailwind, building responsive & high-performance web apps.
              </p>
              <p>
                <span className="text-green-400 font-semibold">📚 Continuous Learner:</span> Staying up-to-date with modern web tech, writing clean code & crafting meaningful designs.
              </p>
              <p>
                <span className="text-purple-400 font-semibold">🎯 User-Centered:</span> Delivering value through intuitive and smooth digital experiences.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
              {highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center shadow-sm hover:shadow-md transition-transform duration-300 cursor-default"
                  whileHover={{ scale: 1.07 }}
                >
                  <span className="text-4xl mb-2 block">{h.icon}</span>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{h.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-6 mb-3 shadow-lg`}>
                    <p className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </Card>
        </motion.div>
      </motion.div>
=======

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  return (
    <section
      id="about"
      className="py-20 px-6 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <motion.p variants={itemVariants}>
              Hi, I'm Mehedi Hasan, a passionate frontend developer based in Bangladesh. I specialize in creating modern, responsive web applications that deliver exceptional user experiences. With a strong foundation in React and JavaScript, I'm committed to building scalable solutions that users love.
            </motion.p>

            <motion.p variants={itemVariants}>
              My career focuses on leveraging modern technologies like React, Tailwind CSS, and Framer Motion to craft performant digital solutions. I believe in writing clean, maintainable code and staying current with the latest web standards and best practices.
            </motion.p>

            <motion.p variants={itemVariants}>
              My goal is to contribute to meaningful projects that make a positive impact on users' lives, while continuously growing my skills and helping others in the developer community. I'm always eager to learn new technologies and collaborate on exciting challenges.
            </motion.p>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
          </motion.div>
        </motion.div>
      </div>
>>>>>>> a8ffe3d (upgarted my portfolio)
    </section>
  );
}