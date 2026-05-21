"use client";

import { ArrowRight, BadgeCheck, Bot, Users } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function CampHubPage() {
  const { t, locale } = useI18n();

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">AIoT Sphere Membership</p>
          <h1 className="neon-text mt-4 text-5xl font-black leading-none text-white md:text-8xl">{t("camp.hubHeadline")}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-silver">{t("camp.hubDescription")}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.62fr]">
            <article className="glass rounded-[1.5rem] p-6 md:p-8">
              <Bot className="h-12 w-12 text-cyan" />
              <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-cyan">{t("nav.aiBuilderCamp")}</p>
              <h2 className="mt-3 text-4xl font-black text-white md:text-6xl">AI Builder Camp 2026</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-silver">
                {locale === "th"
                  ? "ค่ายฟรีสำหรับผู้เรียนระดับมัธยมศึกษาตอนปลาย/ปวช. ที่ต้องการเริ่มสร้างผลงานด้าน AI ผ่าน 4 Track หลัก"
                  : "A free camp for upper secondary and vocational learners who want to build AI work across four core tracks."}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CyberButton href="/camp/ai-builder-camp">
                  {locale === "th" ? "ดูรายละเอียดค่าย" : "View Camp Details"}
                  <ArrowRight className="h-4 w-4" />
                </CyberButton>
                <CyberButton href="/camp/register" variant="secondary">
                  {t("camp.registration")}
                </CyberButton>
              </div>
            </article>

            <aside className="grid gap-5">
              <InfoCard icon={<Users />} title={locale === "th" ? "บัญชีเดียว สมัครได้หลายค่าย" : "One Account, Multiple Camps"} />
              <InfoCard icon={<BadgeCheck />} title={locale === "th" ? "เก็บ Badge ราย Track" : "Collect Track Badges"} />
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}

function InfoCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <div className="text-cyan">{icon}</div>
      <h3 className="mt-5 text-2xl font-black text-white">{title}</h3>
    </div>
  );
}
