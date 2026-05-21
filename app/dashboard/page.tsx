"use client";

import { useEffect, useState } from "react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import type { Registration } from "@/lib/types";

type DashboardUser = Registration & { role: "student" | "admin" };

export default function DashboardPage() {
  const { locale } = useI18n();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          window.location.href = "/camp/login?redirectedFrom=/dashboard";
          return;
        }
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Learner Console</p>
          <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">
            {loading || !user ? "Loading..." : `${user.firstName} ${user.lastName}`}
          </h1>
          {user ? (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="glass rounded-[1.5rem] p-6">
                <p className="text-sm font-black text-cyan">School</p>
                <p className="mt-3 text-2xl font-black text-white">{user.school}</p>
              </div>
              <div className="glass rounded-[1.5rem] p-6">
                <p className="text-sm font-black text-cyan">Education</p>
                <p className="mt-3 text-2xl font-black text-white">{user.educationLevel}</p>
              </div>
              <div className="glass rounded-[1.5rem] p-6">
                <p className="text-sm font-black text-cyan">Status</p>
                <p className="mt-3 text-2xl font-black text-white">{user.status}</p>
              </div>
            </div>
          ) : null}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CyberButton href="/camp/progress">{locale === "th" ? "ดูความก้าวหน้า" : "View Progress"}</CyberButton>
            <CyberButton href="/camp/checkin" variant="secondary">{locale === "th" ? "เช็กอินกิจกรรม" : "Activity Check-in"}</CyberButton>
          </div>
        </section>
      </main>
    </>
  );
}
