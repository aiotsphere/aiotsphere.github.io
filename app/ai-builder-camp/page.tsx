"use client";

import { CalendarDays, CheckCircle2, Download, HelpCircle, QrCode, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { tracks } from "@/lib/types";

export default function AiBuilderCampPage() {
  const { t, locale } = useI18n();
  const [qr, setQr] = useState("");

  useEffect(() => {
    const target = `${window.location.origin}/register`;
    fetch(`/api/qr?url=${encodeURIComponent(target)}`)
      .then((response) => response.json())
      .then((data) => setQr(data.qr))
      .catch(() => setQr(""));
  }, []);

  const downloadQr = () => {
    if (!qr) return;
    const a = document.createElement("a");
    a.href = qr;
    a.download = "ai-builder-camp-registration-qr.png";
    a.click();
  };

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">{t("camp.subtitle")}</p>
            <h1 className="neon-text mt-4 text-5xl font-black leading-none text-white md:text-8xl">{t("camp.headline")}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-silver">{t("camp.description")}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CyberButton href="/register">{t("camp.registration")}</CyberButton>
              <CyberButton href="/progress" variant="secondary">{t("nav.progress")}</CyberButton>
            </div>
          </div>
          <section className="glass rounded-[1.5rem] p-6">
            <div className="flex items-center gap-3">
              <QrCode className="h-8 w-8 text-cyan" />
              <h2 className="text-2xl font-black text-white">{t("camp.qrTitle")}</h2>
            </div>
            <div className="mt-6 grid aspect-square place-items-center rounded-[1rem] bg-white p-4">
              {qr ? <Image src={qr} alt="Registration QR Code" width={680} height={680} unoptimized className="h-full w-full object-contain" /> : <QrCode className="h-20 w-20 text-navy" />}
            </div>
            <button onClick={downloadQr} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan px-5 py-3 text-sm font-black text-navy shadow-neon">
              <Download className="h-4 w-4" />
              {t("camp.qrDownload")}
            </button>
          </section>
        </section>

        <CampSection title={t("camp.details")} icon={<Rocket />}>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              locale === "th" ? "เรียนรู้แบบลงมือปฏิบัติในบรรยากาศห้องปฏิบัติการมหาวิทยาลัย" : "Hands-on learning in a university laboratory atmosphere",
              locale === "th" ? "เหมาะสำหรับนักเรียนระดับมัธยมศึกษาตอนปลายและผู้เรียนสายอาชีพ" : "Designed for upper secondary and vocational learners",
              locale === "th" ? "เชื่อมโยงการสร้างผลงาน AI กับระบบติดตามความก้าวหน้า" : "Connects AI project work with track progress monitoring"
            ].map((item) => (
              <div key={item} className="glass rounded-[1.25rem] p-5 text-silver">{item}</div>
            ))}
          </div>
        </CampSection>

        <CampSection title={t("camp.tracks")} icon={<CheckCircle2 />}>
          <div className="grid gap-5 md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.id} className="glass rounded-[1.25rem] p-6">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan">{locale === "th" ? track.subtitleTh : track.subtitle}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{locale === "th" ? track.titleTh : track.title}</h3>
                <p className="mt-3 leading-7 text-silver">{locale === "th" ? track.descriptionTh : track.description}</p>
              </article>
            ))}
          </div>
        </CampSection>

        <CampSection title={t("camp.schedule")} icon={<CalendarDays />}>
          <div className="grid gap-4 md:grid-cols-4">
            {["Orientation", "AI Studio", "Prototype Sprint", "Showcase"].map((item, index) => (
              <div key={item} className="glass rounded-[1.25rem] p-5">
                <p className="text-sm font-black text-cyan">Phase {index + 1}</p>
                <h3 className="mt-3 text-xl font-black text-white">{item}</h3>
              </div>
            ))}
          </div>
        </CampSection>

        <CampSection title={t("camp.faq")} icon={<HelpCircle />}>
          <div className="grid gap-4 md:grid-cols-2">
            {(locale === "th"
              ? ["ต้องมีพื้นฐานเขียนโปรแกรมหรือไม่: ไม่จำเป็น แต่ควรมีความสนใจด้านเทคโนโลยี", "ค่ายมีค่าใช้จ่ายหรือไม่: โปรดติดตามประกาศอย่างเป็นทางการของโครงการ"]
              : ["Is programming experience required: Not required, but interest in technology is recommended.", "Is there a fee: Please follow the official project announcement."]
            ).map((item) => (
              <div key={item} className="glass rounded-[1.25rem] p-5 leading-7 text-silver">{item}</div>
            ))}
          </div>
        </CampSection>
      </main>
    </>
  );
}

function CampSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mx-auto mt-16 max-w-7xl">
      <div className="mb-6 flex items-center gap-3 text-cyan">
        {icon}
        <h2 className="text-3xl font-black text-white md:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}
