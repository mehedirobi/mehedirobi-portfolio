import React, { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlineArrowRight,
  HiOutlineDownload,
} from "react-icons/hi";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";
import { OptimizedImage } from "./UI";

// ======================================================
// Hero Data
// ======================================================

const HERO = {
  name: "Mehedi Robi",
  firstName: "Mehedi",
  role: "MERN Stack Developer",

  tagline:
    "I build fast, scalable full-stack web applications with modern React, Node.js, and REST APIs.",

  description:
    "Focused on clean architecture, responsive interfaces, and production-ready user experiences. Open to junior developer opportunities.",

  resume: "/mehedirobi-resume.pdf",
  image: "/Mehedi-Robi-Professional.png",

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

  stack: [
    {
      icon: SiMongodb,
      label: "MongoDB",
      className: "text-emerald-500 dark:text-emerald-400",
    },
    {
      icon: SiExpress,
      label: "Express",
      className: "text-slate-600 dark:text-slate-300",
    },
    {
      icon: SiReact,
      label: "React",
      className: "text-cyan-500 dark:text-cyan-400",
    },
    {
      icon: SiNodedotjs,
      label: "Node.js",
      className: "text-green-600 dark:text-green-400",
    },
  ],
};

// ======================================================
// Animation
// ======================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 10,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ======================================================
// Background
// ======================================================

const BackgroundEffects = ({ reduceMotion }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Violet ambient glow */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 12, 0],
                y: [0, -14, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="
          absolute
          -left-40
          -top-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-violet-400/[0.08]
          blur-[90px]
          dark:bg-violet-500/[0.07]
        "
      />

      {/* Cyan ambient glow */}
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -10, 0],
                y: [0, 16, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }
        }
        className="
          absolute
          -bottom-44
          -right-32
          h-[380px]
          w-[380px]
          rounded-full
          bg-cyan-400/[0.07]
          blur-[90px]
          dark:bg-cyan-500/[0.06]
        "
      />

      {/* Subtle dot texture */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          dark:opacity-[0.035]
          [background-image:radial-gradient(circle,#64748b_1px,transparent_1px)]
          [background-size:28px_28px]
        "
      />

      {/* Section separator */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-slate-200
          to-transparent
          dark:via-slate-800
        "
      />
    </div>
  );
};

// ======================================================
// Availability Badge
// ======================================================

const StatusBadge = () => {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="
        inline-flex
        w-fit
        items-center
        gap-2
        rounded-full
        border
        border-emerald-200/80
        bg-emerald-50/80
        px-3
        py-1.5
        text-xs
        font-medium
        text-emerald-700

        dark:border-emerald-900/60
        dark:bg-emerald-950/30
        dark:text-emerald-400
      "
    >
      <span
        className="
          relative
          flex
          h-2
          w-2
        "
        aria-hidden="true"
      >
        <span
          className="
            absolute
            inline-flex
            h-full
            w-full
            animate-ping
            rounded-full
            bg-emerald-400
            opacity-60
          "
        />

        <span
          className="
            relative
            inline-flex
            h-2
            w-2
            rounded-full
            bg-emerald-500
          "
        />
      </span>

      Available for opportunities
    </motion.div>
  );
};

// ======================================================
// Stack Pills
// ======================================================

const StackPills = () => {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="flex flex-wrap items-center gap-2"
    >
      <span
        className="
          mr-0.5
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.12em]
          text-slate-400
          dark:text-slate-600
        "
      >
        Stack
      </span>

      {HERO.stack.map(
        ({ icon: Icon, label, className }) => (
          <span
            key={label}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              border
              border-slate-200/80
              bg-white/70
              px-2.5
              py-1.5
              text-xs
              font-medium
              text-slate-600
              backdrop-blur-sm

              dark:border-slate-800/80
              dark:bg-slate-900/60
              dark:text-slate-400
            "
          >
            <Icon
              className={`h-3.5 w-3.5 ${className}`}
              aria-hidden="true"
            />

            {label}
          </span>
        )
      )}
    </motion.div>
  );
};

// ======================================================
// Social Link
// ======================================================

