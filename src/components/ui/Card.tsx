import React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
      <h2 className="text-sm font-semibold">{title}</h2>
      {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className ?? ""}`}>{children}</div>;
}

