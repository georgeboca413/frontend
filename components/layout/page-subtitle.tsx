"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PageSubtitle({ children, className = "" }: Props) {
  return <p className={`text-sm text-neutral-400 ${className}`}>{children}</p>;
}
