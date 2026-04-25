<<<<<<< HEAD
// Contact.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import Card from "./Card";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };
=======
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const { copyToClipboard, toast } = useCopyToClipboard();
>>>>>>> a8ffe3d (upgarted my portfolio)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
<<<<<<< HEAD
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
=======
>>>>>>> a8ffe3d (upgarted my portfolio)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } else setErrors(newErrors);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      type === "email" ? setEmailCopied(true) : setPhoneCopied(true);
      setTimeout(() => type === "email" ? setEmailCopied(false) : setPhoneCopied(false), 2200);
    } catch {
      if (type === "email") window.location.href = `mailto:${text}`;
    }
  };

  const containerVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">Let's connect. I'd love to hear from you!</p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-10 md:gap-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <Card hover className="p-8 flex flex-col gap-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Information</h3>
              <p className="text-gray-500 dark:text-gray-400">Connect with me or send me a message directly.</p>

              {/* Email */}
              <motion.button onClick={() => copyToClipboard("mehedirobidev@gmail.com", "email")} whileHover={{ scale: 1.03 }} className="group flex items-center gap-4 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 transition-transform duration-200">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl text-blue-500 dark:text-blue-400 group-hover:text-blue-400 transition-colors">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-semibold text-gray-900 dark:text-white truncate">mehedirobidev@gmail.com</p>
                  <p className="text-xs text-green-500 mt-1">{emailCopied ? "✓ Copied!" : "Click to copy"}</p>
                </div>
              </motion.button>

              {/* Phone */}
              <motion.button onClick={() => copyToClipboard("+8801336458100", "phone")} whileHover={{ scale: 1.03 }} className="group flex items-center gap-4 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 transition-transform duration-200">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl text-green-500 dark:text-green-400 group-hover:text-green-400 transition-colors">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-900 dark:text-white">+880 1336 458100</p>
                  <p className="text-xs text-green-500 mt-1">{phoneCopied ? "✓ Copied!" : "Click to copy"}</p>
                </div>
              </motion.button>

              {/* Social */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect on social media</p>
                <div className="flex gap-3">
                  {[
                    { href: "https://github.com/mehedirobi", icon: "fab fa-github", color: "from-gray-500 to-gray-600" },
                    { href: "https://www.linkedin.com/in/mehedirobii/", icon: "fab fa-linkedin", color: "from-blue-500 to-blue-600" },
                    { href: "https://x.com/mehedirobii", icon: "fab fa-twitter", color: "from-blue-400 to-blue-500" },
                  ].map((link) => (
                    <motion.a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-lg hover:shadow-xl transition-all`} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} aria-label={link.icon}>
                      <i className={`${link.icon} text-lg`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card hover className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              {submitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300">
                  <i className="fas fa-check-circle mr-2"></i> Thank you! I'll get back to you soon.
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "subject", "message"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 capitalize">{field}</label>
                    {field !== "message" ? (
                      <motion.input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} placeholder={`Your ${field}`} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${errors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} whileFocus={{ scale: 1.01 }} />
                    ) : (
                      <motion.textarea name={field} value={formData[field]} onChange={handleChange} placeholder="Your message here..." rows="5" className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${errors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`} whileFocus={{ scale: 1.01 }} />
                    )}
                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                  </div>
                ))}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button type="submit" variant="primary" size="md" className="w-full justify-center group">
                    <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform mr-2"></i> Send Message
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
=======
    // Simulate form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleCopy = (value, label, idx) => {
    copyToClipboard(value, label);
    setCopiedItem(idx);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "mehedirobidev@gmail.com",
      href: "mailto:mehedirobidev@gmail.com",
      copyLabel: "Email",
      color: "#EA4335",
      bgColor: "#EA433520",
    },
    {
      icon: "fas fa-phone",
      label: "Phone",
      value: "+880 1336458100",
      href: "tel:+8801336458100",
      copyLabel: "Phone",
      color: "#34A853",
      bgColor: "#34A85320",
    },
  ];

  const socialLinks = [
    {
      icon: "fab fa-github",
      href: "https://github.com/mehedirobi",
      label: "GitHub",
      color: "#333333",
      bgColor: "#33333320",
    },
    {
      icon: "fab fa-linkedin",
      href: "https://www.linkedin.com/in/mehedirobii/",
      label: "LinkedIn",
      color: "#0077B5",
      bgColor: "#0077B520",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Contact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Let's connect. I'd love to hear from you!
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to reach out for collaborations or just to say hello.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-lg group"
                    onClick={() => handleCopy(item.value, item.copyLabel, idx)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <i
                        className={`${item.icon} text-xl`}
                        style={{ color: item.color }}
                      ></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                      <a
                        href={item.href}
                        className="text-gray-900 dark:text-white hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.value}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      {copiedItem === idx && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-xs text-green-600 dark:text-green-400 font-medium"
                        >
                          Copied!
                        </motion.span>
                      )}
                      <motion.i
                        className={`${copiedItem === idx ? 'fas fa-check' : 'fas fa-copy'} text-gray-400 hover:text-primary transition-colors`}
                        animate={{ rotate: copiedItem === idx ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                      ></motion.i>
                    </div>
                  </motion.div>
                ))}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Follow me</p>
                  <div className="flex gap-3">
                    {socialLinks.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={link.label}
                        style={{ backgroundColor: link.color }}
                      >
                        <i className={`${link.icon} text-lg`}></i>
                      </motion.a>
                    ))}
                  </div>
                </div>
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={() => window.open('https://drive.google.com/file/d/1FTSrUD1chcEFB-2LlUP9l0UFjx3nPJSA/view', '_blank')}
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>
              {submitted && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                  Thank you! I'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg text-gray-900 dark:text-white px-4 py-2 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
>>>>>>> a8ffe3d (upgarted my portfolio)
      </div>
    </section>
  );
}