"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { skillCategories, skills } from "@/data/skills";
import { SectionHeading } from "@/components/section-heading";
import * as LucideIcons from "lucide-react";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  category: string;
  isCategory: boolean;
  level: number;
}

export function SkillsGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    const nodes: Node[] = [];

    skillCategories.forEach((cat, ci) => {
      const angle = (ci / skillCategories.length) * Math.PI * 2 - Math.PI / 2;
      const dist = Math.min(w, h) * 0.25;
      nodes.push({
        id: cat.name,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: 28,
        color: cat.color,
        category: cat.name,
        isCategory: true,
        level: 100,
      });

      cat.skills.forEach((skillName, si) => {
        const skill = skills.find((s) => s.name === skillName);
        if (!skill) return;
        const sa = (si / cat.skills.length) * Math.PI * 2;
        const sd = 60 + Math.random() * 30;
        nodes.push({
          id: skillName,
          x: cx + Math.cos(angle) * dist + Math.cos(sa) * sd,
          y: cy + Math.sin(angle) * dist + Math.sin(sa) * sd,
          vx: 0,
          vy: 0,
          radius: 6 + (skill.level - 80) * 0.4,
          color: cat.color,
          category: cat.name,
          isCategory: false,
          level: skill.level,
        });
      });
    });

    nodesRef.current = nodes;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach((node) => {
        if (node.isCategory) {
          const dx = cx - node.x;
          const dy = cy - node.y;
          node.vx += dx * 0.001;
          node.vy += dy * 0.001;
        } else {
          const cat = nodes.find((n) => n.id === node.category);
          if (cat) {
            const dx = cat.x - node.x;
            const dy = cat.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const target = 70;
            if (dist > target) {
              node.vx += dx * 0.002;
              node.vy += dy * 0.002;
            }
          }

          const mdx = mx - node.x;
          const mdy = my - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100 && mdist > 0) {
            node.vx -= (mdx / mdist) * 0.5;
            node.vy -= (mdy / mdist) * 0.5;
          }
        }

        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
      });

      ctx.lineWidth = 1;
      skills.forEach((skill) => {
        const n1 = nodes.find((n) => n.id === skill.name);
        if (!n1) return;
        skill.connections.forEach((conn) => {
          const n2 = nodes.find((n) => n.id === conn);
          if (!n2) return;
          const isHighlighted =
            hoveredSkill === skill.name || hoveredSkill === conn;
          ctx.strokeStyle = isHighlighted
            ? n1.color + "80"
            : n1.color + "15";
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        });
      });

      nodes.forEach((node) => {
        const isHovered = hoveredSkill === node.id;
        const isSelected = selectedCategory === node.category;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        if (node.isCategory) {
          ctx.fillStyle = node.color + (isHovered || isSelected ? "40" : "20");
          ctx.fill();
          ctx.strokeStyle = node.color + "60";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = node.color;
          ctx.font = "bold 12px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(node.id, node.x, node.y);
        } else {
          ctx.fillStyle = node.color + (isHovered ? "80" : "40");
          ctx.fill();
          ctx.strokeStyle = node.color + (isHovered ? "ff" : "60");
          ctx.lineWidth = isHovered ? 2 : 1;
          ctx.stroke();

          if (isHovered) {
            ctx.fillStyle = "#e8e8f0";
            ctx.font = "11px Inter, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(node.id, node.x, node.y - node.radius - 4);
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [hoveredSkill, selectedCategory]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const nodes = nodesRef.current;
    let found: string | null = null;
    for (const node of nodes) {
      const dx = mouseRef.current.x - node.x;
      const dy = mouseRef.current.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius + 5) {
        found = node.id;
        break;
      }
    }
    setHoveredSkill(found);
  }, []);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute right-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Interactive Skills Galaxy"
          subtitle="Explore the interconnected network of technologies, AI capabilities, and engineering disciplines I work with. Hover to discover connections."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {skillCategories.map((cat) => {
            const Icon = ((LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] || LucideIcons.Code2) as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
            return (
              <button
                key={cat.name}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.name ? null : cat.name
                  )
                }
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-primary/50"
                style={{
                  borderColor:
                    selectedCategory === cat.name
                      ? cat.color + "60"
                      : undefined,
                }}
              >
                <Icon className="h-4 w-4" style={{ color: cat.color }} />
                {cat.name}
              </button>
            );
          })}
        </div>

        <div className="relative mt-8 aspect-square w-full max-w-2xl mx-auto sm:aspect-[4/3]">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setHoveredSkill(null);
              mouseRef.current = { x: -1000, y: -1000 };
            }}
            className="h-full w-full cursor-pointer"
          />
        </div>

        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            {(() => {
              const skill = skills.find((s) => s.name === hoveredSkill);
              if (!skill) {
                return (
                  <p className="text-sm text-muted-foreground">
                    {hoveredSkill} — Category
                  </p>
                );
              }
              return (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {skill.connections.map((conn) => (
                      <span
                        key={conn}
                        className="rounded-md bg-card px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </div>
    </section>
  );
}
