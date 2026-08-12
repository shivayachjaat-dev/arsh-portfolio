"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiTriggered, setKonamiTriggered] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Arsh Shivayach — Developer Terminal v1.0",
    "Type 'help' for available commands.",
    "",
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && e.shiftKey) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI_CODE[konamiIndex] || e.key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setKonamiTriggered(true);
          setKonamiIndex(0);
          setTimeout(() => setKonamiTriggered(false), 5000);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  const handleTerminalCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...terminalHistory, `$ ${cmd}`];

    if (command === "help") {
      newHistory.push("Available commands:", "  help    — Show this help", "  about   — About Arsh", "  skills  — List skills", "  experience — Show work history", "  contact — Contact info", "  clear   — Clear terminal", "  exit    — Close terminal", "");
    } else if (command === "about") {
      newHistory.push(`${profile.name}`, profile.title, profile.brandStatement, "");
    } else if (command === "skills") {
      skillCategories.forEach((cat) => {
        newHistory.push(`${cat.name}: ${cat.skills.join(", ")}`);
      });
      newHistory.push("");
    } else if (command === "experience") {
      experiences.forEach((exp) => {
        newHistory.push(`${exp.company} — ${exp.role} (${exp.period})`);
      });
      newHistory.push("");
    } else if (command === "contact") {
      newHistory.push(`Email: ${profile.email}`, `Phone: ${profile.phone}`, `Location: ${profile.location}`, `LinkedIn: ${profile.linkedinUrl}`, `GitHub: ${profile.githubUrl}`, "");
    } else if (command === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (command === "exit") {
      setTerminalOpen(false);
      setTerminalHistory(["Arsh Shivayach — Developer Terminal v1.0", "Type 'help' for available commands.", ""]);
      setTerminalInput("");
      return;
    } else if (command === "") {
      // empty
    } else {
      newHistory.push(`Command not found: ${cmd}. Type 'help' for available commands.`, "");
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  return (
    <>
      <AnimatePresence>
        {konamiTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-primary/20" />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative flex flex-col items-center gap-4"
            >
              <div className="text-6xl">🎮</div>
              <p className="text-2xl font-bold gradient-text">Achievement Unlocked!</p>
              <p className="text-sm text-muted-foreground">Konami Code Master</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[200] h-[400px] max-h-[60vh]"
          >
            <div className="mx-auto max-w-4xl h-full glass-strong border-t border-x border-border rounded-t-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-2">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">arsh@portfolio: ~</span>
                </div>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-card"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div
                className="flex-1 overflow-y-auto p-4 font-mono text-xs"
                onClick={() => document.getElementById("terminal-input")?.focus()}
              >
                {terminalHistory.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap text-muted-foreground">
                    {line.startsWith("$") ? (
                      <span className="text-primary">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <input
                    id="terminal-input"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleTerminalCommand(terminalInput);
                      }
                    }}
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-foreground"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] text-muted-foreground/50">
          Press <kbd className="rounded border border-border px-1">Shift+`</kbd> for terminal
        </span>
      </div>
    </>
  );
}
