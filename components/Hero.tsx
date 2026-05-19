"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Sparkles, Zap } from "lucide-react";
import { CyberButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.06fr_.94fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan shadow-neon"
          >
            <Sparkles className="h-4 w-4" />
            Free AI Workshop 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="neon-text max-w-5xl text-5xl font-black leading-[0.98] text-white md:text-7xl lg:text-8xl"
          >
            AI Builder Camp 2026: Pathway to AI Engineer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-3xl text-lg leading-8 text-silver md:text-2xl"
          >
            ค่ายฟรีสำหรับ ม.ปลาย/ปวช. ที่อยากเริ่มเส้นทางสู่สาย Computer Engineering & Artificial Intelligence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <CyberButton href="/register" className="px-7 py-4 text-base">
              สมัครเข้าร่วม
              <ArrowRight className="h-5 w-5" />
            </CyberButton>
            <CyberButton href="#tracks" variant="secondary" className="px-7 py-4 text-base">
              ดูรายละเอียด
            </CyberButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
        >
          <div className="absolute inset-8 rounded-full border border-cyan/30 shadow-[0_0_90px_rgba(0,209,255,.28)]" />
          <div className="absolute inset-20 rounded-full border border-violet/35 shadow-violet" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-cyan/45"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="absolute inset-14 rounded-full border border-dashed border-fuchsia-400/35"
          />
          <div className="glass absolute inset-24 grid place-items-center rounded-full">
            <Bot className="h-28 w-28 text-cyan drop-shadow-[0_0_28px_rgba(0,209,255,.8)]" />
          </div>
          {["AI", "WEB", "IoT", "DATA"].map((label, index) => (
            <motion.div
              key={label}
              className="glass absolute grid h-20 w-20 place-items-center rounded-3xl text-sm font-black text-white shadow-neon"
              style={{
                left: `${index === 0 ? 7 : index === 1 ? 72 : index === 2 ? 16 : 68}%`,
                top: `${index === 0 ? 22 : index === 1 ? 16 : index === 2 ? 72 : 70}%`
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              {label}
            </motion.div>
          ))}
          <Zap className="absolute right-12 top-28 h-8 w-8 text-fuchsia-300 drop-shadow-[0_0_18px_rgba(217,70,239,.9)]" />
        </motion.div>
      </div>
    </section>
  );
}
