"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { philosophies } from "@/data/philosophy";
import { SectionHeading } from "@/components/section-heading";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 sm:py-32">
      <div className="absolute left-1/3 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Philosophy"
          title="AI Engineering Philosophy"
          subtitle="Principles that guide how I design, build, and ship software systems in the age of AI."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {philosophies.map((phil, i) => {
            const Icon = ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[phil.icon] ||
              LucideIcons.Sparkles) as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={phil.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.1 }}
                className="group glass-card relative overflow-hidden p-6"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex flex-col gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold">{phil.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {phil.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
