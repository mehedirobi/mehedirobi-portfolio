import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const socialLinks = [
  { href: 'https://github.com/mehedirobi', icon: 'fab fa-github', label: 'GitHub', gradient: 'from-gray-700 to-gray-900' },
  { href: 'https://www.linkedin.com/in/mehedi-robi-76b38739b/', icon: 'fab fa-linkedin', label: 'LinkedIn', gradient: 'from-blue-500 to-blue-600' },
  { href: 'https://x.com/mehedirobi01', icon: 'fab fa-twitter', label: 'Twitter', gradient: 'from-blue-400 to-blue-500' },
  { href: 'https://www.facebook.com/mehedirobi', icon: 'fab fa-facebook', label: 'Facebook', gradient: 'from-blue-600 to-blue-700' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const buttonVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.8 } } };

export default function Hero() {
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 md:py-28 relative overflow-hidden
                 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      {/* Background Blobs */}
      <motion.div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-400/20 filter blur-2xl"
          animate={{ x: [0, 30, -20, 0], y: [0, 60, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-400/20 filter blur-2xl"
          animate={{ x: [0, -40, 30, 0], y: [0, -50, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-pink-500/5 dark:bg-pink-400/10 filter blur-3xl"
          animate={{ scale: [1, 1.1, 0.95, 1], opacity: [0.03, 0.06, 0.03, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div className="max-w-3xl w-full relative z-20" variants={containerVariants} initial="hidden" animate="visible">
        {/* Profile Image */}
        <motion.img
          src="https://i.ibb.co/yn3q9rhd/mehedirobi.png"
          alt="Mehedi Robi"
          className="w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-blue-400/60 dark:border-blue-500/50 shadow-2xl mx-auto mb-8"
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        />

        {/* Heading */}
        <motion.h1 className="text-4xl md:text-5xl font-bold mb-3" variants={itemVariants}>
          Hello, I'm{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Mehedi Robi
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p className="text-lg md:text-xl mb-6 text-gray-700 dark:text-gray-300" variants={itemVariants}>
          Passionate <span className="font-bold text-green-500">Frontend Developer</span> crafting beautiful digital experiences
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 mb-12" variants={itemVariants}>
          <Button variant="primary" size="lg" onClick={scrollToContact}>
            Get in Touch
          </Button>
          <a
            href="https://drive.google.com/file/d/1pTiuE_5Cyxb110Z2s0vAhALfQ6F9J5-J/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border rounded-lg font-semibold transition-all hover:bg-blue-500 hover:text-white"
          >
            <i className="fas fa-download"></i> Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex justify-center gap-4" variants={itemVariants}>
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white bg-gradient-to-br ${link.gradient} shadow-lg transition-transform duration-300`}
              whileHover={{ y: -3, scale: 1.1 }}
              aria-label={link.label}
            >
              <i className={link.icon}></i>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}