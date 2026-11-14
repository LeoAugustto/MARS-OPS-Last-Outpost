// Tradução dos textos DO JOGO (cartas, telas do jogo, relatório).
// A UI do site (home, /fontes, /sobre) usa src/i18n/ feito pelo Lovable — mesmo tipo Lang.

import type { Lang } from "../game/engine/types";
import { pt } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";
import { SOL_TEXTS } from "./locales/sol";
import { UI_TEXTS } from "./locales/ui";

/** Textos do jogo por idioma: base (eventos da base, fim, glossário) + eventos do Sol + telas. */
export const LOCALES: Record<Lang, Record<string, string>> = {
  pt: { ...pt, ...SOL_TEXTS.pt, ...UI_TEXTS.pt },
  en: { ...en, ...SOL_TEXTS.en, ...UI_TEXTS.en },
  es: { ...es, ...SOL_TEXTS.es, ...UI_TEXTS.es },
  fr: { ...fr, ...SOL_TEXTS.fr, ...UI_TEXTS.fr },
  it: { ...it, ...SOL_TEXTS.it, ...UI_TEXTS.it },
};

/** t('ev.chegada.title', 'en') · troca {variaveis} pelos valores. Cai para PT se faltar. */
export function t(key: string, lang: Lang, vars: Record<string, string | number> = {}): string {
  const raw = LOCALES[lang]?.[key] ?? LOCALES.pt[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_, v: string) =>
    vars[v] !== undefined ? String(vars[v]) : `{${v}}`,
  );
}

export const eventKey = {
  title: (eventId: string) => `ev.${eventId}.title`,
  body: (eventId: string) => `ev.${eventId}.body`,
  label: (eventId: string, choiceId: string) => `ev.${eventId}.${choiceId}.label`,
  outcome: (eventId: string, choiceId: string) => `ev.${eventId}.${choiceId}.outcome`,
  lesson: (eventId: string, choiceId: string) => `ev.${eventId}.${choiceId}.lesson`,
};
