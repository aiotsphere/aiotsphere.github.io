"use client";

import { ArrowRight, BadgeCheck, Bot, CalendarDays, CheckCircle2, Cpu, Gauge, Sparkles } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { tracks } from "@/lib/types";

export default function AiBuilderCampPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">{t("camp.subtitle")}</p>
            <h1 className="neon-text mt-4 text-5xl font-black leading-none text-white md:text-8xl">{t("camp.headline")}</h1>
            <p className="mt-6 max-w-4xl text-lg font-bold leading-8 text-white">
              {locale === "th"
                ? "ค่ายฟรีสำหรับ มัธยมศึกษาตอนปลาย/ปวช. ที่อยากเริ่มเส้นทางสู่สาย Computer Engineering & Artificial Intelligence"
                : "A free camp for upper secondary and vocational learners starting a pathway to Computer Engineering & Artificial Intelligence."}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-silver">{t("camp.description")}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CyberButton href="/camp/register" className="px-7 py-4 text-base">
                {t("camp.registration")}
                <ArrowRight className="h-5 w-5" />
              </CyberButton>
              <CyberButton href="/camp/checkin" variant="secondary" className="px-7 py-4 text-base">
                {t("nav.checkin")}
              </CyberButton>
              <CyberButton href="/camp/progress" variant="secondary" className="px-7 py-4 text-base">
                {t("nav.progress")}
              </CyberButton>
            </div>
          </div>
          <section className="glass rounded-[1.5rem] p-6">
            <Bot className="h-12 w-12 text-cyan" />
            <h2 className="mt-5 text-3xl font-black text-white">Build within 1 day</h2>
            <div className="mt-6 space-y-4">
              {[
                locale === "th" ? "เรียนรู้ AI แบบลงมือทำจริง" : "Hands-on AI learning",
                locale === "th" ? "สร้างผลงานภายใน 1 วัน" : "Create a project within one day",
                locale === "th" ? "ผ่าน 4 Track หลัก" : "Complete four core learning tracks"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-silver">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </section>

        <CampSection eyebrow="4 Learning Tracks" title={t("camp.tracks")} icon={<Cpu />}>
          <div className="grid gap-5 md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.id} className="glass rounded-[1.5rem] p-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">{track.title}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{locale === "th" ? track.subtitleTh : track.subtitle}</h3>
                <p className="mt-3 leading-7 text-silver">{locale === "th" ? track.descriptionTh : track.description}</p>
              </article>
            ))}
          </div>
        </CampSection>

        <CampSection eyebrow="Badge System" title={t("progress.headline")} icon={<BadgeCheck />}>
          <div className="grid gap-5 md:grid-cols-5">
            {tracks.map((track) => (
              <div key={track.id} className="glass rounded-[1.5rem] p-5">
                <BadgeCheck className="h-9 w-9 text-cyan" />
                <h3 className="mt-5 text-xl font-black text-white">{track.title}</h3>
                <p className="mt-2 text-sm text-silver">{locale === "th" ? track.subtitleTh : track.subtitle}</p>
              </div>
            ))}
            <div className="glass rounded-[1.5rem] border-cyan/40 p-5">
              <Sparkles className="h-9 w-9 text-cyan" />
              <h3 className="mt-5 text-xl font-black text-white">AI Builder Camp</h3>
              <p className="mt-2 text-sm text-silver">{t("progress.campBadgeLocked")}</p>
            </div>
          </div>
        </CampSection>

        <CampSection eyebrow="Camp Flow" title={t("camp.details")} icon={<CalendarDays />}>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              locale === "th" ? "สมัครสมาชิก AIoT Sphere" : "Create AIoT Sphere membership",
              locale === "th" ? "เลือกสมัคร AI Builder Camp" : "Join AI Builder Camp",
              locale === "th" ? "เรียนครบ 4 Track" : "Complete four tracks",
              locale === "th" ? "กรอกโค้ดรับ Badge" : "Enter codes to claim badges"
            ].map((item, index) => (
              <div key={item} className="glass rounded-[1.25rem] p-5">
                <p className="text-sm font-black text-cyan">Step {index + 1}</p>
                <h3 className="mt-3 text-xl font-black text-white">{item}</h3>
              </div>
            ))}
          </div>
        </CampSection>

        <CampSection eyebrow="Dashboard" title={t("nav.progress")} icon={<Gauge />}>
          <section className="glass rounded-[1.5rem] p-6 md:p-8">
            <p className="max-w-3xl text-lg leading-8 text-silver">
              {locale === "th"
                ? "ผู้เข้าร่วมสามารถตรวจสอบ Badge ของแต่ละ Track และ Badge ใหญ่ของ AI Builder Camp ได้ผ่านหน้า Progress หลังเข้าสู่ระบบ"
                : "Participants can monitor track badges and the main AI Builder Camp badge from the Progress page after signing in."}
            </p>
            <CyberButton href="/camp/progress" className="mt-6">
              {t("nav.progress")}
            </CyberButton>
          </section>
        </CampSection>
      </main>
    </>
  );
}

function CampSection({ eyebrow, title, icon, children }: { eyebrow: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-16 max-w-7xl">
      <div className="mb-6 flex items-center gap-3 text-cyan">
        {icon}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
