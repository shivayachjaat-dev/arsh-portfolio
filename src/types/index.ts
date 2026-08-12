export interface Profile {
  name: string;
  title: string;
  roles: string[];
  brandStatement: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  photo: string;
  resume: string;
  experienceYears: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  architecture: string;
  problemSolved: string;
  features: string[];
  githubUrl: string;
  liveUrl: string;
  caseStudy: string;
  gradient: string;
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  connections: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  color: string;
  skills: string[];
}

export interface Philosophy {
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface TechStackItem {
  name: string;
  category: string;
  level: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon: string;
}

export interface CareerMilestone {
  year: string;
  title: string;
  description: string;
}
