"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "@/components/AdminDashboard";
import { CyberBackground } from "@/components/CyberBackground";
import { CyberButton } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/browser";
import type { Registration } from "@/lib/types";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const loadAdmin = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login?redirectedFrom=/admin";
        return;
      }

      const { data: admin } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!admin) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      setRegistrations((data ?? []) as Registration[]);
      setAuthorized(true);
      setLoading(false);
    };

    loadAdmin();
  }, []);

  if (loading) {
    return (
      <>
        <CyberBackground />
        <main className="grid min-h-screen place-items-center px-4 text-center">
          <p className="text-lg font-bold text-cyan">Loading admin console...</p>
        </main>
      </>
    );
  }

  if (!authorized) {
    return (
      <>
        <CyberBackground />
        <main className="grid min-h-screen place-items-center px-4 text-center">
          <section className="glass max-w-md rounded-[2rem] p-8">
            <h1 className="text-3xl font-black text-white">Admin only</h1>
            <p className="mt-3 text-silver">บัญชีนี้ยังไม่ได้รับสิทธิ์เข้า Admin Dashboard</p>
            <CyberButton href="/" className="mt-6">กลับหน้าแรก</CyberButton>
          </section>
        </main>
      </>
    );
  }

  return <AdminDashboard registrations={registrations} />;
}
