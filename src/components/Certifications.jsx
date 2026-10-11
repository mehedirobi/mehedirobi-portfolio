import React from "react";
import {
  TbCertificate,
  TbCheck,
  TbExternalLink,
  TbRosette,
} from "react-icons/tb";

import { Card, Section } from "./UI";

const CERTIFICATION = {
  title: "Complete Web Development Course",
  issuer: "Programming Hero",
  category: "Web Development",
  status: "Successfully Completed",
  // Add your actual certificate URL when available.
  certificateUrl: "",
};

export default function Certifications() {
  const {
    title,
    issuer,
    category,
    status,
    certificateUrl,
  } = CERTIFICATION;

  return (
    <Section
      id="certifications"
      aria-labelledby="certifications-heading"
      background="bg-slate-50"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <header className="mb-9 text-center sm:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            Learning & Achievement
          </p>

          <h2
            id="certifications-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
          >
            Certifications
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Courses and learning milestones that support my growth as a
            developer.
          </p>
        </header>

        {/* Featured certification */}
        <Card
          as="article"
          className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/60"
        >
          {/* Top accent */}
          <div
            className="h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-400"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-[1fr_auto]">
            {/* Main information */}
            <div className="flex min-w-0 items-start gap-4 p-5 sm:gap-5 sm:p-8">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-700 transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                <TbCertificate
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  aria-hidden="true"
                />

                <span
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white"
                  aria-hidden="true"
                >
                  <TbCheck className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-violet-700">
                    {category}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    {status}
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-950 sm:text-xl">
                  {title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  <TbRosette
                    className="h-4 w-4 shrink-0 text-violet-600"
                    aria-hidden="true"
                  />
                  <span>
                    Issued by{" "}
                    <span className="font-semibold text-slate-800">
                      {issuer}
                    </span>
                  </span>
                </div>

                {certificateUrl && (
                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    aria-label={`View ${title} certificate`}
                  >
                    View Certificate
                    <TbExternalLink
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            </div>

            {/* Decorative credential panel */}
            <div className="relative flex min-h-28 items-center justify-center overflow-hidden border-t border-slate-100 bg-gradient-to-br from-slate-50 to-violet-50/70 px-6 py-5 md:min-h-full md:w-48 md:border-l md:border-t-0 lg:w-56">
              <div
                className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-violet-200/60"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full border border-indigo-200/60"
                aria-hidden="true"
              />

              <div className="relative text-center">
                <TbCertificate
                  className="mx-auto h-8 w-8 text-violet-600"
                  aria-hidden="true"
                />

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-700">
                  Certificate
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Course completion
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