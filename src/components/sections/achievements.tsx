"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/section-heading";
import { AnimatedCounter } from "@/components/animated-counter";

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="By the Numbers"
          subtitle="Six years of building, shipping, and automating software systems at scale."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {achievements.map((achievement, i) => {
            const Icon = ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[achievement.icon] ||
              LucideIcons.Trophy) as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card flex flex-col items-center gap-3 p-6 text-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-bold gradient-text sm:text-4xl">
                  <AnimatedCounter value={achievement.value} suffix={achievement.suffix} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {achievement.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
