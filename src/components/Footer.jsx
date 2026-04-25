// Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
<<<<<<< HEAD
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedirobi/', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', url: 'https://x.com/mehedirobi01', label: 'Twitter' },
=======
  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedirobi/', label: 'LinkedIn' },
  ];

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
>>>>>>> a8ffe3d (upgarted my portfolio)
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

<<<<<<< HEAD
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 py-20 px-6 transition-colors duration-500">
      <motion.div
        className="container mx-auto max-w-6xl flex flex-col items-center gap-8"
=======
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto text-center"
>>>>>>> a8ffe3d (upgarted my portfolio)
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
<<<<<<< HEAD
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
=======
        {/* Developer Name */}
        <motion.h3
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          variants={itemVariants}
        >
          Mehedi Hasan
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-8"
          variants={itemVariants}
        >
          Building digital experiences with passion.
        </motion.p>

        {/* Navigation Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          variants={itemVariants}
        >
          {navLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Navigate to ${link.name}`}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-6 mb-8" variants={itemVariants}>
>>>>>>> a8ffe3d (upgarted my portfolio)
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white shadow-md transition-all duration-300"
              whileHover={{ scale: 1.2, y: -3 }}
              aria-label={link.label}
            >
              <i className={`${link.icon} text-xl md:text-2xl`} />
=======
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.label}
            >
              <i className={`${link.icon} text-lg`} />
>>>>>>> a8ffe3d (upgarted my portfolio)
            </motion.a>
          ))}
        </motion.div>

<<<<<<< HEAD
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
=======
        {/* Copyright */}
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-sm"
          variants={itemVariants}
        >
          © 2026 Mehedi Hasan. All rights reserved.
        </motion.p>
>>>>>>> a8ffe3d (upgarted my portfolio)
      </motion.div>
    </footer>
  );
}