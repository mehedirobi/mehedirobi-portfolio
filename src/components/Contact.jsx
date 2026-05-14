import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";
import { Section, Card, Button } from "./UI";

/**
 * CONFIG
 */
const SOCIALS = [
  { icon: FaGithub, href: "https://github.com/mehedirobi", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/mehedirobii/", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/mehedirobii", label: "X" },
];

const CONTACTS = [
  {
    icon: FiMail,
    label: "Email",
    value: "mehedirobidev@gmail.com",
    href: "mailto:mehedirobidev@gmail.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+880 1336458100",
    href: "tel:+8801336458100",
  },
];

/**
 * CONTACT ITEM
 */
const ContactItem = ({ item, index, copied, onCopy }) => {
  const Icon = item.icon;

  return (
    <Card className="flex items-center justify-between gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            {item.label}
          </p>

          <a
            href={item.href}
            className="text-sm font-medium text-slate-900 dark:text-white hover:underline"
          >
            {item.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCopy(item.value, index)}
        className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        aria-label={`Copy ${item.label}`}
      >
        {copied === index ? (
          <FiCheck className="h-4 w-4 text-green-500" />
        ) : (
          <FiCopy className="h-4 w-4 text-slate-500" />
        )}
      </button>
    </Card>
  );
};

/**
 * MAIN COMPONENT
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback((e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }, []);

  const handleCopy = useCallback(async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 1000);
    } catch {
      // silent fail (production-safe)
    }
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // TODO: replace with API / email service
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 2500);
  }, []);

  return (
    <Section id="contact">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Contact
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Open for freelance work, collaboration, and full-time opportunities.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-8">

          {/* CONTACT INFO */}
          <div className="space-y-4">
            {CONTACTS.map((item, index) => (
              <ContactItem
                key={item.label}
                item={item}
                index={index}
                copied={copied}
                onCopy={handleCopy}
              />
            ))}
          </div>

          {/* SOCIALS */}
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
              Social
            </p>

            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {submitted && (
            <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
              Message sent successfully.
            </div>
          )}

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none resize-none"
            required
          />

          <Button className="w-full">
            Send Message
          </Button>

        </motion.form>

      </div>
    </Section>
  );
}