const SocialLink = ({
  href,
  icon: Icon,
  label,
  reduceMotion,
}) => {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={
        href.startsWith("mailto:")
          ? undefined
          : "noopener noreferrer"
      }
      aria-label={label}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -2,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.96,
            }
      }
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl

        border
        border-slate-200
        bg-white/80

        text-slate-500

        shadow-sm
        shadow-slate-900/[0.02]

        transition-[border-color,color,background-color,box-shadow]
        duration-200

        hover:border-violet-300
        hover:bg-violet-50/50
        hover:text-violet-600
        hover:shadow-md
        hover:shadow-violet-500/10

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-violet-500/40
        focus-visible:ring-offset-2
        focus-visible:ring-offset-white

        dark:border-slate-800
        dark:bg-slate-900/60
        dark:text-slate-400
        dark:hover:border-violet-700
        dark:hover:bg-violet-950/20
        dark:hover:text-violet-400
        dark:focus-visible:ring-violet-400/40
        dark:focus-visible:ring-offset-slate-950
      "
    >
      <Icon
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      />
    </motion.a>
  );
};

// ======================================================
// Profile Image
// ======================================================

const ProfileImage = ({
  name,
  reduceMotion,
}) => {
  return (
    <motion.div
      variants={imageVariants}
      className="flex justify-center lg:justify-end"
    >
      <div className="group relative">
        {/* Rotating accent ring */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
          className="
            absolute
            -inset-[3px]
            rounded-full
            bg-gradient-to-br
            from-violet-500
            via-blue-500
            to-cyan-400
            opacity-70

            dark:from-violet-400
            dark:via-blue-400
            dark:to-cyan-300
            dark:opacity-50
          "
        />

        {/* Separation ring */}
        <div
          className="
            absolute
            -inset-[2px]
            rounded-full
            bg-white
            dark:bg-slate-950
          "
          aria-hidden="true"
        />

        {/* Hover glow */}
        <div
          className="
            absolute
            -inset-8
            rounded-full
            bg-gradient-to-br
            from-violet-400/15
            via-blue-400/10
            to-transparent
            opacity-0
            blur-2xl
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
          aria-hidden="true"
        />

        {/* Image */}
        <div
          className="
            relative
            h-56
            w-56
            overflow-hidden
            rounded-full

            shadow-2xl
            shadow-violet-500/10

            sm:h-64
            sm:w-64

            md:h-72
            md:w-72

            lg:h-80
            lg:w-80
          "
        >
          <OptimizedImage
            src={HERO.image}
            alt={`Professional portrait of ${name}`}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.03]
            "
          />
        </div>
      </div>
    </motion.div>
  );
};

