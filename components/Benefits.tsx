"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Boxes, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  { icon: Boxes, label: "ได้สร้างผลงาน AI จริง" },
  { icon: Award, label: "ได้ Digital Certificate / Badge" },
  { icon: BadgeCheck, label: "ได้ Portfolio สำหรับสมัครเรียนต่อ" },
  { icon: MessageCircle, label: "ได้เข้าร่วม Discord Community" }
];

export function Benefits() {
  return (
    <section id="benefits" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Benefits" title="สิ่งที่ผู้เข้าร่วมจะได้รับ" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass rounded-[1.5rem] p-6"
            >
              <benefit.icon className="mb-5 h-8 w-8 text-cyan drop-shadow-[0_0_18px_rgba(0,209,255,.8)]" />
              <p className="text-lg font-bold leading-7 text-white">{benefit.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
