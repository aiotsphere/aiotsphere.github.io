"use client";

import { BadgeCheck, Download, KeyRound, Loader2, Search, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CyberBackground } from "@/components/CyberBackground";
import { Navbar } from "@/components/Navbar";
import { CyberButton } from "@/components/ui/Button";
import { createActivityCode, getAdminSummary, getCurrentUser, isAdminEmail } from "@/lib/clientStore";
import { useI18n } from "@/lib/i18n";
import { activities, tracks } from "@/lib/types";
import type { ActivityCode, CampRegistration, Checkin, ProgressRecord, Registration } from "@/lib/types";

type PublicUser = Registration & { role: "student" | "admin" };

type AdminSummary = {
  users: PublicUser[];
  campRegistrations: CampRegistration[];
  progress: ProgressRecord[];
  checkins: Checkin[];
  activityCodes: ActivityCode[];
};

export default function AdminPage() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<AdminSummary>({ users: [], campRegistrations: [], progress: [], checkins: [], activityCodes: [] });
  const [query, setQuery] = useState("");
  const [trackId, setTrackId] = useState(activities[0].id);
  const [loadingCode, setLoadingCode] = useState(false);

  const load = () => {
    getCurrentUser().then(async (user) => {
      if (!user || !isAdminEmail(user.email)) {
        window.location.href = "/camp/login?redirectedFrom=/admin";
        return;
      }
      setData(await getAdminSummary());
    });
  };

  useEffect(load, []);

  const registeredUsers = useMemo(() => {
    const registeredIds = new Set(data.campRegistrations.filter((item) => item.status !== "cancelled").map((item) => item.userId));
    return data.users.filter((user) => registeredIds.has(user.userId));
  }, [data.campRegistrations, data.users]);

  const filtered = useMemo(() => {
    return registeredUsers.filter((user) => {
      const haystack = `${user.firstName} ${user.lastName} ${user.email} ${user.school}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [registeredUsers, query]);

  const createCode = async () => {
    setLoadingCode(true);
    try {
      const activityCode = await createActivityCode(trackId, 80, 24);
      toast.success(`${locale === "th" ? "สร้างรหัสแล้ว" : "Code created"}: ${activityCode.code}`);
      load();
    } catch {
      toast.error(locale === "th" ? "ไม่สามารถสร้างรหัสได้" : "Could not create code.");
    } finally {
      setLoadingCode(false);
    }
  };

  const exportCsv = () => {
    const headers = ["First Name", "Last Name", "Email", "School", "Education Level", "Camp Status", "Completed Badges"];
    const rows = filtered.map((user) => {
      const camp = data.campRegistrations.find((item) => item.userId === user.userId);
      const badgeCount = data.progress.filter((item) => item.userId === user.userId && item.completedActivityIds.length > 0).length;
      return [user.firstName, user.lastName, user.email, user.school, user.educationLevel, camp?.status ?? "-", String(badgeCount)];
    });
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-builder-camp-registrations.csv";
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
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan">Camp Admin Dashboard</p>
              <h1 className="neon-text mt-4 text-4xl font-black text-white md:text-7xl">{t("admin.headline")}</h1>
            </div>
            <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan px-5 py-3 text-sm font-black text-navy shadow-neon">
              <Download className="h-4 w-4" />
              {t("admin.export")}
            </button>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Metric icon={<Users />} label={t("admin.registrations")} value={registeredUsers.length} />
            <Metric icon={<BadgeCheck />} label={t("progress.completed")} value={data.progress.filter((item) => item.completedActivityIds.length > 0).length} />
            <Metric icon={<KeyRound />} label={t("admin.createCode")} value={data.activityCodes.length} />
            <Metric icon={<Users />} label={t("admin.checkins")} value={data.checkins.length} />
          </div>

          <section className="glass mt-8 rounded-[1.5rem] p-6">
            <h2 className="text-2xl font-black text-white">{t("admin.createCode")}</h2>
            <p className="mt-2 leading-7 text-silver">{locale === "th" ? "สร้างโค้ดยืนยันการผ่านอบรมสำหรับ Badge ของแต่ละ Track" : "Generate completion codes for each track badge."}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto]">
              <select className="input-cyber" value={trackId} onChange={(event) => setTrackId(event.target.value)}>
                {activities.map((activity) => {
                  const track = tracks.find((item) => item.id === activity.trackId);
                  return (
                    <option key={activity.id} value={activity.id}>
                      {track?.title ?? activity.title}
                    </option>
                  );
                })}
              </select>
              <CyberButton onClick={createCode} disabled={loadingCode}>
                {loadingCode ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {t("admin.createCode")}
              </CyberButton>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {data.activityCodes.slice(0, 8).map((code) => (
                <div key={code.id} className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xl font-black text-cyan">{code.code}</p>
                  <p className="mt-2 text-sm text-silver">{tracks.find((item) => item.id === code.trackId)?.title}</p>
                  <p className="mt-1 text-sm text-silver">{code.usedCount}/{code.maxUses} uses</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass mt-8 overflow-hidden rounded-[1.5rem]">
            <div className="border-b border-white/10 p-5">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
                <input className="input-cyber pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("admin.search")} />
              </label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-silver">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">School</th>
                    <th className="px-5 py-4">Education</th>
                    <th className="px-5 py-4">Camp</th>
                    <th className="px-5 py-4">Badges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filtered.map((user) => {
                    const camp = data.campRegistrations.find((item) => item.userId === user.userId);
                    const badgeCount = data.progress.filter((item) => item.userId === user.userId && item.completedActivityIds.length > 0).length;
                    return (
                      <tr key={user.userId} className="transition hover:bg-white/[0.035]">
                        <td className="px-5 py-4 font-bold text-white">{user.firstName} {user.lastName}</td>
                        <td className="px-5 py-4 text-silver">{user.email}</td>
                        <td className="px-5 py-4 text-silver">{user.school}</td>
                        <td className="px-5 py-4 text-silver">{user.educationLevel}</td>
                        <td className="px-5 py-4 text-cyan">{camp?.status ?? "-"}</td>
                        <td className="px-5 py-4 text-white">{badgeCount}/4</td>
                      </tr>
                    );
                  })}
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
