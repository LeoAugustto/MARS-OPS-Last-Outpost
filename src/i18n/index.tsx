import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "./dictionary";

export type { Lang, Dict };

const I18nContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: "pt",
  t: dictionaries.pt,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);
  const setLang = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLangState(l);
  };
  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
