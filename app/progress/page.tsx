"use client";

import { Lock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";
import type { Activity } from "@/lib/types";

type ProgressActivity = Activity & {
  completed: boolean;
  locked: boolean;
};

type ProgressPayload = {
  progress: {
    percentage: number;
    xp: number;
    completedActivityIds: string[];
    activities: ProgressActivity[];
  };
};

export default function ProgressPage() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<ProgressPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress")
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/login?redirectedFrom=/progress";
          return null;
        }
        return response.json();
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      });
  }, []);

  const progress = data?.progress;

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Track Progress</p>
          <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">{t("progress.headline")}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-silver">{t("progress.description")}</p>
          {loading ? <p className="mt-10 text-cyan">Loading...</p> : null}
          {progress ? (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Metric label={t("progress.percentage")} value={`${progress.percentage}%`} />
                <Metric label={t("progress.completed")} value={progress.completedActivityIds.length} />
                <Metric label={t("progress.xp")} value={progress.xp} />
              </div>
              <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet shadow-neon" style={{ width: `${progress.percentage}%` }} />
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {progress.activities.map((activity) => (
                  <article key={activity.id} className={`glass rounded-[1.5rem] p-6 ${activity.completed ? "border-cyan/40" : ""}`}>
                    <div className="flex items-center justify-between">
                      {activity.completed ? <Trophy className="h-7 w-7 text-cyan" /> : <Lock className="h-7 w-7 text-silver" />}
                      <span className="text-sm font-black text-cyan">{activity.xp} XP</span>
                    </div>
                    <h2 className="mt-5 text-2xl font-black text-white">{locale === "th" ? activity.titleTh : activity.title}</h2>
                    <p className="mt-3 text-sm font-bold text-silver">
                      {activity.completed ? t("progress.completed") : activity.locked ? t("progress.locked") : t("nav.checkin")}
                    </p>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </main>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">{label}</p>
      <p className="mt-4 text-4xl font-black text-white">{value}</p>
    </div>
  );
}
