import React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-sm bg-white dark:bg-neutral-900">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-neutral-50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300">{children}</thead>;
}

export function TRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b border-neutral-200 dark:border-neutral-800">{children}</tr>;
}

export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left font-medium px-4 py-2 ${className ?? ""}`}>{children}</th>;
}

export function TD({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-2 ${className ?? ""}`}>{children}</td>;
}

