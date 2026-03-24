import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

export default function About() {
  const stats = [
    { value: '30+', label: 'Projects', color: 'from-blue-500 to-blue-600' },
    { value: '2+', label: 'Years Exp.', color: 'from-green-500 to-emerald-600' },
    { value: '100%', label: 'Commitment', color: 'from-purple-500 to-pink-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 flex justify-center"
      style={{
        background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))',
        color: 'var(--text-primary)'
      }}
    >
      <motion.div
        className="max-w-4xl w-full space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading Section */}
        <motion.div
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <h2 className="text-heading-1">
            About <span className="bg-gradient-to-r from-blue-400 to-blue-800 text-transparent bg-clip-text">Me</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-body-large pt-2" style={{ color: 'var(--text-secondary)' }}>
            Turning ideas into beautiful, functional digital experiences
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          variants={itemVariants}
        >
          <Card hover={true} className="space-y-8 p-8 md:p-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <p className="text-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-blue-400 font-semibold">👨‍💻 Frontend Specialist</span> - I specialize in frontend development with React, JavaScript, and modern CSS frameworks. I build responsive, accessible, and high-performance web applications that users love.
                </p>
                <p className="text-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-green-400 font-semibold">📚 Continuous Learner</span> - I'm passionate about staying up-to-date with modern web technologies and best practices, always focused on clean code and meaningful design that solves real problems.
                </p>
                <p className="text-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-purple-400 font-semibold">🎯 User-Centered</span> - My goal is to deliver real value to users and craft smooth, enjoyable digital experiences. I believe great interfaces are intuitive, fast, and beautifully designed.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                {[
                  { label: 'React Expert', icon: '⚛️' },
                  { label: 'Responsive Design', icon: '📱' },
                  { label: 'Performance Focus', icon: '⚡' },
                  { label: 'Clean Code', icon: '🧹' },
                  { label: 'UX Advocate', icon: '✨' },
                  { label: 'Problem Solver', icon: '🔧' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-lg border text-center"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                    whileHover={{ scale: 1.05, borderColor: '#60A5FA' }}
                  >
                    <span className="text-2xl block mb-1">{item.icon}</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t"
              style={{ borderColor: 'var(--border-color)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 mb-3 shadow-lg group-hover:shadow-xl transition-all`}>
                    <p className="text-3xl md:text-4xl font-black text-white">{stat.value}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
