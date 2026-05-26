"use client";

import { Users } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { DashboardCard } from "@/components/DashboardCard";
import type { Registration } from "@/lib/types";

export function AdminDashboard({ registrations }: { registrations: Registration[] }) {
  return (
    <>
      <CyberBackground />
      <main className="min-h-screen px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Admin Console</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">AIoT Sphere Command Center</h1>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <DashboardCard title="Registrations" value={registrations.length} icon={<Users />} />
          </div>
        </div>
      </main>
    </>
  );
}
