import { LoadingScreen } from "@/components/loading-screen";
import { CursorGlow } from "@/components/cursor-glow";
import { Navbar } from "@/components/navbar";
import { CommandPalette } from "@/components/command-palette";
import { EasterEggs } from "@/components/easter-eggs";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsGalaxy } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { PhilosophySection } from "@/components/sections/philosophy";
import { ServicesSection } from "@/components/sections/services";
import { AchievementsSection } from "@/components/sections/achievements";
import { TechStackSection } from "@/components/sections/tech-stack";
import { GitHubSection } from "@/components/sections/github";
import { LinkedInSection } from "@/components/sections/linkedin";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <CommandPalette />
      <EasterEggs />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsGalaxy />
        <ExperienceSection />
        <ProjectsSection />
        <PhilosophySection />
        <ServicesSection />
        <AchievementsSection />
        <TechStackSection />
        <GitHubSection />
        <LinkedInSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
