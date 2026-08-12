"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-2xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-xl">
                <span className="font-mono text-2xl font-bold gradient-text">
                  AS
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[2px] overflow-hidden rounded-full bg-border"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-mono text-xs text-muted-foreground"
              >
                Initializing system...
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
