import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiSend,
} from "react-icons/fi";

import { Section, Card } from "./UI";

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const EMAIL = "mehedirobidev@gmail.com";
const MESSAGE_LIMIT = 500;

const CONTACTS = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: FiMail,
    accent: "group-hover:bg-violet-600",
  },
  {
    label: "Phone",
    value: "+8801336458100",
    href: "tel:+8801336458100",
    icon: FiPhone,
    accent: "group-hover:bg-emerald-600",
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/mehedirobi",
    icon: FaGithub,
    hover: "hover:border-slate-400 hover:text-slate-950",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehedirobii/",
    icon: FaLinkedin,
    hover: "hover:border-sky-400 hover:text-sky-600",
  },
  {
    label: "X",
    href: "https://x.com/mehedirobii",
    icon: FaXTwitter,
    hover: "hover:border-slate-400 hover:text-slate-950",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  message: "",
};

const EASE = [0.22, 1, 0.36, 1];

const VIEWPORT = {
  once: true,
  amount: 0.15,
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Shared Styles                                                              */
/* -------------------------------------------------------------------------- */

const FIELD_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 " +
  "text-sm text-slate-900 placeholder:text-slate-400 " +
  "outline-none transition-colors duration-200 " +
  "focus:border-violet-400 focus:ring-2 focus:ring-violet-500/10";

/* -------------------------------------------------------------------------- */
/* Section Header                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({ reduceMotion }) {
  return (
    <motion.header
      variants={stagger}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      className="mb-10 text-center sm:mb-12"
    >
      <motion.p
        variants={fadeUp}
        className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600"
      >
        Get in touch
      </motion.p>

      <motion.h2
        id="contact-heading"
        variants={fadeUp}
        className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
      >
        Let's Connect
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base"
      >
        Have a project, an opportunity, or an idea to discuss?
        I'd be glad to hear from you.
      </motion.p>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Information                                                        */
/* -------------------------------------------------------------------------- */

function ContactItem({ item, copied, onCopy }) {
  const Icon = item.icon;
  const isCopied = copied === item.label;

  return (
    <Card className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-violet-200 hover:shadow-md">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors duration-200 group-hover:text-white ${item.accent}`}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            {item.label}
          </p>

          <a
            href={item.href}
            className="block truncate text-sm font-medium text-slate-800 transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {item.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCopy(item.value, item.label)}
        aria-label={
          isCopied ? `${item.label} copied` : `Copy ${item.label}`
        }
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {isCopied ? (
          <FiCheck
            className="h-4 w-4 text-emerald-600"
            aria-hidden="true"
          />
        ) : (
          <FiCopy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Social Links                                                               */
/* -------------------------------------------------------------------------- */

function SocialLinks({ reduceMotion }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        Find me on
      </p>

      <div className="flex flex-wrap gap-2.5">
        {SOCIALS.map(({ label, href, icon: Icon, hover }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${label} profile`}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors duration-200 ${hover} ${
              reduceMotion ? "" : "hover:-translate-y-0.5"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500`}
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form Field                                                                 */
/* -------------------------------------------------------------------------- */

function FormField({
  id,
  label,
  error,
  as = "input",
  className = "",
  ...props
}) {
  const Component = as;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <Component
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD_CLASS} ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
            : ""
        } ${className}`}
        {...props}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Form                                                               */
/* -------------------------------------------------------------------------- */

function ContactForm({
  form,
  errors,
  onChange,
  onSubmit,
  reduceMotion,
}) {
  const messageLength = form.message.length;

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-6">
        <p className="text-lg font-bold tracking-tight text-slate-950">
          Send a message
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Fill in the details below to start a conversation.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        aria-label="Contact form"
        className="space-y-4"
      >
        <FormField
          id="contact-name"
          name="name"
          label="Your name"
          type="text"
          autoComplete="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={onChange}
          error={errors.name}
          required
        />

        <FormField
          id="contact-email"
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          required
        />

        <div>
          <FormField
            id="contact-message"
            name="message"
            label="Message"
            as="textarea"
            rows={5}
            maxLength={MESSAGE_LIMIT}
            placeholder="Tell me about your project or opportunity..."
            value={form.message}
            onChange={onChange}
            error={errors.message}
            className="resize-y"
            required
          />

          <p
            className={`mt-1.5 text-right text-xs tabular-nums ${
              messageLength >= MESSAGE_LIMIT * 0.9
                ? "text-amber-600"
                : "text-slate-400"
            }`}
            aria-live="polite"
          >
            {messageLength}/{MESSAGE_LIMIT}
          </p>
        </div>

        <button
          type="submit"
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
            reduceMotion ? "" : "active:scale-[0.99]"
          }`}
        >
          Open Email Draft
          <FiSend className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="text-center text-xs leading-5 text-slate-500">
          Opens your email app with your message prefilled.
          You can review and send it there.
        </p>
      </form>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contact Section                                                            */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(null);
  const [copyError, setCopyError] = useState("");

  const reduceMotion = useReducedMotion();

  // Clear the copy confirmation automatically and clean up the timer.
  useEffect(() => {
    if (!copied) return undefined;

    const timeoutId = window.setTimeout(() => {
      setCopied(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => {
      if (!previous[name]) return previous;

      return {
        ...previous,
        [name]: "",
      };
    });
  }, []);

  const handleCopy = useCallback(async (value, label) => {
    setCopyError("");

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      setCopyError(
        `Could not copy ${label.toLowerCase()}. Select and copy the contact detail directly.`
      );
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const name = form.name.trim();
      const email = form.email.trim();
      const message = form.message.trim();

      const nextErrors = {};

      if (!name) {
        nextErrors.name = "Please enter your name.";
      } else if (name.length > 100) {
        nextErrors.name = "Name must be 100 characters or fewer.";
      }

      if (!email) {
        nextErrors.email = "Please enter your email address.";
      } else if (
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        nextErrors.email = "Please enter a valid email address.";
      }

      if (!message) {
        nextErrors.message = "Please enter a message.";
      } else if (message.length > MESSAGE_LIMIT) {
        nextErrors.message = `Message must be ${MESSAGE_LIMIT} characters or fewer.`;
      }

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) return;

      const subject = `Portfolio enquiry from ${name}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n");

      const mailtoUrl =
        `mailto:${EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    },
    [form]
  );

  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      background="bg-slate-50"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader reduceMotion={reduceMotion} />

        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
        >
          {/* Contact information */}
          <motion.div
            variants={fadeUp}
            className="min-w-0 space-y-7 lg:pt-2"
          >
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-950">
                Let's talk
              </h3>

              <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
                I'm open to discussing development projects,
                collaboration, and opportunities to grow as a
                software developer.
              </p>
            </div>

            <div className="space-y-3">
              {CONTACTS.map((item) => (
                <ContactItem
                  key={item.label}
                  item={item}
                  copied={copied}
                  onCopy={handleCopy}
                />
              ))}
            </div>

            <div aria-live="polite" role="status">
              {copied && (
                <p className="text-xs font-medium text-emerald-700">
                  {copied} copied to clipboard.
                </p>
              )}

              {copyError && (
                <p className="text-xs text-red-600">
                  {copyError}
                </p>
              )}
            </div>

            <SocialLinks reduceMotion={reduceMotion} />
          </motion.div>

          {/* Contact form */}
          <motion.div variants={fadeUp} className="min-w-0">
            <ContactForm
              form={form}
              errors={errors}
              onChange={handleChange}
              onSubmit={handleSubmit}
              reduceMotion={reduceMotion}
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}