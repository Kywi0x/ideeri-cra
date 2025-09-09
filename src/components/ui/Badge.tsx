import React from "react";

export function Badge({ children, color = "neutral" }: { children: React.ReactNode; color?: "neutral" | "green" | "amber" | "red" }) {
  const colors: Record<string, string> = {
    neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[color]}`}>{children}</span>;
}

