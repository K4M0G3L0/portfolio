import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "violet" | "cyan" | "emerald" | "amber" | "red" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono tracking-wide rounded-full border",
        size === "sm" ? "text-2xs px-2 py-0.5" : "text-xs px-2.5 py-0.5",
        {
          "bg-base-700 border-border text-text-secondary": variant === "default",
          "bg-violet-500/10 border-violet-500/30 text-violet-400": variant === "violet",
          "bg-cyan-500/10 border-cyan-500/30 text-cyan-400": variant === "cyan",
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-400": variant === "emerald",
          "bg-amber-500/10 border-amber-500/30 text-amber-400": variant === "amber",
          "bg-red-500/10 border-red-500/30 text-red-400": variant === "red",
          "bg-transparent border-border-strong text-text-tertiary": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
