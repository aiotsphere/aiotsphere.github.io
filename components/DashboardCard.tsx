import type { ReactNode } from "react";

export function DashboardCard({
  title,
  value,
  icon,
  children
}: {
  title: string;
  value?: string | number;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="glass rounded-[1.5rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-silver">{title}</p>
          {value !== undefined ? <p className="mt-3 text-4xl font-black text-white">{value}</p> : null}
        </div>
        {icon ? <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan shadow-neon">{icon}</div> : null}
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}
