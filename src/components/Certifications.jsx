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

export default function Certifications({ id = "certifications" }) {
  const {
    title,
    issuer,
    category,
    status,
    certificateUrl,
  } = CERTIFICATION;

  return (
    <Section
      id={id}
      aria-labelledby="certifications-heading"
      background="bg-canvas-alt"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <header className="mb-9 text-center sm:mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Learning & Achievement
          </p>

          <h2
            id="certifications-heading"
            className="text-section font-bold tracking-tight text-strong"
          >
            Certifications
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted sm:text-base">
            Courses and learning milestones that support my growth as a
            developer.
          </p>
        </header>

        {/* Featured certification */}
        <Card
          as="article"
          className="group relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-default bg-surface p-0 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-950/20"
        >
          {/* Top accent */}
          <div
            className="h-1 w-full bg-gradient-to-r from-violet-500 via-violet-400 to-violet-300"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-[1fr_auto]">
            {/* Main information */}
            <div className="flex min-w-0 items-start gap-4 p-5 sm:gap-5 sm:p-8">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                <TbCertificate
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  aria-hidden="true"
                />

                <span
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface bg-success-solid text-white"
                  aria-hidden="true"
                >
                  <TbCheck className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-violet-400/20 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    {category}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-400/100"
                      aria-hidden="true"
                    />
                    {status}
                  </span>
                </div>

                <h3 className="text-lg font-bold leading-snug tracking-tight text-strong sm:text-xl">
                  {title}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                  <TbRosette
                    className="h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>
                    Issued by{" "}
                    <span className="font-semibold text-primary">
                      {issuer}
                    </span>
                  </span>
                </div>

                {certificateUrl && (
                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent-button px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
            <div className="relative flex min-h-28 items-center justify-center overflow-hidden border-t border-default bg-canvas-alt px-6 py-5 md:min-h-full md:w-48 md:border-l md:border-t-0 lg:w-56">
              <div
                className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-violet-400/20"
                aria-hidden="true"
              />

              <div
                className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full border border-violet-400/15"
                aria-hidden="true"
              />

              <div className="relative text-center">
                <TbCertificate
                  className="mx-auto h-8 w-8 text-accent"
                  aria-hidden="true"
                />

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  Certificate
                </p>

                <p className="mt-1 text-xs text-muted">
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