"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRight, Code2, Brain, Zap, Target } from "lucide-react";
import { profile, careerEvolution, codingEvolution } from "@/data/profile";
import { SectionHeading } from "@/components/section-heading";

const evolutionIcons = [Code2, Code2, Zap, Brain, Target, Target, Target];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="From C++ Engineer to AI Automation Architect"
          subtitle="A journey through traditional software engineering into the world of AI-powered systems, automation platforms, and autonomous software development."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="relative overflow-hidden rounded-2xl glass-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-lg font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.brandStatement}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="mb-6 text-lg font-semibold">Professional Evolution</h3>
              <div className="relative flex flex-col gap-1">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-accent" />
                {careerEvolution.map((stage, i) => {
              const Icon = evolutionIcons[i] || Target;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-card"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-xs text-muted-foreground">
                      {stage.description}
                    </span>
                  </div>
                  {i < careerEvolution.length - 1 && (
                    <ChevronRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/30" />
                  )}
                </motion.div>
              );
            })}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-lg font-semibold">The Coding Evolution</h3>
              <div className="flex flex-col gap-3">
                {codingEvolution.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="glass-card flex items-start gap-4 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{phase.phase}</span>
                      <span className="text-xs text-muted-foreground">
                        {phase.description}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
