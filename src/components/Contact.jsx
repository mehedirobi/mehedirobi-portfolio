import { useMemo, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import { Card, Section } from "./UI";

const CONTACTS = [
  {
    label: "Email",
    value: "mehedirobidev@gmail.com",
    href: "mailto:mehedirobidev@gmail.com",
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "+8801336458100",
    href: "tel:+8801336458100",
    icon: FiPhone,
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
    href: "mailto:mehedirobidev@gmail.com",
    icon: FiMail,
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact({ id = "contact" }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formIsComplete = useMemo(
    () =>
      Object.values(form).every((value) => String(value).trim().length > 0),
    [form]
  );

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return value.trim().length >= 2 ? "" : "Please enter your name.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Please enter a valid email address.";
      case "subject":
        return value.trim().length >= 3 ? "" : "Please add a subject.";
      case "message":
        return value.trim().length >= 10 ? "" : "Message must be at least 10 characters long.";
      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };

    setForm(nextForm);
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value),
    }));

    if (status.type !== "idle") {
      setStatus({ type: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      Object.entries(form).map(([fieldName, value]) => [
        fieldName,
        validateField(fieldName, value),
      ])
    );

    const hasErrors = Object.values(nextErrors).some(Boolean);
    setErrors(nextErrors);

    if (hasErrors || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("https://formsubmit.co/ajax/mehedirobidev@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully. I will get back to you soon.",
      });
      setForm(initialForm);
      setErrors({});
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while sending your message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id={id} aria-labelledby="contact-heading" background="bg-canvas-alt">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Contact
          </p>

          <h2
            id="contact-heading"
            className="text-section font-bold tracking-tight text-strong"
          >
            Let&apos;s Connect
          </h2>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {CONTACTS.map(({ label, value, href, icon: Icon }) => (
              <Card key={label} className="flex min-h-[140px] flex-col justify-between rounded-2xl border border-default bg-surface p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </div>

                <div className="mt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {label}
                  </p>

                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-2 block text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {value}
                  </a>
                </div>
              </Card>
            ))}
          </div>

          <Card as="form" className="rounded-2xl border border-default bg-surface p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-primary">
                <span className="mb-2 block">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-default bg-canvas px-3 py-2.5 text-sm text-strong placeholder:text-muted focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
                {errors.name && (
                  <span id="name-error" className="mt-1.5 block text-xs text-danger">
                    {errors.name}
                  </span>
                )}
              </label>

              <label className="block text-sm font-medium text-primary">
                <span className="mb-2 block">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-default bg-canvas px-3 py-2.5 text-sm text-strong placeholder:text-muted focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
                {errors.email && (
                  <span id="email-error" className="mt-1.5 block text-xs text-danger">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-primary">
              <span className="mb-2 block">Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                placeholder="Project inquiry"
                className="w-full rounded-xl border border-default bg-canvas px-3 py-2.5 text-sm text-strong placeholder:text-muted focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              {errors.subject && (
                <span id="subject-error" className="mt-1.5 block text-xs text-danger">
                  {errors.subject}
                </span>
              )}
            </label>

            <label className="mt-4 block text-sm font-medium text-primary">
              <span className="mb-2 block">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                rows="5"
                placeholder="Tell me about your opportunity or project..."
                className="w-full rounded-xl border border-default bg-canvas px-3 py-2.5 text-sm text-strong placeholder:text-muted focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              {errors.message && (
                <span id="message-error" className="mt-1.5 block text-xs text-danger">
                  {errors.message}
                </span>
              )}
            </label>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting || !formIsComplete}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent-button px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <div aria-live="polite" className="text-sm text-muted">
                {status.type === "success" && <span className="text-emerald-600">{status.message}</span>}
                {status.type === "error" && <span className="text-danger">{status.message}</span>}
                {status.type === "loading" && <span>{status.message}</span>}
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${label} profile`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-default bg-surface text-muted transition-colors hover:border-violet-400/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}