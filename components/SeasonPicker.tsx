"use client";

import { useSeason } from "@/components/SeasonProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { SEASONS, type SeasonId } from "@/lib/seasons";

const ICONS: Record<SeasonId, React.ReactNode> = {
  // Flower — spring
  spring: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden className="block m-auto">
      <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0-6a4 4 0 00-3.6 5.74A5.98 5.98 0 0112 8a5.98 5.98 0 013.6 1.74A4 4 0 0012 2zm10 10a4 4 0 00-5.74-3.6A5.98 5.98 0 0118 12a5.98 5.98 0 01-1.74 3.6A4 4 0 0022 12zm-10 10a4 4 0 003.6-5.74A5.98 5.98 0 0112 16a5.98 5.98 0 01-3.6-1.74A4 4 0 0012 22zM2 12a4 4 0 005.74 3.6A5.98 5.98 0 016 12a5.98 5.98 0 011.74-3.6A4 4 0 002 12z" />
    </svg>
  ),
  // Sun — summer
  summer: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="block m-auto">
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  // Leaf — autumn
  autumn: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden className="block m-auto">
      <path d="M21 3S9 3 5 7s-4 12 0 12c4 0 8-2 11-5s5-11 5-11zM8 17l6-6" stroke="currentColor" strokeWidth="0" />
      <path d="M21 3C13 3 7 5 4.5 8.5 2 12 3 19 5 19c1 0 1.5-.4 2-1l4.5-4.5 1.4 1.4L8.4 19.4C10.7 19 13 18 15 16c3-3 6-11 6-13z" />
    </svg>
  ),
  // Snowflake — winter
  winter: (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden className="block m-auto">
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
      <path d="M9 4l3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3" />
    </svg>
  ),
};

export default function SeasonPicker({ className = "" }: { className?: string }) {
  const { id, setSeason } = useSeason();
  const { t } = useLanguage();

  return (
    <div
      className={`keycap-cluster ${className}`}
      role="group"
      aria-label={t("picker.season")}
    >
      {SEASONS.map((s) => {
        const active = s.id === id;
        const label = t(`seasons.${s.id}`);
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => setSeason(s.id)}
            data-cursor="hover"
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`keycap-btn keycap-icon-btn ${
              active
                ? "active"
                : "text-ice-300 hover:text-ice-50"
            }`}
            style={
              active
                ? {
                    background: s.accent,
                    color: "#060e1c",
                    boxShadow: `0 1px 0 var(--ink-0), 0 0 14px ${s.accent}88, inset 0 1px 0 rgba(255,255,255,0.45)`,
                  }
                : undefined
            }
          >
            <span className="flex items-center justify-center w-full h-full pointer-events-none">
              {ICONS[s.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
