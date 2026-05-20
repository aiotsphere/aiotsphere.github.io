"use client";

import { BarChart3, Download, KeyRound, Loader2, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { activities, tracks } from "@/lib/types";
import type { ActivityCode, Checkin, ProgressRecord, Registration } from "@/lib/types";

type PublicUser = Registration & { role: "student" | "admin" };

type AdminSummary = {
  users: PublicUser[];
  progress: ProgressRecord[];
  checkins: Checkin[];
  activityCodes: ActivityCode[];
};

export default function AdminPage() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<AdminSummary>({ users: [], progress: [], checkins: [], activityCodes: [] });
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("all");
  const [activityId, setActivityId] = useState(activities[0].id);
  const [loadingCode, setLoadingCode] = useState(false);

  const load = () => {
    fetch("/api/admin/summary")
      .then(async (response) => {
        if (response.status === 403) {
          window.location.href = "/login?redirectedFrom=/admin";
          return null;
        }
        return response.json();
      })
      .then((payload) => {
        if (payload) setData(payload);
      });
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    return data.users.filter((user) => {
      const haystack = `${user.firstName} ${user.lastName} ${user.email} ${user.school}`.toLowerCase();
      return haystack.includes(query.toLowerCase()) && (track === "all" || user.interestedTrack === track);
    });
  }, [data.users, query, track]);

  const createCode = async () => {
    setLoadingCode(true);
    const response = await fetch("/api/admin/activity-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId, maxUses: 80, expiresInHours: 24 })
    });
    setLoadingCode(false);
    if (!response.ok) {
      toast.error(locale === "th" ? "ไม่สามารถสร้างรหัสได้" : "Could not create code.");
      return;
    }
    const payload = await response.json();
    toast.success(`${locale === "th" ? "สร้างรหัสแล้ว" : "Code created"}: ${payload.activityCode.code}`);
    load();
  };

  const exportCsv = () => {
    const headers: string[] = ["First Name", "Last Name", "Email", "School", "Education Level", "Track", "Discord", "Status"];
    const rows: string[][] = filtered.map((user) => [
      user.firstName,
      user.lastName,
      user.email,
      user.school,
      user.educationLevel,
      user.interestedTrack,
      user.discordUsername,
      user.status
    ]);
    const csv = [headers, ...rows].map((row: string[]) => row.map((cell: string) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aiot-sphere-registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <CyberBackground />
      <Navbar />
      <main className="px-4 pb-20 pt-32 md:px-6">
        <section className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Cyber Operations</p>
              <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">{t("admin.headline")}</h1>
            </div>
            <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan px-5 py-3 text-sm font-black text-navy shadow-neon">
              <Download className="h-4 w-4" />
              {t("admin.export")}
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Metric icon={<Users />} label={t("admin.registrations")} value={data.users.length} />
            <Metric icon={<BarChart3 />} label={t("progress.completed")} value={data.progress.reduce((sum, item) => sum + item.completedActivityIds.length, 0)} />
            <Metric icon={<KeyRound />} label={t("admin.createCode")} value={data.activityCodes.length} />
            <Metric icon={<Users />} label={t("admin.checkins")} value={data.checkins.length} />
          </div>

          <section className="glass mt-8 rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black text-white">{t("admin.createCode")}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
              <select className="input-cyber" value={activityId} onChange={(event) => setActivityId(event.target.value)}>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {locale === "th" ? activity.titleTh : activity.title}
                  </option>
                ))}
              </select>
              <CyberButton onClick={createCode} disabled={loadingCode}>
                {loadingCode ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {t("admin.createCode")}
              </CyberButton>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {data.activityCodes.slice(0, 6).map((code) => (
                <div key={code.id} className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xl font-black text-cyan">{code.code}</p>
                  <p className="mt-2 text-sm text-silver">{code.usedCount}/{code.maxUses} uses</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass mt-8 overflow-hidden rounded-[1.5rem]">
            <div className="grid gap-3 border-b border-white/10 p-5 md:grid-cols-[1fr_240px]">
              <label className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
                <input className="input-cyber pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("admin.search")} />
              </label>
              <select className="input-cyber" value={track} onChange={(event) => setTrack(event.target.value)}>
                <option value="all">{t("admin.filter")}</option>
                {tracks.map((item) => (
                  <option key={item.id} value={item.id}>{locale === "th" ? item.titleTh : item.title}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-silver">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">School</th>
                    <th className="px-5 py-4">Education</th>
                    <th className="px-5 py-4">Track</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filtered.map((user) => (
                    <tr key={user.userId} className="transition hover:bg-white/[0.035]">
                      <td className="px-5 py-4 font-bold text-white">{user.firstName} {user.lastName}</td>
                      <td className="px-5 py-4 text-silver">{user.email}</td>
                      <td className="px-5 py-4 text-silver">{user.school}</td>
                      <td className="px-5 py-4 text-silver">{user.educationLevel}</td>
                      <td className="px-5 py-4 text-cyan">{tracks.find((item) => item.id === user.interestedTrack)?.title ?? user.interestedTrack}</td>
                      <td className="px-5 py-4 text-white">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-[1.5rem] p-6">
      <div className="text-cyan">{icon}</div>
      <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-silver">{label}</p>
      <p className="mt-3 text-4xl font-black text-white">{value}</p>
    </div>
  );
}
