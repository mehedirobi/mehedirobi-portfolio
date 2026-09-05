import React, { useCallback, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiMail,
  FiPhone,
  FiCopy,
  FiCheck,
  FiSend,
} from "react-icons/fi";
import { Section, Card } from "./UI";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const SOCIALS = [
  {
    icon: FaGithub,
    href: "https://github.com/mehedirobi",
    label: "GitHub",
    hover:
      "hover:border-slate-500 hover:text-slate-900 dark:hover:text-white",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mehedirobii/",
    label: "LinkedIn",
    hover:
      "hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/mehedirobii",
    label: "X",
    hover:
      "hover:border-slate-500 hover:text-slate-900 dark:hover:text-white",
  },
];

const CONTACTS = [
  {
    icon: FiMail,
    label: "Email",
    value: "mehedirobidev@gmail.com",
    href: "mailto:mehedirobidev@gmail.com",
    color: {
      icon:
        "group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500",
    },
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+8801336458100",
    href: "tel:+8801336458100",
    color: {
      icon:
        "group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500",
    },
  },
];

const MESSAGE_LIMIT = 500;

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
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
      className="mb-12 text-center sm:mb-14"
    >
      <motion.p
        variants={fadeUp}
        className="
          mb-3 inline-flex items-center gap-2
          text-[11px] font-semibold uppercase tracking-[0.18em]
          text-slate-400 dark:text-slate-500
        "
      >
        <span
          className="h-px w-5 bg-current opacity-60"
          aria-hidden="true"
        />

        Get in touch

        <span
          className="h-px w-5 bg-current opacity-60"
          aria-hidden="true"
        />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="
          text-3xl font-bold tracking-tight
          text-slate-950 dark:text-white
          sm:text-4xl
        "
      >
        Contact
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="
          mx-auto mt-4 max-w-xl
          text-sm leading-7
          text-slate-500 dark:text-slate-400
          sm:text-base
        "
      >
        Have a project, opportunity, or collaboration in mind?
        Feel free to get in touch.
      </motion.p>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* Contact Item                                                               */
/* -------------------------------------------------------------------------- */

