import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { pt, type MessageKey, type Messages } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";

export type Lang = "pt" | "en" | "es" | "fr" | "it";
export type { MessageKey, Messages };

export const LANGS: Lang[] = ["pt", "en", "es", "fr", "it"];
export const LANG_NAMES: Record<Lang, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};
const HTML_LANG: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES", fr: "fr-FR", it: "it-IT" };
export const dictionaries: Record<Lang, Messages> = { pt, en, es, fr, it };

const STORAGE_KEY = "marsops:lang";
const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as string[]).includes(v);

/** Translate a key for a language, replacing {variable} placeholders. */
export function translate(lang: Lang, key: MessageKey, vars?: Record<string, string | number>): string {
  const text = dictionaries[lang][key] ?? pt[key];
  return vars ? text.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m)) : text;
}

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  for (const l of navigator.languages ?? [navigator.language]) {
    const short = l?.slice(0, 2).toLowerCase();
    if (isLang(short)) return short;
  }
  return "pt";
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const I18nContext = createContext<Ctx>({ lang: "pt", setLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => setLangState(detectLang()), []);
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage blocked */
    }
    setLangState(l);
  }, []);
  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export const useLang = () => useContext(I18nContext);

/** Typed translator: const t = useT(); t("solCount", { n: 3 }) */
export function useT() {
  const { lang } = useContext(I18nContext);
  return useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  );
}

/** Sets the browser tab title in the current language. */
export function useDocumentTitle(key?: MessageKey) {
  const t = useT();
  useEffect(() => {
    document.title = key ? `${t(key)} | ${t("app.title")}` : t("app.title");
  }, [t, key]);
}
