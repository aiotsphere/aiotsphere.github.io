"use client";

import { FlaskConical } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";

export default function SeminarPage() {
  const { t } = useI18n();

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">AIoT Sphere</p>
          <h1 className="neon-text mt-4 text-5xl font-black leading-none text-white md:text-7xl">{t("placeholder.seminarTitle")}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-silver">{t("placeholder.seminarSubtitle")}</p>
          <section className="glass mt-10 grid min-h-[360px] place-items-center rounded-[1.5rem] border-dashed p-8 text-center">
            <div>
              <FlaskConical className="mx-auto h-14 w-14 text-cyan" />
              <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-silver">{t("placeholder.seminarBody")}</p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
