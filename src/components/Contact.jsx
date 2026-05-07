import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";
import { Section, Card, Button } from "./UI";

/**
 * SOCIAL LINKS
 */
const SOCIALS = [
  {
    icon: FaGithub,
    href: "https://github.com/mehedirobi",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/mehedirobii/",
    label: "LinkedIn",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/mehedirobii",
    label: "X",
  },
];

/**
 * CONTACT INFO
 */
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
 * CONTACT CARD ITEM
 */
const ContactItem = ({ item, copied, onCopy, index }) => {
  const Icon = item.icon;

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
          <Icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {item.label}
          </p>

          <a
            href={item.href}
            className="text-sm font-medium text-slate-900 dark:text-white"
          >
            {item.value}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onCopy(item.value, index)}
        className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [copied, setCopied] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  /**
   * FORM HANDLERS (optimized)
   */
  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // production placeholder (replace with API later)
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 2500);
    },
    []
  );

  const handleCopy = useCallback(async (text, index) => {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 1200);
  }, []);

  return (
    <Section id="contact">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Contact
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Available for freelance work, collaboration, and full-time opportunities.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
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
              Social Links
            </p>

            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
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
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none resize-none"
            required
          />

          <Button className="w-full">Send Message</Button>
        </motion.form>
      </div>
    </Section>
  );
}