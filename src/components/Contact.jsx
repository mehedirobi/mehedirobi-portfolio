import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiPhone, FiCopy, FiCheck } from "react-icons/fi";
import { Section, Card, Button } from "./UI";

const socials = [
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

const contacts = [
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 2500);
  };

  const copyText = async (text, idx) => {
    await navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Section id="contact">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white">
          Contact
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
          Let’s build something meaningful together. Open for freelance and job opportunities.
        </p>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Contact Info */}
            <div className="space-y-4">
              {contacts.map((item, i) => (
                <Card key={item.label} className="flex items-center justify-between">

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <item.icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 uppercase">
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
                    onClick={() => copyText(item.value, i)}
                    className="p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {copied === i ? (
                      <FiCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <FiCopy className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                </Card>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Social Links
              </p>

              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 resize-none"
              required
            />

            <Button className="w-full">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </Section>
  );
}