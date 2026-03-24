import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Card from './Card';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else setErrors(newErrors);
  };

  const copyEmail = async () => {
    const email = 'mehedirobidev@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const copyPhone = async () => {
    const phone = '01336458100';
    try {
      await navigator.clipboard.writeText(phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2200);
    } catch {}
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4" style={{
      background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))'
    }}>
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-1 mb-4" style={{ color: 'var(--text-primary)' }}>
            Get in <span className="bg-gradient-to-r from-pink-400 to-pink-800 text-transparent bg-clip-text">Touch</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-pink-400 to-pink-800 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-body-large mt-4" style={{ color: 'var(--text-secondary)' }}>
            Let's connect. I'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-12 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Information */}
          <motion.div
            className="flex flex-col h-full"
            variants={itemVariants}
          >
            <Card hover={false} className="p-6 md:p-8 flex flex-col flex-1 space-y-6">
              <div>
                <h3 className="text-heading-3 mb-2" style={{ color: 'var(--text-primary)' }}>Contact Information</h3>
                <p className="text-body-small" style={{ color: 'var(--text-muted)' }}>
                  Connect with me on these platforms or send me a message directly.
                </p>
              </div>

              {/* Email */}
              <motion.button
                onClick={copyEmail}
                className="group flex items-center gap-4 p-4 rounded-lg border transition-all text-left"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--accent-color)';
                  e.target.style.transform = 'scale(1.02) translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.transform = 'scale(1) translateX(0)';
                }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl text-blue-400 group-hover:text-blue-300 transition">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Email</p>
                  <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>mehedirobidev@gmail.com</p>
                  <p className="text-xs text-green-400 mt-1">
                    {emailCopied ? '✓ Copied!' : 'Click to copy'}
                  </p>
                </div>
              </motion.button>

              {/* Phone */}
              <motion.button
                onClick={copyPhone}
                className="group flex items-center gap-4 p-4 rounded-lg border transition-all text-left"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.transform = 'scale(1.02) translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.transform = 'scale(1) translateX(0)';
                }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-2xl text-green-400 group-hover:text-green-300 transition">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Phone</p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>+880 1336 458100</p>
                  <p className="text-xs text-green-400 mt-1">
                    {phoneCopied ? '✓ Copied!' : 'Click to copy'}
                  </p>
                </div>
              </motion.button>

              {/* Social Links */}
              <div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Connect on social media</p>
                <div className="flex gap-3">
                  {[
                    { href: 'https://github.com/mehedirobi', icon: 'fab fa-github', label: 'GitHub', color: 'from-gray-500 to-gray-600' },
                    { href: 'https://www.linkedin.com/in/mehedi-robi-76b38739b/', icon: 'fab fa-linkedin', label: 'LinkedIn', color: 'from-blue-500 to-blue-600' },
                    { href: 'https://x.com/mehedirobi01', icon: 'fab fa-twitter', label: 'Twitter', color: 'from-sky-400 to-sky-500' },
                  ].map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${link.color} text-white shadow-lg hover:shadow-xl transition-all`}
                      aria-label={link.label}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className={`${link.icon} text-lg`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card hover={false} className="p-6 md:p-8">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-400"
                >
                  <i className="fas fa-check-circle mr-2"></i>
                  Thank you! I'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Name</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.name ? '#ef4444' : 'var(--border-color)'
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.email ? '#ef4444' : 'var(--border-color)'
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                      errors.subject ? 'border-red-500' : ''
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.subject ? '#ef4444' : 'var(--border-color)'
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Message</label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.message ? '#ef4444' : 'var(--border-color)'
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center group"
                  >
                    <i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
                    Send Message
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
