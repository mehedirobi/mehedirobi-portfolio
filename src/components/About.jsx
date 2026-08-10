import React from "react";
import { motion } from "framer-motion";
import { RiLightbulbFlashLine } from "react-icons/ri";
import { FiCode, FiLayers } from "react-icons/fi";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { SiReact, SiNodedotjs, SiMongodb, SiTailwindcss } from "react-icons/si";
import { Section, Card } from "./UI";

// Data
const ABOUT = {
  title:   "About Me",
  eyebrow: "Who I am",
  summary: "MERN Stack Developer focused on building full-stack web applications — from responsive React UIs to RESTful APIs, JWT authentication, and MongoDB-backed backends.",
  story:   "I'm a MERN stack developer who loves turning ideas into real, working products. I care deeply about clean code, great UX, and building things that actually work in production — not just on localhost.",
  stats: [
    { value: "35+",  label: "Projects built"    },
    { value: "1",   label: "Certifications"    },
    { value: "100%", label: "Open source first" },
  ],
  highlights: [
    {
      icon:        RiLightbulbFlashLine,
      title:       "Problem Solving",
      description: "Breaking complex UI challenges into scalable, maintainable frontend solutions with clear architecture.",
      accent:      "from-violet-500 to-blue-500",
      bg:          "bg-violet-50 dark:bg-violet-950/30",
      border:      "border-violet-100 dark:border-violet-900/50",
      iconBg:      "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
      iconHover:   "group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500",
    },
    {
      icon:        FiCode,
      title:       "Full-Stack Engineering",
      description: "Building end-to-end MERN apps — REST APIs, auth, MongoDB, and React frontends with clean patterns.",
      accent:      "from-blue-500 to-cyan-500",
      bg:          "bg-blue-50 dark:bg-blue-950/30",
      border:      "border-blue-100 dark:border-blue-900/50",
      iconBg:      "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
      iconHover:   "group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500",
    },
    {
      icon:        HiOutlineColorSwatch,
      title:       "UI Engineering",
      description: "Crafting consistent, accessible interfaces with Tailwind CSS, Framer Motion, and strong UX principles.",
      accent:      "from-cyan-500 to-emerald-500",
      bg:          "bg-cyan-50 dark:bg-cyan-950/30",
      border:      "border-cyan-100 dark:border-cyan-900/50",
      iconBg:      "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400",
      iconHover:   "group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-500",
    },
  ],
  techRow: [
    { icon: SiReact,       label: "React",      color: "text-cyan-500"    },
    { icon: SiNodedotjs,   label: "Node.js",    color: "text-green-500"   },
    { icon: SiMongodb,     label: "MongoDB",    color: "text-emerald-500" },
    { icon: SiTailwindcss, label: "Tailwind",   color: "text-sky-500"     },
  ],
};


const VIEWPORT = { once: true, amount: 0.2 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Stat pill ─────────────────────────────────────────────────────────────
const StatPill = ({ value, label }) => (
  <motion.div variants={fadeUp} className="text-center">
    <p className="text-2xl sm:text-3xl font-extrabold
                  bg-gradient-to-r from-violet-600 to-blue-500
                  dark:from-violet-400 dark:to-blue-400
                  bg-clip-text text-transparent leading-tight">
      {value}
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 font-medium">{label}</p>
  </motion.div>
);

// ─── Highlight card ────────────────────────────────────────────────────────
const HighlightCard = ({ icon: Icon, title, description, accent, bg, border, iconBg, iconHover }) => (
  <motion.div variants={fadeUp} whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
    <div className={`
      group h-full relative rounded-2xl p-6
      border ${border} ${bg}
      transition-all duration-300
      hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-slate-900/60
    `}>
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-b-full
                       bg-gradient-to-r ${accent} opacity-0
                       group-hover:opacity-100 transition-opacity duration-300`}
           aria-hidden="true" />

      {/* Icon */}
      <div className={`mb-4 inline-flex items-center justify-center
                       w-11 h-11 rounded-xl transition-all duration-300
                       ${iconBg} ${iconHover}`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  </motion.div>
);

// ─── About ─────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <Section id="about" aria-label="About me">

      {/* ── Section header ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-12"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-violet-500 dark:text-violet-400 mb-3"
        >
          {ABOUT.eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          {ABOUT.title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base sm:text-lg
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          {ABOUT.summary}
        </motion.p>
      </motion.div>

      {/* ── Story + Stats side by side on lg ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid lg:grid-cols-5 gap-6 mb-12 max-w-4xl mx-auto"
      >
        {/* Story card */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-3 relative rounded-2xl px-7 py-6
                     bg-slate-50 dark:bg-slate-900/60
                     border border-slate-100 dark:border-slate-800/80"
        >
          {/* Decorative quote */}
          <span
            className="absolute -top-4 left-5 text-6xl leading-none
                       text-violet-200 dark:text-violet-900/60
                       select-none font-serif pointer-events-none"
            aria-hidden="true"
          >"</span>

          {/* Tech row inside story */}
          <div className="flex flex-wrap gap-3 mb-4">
            {ABOUT.techRow.map(({ icon: Icon, label, color }) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium
                           text-slate-500 dark:text-slate-400">
                <Icon className={`w-3.5 h-3.5 ${color}`} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-7 text-sm sm:text-base">
            {ABOUT.story}
          </p>

          {/* Bottom tag */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60
                          flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                               bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Currently open to new opportunities
            </span>
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 flex flex-col justify-center rounded-2xl px-6 py-6
                     bg-gradient-to-br from-violet-600 to-blue-600
                     dark:from-violet-700 dark:to-blue-700
                     shadow-lg shadow-violet-500/20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest
                        text-violet-200 mb-6 text-center">
            At a glance
          </p>
          <div className="flex flex-col gap-6">
            {ABOUT.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-white leading-tight">{s.value}</p>
                <p className="text-xs text-violet-200 mt-0.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Highlight cards ── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ABOUT.highlights.map((item) => (
          <HighlightCard key={item.title} {...item} />
        ))}
      </motion.div>

    </Section>
  );
}