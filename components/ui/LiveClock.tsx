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

  if (!mounted) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "12px",
      fontFamily: "monospace",
      color: "#9898A6",
    }}>
      <span style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "#4ade80",
        display: "inline-block",
        flexShrink: 0,
        animation: "pulse 2s infinite",
      }} />
      <span>{date}</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span style={{ color: "#F4F4F6", fontVariantNumeric: "tabular-nums" }}>{time}</span>
      <span style={{ color: "#8B5CF6", fontWeight: 500 }}>CAT</span>
    </div>
  );
}v