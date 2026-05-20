"use client";

import { CheckCircle2, Cpu, Sparkles } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { DashboardCard } from "@/components/DashboardCard";
import { CyberButton } from "@/components/ui/Button";
import type { Registration } from "@/lib/types";
import { tracks } from "@/lib/types";

export function UserDashboard({ registration }: { registration: Registration | null }) {
  const track = tracks.find((item) => item.id === registration?.interestedTrack);

  return (
    <>
      <CyberBackground />
      <main className="min-h-screen px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Participant Dashboard</p>
              <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">
                Welcome, {registration?.firstName ?? "AIoT Learner"}
              </h1>
            </div>
            <CyberButton href="/" variant="secondary">Home</CyberButton>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <DashboardCard title="Registration Status" value={registration?.status ?? "Pending"} icon={<CheckCircle2 />} />
            <DashboardCard title="Selected Track" value={track?.title ?? "-"} icon={<Cpu />} />
            <DashboardCard title="Laboratory" value="AIoT Sphere" icon={<Sparkles />} />
          </div>
        </div>
      </main>
    </>
  );
}
