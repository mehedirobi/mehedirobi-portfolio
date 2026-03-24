import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: 'fab fa-github', url: 'https://github.com/mehedirobi', label: 'GitHub', color: 'from-gray-500 to-gray-600' },
    { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/mehedi-robi-76b38739b/', label: 'LinkedIn', color: 'from-blue-500 to-blue-600' },
    { icon: 'fab fa-twitter', url: 'https://x.com/mehedirobi01', label: 'Twitter', color: 'from-blue-400 to-blue-500' }
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
    <footer className="py-12 px-4 text-center border-t" style={{
      background: 'linear-gradient(to top, var(--bg-secondary), var(--bg-primary))',
      color: 'var(--text-muted)',
      borderColor: 'var(--border-color)'
    }}>
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
            <p className="text-body font-medium" style={{ color: 'var(--text-secondary)' }}>
              Built with <span className="text-red-400"></span> using React, JavaScript & Tailwind CSS
            </p>
            <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
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
            className="mx-auto flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--accent-color)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--bg-tertiary)';
              e.target.style.color = 'var(--text-secondary)';
            }}
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
