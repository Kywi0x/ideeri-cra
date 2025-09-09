import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
  secondary:
    "bg-neutral-100 text-black hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
  ghost:
    "bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors border border-transparent ${variants[variant]} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

