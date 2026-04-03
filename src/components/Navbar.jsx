import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const SECTIONS = ['home', 'about', 'skills', 'education', 'experience', 'projects', 'contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll & close mobile menu
  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  }, []);

  // Observe active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Framer motion variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, ease: 'easeOut' } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Mehedi Robi
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {SECTIONS.map((link) => {
            const isActive = active === link;
            return (
              <a
                key={link}
                href={`#${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            );
          })}
        </div>

        {/* Mobile & Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <i className={`fas fa-${open ? 'times' : 'bars'} text-xl text-gray-800 dark:text-gray-200`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden flex flex-col space-y-2 px-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg rounded-b-md"
          >
            {SECTIONS.map((link) => {
              const isActive = active === link;
              return (
                <motion.a
                  key={link}
                  variants={linkVariants}
                  href={`#${link}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}