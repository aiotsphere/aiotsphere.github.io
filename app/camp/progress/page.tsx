"use client";

import { Award, BadgeCheck, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";
import type { TrackId } from "@/lib/types";

type BadgeTrack = {
  trackId: TrackId;
  title: string;
  titleTh: string;
  subtitle: string;
  subtitleTh: string;
  completed: boolean;
};

type ProgressPayload = {
  progress: {
    percentage: number;
    completedBadges: number;
    totalBadges: number;
    campBadgeEarned: boolean;
    tracks: BadgeTrack[];
  };
};

export default function CampProgressPage() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<ProgressPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress")
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/camp/login?redirectedFrom=/camp/progress";
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
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">AI Builder Camp Badges</p>
          <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">{t("progress.headline")}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-silver">{t("progress.description")}</p>
          {loading ? <p className="mt-10 text-cyan">Loading...</p> : null}
          {progress ? (
            <>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <Metric label={t("progress.percentage")} value={`${progress.percentage}%`} />
                <Metric label={t("progress.completed")} value={`${progress.completedBadges}/${progress.totalBadges}`} />
                <Metric label={t("progress.campBadge")} value={progress.campBadgeEarned ? t("progress.earned") : t("progress.locked")} />
              </div>

              <div className="mt-8 h-4 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan to-violet shadow-neon" style={{ width: `${progress.percentage}%` }} />
              </div>

              <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {progress.tracks.map((track) => (
                  <article key={track.trackId} className={`glass rounded-[1.5rem] p-6 ${track.completed ? "border-cyan/40" : ""}`}>
                    <div className="flex items-center justify-between">
                      {track.completed ? <BadgeCheck className="h-9 w-9 text-cyan" /> : <Lock className="h-9 w-9 text-silver" />}
                      <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-black text-cyan">
                        Badge
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-black text-white">{locale === "th" ? track.titleTh : track.title}</h2>
                    <p className="mt-3 text-sm font-bold text-silver">{locale === "th" ? track.subtitleTh : track.subtitle}</p>
                    <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-cyan">
                      {track.completed ? t("progress.earned") : t("progress.locked")}
                    </p>
                  </article>
                ))}
              </section>

              <section className={`glass mt-10 rounded-[1.5rem] p-8 ${progress.campBadgeEarned ? "border-cyan/50" : "border-white/10"}`}>
                {progress.campBadgeEarned ? <Award className="h-12 w-12 text-cyan" /> : <ShieldCheck className="h-12 w-12 text-silver" />}
                <h2 className="mt-5 text-3xl font-black text-white">AI Builder Camp Badge</h2>
                <p className="mt-3 max-w-3xl leading-8 text-silver">
                  {progress.campBadgeEarned ? t("progress.campBadgeEarned") : t("progress.campBadgeLocked")}
                </p>
              </section>
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
