import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const stats = [
  { value: '30+', label: 'Projects', gradient: 'from-blue-500 to-blue-600' },
  { value: '2+', label: 'Years Exp.', gradient: 'from-green-500 to-emerald-600' },
  { value: '100%', label: 'Commitment', gradient: 'from-purple-500 to-pink-600' },
];

const highlights = [
  { icon: '⚛️', label: 'React Expert' },
  { icon: '📱', label: 'Responsive Design' },
  { icon: '⚡', label: 'Performance Focus' },
  { icon: '🧹', label: 'Clean Code' },
  { icon: '✨', label: 'UX Advocate' },
  { icon: '🔧', label: 'Problem Solver' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } },
};

const itemVariants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 flex justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-500"
    >
      <motion.div
        className="max-w-4xl w-full space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">Me</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-lg md:text-xl pt-2 text-gray-600 dark:text-gray-400">
            Turning ideas into beautiful, functional digital experiences
          </p>
        </motion.div>

        {/* Content Card */}
        <motion.div variants={itemVariants}>
          <Card hover className="space-y-8 p-8 md:p-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
            {/* Descriptions */}
            <div className="space-y-6">
              <p className="text-body leading-relaxed">
                <span className="text-blue-400 font-semibold">👨‍💻 Frontend Specialist</span> - Specializing in React, JavaScript, and modern CSS frameworks, building responsive, accessible, and performant web apps.
              </p>
              <p className="text-body leading-relaxed">
                <span className="text-green-400 font-semibold">📚 Continuous Learner</span> - Staying up-to-date with modern web technologies, writing clean code, and crafting meaningful designs.
              </p>
              <p className="text-body leading-relaxed">
                <span className="text-purple-400 font-semibold">🎯 User-Centered</span> - Delivering real value to users through intuitive and smooth digital experiences.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              {highlights.map((h, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 rounded-lg border text-center bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.08 }}
                >
                  <span className="text-2xl block mb-1">{h.icon}</span>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{h.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.08 }}
                >
                  <div className={`bg-gradient-to-br ${stat.gradient} rounded-lg p-4 mb-3 shadow-lg`}>
                    <p className="text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}