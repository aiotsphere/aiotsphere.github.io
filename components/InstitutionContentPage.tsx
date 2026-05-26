"use client";

import { ArrowRight, Cpu, FlaskConical, Globe2, Network, Sparkles } from "lucide-react";
import Link from "next/link";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";

type PageKind = "vision" | "background" | "mission";

export function InstitutionContentPage({ kind }: { kind: PageKind }) {
  const { t } = useI18n();

  if (kind === "background") {
    const ecosystemItems = t("ecosystem.items").split("|");
    const currentItems = t("ecosystem.current").split("|");

    return (
      <Shell eyebrow="AIoT Sphere Laboratory" title={t("institution.backgroundTitle")} subtitle={t("institution.backgroundSubtitle")}>
        <div className="grid gap-6 lg:grid-cols-[1fr_.72fr]">
          <article className="glass rounded-[1.5rem] p-6 md:p-8">
            {[t("institution.backgroundIntro"), t("institution.backgroundOrigin"), t("institution.backgroundEcosystem")].map((paragraph) => (
              <p key={paragraph} className="mb-5 text-lg leading-9 text-silver last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>
          <aside className="glass rounded-[1.5rem] p-6">
            <Sparkles className="h-9 w-9 text-cyan" />
            <h2 className="mt-5 text-2xl font-black text-white">{t("institution.backgroundConceptTitle")}</h2>
            <p className="mt-4 leading-8 text-silver">{t("institution.backgroundConcept")}</p>
          </aside>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ecosystemItems.map((item) => (
            <div key={item} className="glass rounded-[1.25rem] p-5">
              <Cpu className="h-7 w-7 text-cyan" />
              <p className="mt-4 font-bold leading-7 text-white">{item}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 glass rounded-[1.5rem] p-6 md:p-8">
          <h2 className="text-3xl font-black text-white">Living Innovation Ecosystem</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {currentItems.map((item) => (
              <div key={item} className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-silver">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg leading-9 text-silver">{t("institution.backgroundCurrent")}</p>
          <p className="mt-5 text-lg leading-9 text-silver">{t("institution.backgroundGoal")}</p>
        </section>
      </Shell>
    );
  }

  const isVision = kind === "vision";
  return (
    <Shell
      eyebrow="AIoT Sphere Laboratory"
      title={isVision ? t("institution.visionTitle") : t("institution.missionTitle")}
      subtitle={isVision ? t("institution.visionSubtitle") : t("institution.missionSubtitle")}
    >
      <section className="grid gap-6 lg:grid-cols-[.75fr_1fr]">
        <div className="glass grid min-h-72 place-items-center rounded-[1.5rem] bg-cyber-grid bg-[length:34px_34px] p-8">
          <div className="grid h-32 w-32 place-items-center rounded-full border border-cyan/40 bg-cyan/10 shadow-neon">
            {isVision ? <Globe2 className="h-16 w-16 text-cyan" /> : <Network className="h-16 w-16 text-cyan" />}
          </div>
        </div>
        <article className="glass rounded-[1.5rem] p-6 md:p-8">
          <p className="text-2xl font-black leading-[1.55] text-white md:text-4xl">
            {isVision ? t("institution.visionBody") : t("institution.missionBody")}
          </p>
        </article>
      </section>
    </Shell>
  );
}

export function PlaceholderPage({ type }: { type: "sphereos" | "partnership" }) {
  const { t } = useI18n();
  const title = type === "sphereos" ? t("placeholder.sphereosTitle") : t("placeholder.partnershipTitle");
  const subtitle = type === "sphereos" ? t("placeholder.sphereosSubtitle") : t("placeholder.partnershipSubtitle");
  const body = type === "sphereos" ? t("placeholder.sphereosBody") : t("placeholder.partnershipBody");

  return (
    <Shell eyebrow="Reserved Platform" title={title} subtitle={subtitle}>
      <section className="glass grid min-h-[420px] place-items-center rounded-[1.5rem] border-dashed p-8 text-center">
        <div>
          <FlaskConical className="mx-auto h-14 w-14 text-cyan" />
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-9 text-silver">{body}</p>
        </div>
      </section>
    </Shell>
  );
}

function Shell({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">{eyebrow}</p>
          <h1 className="neon-text mt-4 max-w-5xl text-5xl font-black leading-none text-white md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-silver">{subtitle}</p>
          <div className="mt-10">{children}</div>
          <Link href="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-cyan transition hover:text-white">
            About AIoT Sphere
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </>
  );
}
