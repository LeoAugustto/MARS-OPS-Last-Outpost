// Motor do jogo: um sol de cada vez.
//
// Fluxo de um sol:
//   1. startSol: painéis geram energia, eventos do dia entram na fila (agendados primeiro, depois sorteio)
//   2. a criança responde as cartas da fila com choose()
//   3. a criança distribui a energia e chama endSol(alocacao)
//   4. o motor calcula ar/comida/saúde/ciência, confere vitória/resgate e começa o próximo sol
//
// Todas as funções públicas são puras: recebem um estado e devolvem um NOVO estado.

import * as B from './balance';
import { pickWeighted, randInt, rngFor } from './rng';
import type { Allocation, Choice, Effect, GameEvent, GameState, Level, Resources } from './types';
import { EVENTS } from '../../content/events';

const MAX_EVENTOS_POR_SOL = 2;

function clone<T>(x: T): T {
  return structuredClone(x);
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function findEvent(id: string, catalog: GameEvent[] = EVENTS): GameEvent {
  const ev = catalog.find((e) => e.id === id);
  if (!ev) throw new Error(`Evento desconhecido: ${id}`);
  return ev;
}

// ---------------------------------------------------------------- efeitos

export function applyEffect(s: GameState, e: Effect): Effect {
  const before = snapshot(s);
  s.resources.ar = clamp(s.resources.ar + (e.ar ?? 0), 0, 100);
  s.resources.comida = clamp(s.resources.comida + (e.comida ?? 0), 0, 100);
  s.resources.saude = clamp(s.resources.saude + (e.saude ?? 0), 0, 100);
  s.energiaHoje = Math.max(0, s.energiaHoje + (e.energia ?? 0));
  s.bateria = clamp(s.bateria + (e.bateria ?? 0), 0, B.BATERIA_MAX);
  s.ciencia = Math.max(0, s.ciencia + (e.ciencia ?? 0));
  s.escudo = clamp(s.escudo + (e.escudo ?? 0), 0, B.ESCUDO_MAX);
  s.solar = clamp(Math.round((s.solar + (e.solar ?? 0)) * 100) / 100, B.SOLAR_MIN, 1);
  return diff(before, snapshot(s));
}

function snapshot(s: GameState) {
  return { ...s.resources, energia: s.energiaHoje, bateria: s.bateria, ciencia: s.ciencia, escudo: s.escudo, solar: s.solar };
}

function diff(a: ReturnType<typeof snapshot>, b: ReturnType<typeof snapshot>): Effect {
  const out: Effect = {};
  for (const k of Object.keys(a) as (keyof typeof a)[]) {
    const d = Math.round((b[k] - a[k]) * 100) / 100;
    if (d !== 0) out[k] = d;
  }
  return out;
}

// ---------------------------------------------------------------- missão

export function newMission(opts: { seed?: number; level?: Level } = {}, catalog: GameEvent[] = EVENTS): GameState {
  const level = opts.level ?? 'cadete';
  const seed = opts.seed ?? Math.floor(Math.random() * 2 ** 31); // única exceção: escolher a semente
  const cfg = B.LEVELS[level];
  const s: GameState = {
    version: 1,
    seed,
    rng: seed,
    level,
    sol: 1,
    totalSols: cfg.totalSols,
    resources: { ar: B.START.ar, comida: B.START.comida, saude: B.START.saude },
    energiaHoje: 0,
    bateria: B.START.bateria,
    escudo: 0,
    solar: 1,
    ciencia: 0,
    metaCiencia: cfg.metaCiencia,
    flags: {},
    vars: {},
    scheduled: [],
    lastSeen: {},
    pending: [],
    log: [],
    status: 'jogando',
    checkpoints: [],
  };
  startSol(s, catalog);
  return s;
}

/** Começo do sol (muta s). */
function startSol(s: GameState, catalog: GameEvent[]): void {
  s.energiaHoje = Math.round(B.PAINEIS * s.solar) + s.bateria;
  s.bateria = 0;

  const rng = rngFor(s);

  // 1) continuações de histórias agendadas para hoje
  const hoje = s.scheduled.filter((x) => x.sol <= s.sol);
  s.scheduled = s.scheduled.filter((x) => x.sol > s.sol);
  for (const item of hoje) {
    if (s.pending.length < MAX_EVENTOS_POR_SOL) queueEvent(s, findEvent(item.eventId, catalog), rng);
    else s.scheduled.push({ eventId: item.eventId, sol: s.sol + 1 }); // não cabe hoje: amanhã
  }

  // 2) se nada agendado, sorteia um evento novo (sol 1 é sempre a chegada)
  if (s.pending.length === 0) {
    const ev = s.sol === 1 ? catalog.find((e) => e.id === 'chegada') : pickRandomEvent(s, catalog, rng);
    if (ev) queueEvent(s, ev, rng);
  }

  // foto da manhã (com a carta do dia já na fila) para o "voltar ao sol X"
  const { checkpoints: _ignored, ...semCheckpoints } = s;
  s.checkpoints.push(clone(semCheckpoints));
}

function queueEvent(s: GameState, ev: GameEvent, rng: () => number): void {
  ev.prepare?.(s, rng);
  if (ev.onStart) {
    const delta = applyEffect(s, ev.onStart(s));
    s.log.push({ sol: s.sol, kind: 'evento', eventId: ev.id, choiceId: 'inicio', delta });
  }
  s.lastSeen[ev.id] = s.sol;
  s.pending.push(ev.id);
}

/** O "diretor": escolhe um evento que FAZ SENTIDO agora. */
export function pickRandomEvent(s: GameState, catalog: GameEvent[], rng: () => number): GameEvent | undefined {
  const cadeiasAtivas = new Set(
    s.scheduled.map((x) => catalog.find((e) => e.id === x.eventId)?.chain).filter(Boolean) as string[],
  );
  const candidatos = catalog.filter((ev) => {
    if (ev.onlyScheduled || ev.id === 'chegada') return false;
    if (cadeiasAtivas.has(ev.chain)) return false; // não começa uma história que já está rolando
    const visto = s.lastSeen[ev.id];
    if (visto !== undefined && s.sol - visto < (ev.cooldown ?? 3)) return false;
    return ev.canHappen ? ev.canHappen(s) : true;
  });
  return pickWeighted(
    rng,
    candidatos.map((ev) => ({ item: ev, weight: typeof ev.weight === 'function' ? ev.weight(s) : (ev.weight ?? 1) })),
  );
}

// ---------------------------------------------------------------- jogada

export function currentEvent(s: GameState, catalog: GameEvent[] = EVENTS): GameEvent | undefined {
  return s.pending[0] ? findEvent(s.pending[0], catalog) : undefined;
}

export function isChoiceAvailable(s: GameState, c: Choice): boolean {
  if (c.available && !c.available(s)) return false;
  if (c.effects.energia && c.effects.energia < 0 && s.energiaHoje < -c.effects.energia) return false;
  return true;
}

export function availableChoices(s: GameState, catalog: GameEvent[] = EVENTS): Choice[] {
  const ev = currentEvent(s, catalog);
  return (ev?.choices ?? []).filter((c) => isChoiceAvailable(s, c));
}

/** Responde a carta atual. Carta de notícia: chame sem choiceId. */
export function choose(state: GameState, choiceId?: string, catalog: GameEvent[] = EVENTS): GameState {
  if (state.status !== 'jogando') return state;
  const s = clone(state);
  const ev = currentEvent(s, catalog);
  if (!ev) return state;

  if (ev.choices && ev.choices.length > 0) {
    const c = ev.choices.find((x) => x.id === choiceId);
    if (!c) throw new Error(`Escolha inválida "${choiceId}" para ${ev.id}`);
    if (!isChoiceAvailable(s, c)) throw new Error(`Escolha indisponível agora: ${c.id}`);
    const delta = applyEffect(s, c.effects);
    for (const f of c.setFlags ?? []) s.flags[f] = s.sol;
    for (const f of c.clearFlags ?? []) delete s.flags[f];
    const rng = rngFor(s);
    for (const sc of c.schedule ?? []) {
      const n = Array.isArray(sc.inSols) ? randInt(rng, sc.inSols[0], sc.inSols[1]) : sc.inSols;
      s.scheduled.push({ eventId: sc.eventId, sol: s.sol + Math.max(1, n) });
    }
    s.log.push({ sol: s.sol, kind: 'evento', eventId: ev.id, choiceId: c.id, delta, lessonKey: `ev.${ev.id}.${c.id}.lesson` });
  }
  s.pending.shift();
  checkRescue(s);
  return s;
}

export function emptyAllocation(): Allocation {
  return { ar: 0, estufa: 0, ciencia: 0, escudo: 0 };
}

/** Fim do sol: aplica a distribuição de energia e avança. */
export function endSol(state: GameState, alloc: Allocation, catalog: GameEvent[] = EVENTS): GameState {
  if (state.status !== 'jogando') return state;
  if (state.pending.length > 0) throw new Error('Responda as cartas do dia antes de dormir.');
  const total = alloc.ar + alloc.estufa + alloc.ciencia + alloc.escudo;
  if (Object.values(alloc).some((v) => v < 0 || !Number.isInteger(v))) throw new Error('Alocação inválida');
  if (total > state.energiaHoje) throw new Error('Energia insuficiente');

  const s = clone(state);
  const cfg = B.LEVELS[s.level];
  const novosEscudos = Math.min(Math.floor(alloc.escudo / B.ENERGIA_POR_ESCUDO), B.ESCUDO_MAX - s.escudo);
  const escudoDepois = s.escudo + novosEscudos;
  const dose = Math.round(B.DOSE_BASE * cfg.doseMult * (1 - escudoDepois * B.ESCUDO_REDUCAO));

  const efeito: Effect = {
    ar: alloc.ar * B.AR_POR_ENERGIA - B.CONSUMO_AR,
    comida: alloc.estufa * B.COMIDA_POR_ENERGIA - B.CONSUMO_COMIDA,
    ciencia: alloc.ciencia * B.CIENCIA_POR_ENERGIA,
    escudo: novosEscudos,
    saude: -dose,
  };
  if (s.resources.ar < B.LIMITE_CRITICO) efeito.saude! -= B.DANO_CRITICO;
  if (s.resources.comida < B.LIMITE_CRITICO) efeito.saude! -= B.DANO_CRITICO;

  const sobra = s.energiaHoje - total;
  const delta = applyEffect(s, efeito);
  s.bateria = Math.min(B.BATERIA_MAX, s.bateria + sobra);
  s.energiaHoje = 0;
  s.log.push({ sol: s.sol, kind: 'fim-do-sol', delta: { ...delta, bateria: s.bateria } });

  checkRescue(s);
  if (s.status !== 'jogando') return s;

  if (s.sol >= s.totalSols) {
    s.status = s.ciencia >= s.metaCiencia ? 'vitoria' : 'vitoria-parcial';
    return s;
  }
  s.sol += 1;
  startSol(s, catalog);
  return s;
}

function checkRescue(s: GameState): void {
  const r: Resources = s.resources;
  if (r.ar <= 0 || r.comida <= 0 || r.saude <= 0) s.status = 'resgate';
}

/** "Voltar ao começo do sol X" — mesma semente, mesmos eventos, outra decisão. */
export function rewindTo(state: GameState, sol: number): GameState {
  const cp = state.checkpoints[sol - 1];
  if (!cp) return state;
  const s = clone(cp) as GameState;
  s.checkpoints = clone(state.checkpoints.slice(0, sol));
  s.vars = { ...s.vars, tentativas: Number(state.vars.tentativas ?? 0) + 1 };
  return s;
}
