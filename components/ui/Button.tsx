import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const styles = {
  primary:
    "bg-cyan text-navy shadow-neon hover:shadow-[0_0_42px_rgba(0,209,255,.5)]",
  secondary:
    "border border-cyan/45 bg-white/5 text-white hover:border-cyan hover:bg-cyan/10 hover:shadow-neon",
  ghost: "text-silver hover:bg-white/10 hover:text-white"
};

export function CyberButton(props: ButtonProps | LinkProps) {
  const className = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${styles[props.variant ?? "primary"]} ${props.className ?? ""}`;

  if (typeof props.href === "string") {
    const { href, children, variant: _variant, className: _className, ...rest } = props;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant: _variant, className: _className, href: _href, ...rest } = props as ButtonProps;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
