// Tradução dos textos DO JOGO (cartas, relatório, HUD do jogo).
// A UI do site (home, /fontes, /sobre) usa src/i18n/ feito pelo Lovable — mesmo tipo Lang.

import type { Lang } from "../game/engine/types";
import { pt, type LocaleKey } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";

export const LOCALES: Record<Lang, Record<string, string>> = { pt, en, es, fr, it };

/** t('ev.chegada.title', 'en') · troca {variaveis} pelos valores. Cai para PT se faltar. */
export function t(
  key: LocaleKey | string,
  lang: Lang,
  vars: Record<string, string | number> = {},
): string {
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
