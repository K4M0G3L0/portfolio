"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  const [date, setDate] = useState("Loading...");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const now = new Date();

      const timeStr = new Intl.DateTimeFormat("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const dateStr = new Intl.DateTimeFormat("en-ZA", {
        timeZone: "Africa/Johannesburg",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(now);

      setTime(timeStr);
      setDate(dateStr);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary opacity-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
      <span>{date}</span>
      <span className="text-text-tertiary opacity-40">·</span>
      <span className="text-text-primary tabular-nums">{time}</span>
      <span className="text-accent-violet font-medium">CAT</span>
    </div>
  );
}