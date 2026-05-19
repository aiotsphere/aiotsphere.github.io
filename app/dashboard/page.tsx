"use client";

import { useEffect, useState } from "react";
import { UserDashboard } from "@/components/UserDashboard";
import { CyberBackground } from "@/components/CyberBackground";
import { createClient } from "@/lib/supabase/browser";
import type { Registration } from "@/lib/types";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login?redirectedFrom=/dashboard";
        return;
      }

      const { data } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setRegistration((data as Registration | null) ?? null);
      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <CyberBackground />
        <main className="grid min-h-screen place-items-center px-4 text-center">
          <p className="text-lg font-bold text-cyan">Loading dashboard...</p>
        </main>
      </>
    );
  }

  return <UserDashboard registration={registration} />;
}
