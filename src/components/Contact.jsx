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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      </div>
    </section>
  );
}