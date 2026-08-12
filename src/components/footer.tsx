"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { LinkedinIcon as Linkedin } from "@/components/linkedin-icon";
import { FolderGit2 as Github, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
              <span className="font-mono text-sm font-bold gradient-text">AS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{profile.name}</span>
              <span className="text-xs text-muted-foreground">{profile.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <motion.div
              whileHover={{ y: -3 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.div>
          </button>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
