// Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedirobi/', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', url: 'https://x.com/mehedirobi01', label: 'Twitter' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 py-20 px-6 transition-colors duration-500">
      <motion.div
        className="container mx-auto max-w-6xl flex flex-col items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white font-semibold shadow-md transition-all duration-300"
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          ⬆️ Back to Top
        </motion.button>

        {/* Social Links */}
        <motion.div className="flex gap-6 mt-4" variants={itemVariants}>
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white shadow-md transition-all duration-300"
              whileHover={{ scale: 1.2, y: -3 }}
              aria-label={link.label}
            >
              <i className={`${link.icon} text-xl md:text-2xl`} />
            </motion.a>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div className="flex flex-col items-center space-y-2 mt-6 text-center" variants={itemVariants}>
          <p className="text-gray-700 dark:text-gray-300 font-medium text-base md:text-lg">
            Built with React, Tailwind CSS & JavaScript
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
            &copy; {currentYear} Mehedi Robi. All rights reserved.
          </p>
          <div className="flex gap-6 pt-2 text-sm">
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
      </motion.div>
    </footer>
  );
}