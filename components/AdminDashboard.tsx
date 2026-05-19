"use client";

import { motion } from "framer-motion";
import { BarChart3, Download, Filter, LayoutDashboard, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { CyberBackground } from "@/components/CyberBackground";
import { DashboardCard } from "@/components/DashboardCard";
import { tracks, type Registration } from "@/lib/types";

const statusStyles = {
  pending: "border-yellow-300/40 bg-yellow-300/10 text-yellow-200",
  confirmed: "border-cyan/40 bg-cyan/10 text-cyan",
  waitlist: "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-200"
};

export function AdminDashboard({ registrations }: { registrations: Registration[] }) {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("all");

  const filtered = useMemo(() => {
    return registrations.filter((registration) => {
      const haystack = `${registration.first_name} ${registration.last_name} ${registration.email} ${registration.school}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      const matchesTrack = track === "all" || registration.interested_track === track;
      return matchesQuery && matchesTrack;
    });
  }, [query, registrations, track]);

  const counts = tracks.map((item) => ({
    ...item,
    count: registrations.filter((registration) => registration.interested_track === item.id).length
  }));
  const maxCount = Math.max(...counts.map((item) => item.count), 1);

  const exportCsv = () => {
    const headers = ["First Name", "Last Name", "Email", "School", "Education Level", "Track", "Status", "Created At"];
    const rows = filtered.map((item) => [
      item.first_name,
      item.last_name,
      item.email,
      item.school,
      item.education_level,
      item.interested_track,
      item.status,
      item.created_at
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
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
      <main className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan/10 text-cyan shadow-neon">
              <LayoutDashboard />
            </span>
            <div>
              <p className="font-black text-white">Admin Console</p>
              <p className="text-xs text-silver">AI Builder Camp 2026</p>
            </div>
          </div>
          <nav className="mt-8 space-y-2">
            {["Analytics", "Registrations", "Tracks", "Export"].map((item) => (
              <a key={item} href="#registrations" className="flex items-center rounded-2xl px-4 py-3 text-sm font-bold text-silver hover:bg-white/10 hover:text-white">
                {item}
              </a>
            ))}
          </nav>
        </aside>
        <section className="px-4 py-8 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Live Analytics</p>
              <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Registration Command Center</h1>
            </div>
            <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan px-5 py-3 text-sm font-black text-navy shadow-neon">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <DashboardCard title="Total Registrations" value={registrations.length} icon={<Users />} />
            <DashboardCard title="Confirmed" value={registrations.filter((item) => item.status === "confirmed").length} icon={<BarChart3 />} />
            <DashboardCard title="Pending Review" value={registrations.filter((item) => item.status === "pending").length} icon={<Filter />} />
          </div>

          <section className="glass mt-5 rounded-[1.5rem] p-6">
            <h2 className="mb-6 text-2xl font-black text-white">Track Demand</h2>
            <div className="space-y-5">
              {counts.map((item, index) => (
                <div key={item.id}>
                  <div className="mb-2 flex justify-between text-sm font-bold">
                    <span className="text-white">{item.title}</span>
                    <span className="text-cyan">{item.count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.count / maxCount) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.08 }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan via-violet to-fuchsia-400 shadow-neon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="registrations" className="glass mt-5 overflow-hidden rounded-[1.5rem]">
            <div className="grid gap-3 border-b border-white/10 p-5 md:grid-cols-[1fr_220px]">
              <label className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
                <input className="input-cyber pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, school" />
              </label>
              <select className="input-cyber" value={track} onChange={(event) => setTrack(event.target.value)}>
                <option value="all">All Tracks</option>
                {tracks.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.14em] text-silver">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">School</th>
                    <th className="px-5 py-4">Track</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filtered.map((item) => (
                    <tr key={item.id} className="transition hover:bg-white/[0.035]">
                      <td className="px-5 py-4 font-bold text-white">{item.first_name} {item.last_name}</td>
                      <td className="px-5 py-4 text-silver">{item.email}</td>
                      <td className="px-5 py-4 text-silver">{item.school}</td>
                      <td className="px-5 py-4 text-cyan">{tracks.find((trackItem) => trackItem.id === item.interested_track)?.title ?? item.interested_track}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${statusStyles[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
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
