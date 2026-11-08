
import { m, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineMail } from "react-icons/hi";
import { OptimizedImage } from "./UI";

const HERO = {
  name: "Mehedi Robi",
  intro:
    "Software engineering-focused developer with hands-on experience building full-stack applications, from database to user interface. I focus on writing reliable, efficient, and maintainable software while continuously improving my engineering skills.",
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

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

function SocialLinks({ reduceMotion }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {HERO.socials.map(({ href, icon: Icon, label }) => {
        const isEmail = href.startsWith("mailto:");

        return (
          <m.a
            key={label}
            href={href}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={label}
            title={label}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-default bg-surface text-muted transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
          </m.a>
        );
      })}
    </div>
  );
}

function ProfileImage() {
  return (
    <m.div
      variants={fadeUpVariants}
      className="mb-7 flex justify-center"
    >
      <div className="h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full border border-default bg-surface p-1 shadow-sm sm:h-[200px] sm:w-[200px]">
        <OptimizedImage
          src={HERO.image}
          srcSet={HERO.imageSrcSet}
          sizes="(max-width: 640px) 180px, 200px"
          alt={`Portrait of ${HERO.name}`}
          width="800"
          height="800"
          loading="eager"
          fetchPriority="high"
          className="block h-full w-full rounded-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.04]"
        />
      </div>
    </m.div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative scroll-mt-16 bg-canvas"
    >
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
        <m.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <ProfileImage />

          <m.h1
            id="hero-heading"
            variants={fadeUpVariants}
            className="text-display font-bold tracking-[-0.045em] text-strong"
          >
            {HERO.name}
          </m.h1>

          <m.p
            variants={fadeUpVariants}
            className="mt-4 max-w-2xl text-base leading-7 text-primary sm:text-lg sm:leading-8"
          >
            {HERO.intro}
          </m.p>

          <m.div variants={fadeUpVariants} className="mt-7">
            <SocialLinks reduceMotion={reduceMotion} />
          </m.div>

          <m.div
            variants={fadeUpVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <m.a
              href="#contact"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent-button px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-accent-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Let's Connect
              <HiOutlineArrowRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </m.a>

            <a
              href="/Mehedi_Robi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Mehedi_Robi_Resume.pdf"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-default bg-surface px-6 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Download Resume
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
