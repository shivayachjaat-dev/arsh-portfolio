"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Download, Send, CheckCircle2, FolderGit2 as Github } from "lucide-react";
import { LinkedinIcon as Linkedin } from "@/components/linkedin-icon";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const contactLinks = [
    { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
    { label: profile.location, href: "#", icon: MapPin },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: profile.linkedinUrl, icon: Linkedin },
    { label: "GitHub", href: profile.githubUrl, icon: Github },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something"
          subtitle="Have a project in mind? Need an AI automation solution? Let's talk."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-8">
              <h3 className="mb-6 text-lg font-semibold">Get in Touch</h3>
              <div className="flex flex-col gap-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group flex items-center gap-3 rounded-lg bg-card p-3 transition-colors hover:bg-card/80"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                      <link.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition-all hover:border-primary/50"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="mb-6 text-lg font-semibold">Send a Message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50"
                  placeholder="Your name"
                />
                {errors.name && (
                  <span className="text-xs text-red-400">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary/50"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <span className="text-xs text-red-400">{errors.message}</span>
                )}
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Message Sent!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
