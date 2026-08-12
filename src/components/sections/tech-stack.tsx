"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/techStack";
import { SectionHeading } from "@/components/section-heading";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  Languages: "#8b5cf6",
  Frameworks: "#06b6d4",
  "AI Tools": "#f59e0b",
  Tools: "#ec4899",
  Platforms: "#10b981",
};

const levelColors: Record<string, string> = {
  Expert: "from-primary to-secondary",
  Advanced: "from-secondary to-accent",
  Intermediate: "from-accent to-primary",
};

export function TechStackSection() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const categories = Array.from(new Set(techStack.map((t) => t.category)));

  return (
    <section id="tech-stack" className="relative py-24 sm:py-32">
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools & Technologies"
          subtitle="The technologies I use to design, build, and ship software systems."
        />

        <div className="mt-16 flex flex-col gap-12">
          {categories.map((category, ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: categoryColors[category] }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {techStack
                  .filter((t) => t.category === category)
                  .map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group relative flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background font-mono text-xs font-bold transition-colors group-hover:border-primary/30">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium">{item.name}</span>
                      {hoveredItem === item.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-gradient-to-r px-2 py-0.5 text-[10px] font-medium text-white ${levelColors[item.level] || "from-primary to-secondary"}`}
                        >
                          {item.level}
                        </motion.span>
                      )}
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
