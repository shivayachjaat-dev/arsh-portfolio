"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2 as Github, ExternalLink, ChevronDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          subtitle="A selection of AI-powered systems, automation platforms, and engineering tools built for enterprise and startup environments."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-medium transition-all",
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const isExpanded = expanded === project.id;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl glass-card",
                  isExpanded && "sm:col-span-2 lg:col-span-3"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 -z-10 bg-gradient-to-br opacity-5 transition-opacity duration-500 group-hover:opacity-10",
                    project.gradient
                  )}
                />

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                    </div>
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
                        project.gradient
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <p className="mb-4 text-sm text-muted-foreground">
                    {isExpanded ? project.longDescription : project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, isExpanded ? undefined : 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-card px-2 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {!isExpanded && project.techStack.length > 5 && (
                      <span className="rounded-md px-2 py-0.5 text-xs text-muted-foreground">
                        +{project.techStack.length - 5} more
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-4 py-4 sm:grid-cols-2">
                          <div className="rounded-lg bg-card p-4">
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Architecture
                            </h4>
                            <p className="text-sm">{project.architecture}</p>
                          </div>
                          <div className="rounded-lg bg-card p-4">
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Problem Solved
                            </h4>
                            <p className="text-sm">{project.problemSolved}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Key Features
                          </h4>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {project.features.map((feature) => (
                              <div
                                key={feature}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4 rounded-lg bg-primary/5 p-4">
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                            Case Study
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {project.caseStudy}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : project.id)}
                      className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                      {isExpanded ? "Show Less" : "Case Study"}
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
                        aria-label="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
