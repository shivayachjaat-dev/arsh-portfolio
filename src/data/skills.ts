import type { SkillCategory, Skill } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    icon: "Code2",
    color: "#8b5cf6",
    skills: ["C++", "Qt", "TypeScript", "JavaScript", "React", "Python", "SQL", "Shell"],
  },
  {
    name: "AI",
    icon: "Brain",
    color: "#06b6d4",
    skills: ["LLMs", "Prompt Engineering", "AI Agents", "Workflow Automation", "Automation Systems"],
  },
  {
    name: "Architecture",
    icon: "Building2",
    color: "#f59e0b",
    skills: ["System Design", "Enterprise Software", "Performance Optimization", "Crash Analysis", "Debugging", "Desktop Engineering"],
  },
  {
    name: "Productivity",
    icon: "Zap",
    color: "#ec4899",
    skills: ["Developer Productivity", "Internal Tools", "Git", "CI/CD", "Linux", "Windows"],
  },
];

export const skills: Skill[] = [
  { name: "C++", category: "Programming", level: 95, connections: ["Qt", "STL", "Performance Optimization", "Crash Analysis", "Desktop Engineering"] },
  { name: "Qt", category: "Programming", level: 90, connections: ["C++", "Desktop Engineering", "UI/UX"] },
  { name: "TypeScript", category: "Programming", level: 85, connections: ["JavaScript", "React"] },
  { name: "JavaScript", category: "Programming", level: 85, connections: ["TypeScript", "React"] },
  { name: "React", category: "Programming", level: 80, connections: ["TypeScript", "JavaScript"] },
  { name: "Python", category: "Programming", level: 80, connections: ["AI Agents", "Workflow Automation", "LLMs"] },
  { name: "SQL", category: "Programming", level: 85, connections: ["Enterprise Software"] },
  { name: "Shell", category: "Programming", level: 80, connections: ["Linux", "CI/CD"] },
  { name: "LLMs", category: "AI", level: 90, connections: ["Prompt Engineering", "AI Agents", "Workflow Automation"] },
  { name: "Prompt Engineering", category: "AI", level: 92, connections: ["LLMs", "AI Agents"] },
  { name: "AI Agents", category: "AI", level: 88, connections: ["LLMs", "Prompt Engineering", "Workflow Automation", "Automation Systems"] },
  { name: "Workflow Automation", category: "AI", level: 90, connections: ["AI Agents", "Automation Systems", "Python"] },
  { name: "Automation Systems", category: "AI", level: 88, connections: ["Workflow Automation", "AI Agents", "Internal Tools"] },
  { name: "System Design", category: "Architecture", level: 85, connections: ["Enterprise Software", "Performance Optimization"] },
  { name: "Enterprise Software", category: "Architecture", level: 90, connections: ["System Design", "SQL", "C++"] },
  { name: "Performance Optimization", category: "Architecture", level: 90, connections: ["C++", "Crash Analysis", "Debugging"] },
  { name: "Crash Analysis", category: "Architecture", level: 88, connections: ["C++", "Performance Optimization", "Debugging"] },
  { name: "Debugging", category: "Architecture", level: 92, connections: ["Crash Analysis", "Performance Optimization", "C++"] },
  { name: "Desktop Engineering", category: "Architecture", level: 90, connections: ["C++", "Qt", "Enterprise Software"] },
  { name: "Developer Productivity", category: "Productivity", level: 88, connections: ["Internal Tools", "CI/CD", "Git"] },
  { name: "Internal Tools", category: "Productivity", level: 90, connections: ["Developer Productivity", "Automation Systems"] },
  { name: "Git", category: "Productivity", level: 92, connections: ["CI/CD", "Developer Productivity"] },
  { name: "CI/CD", category: "Productivity", level: 85, connections: ["Git", "Developer Productivity", "Shell"] },
  { name: "Linux", category: "Productivity", level: 85, connections: ["Shell", "Git"] },
  { name: "Windows", category: "Productivity", level: 88, connections: ["C++", "Qt", "Desktop Engineering"] },
];
