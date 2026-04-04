import React from "react";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://github.com/mehedirobi", icon: "fab fa-github" },
  { href: "https://www.linkedin.com/in/mehedirobii/", icon: "fab fa-linkedin" },
  { href: "https://x.com/mehedirobii", icon: "fab fa-twitter" },
];

export default function Hero() {
  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg mx-auto md:mx-0"
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
            Frontend Developer
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 dark:text-white">
            I build{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              modern web applications
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            I specialize in building fast, scalable, and visually clean web
            applications using React, Tailwind, and modern frontend tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Hire Me
            </motion.button>

            <a
              href="https://drive.google.com/file/d/1FTSrUD1chcEFB-2LlUP9l0UFjx3nPJSA/view"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Social Links Inline */}
          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition-all duration-300"
              >
                <i className={`${link.icon} text-gray-700 dark:text-gray-300 text-lg`} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />
            <img
              src="https://i.ibb.co/yn3q9rhd/mehedirobi.png"
              alt="Mehedi"
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}