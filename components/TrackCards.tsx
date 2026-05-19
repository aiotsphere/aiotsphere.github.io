"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, Code2, Cpu } from "lucide-react";
import { tracks } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Bot, Code2, Cpu, BarChart3];

export function TrackCards() {
  return (
    <section id="tracks" className="px-4 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Learning Tracks"
          title="เลือกเส้นทาง AI ที่อยากสร้างจริง"
          description="ทุกแทร็กออกแบบให้เริ่มจากศูนย์ได้ และจบด้วยชิ้นงานที่ใช้ต่อยอด Portfolio ได้ทันที"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tracks.map((track, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={track.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative min-h-[300px] overflow-hidden rounded-[1.5rem] border border-cyan/20 bg-gradient-to-br from-white/[0.11] via-white/[0.045] to-violet/10 p-6 shadow-neon backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-80" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan/20 blur-3xl transition group-hover:bg-fuchsia-400/25" />
                <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-cyan/35 bg-cyan/10 text-cyan shadow-neon">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-white">{track.title}</h3>
                <p className="mt-2 font-semibold text-cyan">{track.subtitle}</p>
                <p className="mt-5 leading-7 text-silver">{track.description}</p>
                <div className="absolute bottom-5 left-6 right-6 h-1 rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan to-violet shadow-neon" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
