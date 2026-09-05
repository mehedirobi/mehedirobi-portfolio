import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Section, Card } from "./UI";

/* -------------------------------------------------------------------------- */
/* Development Journey Data                                                  */
/* -------------------------------------------------------------------------- */

const JOURNEY = [
  {
    id: "frontend-foundations",
    title: "Frontend Foundations",
    company: "Self-Directed Development",
    type: "Foundation",
    period: "2024",
    description:
      "Built a solid foundation in modern web development by focusing on semantic HTML, responsive CSS, JavaScript fundamentals, and accessible UI development.",
    points: [
      "Developed responsive interfaces with HTML5, CSS3, and modern JavaScript",
      "Applied responsive layouts, reusable UI patterns, and accessibility principles",
      "Built a strong understanding of browser fundamentals, UI structure, and performance basics",
    ],
    status: "completed",
    color: "emerald",
  },

  {
    id: "react-development",
    title: "React Development",
    company: "Project-Based Development",
    type: "Development",
    period: "2025",
    description:
      "Transitioned to component-driven development with React, building reusable interfaces and integrating real-world APIs into frontend applications.",
    points: [
      "Built reusable React components and structured frontend architectures",
      "Integrated REST APIs and managed application state across projects",
      "Developed responsive interfaces using Tailwind CSS and modern UX patterns",
    ],
    status: "completed",
    color: "sky",
  },

  {
    id: "mern-development",
    title: "MERN Stack Development",
    company: "Independent Projects",
    type: "Current",
    period: "2025 – Present",
    description:
      "Expanding into full-stack development by building real-world applications with React, Node.js, Express.js, and MongoDB.",
    points: [
      "Building full-stack applications using the MERN stack",
      "Developing RESTful APIs with authentication and CRUD functionality",
      "Designing structured application architectures with a focus on maintainability, security, and performance",
    ],
    status: "current",
    color: "violet",
  },
];

/* -------------------------------------------------------------------------- */
/* Color Configuration                                                        */
/* -------------------------------------------------------------------------- */

const COLOR = {
  emerald: {
    dot: "bg-emerald-500 dark:bg-emerald-400",
    ring: "ring-emerald-100 dark:ring-emerald-900/40",
    border: "border-l-emerald-400 dark:border-l-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60",
    bullet: "bg-emerald-400 dark:bg-emerald-500",
  },

  sky: {
    dot: "bg-sky-500 dark:bg-sky-400",
    ring: "ring-sky-100 dark:ring-sky-900/40",
    border: "border-l-sky-400 dark:border-l-sky-500",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/60",
    bullet: "bg-sky-400 dark:bg-sky-500",
  },

  violet: {
    dot: "bg-violet-500 dark:bg-violet-400",
    ring: "ring-violet-100 dark:ring-violet-900/40",
    border: "border-l-violet-400 dark:border-l-violet-500",
    badge:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/60",
    bullet: "bg-violet-400 dark:bg-violet-500",
  },
};

/* -------------------------------------------------------------------------- */
/* Animation Configuration                                                    */
/* -------------------------------------------------------------------------- */

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -14,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Animated Timeline                                                          */
/* -------------------------------------------------------------------------- */

const AnimatedLine = ({ containerRef, shouldReduce }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="
        absolute
        left-[5px]
        top-5
        bottom-5
        w-px
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Base track */}
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />

      {/* Progress */}
      <motion.div
        style={shouldReduce ? {} : { scaleY, originY: 0 }}
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-emerald-400
          via-sky-400
          to-violet-400
        "
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Timeline Dot                                                               */
/* -------------------------------------------------------------------------- */

