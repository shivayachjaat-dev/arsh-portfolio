"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { LinkedinIcon as Linkedin } from "@/components/linkedin-icon";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/section-heading";

export function LinkedInSection() {
  return (
    <section id="linkedin" className="relative py-24 sm:py-32">
      <div className="absolute right-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="LinkedIn"
          title="Professional Profile"
          subtitle="Connect with me on LinkedIn for detailed experience, recommendations, and professional updates."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card flex flex-col items-center gap-4 p-8 text-center lg:col-span-1"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary/30">
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {profile.location}
            </div>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              <Linkedin className="h-4 w-4" />
              View Profile
              <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card flex flex-col gap-6 p-8 lg:col-span-2"
          >
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Experience
              </h3>
              <div className="flex flex-col gap-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.company}
                    className="flex items-start gap-3 rounded-lg bg-card p-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{exp.role}</span>
                        <span className="text-xs text-muted-foreground">{exp.period}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{exp.company}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                Education
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-lg bg-card p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium">PG Diploma in Advanced Computing</span>
                    <span className="text-xs text-muted-foreground">CDAC - ACTS · 2020</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-card p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium">B.Tech — Electronics & Communication</span>
                    <span className="text-xs text-muted-foreground">Chandra Shekhar Azad University, Kanpur · 2015–2019</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
