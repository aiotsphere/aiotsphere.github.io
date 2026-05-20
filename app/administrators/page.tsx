"use client";

import { Mail, UserRound, Users } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";

const administrators = [
  {
    name: "Laboratory Director",
    position: "AIoT Sphere Laboratory",
    role: "Strategic supervision, academic quality, and institutional coordination"
  },
  {
    name: "AI Builder Camp Coordinator",
    position: "Project Administrator",
    role: "Camp operations, registration, activity progress, and learner support"
  },
  {
    name: "Robotics and IoT Supervisor",
    position: "Laboratory Specialist",
    role: "Equipment readiness, safety, prototyping workflows, and technical mentoring"
  }
];

export default function AdministratorsPage() {
  const { locale } = useI18n();
  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Laboratory Governance</p>
          <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">
            {locale === "th" ? "ผู้ดูแลห้องปฏิบัติการ" : "Laboratory Administrators"}
          </h1>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {administrators.map((admin) => (
              <article key={admin.name} className="glass overflow-hidden rounded-[1.5rem]">
                <div className="grid aspect-[4/3] place-items-center border-b border-white/10 bg-cyber-grid bg-[length:34px_34px]">
                  <div className="grid h-28 w-28 place-items-center rounded-full border border-cyan/40 bg-cyan/10 shadow-neon">
                    <UserRound className="h-12 w-12 text-cyan" />
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black text-white">{admin.name}</h2>
                  <p className="mt-2 font-bold text-cyan">{admin.position}</p>
                  <p className="mt-4 leading-7 text-silver">{admin.role}</p>
                  <div className="mt-6 flex gap-3 text-silver">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5"><Mail className="h-4 w-4" /></span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5"><Users className="h-4 w-4" /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
