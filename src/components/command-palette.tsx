"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUp, ArrowDown, CornerDownLeft, Moon, Sun, Download, Mail } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface CommandItem {
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, setTheme } = useTheme();

  const commands: CommandItem[] = [
    ...navLinks.map((link) => ({
      label: link.label,
      hint: "Navigate",
      icon: Search,
      action: () => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
      group: "Navigation",
    })),
    {
      label: "Download Resume",
      hint: "PDF",
      icon: Download,
      action: () => {
        window.open(profile.resume, "_blank");
        setOpen(false);
      },
      group: "Actions",
    },
    {
      label: "Send Email",
      hint: profile.email,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${profile.email}`;
        setOpen(false);
      },
      group: "Actions",
    },
    {
      label: "Toggle Theme",
      hint: theme === "dark" ? "Switch to Light" : "Switch to Dark",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
      group: "Settings",
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selectedIndex]?.action();
      }
    },
    [filtered, selectedIndex]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[15vh]"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-strong shadow-2xl"
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              ) : (
                filtered.map((cmd, index) => (
                  <button
                    key={cmd.label}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      selectedIndex === index
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-card"
                    )}
                  >
                    <cmd.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm font-medium">{cmd.label}</span>
                    <span className="text-xs text-muted-foreground">{cmd.hint}</span>
                    {selectedIndex === index && (
                      <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <ArrowDown className="h-3 w-3" />
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" />
                  Select
                </span>
              </div>
              <span className="font-mono">Arsh Shivayach</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
