"use client";

import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      suppressHydrationWarning
    >
      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
}
