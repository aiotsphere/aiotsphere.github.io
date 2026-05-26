import type { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return <h2 className={`text-3xl font-semibold tracking-tight text-white ${className}`}>{children}</h2>;
}
