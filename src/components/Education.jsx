import { HiOutlineAcademicCap } from "react-icons/hi2";

import { Card, Section } from "./UI";

const EDUCATION = {
  degree: "Diploma in Computer Science & Technology (CST)",
  institution: "Ahsanullah Institute of Technical & Vocational Education & Training (AITVET)",
  location: "Dhaka, Bangladesh",
  graduation: "Graduated: 2026",
};

export default function Education({ id = "education" }) {
  const { degree, institution, location, graduation } = EDUCATION;

  return (
    <Section id={id} aria-labelledby="education-heading" background="bg-canvas-alt">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Academic Background
          </p>

          <h2
            id="education-heading"
            className="text-section font-bold tracking-tight text-strong"
          >
            Education
          </h2>
        </header>

        <Card as="article" className="overflow-hidden rounded-2xl border border-default bg-surface p-0">
          <div className="flex items-start gap-4 p-5 sm:p-7">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <HiOutlineAcademicCap className="h-7 w-7" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Diploma
              </p>

              <h3 className="text-lg font-bold leading-snug tracking-tight text-strong sm:text-xl">
                {degree}
              </h3>

              <p className="mt-3 text-sm leading-6 text-primary sm:text-[15px]">
                {institution}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
                <span>{location}</span>
                <span className="text-accent">{graduation}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}