"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/data/profile";

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="absolute right-1/3 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What I Build"
          subtitle="From AI automation systems to enterprise desktop applications — services designed for organizations that need rapid, high-quality software delivery."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[service.icon] ||
              LucideIcons.Sparkles) as React.ComponentType<{ className?: string }>;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.1 }}
                className="group glass-card flex flex-col p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{service.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl glass-card p-8 text-center"
        >
          <h3 className="text-xl font-semibold">
            Need a custom AI solution?
          </h3>
          <p className="max-w-xl text-sm text-muted-foreground">
            I help organizations adopt AI-assisted development workflows, build automation platforms, and ship production-grade software fast.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
