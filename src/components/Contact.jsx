import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { Section, Card } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { icon: FaGithub,   href: "https://github.com/mehedirobi",             label: "GitHub",   color: "hover:border-slate-500 hover:text-slate-900 dark:hover:text-white"          },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedirobii/",   label: "LinkedIn", color: "hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400"             },
  { icon: FaXTwitter, href: "https://x.com/mehedirobii",                 label: "X (Twitter)", color: "hover:border-slate-500 hover:text-slate-900 dark:hover:text-white"       },
];

const CONTACTS = [
  {
    icon:  FiMail,
    label: "Email",
    value: "mehedirobidev@gmail.com",
    href:  "mailto:mehedirobidev@gmail.com",
    color: {
      icon:   "group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-500",
      badge:  "bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
    },
  },
  {
    icon:  FiPhone,
    label: "Phone",
    value: "+880 1336458100",
    href:  "tel:+8801336458100",
    color: {
      icon:   "group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500",
      badge:  "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
  },
];

const MESSAGE_LIMIT = 500;
const INITIAL_FORM  = { name: "", email: "", message: "" };

// ─── Animations 

const VIEWPORT = { once: true, amount: 0.2 };

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};


// ─── SectionHeader 

const SectionHeader = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="text-center mb-14"
    >
      <motion.p
        variants={fadeUp}
        className="
          inline-flex items-center gap-2
          text-[11px] font-semibold uppercase tracking-widest
          text-slate-400 dark:text-slate-500 mb-3
        "
      >
        <span className="w-4 h-px bg-current opacity-60" />
        Get in touch
        <span className="w-4 h-px bg-current opacity-60" />
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white"
      >
        Contact
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 leading-relaxed"
      >
        Open for freelance work, collaboration, and full-time opportunities.
      </motion.p>
    </motion.div>
  );
};

// ─── ContactItem 

const ContactItem = ({ item, index, copied, onCopy }) => {
  const isCopied = copied === index;

  return (
    <Card className="group flex items-center justify-between gap-4 transition-shadow duration-300 hover:shadow-md hover:shadow-slate-100 dark:hover:shadow-black/20">
      <div className="flex items-center gap-3 min-w-0">

        {/* Icon */}
        <div
          className={`
            shrink-0 flex items-center justify-center
            w-10 h-10 rounded-xl
            bg-slate-100 dark:bg-slate-800
            text-slate-500 dark:text-slate-400
            transition-colors duration-300
            ${item.color.icon}
          `}
        >
          <item.icon className="w-4 h-4" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-600 mb-0.5">
            {item.label}
          </p>
          <a
            href={item.href}
            className="text-sm font-medium text-slate-900 dark:text-white
                       hover:text-slate-600 dark:hover:text-slate-300
                       transition-colors truncate block"
          >
            {item.value}
          </a>
        </div>
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={() => onCopy(item.value, index)}
        aria-label={isCopied ? `${item.label} copied` : `Copy ${item.label}`}
        className="
          shrink-0 p-2 rounded-lg
          border border-slate-200 dark:border-slate-800
          text-slate-400 dark:text-slate-600
          hover:border-slate-400 dark:hover:border-slate-600
          hover:text-slate-700 dark:hover:text-slate-300
          active:scale-95 transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiCopy className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Card>
  );
};

// ─── SocialLink 

