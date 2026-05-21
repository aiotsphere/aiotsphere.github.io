"use client";

import { Lock, ScanLine, Trophy } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { activities, tracks } from "@/lib/types";

export default function ActivitiesPage() {
  const { locale, t } = useI18n();
  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Learning Operations</p>
          <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">{t("nav.activities")}</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => {
              const track = tracks.find((item) => item.id === activity.trackId);
              return (
                <article key={activity.id} className="glass rounded-[1.5rem] p-6">
                  <div className="flex items-center justify-between">
                    <Trophy className="h-8 w-8 text-cyan" />
                    <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-black text-cyan">Badge</span>
                  </div>
                  <h2 className="mt-6 text-2xl font-black text-white">{locale === "zh" ? activity.titleZh : locale === "th" ? activity.titleTh : activity.title}</h2>
                  <p className="mt-2 text-sm font-bold text-violet">{locale === "zh" ? track?.titleZh : locale === "th" ? track?.titleTh : track?.title}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-silver">
                    <Lock className="h-4 w-4" />
                    Instructor code required
                  </div>
                </article>
              );
            })}
          </div>
          <CyberButton href="/camp/checkin" className="mt-10">
            <ScanLine className="h-4 w-4" />
            {t("nav.checkin")}
          </CyberButton>
        </section>
      </main>
    </>
  );
}
