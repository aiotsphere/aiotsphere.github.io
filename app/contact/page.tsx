"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const items = [
    { icon: MapPin, label: t("contact.lab"), value: t("contact.address") },
    { icon: Phone, label: t("contact.phone"), value: t("contact.phone") },
    { icon: Mail, label: t("contact.email"), value: t("contact.email") }
  ];

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">AIoT Sphere Laboratory</p>
          <h1 className="neon-text mt-4 text-5xl font-black leading-none text-white md:text-7xl">{t("contact.title")}</h1>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="glass rounded-[1.5rem] p-6">
                  <Icon className="h-8 w-8 text-cyan" />
                  <h2 className="mt-5 text-xl font-black text-white">{item.label}</h2>
                  <p className="mt-3 leading-7 text-silver">{item.value}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
