"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icons";
import { btn } from "@/lib/ui";

type Theme = "light" | "dark";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // storage unavailable — theme still applies for this visit
    }
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" onClick={toggle} aria-label={theme ? label : "Toggle color theme"} title={theme ? label : undefined} className={`${btn.icon} ${className}`}>
      <Icon name="sun" size={17} className="hidden dark:block" />
      <Icon name="moon" size={17} className="block dark:hidden" />
    </button>
  );
}
