import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub', gradient: 'from-gray-700 to-gray-900' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedi-robi-76b38739b/', label: 'LinkedIn', gradient: 'from-blue-500 to-blue-600' },
    { icon: 'fab fa-twitter', url: 'https://x.com/mehedirobi01', label: 'Twitter', gradient: 'from-blue-400 to-blue-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 px-4 text-center transition-colors">
      <motion.div
        className="container mx-auto max-w-6xl space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Social Links */}
        <motion.div className="flex justify-center gap-6" variants={itemVariants}>
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              aria-label={link.label}
              title={link.label}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${link.icon} text-lg`} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          variants={itemVariants}
        />

        {/* Info & Links */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Built with React, Tailwind CSS & JavaScript
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Mehedi Robi. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-sm pt-4">
            {['Home', 'Projects', 'Contact'].map((label, idx) => (
              <motion.a
                key={idx}
                href={`#${label.toLowerCase()}`}
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mx-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-300"
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll back to top"
        >
          <i className="fas fa-arrow-up" />
          Back to Top
        </motion.button>
      </motion.div>
    </footer>
  );
}