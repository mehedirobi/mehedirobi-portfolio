import { useId } from "react";
import { MotionConfig, m } from "framer-motion";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { FiCalendar, FiMapPin } from "react-icons/fi";

import { Card, Section } from "./UI";

// --------------------------------------------------
// Content
// --------------------------------------------------

const EDUCATION = {
  degree: "Diploma in Computer Science & Technology (CST)",
  institution:
    "Ahsanullah Institute of Technical & Vocational Education & Training (AITVET)",
  location: "Dhaka, Bangladesh",
  graduation: "Graduated: 2026",
};

// --------------------------------------------------
// Animation (lightweight: opacity + small y shift, runs once)
// --------------------------------------------------

const EASE = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// --------------------------------------------------
// Pieces
// --------------------------------------------------

function SectionHeader() {
  return (
    <m.header
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
    >
      <m.p
        variants={fadeUp}
        className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent"
      >
        Academic Background
      </m.p>

      <m.h2
        id="education-heading"
        variants={fadeUp}
        className="text-balance text-section font-bold tracking-tight text-strong"
      >
        Education
      </m.h2>

      <m.p
        variants={fadeUp}
        className="mt-4 text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
      >
        The academic foundation behind my software engineering skills.
      </m.p>
    </m.header>
  );
}

// One detail row: icon + visually hidden label + value
function MetaItem({ icon: Icon, label, children, highlight = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          highlight
            ? "bg-accent/10 text-accent ring-1 ring-inset ring-accent/15"
            : "bg-overlay/5 text-muted"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>

      <div>
        <dt className="sr-only">{label}</dt>
        <dd
          className={`text-sm font-medium ${
            highlight ? "text-accent" : "text-primary"
          }`}
        >
          {children}
        </dd>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Main Education section
// --------------------------------------------------

export default function Education({ id = "education" }) {
  const { degree, institution, location, graduation } = EDUCATION;
  const headingId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <Section
        id={id}
        aria-labelledby="education-heading"
        background="bg-canvas-alt"
      >
        <div className="mx-auto max-w-3xl">
          <SectionHeader />

          {/*
            The motion element only handles the entrance; hover styles live on the
            inner Card so Framer's inline transform never overrides them.
          */}
          <m.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            aria-labelledby={headingId}
          >
            <Card className="group relative overflow-hidden rounded-2xl border border-default bg-surface p-0 shadow-sm transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-16px_rgba(37,99,235,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              {/* Gradient accent line that draws in on hover (same blue -> indigo as the rest of the site) */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />

              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.55)] sm:h-16 sm:w-16"
                >
                  <HiOutlineAcademicCap className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold leading-none text-accent">
                    Diploma
                  </span>

                  <h3
                    id={headingId}
                    className="mt-3 text-balance text-xl font-bold leading-snug tracking-tight text-strong sm:text-2xl"
                  >
                    {degree}
                  </h3>

                  <p className="mt-2 text-pretty text-sm leading-6 text-primary sm:text-base sm:leading-7">
                    {institution}
                  </p>

                  <dl className="mt-6 flex flex-col gap-3 border-t border-default pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
                    <MetaItem icon={FiMapPin} label="Location">
                      {location}
                    </MetaItem>

                    <MetaItem icon={FiCalendar} label="Graduation" highlight>
                      {graduation}
                    </MetaItem>
                  </dl>
                </div>
              </div>
            </Card>
          </m.article>
        </div>
      </Section>
    </MotionConfig>
  );
}