import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['home', 'about', 'skills', 'education', 'experience', 'projects', 'contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  const handleNavClick = useCallback((e, id) => {
    e.preventDefault();
    if (id === 'home' && window && window.location && window.location.pathname !== '/') {
      try {
        window.history.pushState({}, '', '/');
      } catch {}
    }
    const el = document.getElementById(id);
    if (el) {
      try {
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      } catch {}
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    const options = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(callback, options);
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isNavOpen = open;

  return (
    <nav
      className="bg-gray-900/95 backdrop-blur-md p-4 fixed w-full z-50 shadow-xl border-b border-gray-800 transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover:scale-110 transition-transform duration-300 flex items-center gap-2"
          aria-label="Portfolio home"
          whileHover={{ scale: 1.05 }}
        >
          <span className="hidden sm:inline">Mehedi Robi</span>
          <span className="sm:hidden">Portfolio</span>
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          id="hamburger-button"
          onClick={() => setOpen(!open)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-2 transition duration-300 hover:bg-gray-800"
          aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isNavOpen}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas fa-${isNavOpen ? 'times' : 'bars'} text-xl`}></i>
        </motion.button>

        {/* Navigation Links */}
        <AnimatePresence>
          {(isNavOpen || window.innerWidth >= 768) && (
            <motion.div
              id="nav-links"
              className="md:flex space-x-1 md:space-x-1 absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-gray-900 md:bg-transparent flex-col md:flex-row overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {SECTIONS.map((link, idx) => {
                const label = link.charAt(0).toUpperCase() + link.slice(1);
                const isActive = active === link;
                const hrefValue = link === 'home' ? '/' : `#${link}`;
                return (
                  <motion.a
                    key={link}
                    href={hrefValue}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-4 py-3 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 block md:inline-block ${
                      isActive
                        ? 'text-blue-400 bg-blue-500/10 md:bg-transparent border-b-2 border-blue-400'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800 md:hover:bg-transparent'
                    }`}
                    role="menuitem"
                    whileHover={{ x: 2 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