// ======================================================
// Hero
// ======================================================

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToProjects = useCallback(() => {
    const element = document.getElementById("projects");

    if (!element) return;

    const navbarOffset = 80;

    const targetPosition =
      element.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [reduceMotion]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="
        relative
        flex
        min-h-[calc(100svh-4rem)]
        items-center
        overflow-hidden
        bg-white
        dark:bg-slate-950
      "
    >
      <BackgroundEffects
        reduceMotion={reduceMotion}
      />

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-12
          px-5
          py-20

          sm:px-6
          sm:py-24

          lg:grid-cols-2
          lg:gap-16
          lg:px-8
          lg:py-20
        "
      >
        {/* ==================================================
            Content
        ================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            order-2
            flex
            max-w-2xl
            flex-col
            items-start
            gap-5

            lg:order-1
          "
        >
          {/* Availability */}
          <StatusBadge />

          {/* Heading */}
          <motion.h1
            id="hero-heading"
            variants={fadeUpVariants}
            className="
              text-[2.5rem]
              font-extrabold
              leading-[1.08]
              tracking-[-0.035em]
              text-slate-950

              sm:text-5xl

              lg:text-[3.5rem]

              xl:text-[4rem]

              dark:text-white
            "
          >
            Hi, I'm{" "}
            <span className="relative inline-block">
              <span
                className="
                  bg-gradient-to-r
                  from-violet-600
                  via-blue-500
                  to-cyan-500
                  bg-clip-text
                  text-transparent

                  dark:from-violet-400
                  dark:via-blue-400
                  dark:to-cyan-400
                "
              >
                {HERO.firstName}
              </span>

              <motion.span
                initial={
                  reduceMotion
                    ? false
                    : {
                        scaleX: 0,
                      }
                }
                animate={{
                  scaleX: 1,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        delay: 0.55,
                        duration: 0.45,
                        ease: [0.25, 0.1, 0.25, 1],
                      }
                }
                style={{
                  transformOrigin: "left",
                }}
                className="
                  absolute
                  -bottom-1
                  left-0
                  right-0
                  h-0.5
                  rounded-full
                  bg-gradient-to-r
                  from-violet-500
                  via-blue-500
                  to-cyan-400

                  dark:from-violet-400
                  dark:via-blue-400
                  dark:to-cyan-300
                "
                aria-hidden="true"
              />
            </span>
            <br />

            <span
              className="
                font-bold
                text-slate-700
                dark:text-slate-300
              "
            >
              {HERO.role}
            </span>
          </motion.h1>

          {/* Main value proposition */}
          <motion.p
            variants={fadeUpVariants}
            className="
              max-w-[52ch]
              text-base
              leading-7
              text-slate-600

              sm:text-lg
              sm:leading-8

              dark:text-slate-400
            "
          >
            {HERO.tagline}
          </motion.p>

          {/* Supporting description */}
          <motion.p
            variants={fadeUpVariants}
            className="
              max-w-[54ch]
              text-sm
              leading-6
              text-slate-500

              dark:text-slate-500
            "
          >
            {HERO.description}
          </motion.p>

          {/* Stack */}
          <StackPills />

          {/* ==================================================
              CTAs
          ================================================== */}

          <motion.div
            variants={fadeUpVariants}
            className="
              flex
              w-full
              flex-wrap
              gap-3
              pt-1
            "
          >
            {/* Primary CTA */}
            <motion.button
              type="button"
              onClick={scrollToProjects}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -1,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.98,
                    }
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-blue-600
                px-5
                text-sm
                font-semibold
                text-white

                shadow-md
                shadow-violet-500/20

                transition-[box-shadow]
                duration-200

                hover:shadow-lg
                hover:shadow-violet-500/25

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/40
                focus-visible:ring-offset-2
                focus-visible:ring-offset-white

                dark:from-violet-500
                dark:to-blue-500
                dark:focus-visible:ring-violet-400/40
                dark:focus-visible:ring-offset-slate-950
              "
            >
              View Projects

              <HiOutlineArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </motion.button>

            {/* Resume */}
            <motion.a
              href={HERO.resume}
              download
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -1,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.98,
                    }
              }
              className="
                inline-flex
                min-h-11
                items-center
                justify-center
                gap-2
                rounded-full

                border
                border-slate-200
                bg-white/80

                px-5

                text-sm
                font-semibold
                text-slate-700

                shadow-sm
                shadow-slate-900/[0.02]

                transition-[border-color,color,background-color,box-shadow]
                duration-200

                hover:border-violet-300
                hover:bg-violet-50/40
                hover:text-violet-700

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500/40
                focus-visible:ring-offset-2
                focus-visible:ring-offset-white

                dark:border-slate-700
                dark:bg-slate-900/60
                dark:text-slate-300
                dark:hover:border-violet-700
                dark:hover:bg-violet-950/20
                dark:hover:text-violet-400
                dark:focus-visible:ring-violet-400/40
                dark:focus-visible:ring-offset-slate-950
              "
            >
              Resume

              <HiOutlineDownload
                className="h-4 w-4"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>

          {/* ==================================================
              Socials
          ================================================== */}

          <motion.div
            variants={fadeUpVariants}
            className="
              flex
              items-center
              gap-3
              pt-1
            "
          >
            <span
              className="
                text-xs
                font-medium
                text-slate-400
                dark:text-slate-600
              "
            >
              Find me on
            </span>

            <div
              className="flex items-center gap-2"
              aria-label="Social profiles"
            >
              {HERO.socials.map((social) => (
                <SocialLink
                  key={social.label}
                  {...social}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ==================================================
            Profile
        ================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            order-1
            lg:order-2
          "
        >
          <ProfileImage
            name={HERO.name}
            reduceMotion={reduceMotion}
          />
        </motion.div>
      </div>
    </section>
  );
}