import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Graebert GmbH",
    role: "Software Engineer",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Contributing to performance-sensitive C++/Qt CAD software involving geometry processing, UI workflows, and enterprise engineering systems.",
    achievements: [
      "Shifted engineering workflows toward specification-first AI-assisted delivery models for faster and more reliable implementation",
      "Utilized Windsurf (Claude Sonnet), GitHub Copilot, ChatGPT, Gemini, and AI coding agents for rapid implementation, debugging, refactoring, and feature acceleration",
      "Developed executable specifications, technical architectural documentation, and streamlined AI-assisted engineering workflows",
      "Performed deep-dive debugging, rigorous crash analysis, regression prevention, performance tuning, and production stabilization",
      "Collaborated seamlessly with QA and engineering teams to ensure release-ready delivery and controlled deployment cycles",
      "Supported organization-wide onboarding and adoption of AI-accelerated workflows",
    ],
    techStack: ["C++", "Qt", "STL", "OOP", "Geometry Processing", "Windsurf", "GitHub Copilot", "ChatGPT", "Gemini", "Git", "Perforce", "CI/CD"],
    impact: "Improved development consistency and reduced implementation effort through AI-supervised delivery workflows",
  },
  {
    company: "Agiliad Technologies",
    role: "Senior Software Engineer",
    period: "2022 — 2023",
    location: "India",
    description:
      "Designed and implemented C++-based medical imaging workflows integrating Fiji ImageJ and pugiXML for highly configurable processing systems.",
    achievements: [
      "Designed and implemented C++-based imaging workflows integrating Fiji ImageJ and pugiXML for automated processing pipelines",
      "Modernized and improved legacy architecture using custom automation tooling and scalable engineering best practices",
      "Developed workflow-oriented processing utilities aimed at significantly reducing manual engineering effort",
      "Collaborated across cross-functional engineering and QA teams for proactive debugging, system validation, and production stability",
    ],
    techStack: ["C++", "Fiji ImageJ", "pugiXML", "Automation", "Architecture Modernization", "Git", "CI/CD"],
    impact: "Reduced manual engineering effort through automation utilities and modernized legacy architecture for better maintainability",
  },
  {
    company: "Amdocs India",
    role: "Software Engineering Associate",
    period: "2020 — 2022",
    location: "Pune, India",
    description:
      "Delivered enhancements and critical defect fixes in enterprise-scale C++ and SQL-based telecommunication billing systems.",
    achievements: [
      "Delivered enhancements, features, and defect fixes in C++ and SQL-based enterprise telecom billing systems",
      "Participated in complete SDLC including implementation, code reviews, debugging, release coordination, and CI workflows",
      "Supported intensive production debugging, critical patch releases, rollout validation, and enterprise operational reliability",
    ],
    techStack: ["C++", "SQL", "Enterprise Telecom", "Shell Scripting", "Git", "CI/CD", "Jira"],
    impact: "Ensured production readiness and post-release stability in large-scale enterprise environments",
  },
];
