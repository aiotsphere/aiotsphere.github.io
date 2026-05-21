"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Building2, Cpu, FlaskConical, MapPinned, Network, Sparkles } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { tracks } from "@/lib/types";

export default function Home() {
  const { t, locale } = useI18n();

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main>
        <section className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 md:px-6">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan shadow-neon"
              >
                <Sparkles className="h-4 w-4" />
                {t("home.eyebrow")}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="neon-text max-w-5xl text-5xl font-black leading-none text-white md:text-7xl lg:text-8xl"
              >
                {t("home.headline")}
              </motion.h1>
              <p className="mt-4 text-2xl font-bold text-cyan md:text-4xl">{t("home.subheadline")}</p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-silver md:text-xl">{t("home.description")}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <CyberButton href="#intro" className="px-7 py-4 text-base">
                  {t("home.primaryCta")}
                  <ArrowRight className="h-5 w-5" />
                </CyberButton>
                <CyberButton href="/camp/ai-builder-camp" variant="secondary" className="px-7 py-4 text-base">
                  {t("home.secondaryCta")}
                </CyberButton>
              </div>
            </div>
            <LabOrb />
          </div>
        </section>

        <Section id="intro" eyebrow="AIoT Sphere" title={t("home.introTitle")}>
          <p className="max-w-4xl text-lg leading-8 text-silver">{t("home.intro")}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <InfoBlock icon={<Cpu />} title={t("home.historyTitle")} text={t("home.history")} />
            <InfoBlock icon={<Network />} title={t("home.missionTitle")} text={t("home.mission")} />
            <InfoBlock icon={<FlaskConical />} title={t("home.visionTitle")} text={t("home.vision")} />
          </div>
        </Section>

        <Section eyebrow="Subproject" title={t("home.campTitle")}>
          <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
            <div className="glass rounded-[1.5rem] p-6">
              <p className="text-lg leading-8 text-silver">{t("home.campText")}</p>
              <CyberButton href="/camp/ai-builder-camp" className="mt-6">
                AI Builder Camp 2026
                <ArrowRight className="h-4 w-4" />
              </CyberButton>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {tracks.map((track) => (
                <div key={track.id} className="glass rounded-[1.25rem] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">
                    {locale === "th" ? track.subtitleTh : track.subtitle}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white">{locale === "th" ? track.titleTh : track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver">{locale === "th" ? track.descriptionTh : track.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section eyebrow="Gallery" title={t("home.photosTitle")}>
          <div className="grid gap-5 lg:grid-cols-[1fr_.75fr]">
            <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-dashed border-cyan/35 bg-white/[0.035] p-8 text-center">
              <div>
                <Building2 className="mx-auto h-12 w-12 text-cyan" />
                <p className="mt-4 max-w-2xl text-silver">{t("home.photosText")}</p>
              </div>
            </div>
            <div className="glass rounded-[1.5rem] p-6">
              <MapPinned className="h-10 w-10 text-cyan" />
              <h3 className="mt-5 text-2xl font-black text-white">{t("home.locationTitle")}</h3>
              <p className="mt-3 text-lg text-silver">{t("home.location")}</p>
              <div className="mt-5 space-y-2 text-sm text-silver">
                <p>{t("contact.phone")}</p>
                <p>{t("contact.email")}</p>
                <p>Discord: {t("contact.discord")}</p>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1rem] border border-cyan/25 bg-cyan/5">
                <iframe
                  title="UTCC AIoT Sphere Laboratory Google Map"
                  src="https://www.google.com/maps?q=%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%81%E0%B8%B2%E0%B8%A3%20UTCC%20AIoT%20Sphere%20%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%A7%E0%B8%B4%E0%B8%A8%E0%B8%A7%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C%20126%2F1%20%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%207%20%E0%B8%8A%E0%B8%B1%E0%B9%89%E0%B8%99%201%20%E0%B8%8B%E0%B8%AD%E0%B8%A2%E0%B8%A7%E0%B8%B4%E0%B8%A0%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B5%E0%B8%A3%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%95%202%20%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%A7%E0%B8%B4%E0%B8%A0%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B5%E0%B8%A3%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%95%20%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%8A%E0%B8%94%E0%B8%B2%E0%B8%A0%E0%B8%B4%E0%B9%80%E0%B8%A9%E0%B8%81%20%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B9%81%E0%B8%94%E0%B8%87%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%2010400&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <CyberButton href="https://maps.app.goo.gl/3sYzyfpHdS6Dqahu6?g_st=ic" variant="secondary" className="w-full">
                  {t("home.map")}
                  <ArrowRight className="h-4 w-4" />
                </CyberButton>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">{eyebrow}</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-black text-white md:text-5xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function InfoBlock({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <div className="text-cyan">{icon}</div>
      <h3 className="mt-5 text-2xl font-black text-white">{title}</h3>
      <p className="mt-3 leading-7 text-silver">{text}</p>
    </div>
  );
}

function LabOrb() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-8 rounded-full border border-cyan/30 shadow-[0_0_90px_rgba(0,209,255,.28)]" />
      <div className="absolute inset-20 rounded-full border border-violet/35 shadow-violet" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-cyan/45" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute inset-14 rounded-full border border-dashed border-fuchsia-400/35" />
      <div className="glass absolute inset-24 grid place-items-center rounded-full">
        <Bot className="h-28 w-28 text-cyan drop-shadow-[0_0_28px_rgba(0,209,255,.8)]" />
      </div>
      {["AI", "IoT", "ROBOT", "CYBER"].map((label, index) => (
        <motion.div
          key={label}
          className="glass absolute grid h-20 w-20 place-items-center rounded-3xl text-xs font-black text-white shadow-neon"
          style={{
            left: `${index === 0 ? 7 : index === 1 ? 72 : index === 2 ? 12 : 67}%`,
            top: `${index === 0 ? 22 : index === 1 ? 16 : index === 2 ? 72 : 70}%`
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.div>
      ))}
    </motion.div>
  );
}
