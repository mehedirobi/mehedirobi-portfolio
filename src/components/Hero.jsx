import { MotionConfig, m } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineArrowRight,
  HiOutlineDownload,
  HiOutlineMail,
} from "react-icons/hi";
import { OptimizedImage } from "./UI";

// --------------------------------------------------
// Content
// --------------------------------------------------

const HERO = {
  name: "Mehedi Robi",
  role: "Software Engineer",
  summary: [
    "Software engineering-focused developer and Computer Science and Technology diploma graduate with hands-on experience building frontend and full-stack web applications. I focus on developing responsive interfaces, reliable REST APIs, and user-focused software.",
    "My experience includes reusable UI components, backend logic, database management, authentication, authorization, role-based access control, and CRUD operations. I value clean, maintainable code, performance, usability, and problem-solving while continuously improving my engineering skills.",
  ],
  stack: [
    "JavaScript",
    "React.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
  resume: {
    href: "/Mehedi_Robi_Resume.pdf",
    filename: "Mehedi_Robi_Resume.pdf",
  },
  image: "/projects/optimized/mehedi-robi-professional-800.webp",
  imageSrcSet:
    "/projects/optimized/mehedi-robi-professional-480.webp 480w, /projects/optimized/mehedi-robi-professional-800.webp 800w",
  socials: [
    {
      href: "https://github.com/mehedirobi",
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/mehedirobii/",
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:mehedirobidev@gmail.com",
      icon: HiOutlineMail,
      label: "Email",
    },
  ],
};

// --------------------------------------------------
// Shared styles (kept in sync with Navbar.jsx)
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

// Same blue -> indigo gradient as the Navbar resume button
const PRIMARY_BUTTON =
  "group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 sm:w-auto " +
  "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 text-sm font-semibold text-white " +
  "shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_6px_20px_-4px_rgba(37,99,235,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] " +
  "transition-[transform,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_28px_-4px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.3)] " +
  "active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 " +
  FOCUS_RING;

const SECONDARY_BUTTON =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-default bg-surface px-6 text-sm font-semibold text-strong sm:w-auto " +
  "shadow-sm transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md " +
  "active:translate-y-0 active:scale-[0.98] " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 " +
  FOCUS_RING;

// --------------------------------------------------
// Animation
// --------------------------------------------------

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.1 },
  },
};

// --------------------------------------------------
// Content column pieces
// --------------------------------------------------

function TechStack() {
  return (
    <ul
      aria-label="Core technologies"
      className="flex flex-wrap justify-center gap-2 lg:justify-start"
    >
      {HERO.stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-default bg-surface px-3 py-1 text-xs font-medium text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function SocialLinks() {
  return (
    // The divider only appears at `xl`, where buttons and icons always share one row
    <ul
      aria-label="Social links"
      className="flex items-center justify-center gap-2.5 xl:border-l xl:border-default xl:pl-6"
    >
      {HERO.socials.map(({ href, icon: Icon, label }) => {
        const isExternal = !href.startsWith("mailto:");

        return (
          <li key={label}>
            <a
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={isExternal ? `${label} (opens in a new tab)` : label}
              title={label}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-default bg-surface text-muted shadow-sm transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
            >
              <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// --------------------------------------------------
// Image column
// --------------------------------------------------

function ProfileImage() {
  return (
    // `isolate` keeps the -z-10 glow inside this wrapper (never behind the section background)
    // Sizes: 224px (mobile) -> 256px (tablet) -> 320px (lg) -> 352px (xl)
    <m.div
      variants={fadeIn}
      className="relative isolate w-full max-w-56 sm:max-w-64 lg:max-w-80 xl:max-w-[22rem]"
    >
      {/* Soft brand glow behind the photo */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-blue-600/25 to-indigo-600/25 blur-3xl"
      />

      {/* Gradient ring */}
      <div className="rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[3px] shadow-[0_20px_50px_-12px_rgba(37,99,235,0.45)]">
        <div className="rounded-full bg-canvas p-1.5">
          <div className="aspect-square overflow-hidden rounded-full bg-surface">
            <OptimizedImage
              src={HERO.image}
              srcSet={HERO.imageSrcSet}
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, (max-width: 1280px) 320px, 352px"
              alt={`Portrait of ${HERO.name}`}
              width="800"
              height="800"
              loading="eager"
              fetchPriority="high"
              className="block h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </m.div>
  );
}

// --------------------------------------------------
// Main Hero
// --------------------------------------------------

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      {/*
        Top padding = Navbar height + a fixed 24px gap, the same at every breakpoint:
          below sm: Navbar ends at 64px  -> 64 + 24 = 88px  (pt-[5.5rem])
          sm and up: Navbar ends at 68px -> 68 + 24 = 92px  (pt-[5.75rem])
        If you change the Navbar height, update these two values only.
        Height comes from the content, so there is no min-height.
      */}
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative scroll-mt-[84px] overflow-hidden bg-canvas"
      >
        {/* Subtle background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl sm:h-96 sm:w-96" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-[5.5rem] sm:px-6 sm:pb-16 sm:pt-[5.75rem] lg:px-8">
          {/*
            One grid, two direct children. `items-center` on this single grid puts
            both columns on the same vertical midpoint.
            Mobile/tablet: 1 column (image first). Desktop: 7 / 5 columns.
          */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16"
          >
            {/* Content (first in the DOM for screen readers) */}
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center lg:col-span-7 lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
              <m.p
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-accent"
              >
                {HERO.role}
              </m.p>

              <m.h1
                id="hero-heading"
                variants={fadeUp}
                className="mt-3 text-balance text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl"
              >
                {HERO.name}
              </m.h1>

              <m.div
                variants={fadeUp}
                className="mt-6 space-y-4 text-pretty text-base leading-7 text-primary xl:text-[1.0625rem] xl:leading-8"
              >
                {HERO.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </m.div>

              <m.div variants={fadeUp} className="mt-6">
                <TechStack />
              </m.div>

              {/* Actions: buttons + socials share one row when they fit */}
              <m.div
                variants={fadeUp}
                className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-5 lg:justify-start"
              >
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <a href="#contact" className={PRIMARY_BUTTON}>
                    {/* Deeper gradient crossfades in on hover (never lighter) */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="relative z-10">Let&rsquo;s Connect</span>
                    <HiOutlineArrowRight
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
                    />
                  </a>

                  <a
                    href={HERO.resume.href}
                    download={HERO.resume.filename}
                    className={SECONDARY_BUTTON}
                  >
                    <HiOutlineDownload
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                    />
                    Download Resume
                  </a>
                </div>

                <SocialLinks />
              </m.div>
            </div>

            {/* Image: above the content on mobile/tablet, centered in the right column on desktop */}
            <div className="order-first flex justify-center lg:order-last lg:col-span-5">
              <ProfileImage />
            </div>
          </m.div>
        </div>
      </section>
    </MotionConfig>
  );
}