"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderGit2, Star, GitFork, ExternalLink, Users, BookOpen, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/data/profile";

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
}

const fallbackRepos: RepoData[] = [
  { name: "ai-workflow-automation", description: "AI-powered workflow automation platform", html_url: profile.githubUrl, stargazers_count: 12, forks_count: 3, language: "Python", topics: ["ai", "automation", "workflow"] },
  { name: "internal-tools-suite", description: "Internal business tools and automation utilities", html_url: profile.githubUrl, stargazers_count: 8, forks_count: 2, language: "TypeScript", topics: ["internal-tools", "automation"] },
  { name: "cpp-qt-desktop-app", description: "Performance-critical C++/Qt desktop application", html_url: profile.githubUrl, stargazers_count: 15, forks_count: 5, language: "C++", topics: ["cpp", "qt", "desktop"] },
  { name: "developer-productivity-tools", description: "Tools for accelerating development cycles", html_url: profile.githubUrl, stargazers_count: 6, forks_count: 1, language: "TypeScript", topics: ["devtools", "productivity"] },
  { name: "dashboard-systems", description: "Real-time monitoring and analytics dashboards", html_url: profile.githubUrl, stargazers_count: 10, forks_count: 3, language: "React", topics: ["dashboard", "analytics"] },
  { name: "ai-content-os", description: "AI-powered content operating system", html_url: profile.githubUrl, stargazers_count: 20, forks_count: 7, language: "Python", topics: ["ai", "content", "automation"] },
];

const fallbackStats: GitHubStats = {
  publicRepos: 24,
  followers: 48,
  following: 32,
};

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  C: "#555555",
  React: "#61dafb",
  Shell: "#89e051",
};

export function GitHubSection() {
  const [repos, setRepos] = useState<RepoData[]>(fallbackRepos);
  const [stats, setStats] = useState<GitHubStats>(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${profile.github}`);
        if (!userRes.ok) throw new Error("Failed to fetch");
        const userData = await userRes.json();
        setStats({
          publicRepos: userData.public_repos || fallbackStats.publicRepos,
          followers: userData.followers || fallbackStats.followers,
          following: userData.following || fallbackStats.following,
        });

        const reposRes = await fetch(
          `https://api.github.com/users/${profile.github}/repos?sort=updated&per_page=6`
        );
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData = await reposRes.json();
        if (Array.isArray(reposData) && reposData.length > 0) {
          setRepos(reposData.map((r: RepoData) => ({
            name: r.name,
            description: r.description || "",
            html_url: r.html_url,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            language: r.language || "Unknown",
            topics: r.topics || [],
          })));
        }
      } catch {
        // Use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="absolute left-1/4 top-1/3 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="GitHub"
          title="Open Source & Projects"
          subtitle="Repositories, contributions, and code I've shared with the community."
        />

        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { label: "Repositories", value: stats.publicRepos, icon: BookOpen },
            { label: "Followers", value: stats.followers, icon: Users },
            { label: "Following", value: stats.following, icon: Users },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card flex flex-col items-center gap-2 p-6 text-center"
            >
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold sm:text-3xl">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              className="group glass-card flex flex-col gap-3 p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold truncate">{repo.name}</h3>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="flex-1 text-xs text-muted-foreground line-clamp-2">
                {repo.description || "No description available"}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: languageColors[repo.language] || "#888" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-all hover:border-primary/50"
          >
            <Code2 className="h-4 w-4" />
            View All on GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
