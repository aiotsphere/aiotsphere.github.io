import { CyberButton } from "@/components/ui/Button";

export function AudienceFooter() {
  return (
    <>
      <section id="audience" className="px-4 py-24 md:px-6">
        <div className="glass mx-auto max-w-5xl overflow-hidden rounded-[2rem] p-8 text-center md:p-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-cyan">Target Audience</p>
          <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
            นักเรียน ม.ปลาย / ปวช. ที่สนใจ AI, Coding, Robotics, Data, Creative Technology และ Startup
          </h2>
          <CyberButton href="/camp/register" className="mt-8">สมัครเข้าร่วมค่ายฟรี</CyberButton>
        </div>
      </section>
      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm font-semibold uppercase tracking-[0.18em] text-silver md:px-6">
        Free Workshop | No Experience Required | Build Your First AI Project
      </footer>
    </>
  );
}
