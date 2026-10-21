import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineBuildingLibrary,
  HiOutlineClock,
} from "react-icons/hi2";
import { TbCheck } from "react-icons/tb";

import { Card, Section } from "./UI";

const EDUCATION = {
  degree: "Diploma in Computer Science & Technology",
  abbreviation: "CST",
  institution:
    "Ahsanullah Institute of Technical & Vocational Education & Training",
  location: "Dhaka, Bangladesh",
  status: "Currently Studying",
};

export default function Education() {
  const {
    degree,
    abbreviation,
    institution,
    location,
    status,
  } = EDUCATION;

  return (
    <Section
      id="education"
      aria-labelledby="education-heading"
      background="bg-[#0e1015]"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <header className="mb-9 text-center sm:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Academic Background
          </p>

          <h2
            id="education-heading"
            className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
          >
            Education
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            Building a strong foundation in computer science and software
            development.
          </p>
        </header>

        {/* Featured education card */}
        <Card
          as="article"
          className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#111318] p-0 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-950/20"
        >
          {/* Accent line */}
          <div
            className="h-1 w-full bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-[1fr_auto]">
            {/* Education details */}
            <div className="flex min-w-0 items-start gap-4 p-5 sm:gap-5 sm:p-8">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                <HiOutlineAcademicCap
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  aria-hidden="true"
                />

                <span
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#111318] bg-emerald-400/100 text-white"
                  aria-hidden="true"
                >
                  <TbCheck className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-300">
                    {abbreviation}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400/100"
                      aria-hidden="true"
                    />
                    {status}
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-100 sm:text-xl">
                  {degree}
                </h3>

                <div className="mt-3 flex items-start gap-2.5 text-sm leading-6 text-slate-400">
                  <HiOutlineBuildingLibrary
                    className="mt-1 h-4 w-4 shrink-0 text-violet-400"
                    aria-hidden="true"
                  />

                  <span className="font-medium text-slate-300">
                    {institution}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                    aria-hidden="true"
                  />
                  {location}
                </p>
              </div>
            </div>

            {/* Academic status panel */}
            <div className="relative flex min-h-28 items-center justify-center overflow-hidden border-t border-white/10 bg-[#0e1015] px-6 py-5 md:min-h-full md:w-48 md:border-l md:border-t-0 lg:w-56">
              <div
                className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-violet-400/20"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full border border-violet-400/15"
                aria-hidden="true"
              />

              <div className="relative text-center">
                <HiOutlineClock
                  className="mx-auto h-8 w-8 text-violet-400"
                  aria-hidden="true"
                />

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  Academic Status
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Ongoing program
                </p>

                <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-violet-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}