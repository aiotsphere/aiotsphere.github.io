"use client";

import { motion } from "framer-motion";

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-navy">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:48px_48px] opacity-45 grid-mask" />
      <motion.div
        className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-cyan/25 blur-3xl"
        animate={{ x: [0, 34, 0], y: [0, -28, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[10%] top-12 h-80 w-80 rounded-full bg-violet/30 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 34, 0], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl"
        animate={{ scale: [1, 1.16, 1], opacity: [0.25, 0.65, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {Array.from({ length: 26 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan shadow-[0_0_14px_rgba(0,209,255,.9)]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 100}%`
          }}
          animate={{ y: [-10, 18, -10], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 4 + (index % 5), repeat: Infinity, delay: index * 0.08 }}
        />
      ))}
    </div>
  );
}
