"use client";

import { Menu, X, Cpu, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/browser";
import { CyberButton } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let supabase: ReturnType<typeof createClient>;
    try {
      supabase = createClient();
    } catch {
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("ออกจากระบบแล้ว");
    window.location.href = "/";
  };

  const links = [
    { href: "#tracks", label: "Tracks" },
    { href: "#benefits", label: "Benefits" },
    { href: "#audience", label: "Audience" }
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan/50 bg-cyan/10 shadow-neon">
            <Cpu className="h-5 w-5 text-cyan" />
          </span>
          <span className="text-sm font-black uppercase tracking-[0.16em] text-white md:text-base">
            AI Builder Camp
          </span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-silver transition hover:text-cyan">
              {link.label}
            </a>
          ))}
          {signedIn ? (
            <>
              <CyberButton href="/dashboard" variant="secondary" className="px-4 py-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </CyberButton>
              <button onClick={logout} className="text-silver transition hover:text-white" aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <CyberButton href="/register" className="px-4 py-2">สมัครเข้าร่วม</CyberButton>
          )}
        </div>
        <button className="text-white md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open ? (
        <div className="glass mx-4 mb-4 rounded-3xl p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-2 text-silver hover:bg-white/10 hover:text-white">
                {link.label}
              </a>
            ))}
            <CyberButton href={signedIn ? "/dashboard" : "/register"}>{signedIn ? "Dashboard" : "สมัครเข้าร่วม"}</CyberButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
