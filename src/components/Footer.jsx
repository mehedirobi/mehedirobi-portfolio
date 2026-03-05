import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub', color: 'from-gray-500 to-gray-600' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedi-robi-76b38739b/', label: 'LinkedIn', color: 'from-blue-500 to-blue-600' },
    { icon: 'fab fa-twitter', url: 'https://x.com/mehedirobi01', label: 'Twitter', color: 'from-sky-400 to-sky-500' }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 py-12 px-4 text-center text-gray-400 border-t border-gray-700">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6"
            variants={itemVariants}
          >
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-lg hover:shadow-xl transition-all`}
                aria-label={link.label}
                title={link.label}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${link.icon} text-lg`}></i>
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
            variants={itemVariants}
          />

          {/* Copyright & Links */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <p className="text-sm md:text-base text-gray-300 font-medium">
              Built with <span className="text-red-400">❤</span> using React, JavaScript & Tailwind CSS
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              &copy; {currentYear} Mehedi Robi. All rights reserved.
            </p>
            <motion.div
              className="flex justify-center gap-6 text-sm pt-4"
              variants={containerVariants}
            >
              {[
                { href: '#home', label: 'Home' },
                { href: '#projects', label: 'Projects' },
                { href: '#contact', label: 'Contact' }
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  className="hover:text-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mx-auto flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-colors text-gray-300 hover:text-white text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll back to top"
          >
            <i className="fas fa-arrow-up"></i>
            Back to Top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
