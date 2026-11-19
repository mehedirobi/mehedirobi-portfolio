import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, m } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiSend,
} from "react-icons/fi";

import { Card, Section } from "./UI";

// --------------------------------------------------
// Config & content
// --------------------------------------------------

const CONTACT_EMAIL = "mehedirobidev@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const REQUEST_TIMEOUT_MS = 15000;
const COPY_RESET_MS = 2000;

const CONTACTS = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: FiMail,
    copyNoun: "Email address",
  },
  {
    label: "Phone",
    value: "+8801336458100",
    href: "tel:+8801336458100",
    icon: FiPhone,
    copyNoun: "Phone number",
  },
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka+Bangladesh",
    icon: FiMapPin,
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/mehedirobi",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mehedirobii/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: FiMail,
  },
];

const initialForm = { name: "", email: "", subject: "", message: "" };
const FIELD_NAMES = Object.keys(initialForm);

const FIELDS = {
  name: {
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
    maxLength: 80,
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
    autoComplete: "email",
    inputMode: "email",
    maxLength: 254,
  },
  subject: {
    label: "Subject",
    type: "text",
    placeholder: "Project inquiry",
    autoComplete: "off",
    maxLength: 120,
  },
  message: {
    label: "Message",
    multiline: true,
    rows: 5,
    placeholder: "Tell me about your opportunity or project...",
    autoComplete: "off",
    maxLength: 2000,
    showCount: true,
  },
};

// Same rules and messages as before
const VALIDATORS = {
  name: (value) =>
    value.trim().length >= 2 ? "" : "Please enter your name.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ""
      : "Please enter a valid email address.",
  subject: (value) =>
    value.trim().length >= 3 ? "" : "Please add a subject.",
  message: (value) =>
    value.trim().length >= 10
      ? ""
      : "Message must be at least 10 characters long.",
};

const validateForm = (form) =>
  Object.fromEntries(
    FIELD_NAMES.map((name) => [name, VALIDATORS[name](form[name])])
  );

const IDLE = { type: "idle", message: "" };

const MESSAGES = {
  success:
    "Your message has been sent successfully. I will get back to you soon.",
  error:
    "Something went wrong while sending your message. Please try again or email me directly.",
  timeout:
    "The request took too long. Please try again or email me directly.",
  offline:
    "You appear to be offline. Please check your connection and try again.",
};

// --------------------------------------------------
// Shared styles (kept in sync with Navbar, Hero, Skills, Projects)
// --------------------------------------------------

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

const CARD_HOVER =
  "transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_36px_-16px_rgba(37,99,235,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const ICON_BUTTON_BASE =
  "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm " +
  "transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-95 " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 " +
  FOCUS_RING;

const ICON_BUTTON_DEFAULT = `${ICON_BUTTON_BASE} border-default bg-canvas text-muted hover:border-accent/40 hover:bg-accent/10 hover:text-accent`;
const ICON_BUTTON_COPIED = `${ICON_BUTTON_BASE} border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`;

const inputClasses = (hasError, multiline) =>
  `block w-full rounded-xl border bg-canvas px-4 py-3 text-base text-strong shadow-sm sm:text-sm ` +
  `placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 ` +
  `focus:outline-none focus:ring-4 read-only:opacity-70 ${
    multiline ? "min-h-32 resize-y" : ""
  } ${
    hasError
      ? "border-danger focus:border-danger focus:ring-danger/15"
      : "border-default hover:border-accent/40 focus:border-accent focus:ring-accent/15"
  }`;

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

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: index * 0.07 },
  }),
};

const viewport = { once: true, amount: 0.15 };

// --------------------------------------------------
// Clipboard helpers
// --------------------------------------------------

// Clipboard API needs a secure context (HTTPS). Falls back to execCommand.
async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy method
  }

  const previouslyFocused = document.activeElement;

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  } finally {
    previouslyFocused?.focus?.();
  }
}

