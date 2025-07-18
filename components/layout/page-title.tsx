"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function PageTitle({ children, className = "" }: Props) {
  return <h1 className={`text-2xl font-bold text-white tracking-wider ${className}`}>{children}</h1>;
}
