"use client";

import { CalendarDays, CheckCircle2, Cpu, LogOut, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { DashboardCard } from "@/components/DashboardCard";
import { CyberButton } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/browser";
import { Registration, tracks } from "@/lib/types";

export function UserDashboard({ registration }: { registration: Registration | null }) {
  const track = tracks.find((item) => item.id === registration?.interested_track);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("ออกจากระบบแล้ว");
    window.location.href = "/";
  };

  return (
    <>
      <CyberBackground />
      <main className="min-h-screen px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Participant Dashboard</p>
              <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">
                Welcome, {registration?.first_name ?? "AI Builder"}
              </h1>
            </div>
            <div className="flex gap-3">
              <CyberButton href="/" variant="secondary">Home</CyberButton>
              <button onClick={logout} className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-silver hover:text-white" aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <DashboardCard title="Registration Status" value={registration?.status ?? "Pending"} icon={<CheckCircle2 />}>
              <span className="rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase text-cyan">
                {registration ? "Application received" : "Complete registration"}
              </span>
            </DashboardCard>
            <DashboardCard title="Selected Track" value={track?.title ?? "-"} icon={<Cpu />}>
              <p className="text-sm text-silver">{track?.subtitle ?? "No track selected"}</p>
            </DashboardCard>
            <DashboardCard title="Camp Mode" value="Free" icon={<Sparkles />}>
              <p className="text-sm text-silver">No experience required</p>
            </DashboardCard>
          </div>

          <section className="glass mt-5 rounded-[1.5rem] p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-cyan" />
              <h2 className="text-2xl font-black text-white">Next Steps</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["Check your email confirmation", "Join Discord Community", "Prepare one project idea"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="text-sm font-black text-cyan">0{index + 1}</span>
                  <p className="mt-3 font-bold text-white">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