const ContactItem = ({ item, copied, onCopy }) => {
  const isCopied = copied === item.label;

  return (
    <Card
      className="
        group flex items-center justify-between gap-4
        transition-shadow duration-300
        hover:shadow-md
        hover:shadow-slate-100
        dark:hover:shadow-black/20
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            bg-slate-100 text-slate-500
            transition-colors duration-300
            dark:bg-slate-800 dark:text-slate-400
            ${item.color.icon}
          `}
        >
          <item.icon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <p
            className="
              mb-0.5 text-[10px] font-semibold uppercase
              tracking-[0.16em]
              text-slate-400 dark:text-slate-600
            "
          >
            {item.label}
          </p>

          <a
            href={item.href}
            className="
              block truncate text-sm font-medium
              text-slate-900 transition-colors
              hover:text-slate-600
              dark:text-white dark:hover:text-slate-300
            "
          >
            {item.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCopy(item.value, item.label)}
        aria-label={
          isCopied
            ? `${item.label} copied`
            : `Copy ${item.label}`
        }
        className="
          shrink-0 rounded-lg p-2
          border border-slate-200
          text-slate-400
          transition-all duration-150
          hover:border-slate-400 hover:text-slate-700
          active:scale-95
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-slate-900/30
          dark:border-slate-800
          dark:text-slate-600
          dark:hover:border-slate-600
          dark:hover:text-slate-300
          dark:focus-visible:ring-white/30
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <FiCheck
                className="h-3.5 w-3.5 text-emerald-500"
                aria-hidden="true"
              />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <FiCopy
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/* Social Link                                                                */
/* -------------------------------------------------------------------------- */

const SocialLink = ({
  icon: Icon,
  href,
  label,
  hover,
  shouldReduce,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit my ${label} profile`}
      className={`
        flex h-10 w-10 items-center justify-center
        rounded-xl
        border border-slate-200
        text-slate-500
        transition-all duration-200
        dark:border-slate-800
        dark:text-slate-400
        ${shouldReduce ? "" : "hover:-translate-y-0.5"}
        ${hover}
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-900/30
        dark:focus-visible:ring-white/30
      `}
    >
      <Icon
        className="h-[18px] w-[18px]"
        aria-hidden="true"
      />
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Form Field                                                                 */
/* -------------------------------------------------------------------------- */

const FIELD_CLASS = `
  w-full rounded-xl
  border border-slate-200
  bg-white px-4 py-2.5
  text-sm text-slate-900
  placeholder:text-slate-400
  transition-all duration-200
  focus:border-slate-400
  focus:outline-none
  focus:ring-2
  focus:ring-slate-900/10
  dark:border-slate-800
  dark:bg-slate-900/60
  dark:text-white
  dark:placeholder:text-slate-600
  dark:focus:border-slate-600
  dark:focus:ring-white/10
`;

/* -------------------------------------------------------------------------- */
/* Contact Form                                                               */
/* -------------------------------------------------------------------------- */

const ContactForm = ({
  form,
  errors,
  loading,
  submitted,
  messageLength,
  onChange,
  onSubmit,
}) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.form
      variants={fadeUp}
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact form"
      className="space-y-4"
    >
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={
              shouldReduce
                ? { opacity: 0 }
                : { opacity: 0, y: -8 }
            }
            animate={
              shouldReduce
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
            }
            exit={
              shouldReduce
                ? { opacity: 0 }
                : { opacity: 0, y: -8 }
            }
            role="status"
            aria-live="polite"
            className="
              flex items-center gap-2.5
              rounded-xl border
              border-emerald-200
              bg-emerald-50 px-4 py-3
              text-sm font-medium
              text-emerald-700
              dark:border-emerald-800/60
              dark:bg-emerald-950/40
              dark:text-emerald-400
            "
          >
            <FiCheck
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />

            Message sent successfully.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="
            mb-1.5 block text-xs font-medium
            text-slate-600 dark:text-slate-400
          "
        >
          Name
        </label>

        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? "name-error" : undefined
          }
          className={`
            ${FIELD_CLASS}
            ${
              errors.name
                ? "border-red-400 focus:ring-red-400/20 dark:border-red-600"
                : ""
            }
          `}
        />

        {errors.name && (
          <p
            id="name-error"
            className="mt-1.5 pl-1 text-xs text-red-500 dark:text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="
            mb-1.5 block text-xs font-medium
            text-slate-600 dark:text-slate-400
          "
        >
          Email
        </label>

        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="your@email.com"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "email-error" : undefined
          }
          className={`
            ${FIELD_CLASS}
            ${
              errors.email
                ? "border-red-400 focus:ring-red-400/20 dark:border-red-600"
                : ""
            }
          `}
        />

        {errors.email && (
          <p
            id="email-error"
            className="mt-1.5 pl-1 text-xs text-red-500 dark:text-red-400"
          >
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="
            mb-1.5 block text-xs font-medium
            text-slate-600 dark:text-slate-400
          "
        >
          Message
        </label>

        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Tell me about your project or opportunity..."
          rows={5}
          maxLength={MESSAGE_LIMIT}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby="message-meta"
          className={`
            ${FIELD_CLASS}
            resize-none
            ${
              errors.message
                ? "border-red-400 focus:ring-red-400/20 dark:border-red-600"
                : ""
            }
          `}
        />

        <div
          id="message-meta"
          className="mt-1.5 flex items-center justify-between px-1"
        >
          {errors.message ? (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.message}
            </p>
          ) : (
            <span />
          )}

          <p
            className={`
              ml-auto text-xs tabular-nums
              ${
                messageLength > MESSAGE_LIMIT * 0.9
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-slate-400 dark:text-slate-600"
              }
            `}
          >
            {messageLength}/{MESSAGE_LIMIT}
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="
          inline-flex w-full items-center justify-center gap-2
          rounded-xl
          bg-slate-900 px-6 py-3
          text-sm font-semibold text-white
          transition-all duration-150
          hover:opacity-85
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
          dark:bg-white
          dark:text-slate-900
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-slate-900/40
          dark:focus-visible:ring-white/40
        "
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>

            Sending...
          </>
        ) : (
          <>
            <FiSend
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />

            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
};

/* -------------------------------------------------------------------------- */
/* Contact Section                                                            */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [copied, setCopied] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const shouldReduce = useReducedMotion();

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }, []);

  const handleCopy = useCallback(async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(label);

      window.setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch {
      // Clipboard access can fail in unsupported/insecure contexts.
    }
  }, []);

  const validateForm = useCallback(() => {
    const nextErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) {
      nextErrors.name = "Name is required.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!message) {
      nextErrors.message = "Message is required.";
    }

    return nextErrors;
  }, [form]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const nextErrors = validateForm();

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }

      /*
       * TODO:
       * Connect this section to your backend/API.
       *
       * Example:
       *
       * await fetch("/api/contact", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify(form),
       * });
       */

      setLoading(true);

      // Temporary UI simulation until backend is connected.
      await new Promise((resolve) => {
        window.setTimeout(resolve, 800);
      });

      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setErrors({});

      window.setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    },
    [form, validateForm]
  );

  return (
    <Section
      id="contact"
      aria-label="Contact"
    >
      <SectionHeader />

      <div
        className="
          mx-auto grid max-w-5xl
          gap-10
          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-16
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* Contact Information                                              */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-8"
        >
          {/* Contact methods */}
          <div className="space-y-3">
            {CONTACTS.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
              >
                <ContactItem
                  item={item}
                  copied={copied}
                  onCopy={handleCopy}
                />
              </motion.div>
            ))}
          </div>

          {/* Socials */}
          <motion.div variants={fadeUp}>
            <p
              className="
                mb-3 text-[11px] font-semibold uppercase
                tracking-[0.16em]
                text-slate-400 dark:text-slate-600
              "
            >
              Find me on
            </p>

            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <SocialLink
                  key={social.label}
                  {...social}
                  shouldReduce={shouldReduce}
                />
              ))}
            </div>
          </motion.div>

          {/* Response note */}
          <motion.div variants={fadeUp}>
            <div
              className="
                flex items-start gap-3
                rounded-xl border
                border-slate-200
                bg-slate-50 p-4
                dark:border-slate-800
                dark:bg-slate-800/40
              "
            >
              <span
                className="mt-0.5 text-base"
                aria-hidden="true"
              >
                ⚡
              </span>

              <div>
                <p
                  className="
                    text-sm font-medium
                    text-slate-700 dark:text-slate-300
                  "
                >
                  Quick response
                </p>

                <p
                  className="
                    mt-0.5 text-xs leading-5
                    text-slate-500 dark:text-slate-500
                  "
                >
                  I typically respond within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Contact Form                                                      */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <ContactForm
            form={form}
            errors={errors}
            loading={loading}
            submitted={submitted}
            messageLength={form.message.length}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>
    </Section>
  );
}