import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HiOutlineBadgeCheck,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { TbCertificate } from "react-icons/tb";
import { Section } from "./UI";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const CERTIFICATIONS = [
  {
    id: "ph-web-development",
    title: "Complete Web Development Course",
    issuer: "Programming Hero",
    year: "2026",
    status: "Completed",

    description:
      "Comprehensive hands-on training in modern web development, covering frontend development, backend fundamentals, REST APIs, databases, authentication, and full-stack application development.",

    skills: [
      { label: "JavaScript", color: "amber" },
      { label: "React", color: "sky" },
      { label: "Tailwind CSS", color: "sky" },
      { label: "Node.js", color: "emerald" },
      { label: "Express.js", color: "emerald" },
      { label: "MongoDB", color: "emerald" },
    ],

    highlights: [
      "Built multiple hands-on web development projects",
      "Worked with REST APIs, CRUD operations, and authentication",
      "Applied modern frontend and full-stack development practices",
    ],

    // Add your certificate URL here when available.
    certificateUrl: "",
  },
];

/* -------------------------------------------------------------------------- */
/* Skill Colors                                                               */
/* -------------------------------------------------------------------------- */

const SKILL_COLORS = {
  amber:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/60",

  sky:
    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-400 dark:border-sky-800/60",

  emerald:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/60",

  violet:
    "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-800/60",

  default:
    "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700",
};

/* -------------------------------------------------------------------------- */
/* Animation                                                                  */
/* -------------------------------------------------------------------------- */

const VIEWPORT = {
  once: true,
  amount: 0.2,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
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

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },

  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

const StatusBadge = ({ status }) => (
  <span
    className="
      inline-flex
      items-center
      gap-1.5
      shrink-0
      rounded-full
      border
      border-emerald-200
      bg-emerald-50
      px-2.5
      py-1
      text-[10px]
      sm:text-[11px]
      font-semibold
      text-emerald-700
      dark:border-emerald-800/60
      dark:bg-emerald-950/30
      dark:text-emerald-400
    "
  >
    <HiOutlineBadgeCheck
      className="h-3.5 w-3.5"
      aria-hidden="true"
    />

    {status}
  </span>
);

/* -------------------------------------------------------------------------- */
/* Skill Tag                                                                  */
/* -------------------------------------------------------------------------- */

const SkillTag = ({ skill }) => {
  const colorClass =
    SKILL_COLORS[skill.color] ?? SKILL_COLORS.default;

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-md
        border
        px-2.5
        py-1
        text-[11px]
        font-medium
        leading-none
        select-none
        ${colorClass}
      `}
    >
      {skill.label}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Highlight                                                                  */
/* -------------------------------------------------------------------------- */

const HighlightItem = ({ text }) => (
  <li
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
      className="
        mt-[7px]
        h-1.5
        w-1.5
        shrink-0
        rounded-full
        bg-emerald-500
        dark:bg-emerald-400
      "
      aria-hidden="true"
    />

    <span>{text}</span>
  </li>
);

/* -------------------------------------------------------------------------- */
/* Certificate Card                                                           */
/* -------------------------------------------------------------------------- */

const CertificateCard = ({ item }) => (
  <motion.article
    variants={fadeUp}
    whileHover={{
      y: -4,
      transition: { duration: 0.2 },
    }}
    className="
      group
      relative
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
      transition-shadow
      duration-300
      hover:shadow-xl
      hover:shadow-slate-200/60
      dark:border-slate-800
      dark:bg-slate-900
      dark:hover:shadow-black/30
    "
  >
    {/* Accent */}
    <div
      className="
        h-1
        w-full
        bg-gradient-to-r
        from-emerald-400
        via-sky-400
        to-violet-400
      "
      aria-hidden="true"
    />

    <div className="p-6 sm:p-7">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        
        <div className="flex min-w-0 items-start gap-4">

          {/* Certificate Icon */}
          <motion.div
            variants={scaleIn}
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
              transition-all
              duration-300
              group-hover:bg-slate-900
              group-hover:text-white
              dark:bg-slate-800
              dark:text-slate-400
              dark:group-hover:bg-white
              dark:group-hover:text-slate-900
            "
          >
            <TbCertificate
              className="h-6 w-6"
              aria-hidden="true"
            />
          </motion.div>

          {/* Title */}
          <div className="min-w-0">

            <h3
              className="
                text-base
                font-semibold
                leading-snug
                text-slate-900
                sm:text-lg
                dark:text-white
              "
            >
              {item.title}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {item.issuer}
              </span>

              <span
                className="text-slate-300 dark:text-slate-700"
                aria-hidden="true"
              >
                ·
              </span>

              <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                {item.year}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <StatusBadge status={item.status} />
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

      {/* Content */}
      <div className="grid gap-7 md:grid-cols-[1.3fr_1fr]">

        {/* Description + Highlights */}
        <div>

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

          {item.highlights?.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {item.highlights.map((highlight) => (
                <HighlightItem
                  key={highlight}
                  text={highlight}
                />
              ))}
            </ul>
          )}

        </div>

        {/* Skills */}
        <div>

          <p
            className="
              mb-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-slate-400
              dark:text-slate-500
            "
          >
            Technologies & Skills
          </p>

          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <SkillTag
                key={skill.label}
                skill={skill}
              />
            ))}
          </div>

          {/* Certificate CTA */}
          {item.certificateUrl && (
            <a
              href={item.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-slate-700
                transition-colors
                hover:text-violet-600
                dark:text-slate-300
                dark:hover:text-violet-400
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/40
                focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-slate-900
              "
              aria-label={`View ${item.title} certificate`}
            >
              View Certificate

              <HiOutlineExternalLink
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </a>
          )}

        </div>
      </div>
    </div>
  </motion.article>
);

/* -------------------------------------------------------------------------- */
/* Section Header                                                             */
/* -------------------------------------------------------------------------- */

const SectionHeader = () => {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    amount: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="mb-12 text-center"
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

        Credentials

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
          sm:text-4xl
          dark:text-white
        "
      >
        Certifications
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-sm
          leading-7
          text-slate-500
          sm:text-base
          dark:text-slate-400
        "
      >
        Formal training and hands-on learning in modern
        web development and full-stack application development.
      </motion.p>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

export default function Certifications() {
  return (
    <Section
      id="certifications"
      aria-label="Certifications and professional training"
    >
      <SectionHeader />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-4xl"
      >
        {CERTIFICATIONS.map((item) => (
          <CertificateCard
            key={item.id}
            item={item}
          />
        ))}
      </motion.div>
    </Section>
  );
}