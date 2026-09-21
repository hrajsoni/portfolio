"use client";

import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguagePicker({
  className = "",
}: {
  className?: string;
}) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`keycap-cluster ${className}`}
      role="group"
      aria-label={t("picker.language")}
    >
      {LANGUAGES.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            data-cursor="hover"
            aria-pressed={active}
            className={`keycap-btn !py-0.5 !px-2.5 h-7 rounded-[6px] text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-150 ${
              active
                ? "active !translate-y-[2px] !border-b-[1px] !bg-ice-100 !text-background !border-ice-50 shadow-[0_1px_0_var(--ink-0),0_0_12px_rgba(255,255,255,0.35)]"
                : "text-ice-300 hover:text-ice-50"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