const SocialLink = ({ icon: Icon, href, label, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`
          h-10 w-10 flex items-center justify-center rounded-xl
          border border-slate-200 dark:border-slate-800
          text-slate-500 dark:text-slate-400
          transition-all duration-200
          hover:-translate-y-0.5
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30
          ${color}
        `}
      >
        <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
      </a>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1    }}
            exit={{    opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              absolute -bottom-8 left-1/2 -translate-x-1/2
              px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap
              bg-slate-900 text-white dark:bg-white dark:text-slate-900
              pointer-events-none select-none z-10
            "
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Field shared class 

const fieldClass = `
  w-full px-4 py-2.5 rounded-xl text-sm
  border border-slate-200 dark:border-slate-800
  bg-white dark:bg-slate-900/60
  text-slate-900 dark:text-white
  placeholder:text-slate-400 dark:placeholder:text-slate-600
  focus:outline-none
  focus:ring-2 focus:ring-slate-900/15 dark:focus:ring-white/15
  focus:border-slate-400 dark:focus:border-slate-600
  transition-all duration-200
`;

// ─── Contact (main export) 

export default function Contact() {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [copied, setCopied]       = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState({});

  const msgLength = form.message.length;

  // ── Handlers 

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MESSAGE_LIMIT) return;
    setForm((prev)   => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleCopy = useCallback(async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* silent */ }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                            e.name    = "Name is required";
    if (!form.email.trim())                           e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))        e.email   = "Enter a valid email";
    if (!form.message.trim())                         e.message = "Message is required";
    return e;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // TODO: replace with real service — EmailJS / Formspree / Resend
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 4000);
  }, [form]);

  return (
    <Section id="contact" aria-label="Contact">

      <SectionHeader />

      {/* ── Grid ── */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Left ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-8"
        >
          {/* Contact cards */}
          <div className="space-y-3">
            {CONTACTS.map((item, i) => (
              <motion.div key={item.label} variants={fadeUp}>
                <ContactItem item={item} index={i} copied={copied} onCopy={handleCopy} />
              </motion.div>
            ))}
          </div>

          {/* Socials */}
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-3">
              Find me on
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </motion.div>

          {/* Response time note */}
          <motion.div variants={fadeUp}>
            <div className="
              flex items-start gap-3 p-4 rounded-xl
              bg-slate-50 dark:bg-slate-800/40
              border border-slate-200 dark:border-slate-800
            ">
              <span className="text-lg mt-0.5" aria-hidden="true">⚡</span>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Quick response
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                  I typically reply within 24 hours. Feel free to reach out anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right: Form ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
            className="space-y-3"
          >
            {/* Success toast */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0,  scale: 1    }}
                  exit={{    opacity: 0, y: -8,  scale: 0.98 }}
                  role="status"
                  aria-live="polite"
                  className="
                    flex items-center gap-2.5 px-4 py-3 rounded-xl
                    bg-emerald-50 dark:bg-emerald-950/40
                    border border-emerald-200 dark:border-emerald-800/60
                    text-emerald-700 dark:text-emerald-400 text-sm font-medium
                  "
                >
                  <FiCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Message sent — I'll get back to you shortly.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name */}
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name" name="name" type="text"
                value={form.name} onChange={handleChange}
                placeholder="Your name"
                required autoComplete="name"
                className={`${fieldClass} ${errors.name ? "border-red-400 dark:border-red-600 focus:ring-red-400/20" : ""}`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400 pl-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email" name="email" type="email"
                value={form.email} onChange={handleChange}
                placeholder="your@email.com"
                required autoComplete="email"
                className={`${fieldClass} ${errors.email ? "border-red-400 dark:border-red-600 focus:ring-red-400/20" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400 pl-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message" name="message"
                value={form.message} onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows={5} required
                className={`${fieldClass} resize-none ${errors.message ? "border-red-400 dark:border-red-600 focus:ring-red-400/20" : ""}`}
              />
              <div className="flex items-center justify-between mt-1 px-1">
                {errors.message
                  ? <p className="text-xs text-red-500 dark:text-red-400">{errors.message}</p>
                  : <span />
                }
                <p className={`text-xs tabular-nums ml-auto ${msgLength > MESSAGE_LIMIT * 0.9 ? "text-amber-500 dark:text-amber-400" : "text-slate-400 dark:text-slate-600"}`}>
                  {msgLength}/{MESSAGE_LIMIT}
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-xl text-sm font-semibold
                bg-slate-900 text-white dark:bg-white dark:text-slate-900
                hover:opacity-85 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40
              "
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <FiSend className="w-3.5 h-3.5" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>

          </motion.form>
        </motion.div>
      </div>

    </Section>
  );
}