const TimelineDot = ({ color, isCurrent, shouldReduce }) => {
  const c = COLOR[color];

  return (
    <div
      className="
        absolute
        left-0
        top-[1.25rem]
        flex
        items-center
        justify-center
      "
      aria-hidden="true"
    >
      {isCurrent ? (
        <span className="relative flex h-3 w-3">
          {!shouldReduce && (
            <span
              className={`
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                opacity-60
                animate-ping
                ${c.dot}
              `}
            />
          )}

          <span
            className={`
              relative
              inline-flex
              h-3
              w-3
              rounded-full
              ring-4
              ring-white
              dark:ring-slate-950
              ${c.dot}
            `}
          />
        </span>
      ) : (
        <span
          className={`
            h-3
            w-3
            rounded-full
            ring-4
            ring-white
            dark:ring-slate-950
            ${c.dot}
          `}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Period Badge                                                               */
/* -------------------------------------------------------------------------- */

const PeriodBadge = ({ item, shouldReduce }) => {
  const c = COLOR[item.color];
  const isCurrent = item.status === "current";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        shrink-0
        px-2.5
        py-1
        rounded-full
        border
        text-[10px]
        sm:text-[11px]
        font-semibold
        ${c.badge}
      `}
    >
      {isCurrent && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {!shouldReduce && (
            <span
              className={`
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                opacity-60
                animate-ping
                ${c.dot}
              `}
            />
          )}

          <span
            className={`
              relative
              inline-flex
              h-1.5
              w-1.5
              rounded-full
              ${c.dot}
            `}
          />
        </span>
      )}

      {isCurrent ? "Current" : item.period}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Type Chip                                                                  */
/* -------------------------------------------------------------------------- */

const TypeChip = ({ label }) => (
  <span
    className="
      inline-flex
      items-center
      px-2
      py-0.5
      rounded-md
      border
      border-slate-200
      dark:border-slate-800
      bg-slate-50
      dark:bg-slate-900
      text-[10px]
      font-medium
      text-slate-500
      dark:text-slate-400
    "
  >
    {label}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Timeline Item                                                              */
/* -------------------------------------------------------------------------- */

const TimelineItem = ({ item, shouldReduce }) => {
  const isCurrent = item.status === "current";
  const c = COLOR[item.color];

  return (
    <motion.article
      variants={cardVariants}
      className="relative pl-9 sm:pl-10"
    >
      <TimelineDot
        color={item.color}
        isCurrent={isCurrent}
        shouldReduce={shouldReduce}
      />

      <motion.div
        whileHover={
          shouldReduce
            ? undefined
            : {
                y: -3,
                transition: {
                  duration: 0.2,
                },
              }
        }
      >
        <Card
          className={`
            group
            h-full
            border-l-2
            ${c.border}
            transition-all
            duration-300
            hover:shadow-lg
            hover:shadow-slate-200/50
            dark:hover:shadow-black/20
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className="
                    text-[15px]
                    font-semibold
                    leading-snug
                    text-slate-900
                    dark:text-white
                  "
                >
                  {item.title}
                </h3>

                <TypeChip label={item.type} />
              </div>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {item.company}
              </p>
            </div>

            <PeriodBadge
              item={item}
              shouldReduce={shouldReduce}
            />
          </div>

          {/* Description */}
          <p
            className="
              mt-4
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            {item.description}
          </p>

          {/* Divider */}
          <div
            className="
              my-4
              border-t
              border-slate-100
              dark:border-slate-800
            "
          />

          {/* Highlights */}
          <ul
            className="space-y-2.5"
            aria-label={`${item.title} highlights`}
          >
            {item.points.map((point) => (
              <li
                key={point}
                className="
                  flex
                  items-start
                  gap-2.5
                  text-sm
                  leading-5
                  text-slate-600
                  dark:text-slate-300
                "
              >
                <span
                  className={`
                    mt-[7px]
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    ${c.bullet}
                  `}
                  aria-hidden="true"
                />

                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </motion.article>
  );
};

/* -------------------------------------------------------------------------- */
/* Section Header                                                             */
/* -------------------------------------------------------------------------- */

const SectionHeader = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    className="text-center mb-12 sm:mb-14"
  >
    <motion.p
      variants={fadeUp}
      className="
        inline-flex
        items-center
        gap-2
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-violet-500
        dark:text-violet-400
        mb-3
      "
    >
      <span
        className="w-5 h-px bg-current opacity-60"
        aria-hidden="true"
      />

      Development Journey

      <span
        className="w-5 h-px bg-current opacity-60"
        aria-hidden="true"
      />
    </motion.p>

    <motion.h2
      variants={fadeUp}
      className="
        text-3xl
        sm:text-4xl
        font-bold
        tracking-tight
        text-slate-950
        dark:text-white
      "
    >
      My Development Journey
    </motion.h2>

    <motion.p
      variants={fadeUp}
      className="
        mt-4
        max-w-2xl
        mx-auto
        text-sm
        sm:text-base
        leading-7
        text-slate-500
        dark:text-slate-400
      "
    >
      From building frontend fundamentals to developing full-stack
      applications with modern web technologies and engineering practices.
    </motion.p>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* Development Journey                                                       */
/* -------------------------------------------------------------------------- */

export default function Experience() {
  const timelineRef = useRef(null);
  const shouldReduce = useReducedMotion();

  return (
    <Section
      id="experience"
      aria-label="Development journey"
    >
      <SectionHeader />

      <div
        ref={timelineRef}
        className="relative max-w-3xl mx-auto"
      >
        <AnimatedLine
          containerRef={timelineRef}
          shouldReduce={shouldReduce}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-6 sm:space-y-7"
        >
          {JOURNEY.map((item) => (
            <TimelineItem
              key={item.id}
              item={item}
              shouldReduce={shouldReduce}
            />
          ))}
        </motion.div>
      </div>
    </Section>
  );
}