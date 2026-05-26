import Link from 'next/link';
import { Button, SectionHeading } from '@aiotsphere/ui';

export default function Page() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%),#020617] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 lg:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.28em] text-cyan-300/80">UTCC AIoT Sphere</p>
        <SectionHeading className="max-w-4xl">A premium AI-driven ecosystem for learning, events, gamification, and certificates.</SectionHeading>
        <p className="mt-6 max-w-2xl leading-8 text-slate-300">
          Empower students, educators, and staff with intelligent activity management, secure QR attendance, loyalty rewards, and AI insight dashboards built for enterprise scale.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/login" className="w-full sm:w-auto">
            <Button asChild variant="primary" className="w-full sm:w-auto">
              <span>Member login</span>
            </Button>
          </Link>
          <Link href="/register" className="w-full sm:w-auto">
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <span>Register now</span>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