function useCopyToClipboard() {
  const [copied, setCopied] = useState({ key: null, ok: true, message: "" });
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copy = useCallback(async (key, text, noun) => {
    const ok = await copyText(text);

    window.clearTimeout(timerRef.current);
    setCopied({
      key,
      ok,
      message: ok
        ? `${noun} copied to clipboard.`
        : `Could not copy the ${noun.toLowerCase()}. Please copy it manually.`,
    });

    timerRef.current = window.setTimeout(
      () => setCopied({ key: null, ok: true, message: "" }),
      COPY_RESET_MS
    );
  }, []);

  return [copied, copy];
}

// --------------------------------------------------
// Left column
// --------------------------------------------------

function CopyButton({ item, copied, onCopy }) {
  const isCopied = copied.key === item.label;
  const showSuccess = isCopied && copied.ok;

  return (
    <span className="relative shrink-0">
      <button
        type="button"
        onClick={() => onCopy(item.label, item.value, item.copyNoun)}
        aria-label={`Copy ${item.copyNoun.toLowerCase()}`}
        className={showSuccess ? ICON_BUTTON_COPIED : ICON_BUTTON_DEFAULT}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={showSuccess ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="inline-flex"
          >
            {showSuccess ? (
              <FiCheck aria-hidden="true" className="h-4 w-4" />
            ) : (
              <FiCopy aria-hidden="true" className="h-4 w-4" />
            )}
          </m.span>
        </AnimatePresence>
      </button>

      {/* Visual feedback; screen readers get the live region instead */}
      <AnimatePresence>
        {isCopied && (
          <m.span
            aria-hidden="true"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`pointer-events-none absolute bottom-full right-0 z-10 mb-2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-lg ${
              copied.ok
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-red-600 text-white"
            }`}
          >
            {copied.ok ? "Copied!" : "Copy failed"}
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ContactCard({ item, index, copied, onCopy }) {
  const { label, value, href, icon: Icon, copyNoun } = item;
  const isExternal = href.startsWith("http");

  return (
    <m.li
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-col lg:flex-1"
    >
      {/* Entrance lives on the <li>; hover lives on the Card so transforms never clash */}
      <Card
        className={`group flex flex-1 items-center gap-3 rounded-2xl border border-default bg-surface p-4 shadow-sm sm:gap-4 sm:p-5 ${CARD_HOVER}`}
      >
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/15 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:ring-transparent"
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {label}
          </p>

          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={`mt-1 block break-words rounded-sm text-sm font-semibold text-strong transition-colors duration-200 hover:text-accent sm:text-base ${FOCUS_RING}`}
          >
            {value}
          </a>
        </div>

        {copyNoun ? (
          <CopyButton item={item} copied={copied} onCopy={onCopy} />
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${value} in Google Maps (opens in a new tab)`}
            className={ICON_BUTTON_DEFAULT}
          >
            <FiExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
        )}
      </Card>
    </m.li>
  );
}

function SocialsCard() {
  return (
    <m.div
      variants={cardVariants}
      custom={CONTACTS.length}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <Card className="rounded-2xl border border-default bg-surface p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold text-strong">Find me online</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          Connect professionally or browse my code.
        </p>

        <ul aria-label="Social links" className="mt-4 flex items-center gap-2.5">
          {SOCIALS.map(({ label, href, icon: Icon }) => {
            const isExternal = !href.startsWith("mailto:");

            return (
              <li key={label}>
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={
                    isExternal ? `${label} (opens in a new tab)` : label
                  }
                  title={label}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-default bg-canvas text-muted shadow-sm transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:text-accent hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
                >
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </a>
              </li>
            );
          })}
        </ul>
      </Card>
    </m.div>
  );
}

// --------------------------------------------------
// Form pieces
// --------------------------------------------------

function Field({
  id,
  label,
  error,
  multiline = false,
  showCount = false,
  inputRef,
  value,
  ...props
}) {
  const errorId = `${id}-error`;
  const Tag = multiline ? "textarea" : "input";

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-strong">
          {label}
        </label>

        {showCount && (
          <span
            aria-hidden="true"
            className="text-xs tabular-nums text-muted"
          >
            {value.length}/{props.maxLength}
          </span>
        )}
      </div>

      <Tag
        id={id}
        ref={inputRef}
        value={value}
        required
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputClasses(Boolean(error), multiline)}
        {...props}
      />

      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-danger"
          >
            <FiAlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Button states: idle -> loading -> success | error
const SUBMIT_STATES = {
  idle: {
    label: "Send Message",
    icon: FiSend,
    tone: "from-blue-600 to-indigo-600 shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_6px_20px_-4px_rgba(37,99,235,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_0_0_1px_rgba(37,99,235,0.25),0_12px_28px_-4px_rgba(37,99,235,0.65),inset_0_1px_0_rgba(255,255,255,0.3)]",
    deeper: "from-blue-700 to-indigo-700",
  },
  loading: {
    label: "Sending...",
    icon: null,
    tone: "from-blue-600 to-indigo-600 shadow-[0_6px_20px_-4px_rgba(37,99,235,0.45)]",
  },
  success: {
    label: "Message Sent",
    icon: FiCheck,
    tone: "from-emerald-600 to-teal-600 shadow-[0_6px_20px_-4px_rgba(5,150,105,0.5)]",
  },
  error: {
    label: "Try Again",
    icon: FiRefreshCw,
    tone: "from-red-600 to-rose-600 shadow-[0_6px_20px_-4px_rgba(220,38,38,0.5)] hover:shadow-[0_12px_28px_-4px_rgba(220,38,38,0.6)]",
    deeper: "from-red-700 to-rose-700",
  },
};

function SubmitButton({ state }) {
  const { label, icon: Icon, tone, deeper } = SUBMIT_STATES[state];
  const isInteractive = state === "idle" || state === "error";

  return (
    // aria-disabled (not `disabled`) keeps keyboard focus on the button while sending
    <button
      type="submit"
      aria-disabled={!isInteractive}
      className={`group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-white/20 bg-gradient-to-r px-6 text-sm font-semibold text-white transition-[transform,box-shadow] duration-300 ease-out sm:w-auto sm:min-w-44 ${tone} ${
        isInteractive
          ? "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
          : "cursor-not-allowed"
      } motion-reduce:transition-none ${FOCUS_RING}`}
    >
      {/* Deeper gradient crossfades in on hover (never lighter) */}
      {isInteractive && deeper && (
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-r ${deeper} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={state}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="relative z-10 inline-flex items-center gap-2"
        >
          {state === "loading" ? (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
            />
          ) : (
            Icon && <Icon aria-hidden="true" className="h-4 w-4" />
          )}
          {label}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

function FormStatus({ status }) {
  return (
    // Always mounted so screen readers reliably announce changes
    <div aria-live="polite" className="text-sm sm:flex-1">
      {status.type === "loading" && (
        <span className="sr-only">{status.message}</span>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {status.type === "success" && (
          <m.p
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 text-success"
          >
            <FiCheckCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{status.message}</span>
          </m.p>
        )}

        {status.type === "error" && (
          <m.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 text-danger"
          >
            <FiAlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {status.message}{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
            </span>
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// --------------------------------------------------
// Main Contact section
// --------------------------------------------------

export default function Contact({ id = "contact" }) {
  const uid = useId();
  const formHeadingId = `${uid}-form-heading`;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(IDLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, copy] = useCopyToClipboard();

  const fieldRefs = useRef({});
  const honeypotRef = useRef(null);
  const submittingRef = useRef(false); // blocks double-clicks before React re-renders
  const abortRef = useRef(null);

  // Cancel any in-flight request on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: VALIDATORS[name](value) }));
    }

    setStatus((current) =>
      current.type === "success" || current.type === "error" ? IDLE : current
    );
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((current) => (current[name] ? current : { ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: VALIDATORS[name](value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELD_NAMES.map((name) => [name, true])));

    const firstInvalid = FIELD_NAMES.find((name) => nextErrors[name]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const resetForm = () => {
      setForm(initialForm);
      setErrors({});
      setTouched({});
    };

    // Honeypot: real visitors never see or fill this field. Bots get a silent fake success.
    if (honeypotRef.current?.value) {
      resetForm();
      setStatus({ type: "success", message: MESSAGES.success });
      return;
    }

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setStatus({ type: "error", message: MESSAGES.offline });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Sending your message..." });

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      // FormSubmit can answer 200 with { success: "false" }
      const data = await response.json();
      if (!data || typeof data !== "object") {
        throw new Error("The contact service returned an invalid response.");
      }
      if (data.success !== true && data.success !== "true") {
        throw new Error(data.message || "Unable to send message.");
      }

      resetForm();
      setStatus({ type: "success", message: MESSAGES.success });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.name === "AbortError" ? MESSAGES.timeout : MESSAGES.error,
      });
    } finally {
      window.clearTimeout(timeoutId);
      abortRef.current = null;
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name) => ({
    ...FIELDS[name],
    id: `${uid}-${name}`,
    name,
    value: form[name],
    error: errors[name],
    readOnly: isSubmitting,
    onChange: handleChange,
    onBlur: handleBlur,
    inputRef: (node) => {
      fieldRefs.current[name] = node;
    },
  });

  const submitState = isSubmitting
    ? "loading"
    : status.type === "success"
      ? "success"
      : status.type === "error"
        ? "error"
        : "idle";

  return (
    <MotionConfig reducedMotion="user">
      {/* bg-canvas so it alternates with Education (canvas-alt) above */}
      <Section id={id} aria-labelledby="contact-heading" background="bg-canvas">
        <div className="mx-auto max-w-6xl">
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
              Get in Touch
            </m.p>

            <m.h2
              id="contact-heading"
              variants={fadeUp}
              className="text-balance text-section font-bold tracking-tight text-strong"
            >
              Let&rsquo;s Connect
            </m.h2>

            <m.p
              variants={fadeUp}
              className="mt-4 text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              Have an opportunity, a project, or a question? Send me a message
              and I&rsquo;ll get back to you.
            </m.p>
          </m.header>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-12">
            {/* Left: contact details + socials */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              <ul className="flex flex-col gap-4 lg:flex-1">
                {CONTACTS.map((item, index) => (
                  <ContactCard
                    key={item.label}
                    item={item}
                    index={index}
                    copied={copied}
                    onCopy={copy}
                  />
                ))}
              </ul>

              <SocialsCard />
            </div>

            {/* Right: form */}
            <m.div
              variants={cardVariants}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="lg:col-span-7"
            >
              <Card className="h-full rounded-2xl border border-default bg-surface p-5 shadow-sm sm:p-8">
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-labelledby={formHeadingId}
                  aria-busy={isSubmitting}
                >
                  <h3
                    id={formHeadingId}
                    className="text-lg font-semibold tracking-tight text-strong sm:text-xl"
                  >
                    Send a message
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    All fields are required.
                  </p>

                  {/* Honeypot (hidden from people and assistive tech) */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label>
                      Leave this field empty
                      <input
                        ref={honeypotRef}
                        type="text"
                        name="company_website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field {...fieldProps("name")} />
                      <Field {...fieldProps("email")} />
                    </div>

                    <Field {...fieldProps("subject")} />
                    <Field {...fieldProps("message")} />
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                    <SubmitButton state={submitState} />
                    <FormStatus status={status} />
                  </div>
                </form>
              </Card>
            </m.div>
          </div>

          {/* Announces copy results to screen readers */}
          <p role="status" aria-live="polite" className="sr-only">
            {copied.message}
          </p>
        </div>
      </Section>
    </MotionConfig>
  );
}