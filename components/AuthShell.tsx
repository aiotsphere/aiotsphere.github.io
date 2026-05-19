import Link from "next/link";
import { Cpu } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";

export function AuthShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <CyberBackground />
      <main className="grid min-h-screen place-items-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <Link href="/" className="mx-auto mb-7 flex w-fit items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/50 bg-cyan/10 shadow-neon">
              <Cpu className="h-5 w-5 text-cyan" />
            </span>
            <span className="font-black uppercase tracking-[0.16em] text-white">AI Builder Camp</span>
          </Link>
          <section className="glass rounded-[2rem] p-6 md:p-9">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-white md:text-5xl">{title}</h1>
              <p className="mt-3 text-silver">{subtitle}</p>
            </div>
            {children}
          </section>
        </div>
      </main>
    </>
  );
}
