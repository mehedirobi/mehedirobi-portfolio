import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Section, Card } from "./UI";

/* -------------------------------------------------------------------------- */
/* Education Data                                                             */
/* -------------------------------------------------------------------------- */

const EDUCATION = [
  {
    id: "diploma-cst",
    degree: "Diploma in Computer Science & Technology",
    institution:
      "Ahsanullah Institute of Technical and Vocational Education and Training",
    shortInstitution: "Ahsanullah ITVET",
    period: "2023 – Present",
    status: "Currently pursuing",
    description:
      "Building a strong foundation in software development, web technologies, and practical engineering principles.",
    focus: ["Web Development", "Software Engineering"],
    current: true,
    color: "sky",
  },

  {
    id: "ssc-science",
    degree: "Secondary School Certificate (SSC)",
    institution: "Khepupara Govt. Model Secondary High School",
    shortInstitution: "Khepupara Govt. School",
    period: "2022",
    status: "Completed",
    description:
      "Completed secondary education with a science background and a foundation in mathematics and analytical thinking.",
    focus: ["Science", "Mathematics"],
    current: false,
    color: "violet",
  },
];

/* -------------------------------------------------------------------------- */
/* Color Configuration                                                        */
/* -------------------------------------------------------------------------- */

const COLOR = {
  sky: {
    dot: "bg-sky-500 dark:bg-sky-400",
    ring: "ring-sky-100 dark:ring-sky-900/40",
    border: "border-l-sky-400 dark:border-l-sky-500",
    badge:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/60",
    tag:
      "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800/60",
    icon:
      "group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500",
  },

  violet: {
    dot: "bg-violet-500 dark:bg-violet-400",
    ring: "ring-violet-100 dark:ring-violet-900/40",
    border: "border-l-violet-400 dark:border-l-violet-500",
    badge:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/60",
    tag:
      "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-800/60",
    icon:
      "group-hover:bg-violet-600 group-hover:text-white dark:group-hover:bg-violet-500",
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
    x: -12,
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
      className="absolute left-[5px] top-5 bottom-5 w-px overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />

      <motion.div
        style={shouldReduce ? {} : { scaleY, originY: 0 }}
        className="absolute inset-0 bg-gradient-to-b from-sky-400 to-violet-400"
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
      className="absolute left-0 top-[1.25rem] flex items-center justify-center"
      aria-hidden="true"
    >
      {isCurrent ? (
        <span className="relative flex h-3 w-3">
          {!shouldReduce && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${c.dot}`}
            />
          )}

          <span
            className={`relative inline-flex h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot} ${c.ring}`}
          />
        </span>
      ) : (
        <span
          className={`h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${c.dot}`}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

const StatusBadge = ({ item, shouldReduce }) => {
  const c = COLOR[item.color];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        shrink-0
        rounded-full
        border
        px-2.5 py-1
        text-[10px] sm:text-[11px]
        font-semibold
        select-none
        ${c.badge}
      `}
    >
      {item.current && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {!shouldReduce && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${c.dot}`}
            />
          )}

          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${c.dot}`}
          />
        </span>
      )}

      {item.status}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Focus Tag                                                                  */
/* -------------------------------------------------------------------------- */

const FocusTag = ({ label, colorClass }) => (
  <span
    className={`
      inline-flex
      items-center
      rounded-md
      border
      px-2.5 py-1
      text-[11px]
      font-medium
      leading-none
      select-none
      ${colorClass}
    `}
  >
    {label}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Education Card                                                             */
/* -------------------------------------------------------------------------- */

const EducationCard = ({ item, shouldReduce }) => {
  const c = COLOR[item.color];

  return (
    <motion.article
      variants={cardVariants}
      className="relative pl-9 sm:pl-10"
    >
      <TimelineDot
        color={item.color}
        isCurrent={item.current}
        shouldReduce={shouldReduce}
      />

      <motion.div
        whileHover={
          shouldReduce
            ? undefined
            : {
                y: -3,
                transition: { duration: 0.2 },
              }
        }
      >
        <Card
          className={`
            group
            h-full
            border-l-2
            ${c.border}
            transition-shadow
            duration-300
            hover:shadow-lg
            hover:shadow-slate-200/50
            dark:hover:shadow-black/20
          `}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              {/* Academic Icon */}
              <div
                className={`
                  mt-0.5
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-slate-100
                  text-slate-500
                  transition-colors
                  duration-300
                  dark:bg-slate-800
                  dark:text-slate-400
                  ${c.icon}
                `}
              >
                <HiOutlineAcademicCap
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    text-[15px]
                    sm:text-base
                    font-semibold
                    leading-snug
                    text-slate-900
                    dark:text-white
                  "
                >
                  {item.degree}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-relaxed
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  <span className="hidden sm:inline">
                    {item.institution}
                  </span>

                  <span className="sm:hidden">
                    {item.shortInstitution}
                  </span>
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-slate-400
                    dark:text-slate-500
                  "
                >
                  {item.period}
                </p>
              </div>
            </div>

            <StatusBadge
              item={item}
              shouldReduce={shouldReduce}
            />
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-100 dark:border-slate-800" />

          {/* Description */}
          <p
            className="
              text-sm
              leading-6
              text-slate-500
              dark:text-slate-400
            "
          >
            {item.description}
          </p>

          {/* Relevant Focus */}
          {item.focus?.length > 0 && (
            <div className="mt-5">
              <p
                className="
                  mb-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Relevant focus
              </p>

              <div className="flex flex-wrap gap-1.5">
                {item.focus.map((focus) => (
                  <FocusTag
                    key={focus}
                    label={focus}
                    colorClass={c.tag}
                  />
                ))}
              </div>
            </div>
          )}
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
    className="mb-12 text-center sm:mb-14"
  >
    <motion.p
      variants={fadeUp}
      className="
        mb-3
        inline-flex
        items-center
        gap-2
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-slate-400
        dark:text-slate-500
      "
    >
      <span
        className="h-px w-5 bg-current opacity-60"
        aria-hidden="true"
      />

      Academic Background

      <span
        className="h-px w-5 bg-current opacity-60"
        aria-hidden="true"
      />
    </motion.p>

    <motion.h2
      variants={fadeUp}
      className="
        text-3xl
        font-bold
        tracking-tight
        text-slate-950
        dark:text-white
        sm:text-4xl
      "
    >
      Education
    </motion.h2>

    <motion.p
      variants={fadeUp}
      className="
        mx-auto
        mt-4
        max-w-xl
        text-sm
        leading-7
        text-slate-500
        dark:text-slate-400
        sm:text-base
      "
    >
      Academic background supporting my technical foundation and
      ongoing development in software engineering.
    </motion.p>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* Education                                                                  */
/* -------------------------------------------------------------------------- */

export default function Education() {
  const timelineRef = useRef(null);
  const shouldReduce = useReducedMotion();

  return (
    <Section
      id="education"
      aria-label="Education and academic background"
    >
      <SectionHeader />

      <div
        ref={timelineRef}
        className="relative mx-auto max-w-3xl"
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
          {EDUCATION.map((item) => (
            <EducationCard
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