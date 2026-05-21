"use client";

import { BadgeCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function CampCheckinPage() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    setLoading(false);
    if (response.status === 401) {
      window.location.href = "/camp/login?redirectedFrom=/camp/checkin";
      return;
    }
    if (!response.ok) {
      toast.error(t("checkin.failed"));
      return;
    }
    toast.success(t("checkin.success"));
    setCode("");
    window.location.href = "/camp/progress";
  };

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="grid min-h-screen place-items-center px-4 py-32">
        <section className="glass w-full max-w-2xl rounded-[2rem] p-6 md:p-9">
          <BadgeCheck className="h-12 w-12 text-cyan" />
          <h1 className="mt-6 text-4xl font-black text-white md:text-6xl">{t("checkin.headline")}</h1>
          <p className="mt-4 leading-8 text-silver">{t("checkin.description")}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-white">{t("checkin.code")}</span>
              <input
                className="input-cyber text-center text-2xl font-black uppercase tracking-[0.18em]"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="AIOT-XXXXXX"
              />
            </label>
            <CyberButton type="submit" className="w-full py-4" disabled={loading || code.length < 4}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <BadgeCheck className="h-5 w-5" />}
              {t("checkin.submit")}
            </CyberButton>
          </form>
        </section>
      </main>
    </>
  );
}
