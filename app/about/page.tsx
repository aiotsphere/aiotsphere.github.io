"use client";

import { Cpu, GraduationCap, Mail, MapPin, Network, Phone, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();
  const items = [
    { icon: <Rocket />, title: t("nav.background"), text: t("about.history"), href: "/background" },
    { icon: <ShieldCheck />, title: t("nav.vision"), text: t("institution.visionBody") },
    { icon: <Network />, title: t("nav.mission"), text: t("institution.missionBody"), href: "/mission" },
    { icon: <ShieldCheck />, title: "Purpose", text: t("about.why") },
    { icon: <GraduationCap />, title: "Educational Objectives", text: t("about.objectives") },
    { icon: <Cpu />, title: "Student Development", text: t("about.goals") }
  ];

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Institutional Profile</p>
          <h1 className="neon-text mt-4 max-w-5xl text-4xl font-black text-white md:text-7xl">{t("about.headline")}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-silver">{t("about.description")}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.title} className="glass rounded-[1.5rem] p-6">
                <div className="text-cyan">{item.icon}</div>
                <h2 className="mt-5 text-2xl font-black text-white">{item.title}</h2>
                <p className="mt-3 leading-8 text-silver">{item.text}</p>
                {"href" in item && item.href ? (
                  <Link href={item.href} className="mt-5 inline-flex text-sm font-black uppercase tracking-[0.14em] text-cyan hover:text-white">
                    Read more
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <section className="glass mt-8 rounded-[1.5rem] p-6 md:p-8">
            <h2 className="text-3xl font-black text-white">{t("contact.title")}</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.9fr]">
              <div>
                <p className="text-lg font-bold text-cyan">{t("contact.lab")}</p>
                <p className="mt-3 leading-8 text-silver">{t("contact.address")}</p>
              </div>
              <div className="space-y-3">
                <ContactLine icon={<Phone className="h-4 w-4" />} label={t("contact.phone")} />
                <ContactLine icon={<Mail className="h-4 w-4" />} label={t("contact.email")} />
                <ContactLine icon={<MapPin className="h-4 w-4" />} label={`Discord: ${t("contact.discord")}`} />
              </div>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function ContactLine({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] p-4 text-silver">
      <span className="text-cyan">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
