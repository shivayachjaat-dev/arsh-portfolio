"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, FolderGit2, Mail, ArrowDown, Sparkles } from "lucide-react";
import { profile, heroHeadline, heroSubheadline, heroStats } from "@/data/profile";
import { MagneticButton } from "@/components/magnetic-button";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/particle-background").then((m) => m.ParticleBackground),
  { ssr: false }
);

const roles = profile.roles;
const headlineLines = heroHeadline;

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedRole.length < role.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(role.slice(0, displayedRole.length + 1));
      }, 60);
    } else if (!isDeleting && displayedRole.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(role.slice(0, displayedRole.length - 1));
      }, 30);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRole]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />

      <div className="absolute left-1/4 top-1/4 -z-10 h-96 w-96 animate-float-slow rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 animate-float rounded-full bg-secondary/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-2xl" />
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/30 bg-card backdrop-blur-xl sm:h-40 sm:w-40">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                priority
                sizes="(max-width: 640px) 128px, 160px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {profile.location}
            </span>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="block"
                >
                  {i === headlineLines.length - 1 ? (
                    <span className="gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
          >
            <span className="text-primary">&gt;</span>
            <span>{displayedRole}</span>
            <span className="animate-pulse text-primary">_</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {heroSubheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton
              href={profile.resume}
              className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
            <MagneticButton
              href="#projects"
              onClick={() => scrollTo("#projects")}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all hover:border-primary/50"
            >
              <FolderGit2 className="h-4 w-4" />
              View Projects
            </MagneticButton>
            <MagneticButton
              href="#contact"
              onClick={() => scrollTo("#contact")}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium backdrop-blur-xl transition-all hover:border-secondary/50"
            >
              <Mail className="h-4 w-4" />
              Hire Me
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="glass-card flex flex-col items-center gap-1 px-6 py-4"
              >
                <span className="text-xl font-bold gradient-text sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card backdrop-blur-xl"
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.button>
    </section>
  );
}
