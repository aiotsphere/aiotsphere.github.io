"use client";

import { ChevronDown, Cpu, Languages, LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CyberButton } from "@/components/ui/Button";
import { getCurrentUser, logout as logoutStore } from "@/lib/clientStore";
import { useI18n, type Locale } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    const syncUser = () => {
      const user = getCurrentUser();
      setSignedIn(Boolean(user));
      setIsAdmin(user?.role === "admin");
    };
    syncUser();
    window.addEventListener("aiot-store-change", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("aiot-store-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logout = async () => {
    logoutStore();
    toast.success(locale === "th" ? "ออกจากระบบแล้ว" : "Logged out");
    window.location.href = "/";
  };

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
    { href: "/sphereos", label: t("nav.sphereos") },
    { href: "/seminar", label: t("nav.seminar") },
    { href: "/administrators", label: t("nav.administrators") },
    { href: "/camp", label: t("nav.camp") }
  ];

  const campLinks = [
    { href: "/camp/ai-builder-camp", label: t("nav.aiBuilderCamp") },
    { href: "/camp/register", label: t("nav.register") },
    { href: "/camp/login", label: t("nav.login") },
    { href: "/camp/checkin", label: t("nav.checkin") },
    { href: "/camp/progress", label: t("nav.progress") }
  ];

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan/50 bg-cyan/10 shadow-neon">
              <Cpu className="h-5 w-5 text-cyan" />
            </span>
            <span className="text-sm font-black uppercase tracking-[0.16em] text-white md:text-base">
              AIoT Sphere
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) =>
              link.href === "/camp" ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-silver transition hover:bg-cyan/10 hover:text-white"
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="glass overflow-hidden rounded-2xl border border-cyan/20 p-2 shadow-[0_0_45px_rgba(0,209,255,.16)]">
                      {campLinks.map((campLink) => (
                        <Link
                          key={campLink.href}
                          href={campLink.href}
                          className="block rounded-xl px-3 py-2 text-sm font-bold text-silver transition hover:bg-cyan/10 hover:text-white"
                        >
                          {campLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm font-bold text-silver transition hover:bg-cyan/10 hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} setLocale={setLocale} compact />
            <CyberButton href={signedIn ? "/dashboard" : "/camp/login"} variant="secondary" className="px-4 py-2">
              {signedIn ? <LayoutDashboard className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              {signedIn ? t("nav.dashboard") : t("nav.login")}
            </CyberButton>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-cyan/50 hover:text-cyan hover:shadow-neon lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <button
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="glass relative flex h-full w-[min(88vw,380px)] flex-col border-r border-cyan/20 p-5 shadow-[0_0_80px_rgba(0,209,255,.18)]">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/50 bg-cyan/10 shadow-neon">
                  <Cpu className="h-5 w-5 text-cyan" />
                </span>
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.16em] text-white">AIoT Sphere</span>
                  <span className="block text-xs font-bold text-cyan">Laboratory</span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-silver transition hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <LanguageSwitcher locale={locale} setLocale={setLocale} />
            </div>

            <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
              {links.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-bold text-silver transition hover:border-cyan/30 hover:bg-cyan/10 hover:text-white"
                  >
                    {link.label}
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan opacity-0 shadow-neon transition group-hover:opacity-100" />
                  </Link>
                  {link.href === "/camp" ? (
                    <div className="ml-4 mt-1 space-y-1 border-l border-cyan/20 pl-3">
                      {campLinks.map((campLink) => (
                        <Link
                          key={campLink.href}
                          href={campLink.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-2xl px-4 py-2 text-sm font-bold text-silver transition hover:bg-cyan/10 hover:text-white"
                        >
                          {campLink.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
              {signedIn ? (
                <>
                  <CyberButton href="/dashboard" variant="secondary" className="w-full">
                    <LayoutDashboard className="h-4 w-4" />
                    {t("nav.dashboard")}
                  </CyberButton>
                  {isAdmin ? (
                    <CyberButton href="/admin" variant="secondary" className="w-full">
                      {t("nav.admin")}
                    </CyberButton>
                  ) : null}
                  <button
                    onClick={logout}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-silver transition hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("nav.logout")}
                  </button>
                </>
              ) : (
                <CyberButton href="/camp/login" className="w-full" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </CyberButton>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

function LanguageSwitcher({
  locale,
  setLocale,
  compact = false
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {!compact ? <Languages className="ml-2 h-4 w-4 text-cyan" /> : null}
      {(["th", "en"] as Locale[]).map((item) => (
        <button
          key={item}
          onClick={() => setLocale(item)}
          className={`rounded-full px-3 py-1 text-xs font-black uppercase transition ${
            locale === item ? "bg-cyan text-navy" : "text-silver hover:text-white"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
