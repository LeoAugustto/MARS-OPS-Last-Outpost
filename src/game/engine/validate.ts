// Validador do catálogo de eventos + traduções. Roda nos testes (npm test).
// Garante as regras do desafio: nenhuma escolha de graça, histórias coerentes, 5 idiomas completos.

import type { Effect, GameEvent } from "./types";
import { LANGS, PLACES } from "./types";
import { LOCALES } from "../../content/i18n";
import { eventKey } from "../../content/i18n";

const temCusto = (e: Effect) => Object.values(e).some((v) => typeof v === "number" && v < 0);

export function validateCatalog(events: GameEvent[]): string[] {
  const erros: string[] = [];
  const ids = new Set<string>();
  const agendados = new Set<string>();

  for (const ev of events) {
    if (ids.has(ev.id)) erros.push(`id repetido: ${ev.id}`);
    ids.add(ev.id);
    for (const c of ev.choices ?? []) for (const sc of c.schedule ?? []) agendados.add(sc.eventId);
  }

  for (const ev of events) {
    const chaves = [eventKey.title(ev.id), eventKey.body(ev.id)];
    for (const c of ev.choices ?? []) {
      // regra de ouro do desafio: nenhuma escolha sai de graça
      if (!temCusto(c.effects) && !c.deferredCost)
        erros.push(`${ev.id}.${c.id}: escolha sem custo`);
      if (c.deferredCost && !c.schedule?.length && !c.setFlags?.length)
        erros.push(`${ev.id}.${c.id}: deferredCost sem schedule nem flag`);
      for (const sc of c.schedule ?? [])
        if (!ids.has(sc.eventId))
          erros.push(`${ev.id}.${c.id}: agenda evento inexistente ${sc.eventId}`);
      chaves.push(
        eventKey.label(ev.id, c.id),
        eventKey.outcome(ev.id, c.id),
        eventKey.lesson(ev.id, c.id),
      );
    }
    if (ev.choices && ev.choices.length === 1)
      erros.push(`${ev.id}: só 1 escolha não é decisão (use 0 = notícia, ou 2+)`);
    if (!PLACES.includes(ev.place)) erros.push(`${ev.id}: lugar inválido ${String(ev.place)}`);
    if (ev.donki && ev.onlyScheduled)
      erros.push(`${ev.id}: evento do Sol não pode ser só agendado`);
    if (ev.onlyScheduled && !agendados.has(ev.id))
      erros.push(`${ev.id}: onlyScheduled mas ninguém agenda`);

    for (const lang of LANGS) {
      for (const k of chaves) {
        if (!LOCALES[lang][k]?.trim()) erros.push(`[${lang}] falta texto: ${k}`);
      }
    }
  }

  // todos os idiomas com as mesmas chaves e as mesmas {variaveis}
  const ref = LOCALES.pt;
  const vars = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(",");
  for (const lang of LANGS) {
    for (const k of Object.keys(ref)) {
      const v = LOCALES[lang][k];
      if (v === undefined) erros.push(`[${lang}] falta chave ${k}`);
      else if (vars(v) !== vars(ref[k] ?? "")) erros.push(`[${lang}] variáveis diferentes em ${k}`);
    }
    for (const k of Object.keys(LOCALES[lang]))
      if (!(k in ref)) erros.push(`[${lang}] chave extra ${k}`);
  }
  return erros;
}
