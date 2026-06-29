import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { Section, Card } from "./UI";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIALS = [
  { icon: FaGithub,   href: "https://github.com/mehedirobi",               label: "GitHub"   },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedirobii/",     label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/mehedirobii",                   label: "X"        },
];

const CONTACTS = [
  { icon: FiMail,  label: "Email", value: "mehedirobidev@gmail.com", href: "mailto:mehedirobidev@gmail.com" },
  { icon: FiPhone, label: "Phone", value: "+880 1336458100",         href: "tel:+8801336458100"             },
];

const INITIAL_FORM = { name: "", email: "", message: "" };

// ─── Animation ────────────────────────────────────────────────────────────────

const VIEWPORT = { once: true, amount: 0.2 };

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── ContactItem ──────────────────────────────────────────────────────────────

const ContactItem = ({ item, index, copied, onCopy }) => {
  const isCopied = copied === index;

  return (
    <Card className="group flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 flex items-center justify-center
                        w-10 h-10 rounded-xl
                        bg-slate-100 dark:bg-slate-800/80
                        text-slate-500 dark:text-slate-400
                        group-hover:bg-slate-900 group-hover:text-white
                        dark:group-hover:bg-white dark:group-hover:text-slate-900
                        transition-colors duration-300">
          <item.icon className="w-4 h-4" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-semibold
                        text-slate-400 dark:text-slate-600 mb-0.5">
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

      <button
        type="button"
        onClick={() => onCopy(item.value, index)}
        aria-label={isCopied ? `${item.label} copied` : `Copy ${item.label}`}
        className="shrink-0 p-2 rounded-lg
                   border border-slate-200 dark:border-slate-800
                   text-slate-400 dark:text-slate-600
                   hover:border-slate-400 dark:hover:border-slate-600
                   hover:text-slate-700 dark:hover:text-slate-300
                   active:scale-95 transition-all duration-150
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{    scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FiCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{    scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FiCopy className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Card>
  );
};

// ─── Field ────────────────────────────────────────────────────────────────────

const fieldClass = `
  w-full px-4 py-2.5 rounded-xl text-sm
  border border-slate-200 dark:border-slate-800
  bg-white dark:bg-slate-900
  text-slate-900 dark:text-white
  placeholder:text-slate-400 dark:placeholder:text-slate-600
  focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20
  focus:border-slate-400 dark:focus:border-slate-600
  transition-all duration-150
`;

// ─── Contact ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [copied, setCopied]       = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCopy = useCallback(async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // silent fail
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: replace with real email service (EmailJS, Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 800)); // simulated delay

    setSubmitted(true);
    setForm(INITIAL_FORM);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 3000);
  }, []);

  return (
    <Section id="contact" aria-label="Contact">

      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-center mb-14"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-widest
                     text-slate-400 dark:text-slate-600 mb-3"
        >
          Get in touch
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold tracking-tight
                     text-slate-950 dark:text-white"
        >
          Contact
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-base
                     text-slate-500 dark:text-slate-400 leading-relaxed"
        >
          Open for freelance work, collaboration, and full-time opportunities.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14">

        {/* Left */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="space-y-8"
        >
          {/* Contact cards */}
          <div className="space-y-3">
            {CONTACTS.map((item, index) => (
              <motion.div key={item.label} variants={fadeUp}>
                <ContactItem item={item} index={index} copied={copied} onCopy={handleCopy} />
              </motion.div>
            ))}
          </div>

          {/* Socials */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest
                          text-slate-400 dark:text-slate-600 mb-3">
              Socials
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="h-10 w-10 flex items-center justify-center rounded-xl
                             border border-slate-200 dark:border-slate-800
                             text-slate-500 dark:text-slate-400
                             hover:border-slate-400 dark:hover:border-slate-600
                             hover:text-slate-900 dark:hover:text-white
                             hover:-translate-y-0.5
                             transition-all duration-200
                             focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30"
                >
                  <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          onSubmit={handleSubmit}
          noValidate
          aria-label="Contact form"
          className="space-y-3"
        >
          {/* Success toast */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0,   scale: 1    }}
                exit={{    opacity: 0, y: -6,   scale: 0.98 }}
                role="status"
                aria-live="polite"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                           bg-emerald-50 dark:bg-emerald-950/40
                           border border-emerald-200 dark:border-emerald-800/60
                           text-emerald-700 dark:text-emerald-400 text-sm font-medium"
              >
                <FiCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                Message sent — I'll get back to you shortly.
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp}>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message..."
              rows={5}
              required
              className={`${fieldClass} resize-none`}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2
                         px-6 py-2.5 rounded-xl text-sm font-semibold
                         bg-slate-900 text-white dark:bg-white dark:text-slate-900
                         hover:opacity-80 active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-slate-900/40 dark:focus-visible:ring-white/40"
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
          </motion.div>

        </motion.form>
      </div>

    </Section>
  );
}