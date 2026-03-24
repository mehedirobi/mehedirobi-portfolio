import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

export default function Hero() {
  // Enhanced Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: 'easeOut'
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.0,
        ease: 'easeOut'
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.0,
        delay: 0.5,
        ease: 'easeOut'
      },
    },
  };

  // Handle smooth scrolling to contact
  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)'
      }}
    >
      {/* Background Decorative Shapes - pushed behind content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blue gradient blob */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-5 -z-10"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        {/* Purple gradient blob */}
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-5 -z-10"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, -50, 40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        {/* Pink accent blob */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-3 -z-10"
          animate={{
            scale: [1, 1.1, 0.95, 1],
            opacity: [0.03, 0.06, 0.03, 0.03],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="max-w-3xl w-full relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div
          className="mb-8 md:mb-10 relative z-30"
          variants={imageVariants}
        >
          <div className="relative inline-block mx-auto">
            {/* Glow background behind image */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 -z-10"
              animate={{
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            {/* Profile Image */}
            <motion.img
              src="https://i.ibb.co/yn3q9rhd/mehedirobi.png"
              alt="Mehedi Robi - Frontend Developer"
              className="relative rounded-full w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover border-4 md:border-5 border-blue-400/60 shadow-2xl ring ring-white ring-opacity-20"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
              }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            />

            {/* Gradient border effect */}
            <div
              className="inset-0 rounded-full border-4 md:border-5 border-transparent bg-gradient-to-br from-blue-400/30 to-purple-400/10"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="mb-4 md:mb-6"
          variants={itemVariants}
        >
          <h1 className="text-display leading-tight mb-3" style={{ color: 'var(--text-primary)' }}>
            Hello, I'm{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Mehedi Robi
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.6 }}
                aria-hidden="true"
              />
            </span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="text-body-large mb-5 md:mb-7 leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          A Passionate{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 font-bold">
            Frontend Developer
          </span>
          <br className="hidden sm:inline" />
          <span className="block sm:inline">crafting beautiful digital experiences</span>
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
          variants={itemVariants}
        >
          I specialize in building responsive, modern web applications with React, JavaScript, and Tailwind CSS. 
          Passionate about delivering exceptional user experiences and writing clean, performance-driven code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mb-12 md:mb-16"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleContactScroll}
              className="group w-full sm:w-auto"
            >
              <i className="fas fa-envelope group-hover:rotate-12 transition-transform duration-300"></i>
              Get in Touch
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <a
              href="https://drive.google.com/file/d/1f35oYWSu3n_BsvshWm-fMDHHhIEPn4l8/view?usp=sharing"
              target="_blank"
              download
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border rounded-lg font-semibold transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-color)';
                e.target.style.borderColor = 'var(--accent-hover)';
                e.target.style.color = 'var(--bg-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--bg-tertiary)';
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.color = 'var(--text-primary)';
              }}
            >
              <i className="fas fa-download"></i>
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center items-center gap-4 md:gap-6 mb-16"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/mehedirobi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
              color: 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))';
              e.target.style.color = 'var(--text-secondary)';
            }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/mehedirobii/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
              color: 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))';
              e.target.style.color = 'var(--text-secondary)';
            }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </motion.a>

          <motion.a
            href="https://x.com/mehedirobii"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
              color: 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0ea5e9, #06b6d4)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))';
              e.target.style.color = 'var(--text-secondary)';
            }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </motion.a>

          <motion.a
            href="https://www.facebook.com/mehedirobii"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
              color: 'var(--text-secondary)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
              e.target.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))';
              e.target.style.color = 'var(--text-secondary)';
            }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}