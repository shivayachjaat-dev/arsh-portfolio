"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Calendar, TrendingUp } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/section-heading";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional Journey"
          subtitle="Six years of building enterprise software, from telecom billing systems to AI-assisted CAD engineering."
        />

        <div className="mt-16 flex flex-col gap-6">
          {experiences.map((exp, i) => {
            const isExpanded = expanded === i;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-6 h-full w-px bg-gradient-to-b from-primary/50 to-transparent" />
                <div className="absolute left-[-5px] top-6 h-3 w-3 rounded-full border-2 border-primary bg-background" />

                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setExpanded(isExpanded ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold">{exp.company}</h3>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {exp.role}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border p-6">
                          <p className="mb-4 text-sm text-muted-foreground">
                            {exp.description}
                          </p>

                          <div className="mb-4 flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <p className="text-sm font-medium">{exp.impact}</p>
                          </div>

                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Key Achievements
                          </h4>
                          <ul className="mb-4 flex flex-col gap-2">
                            {exp.achievements.map((achievement, ai) => (
                              <li
                                key={ai}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {achievement}
                              </li>
                            ))}
                          </ul>

                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
