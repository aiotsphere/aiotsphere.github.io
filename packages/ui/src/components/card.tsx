import type { HTMLAttributes } from 'react';
import { cn } from '@aiotsphere/lib';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  borderless?: boolean;
}

export function Card({ className, borderless = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl',
        borderless ? 'border-transparent' : '',
        className,
      )}
      {...props}
    />
  );
}
