type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
      <h2 className="text-3xl font-black text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-silver md:text-lg">{description}</p> : null}
    </div>
  );
}
