// Motor do jogo v2: um sol de cada vez, com 2 a 4 alertas espalhados pela base.
//
// Fluxo de um sol:
//   1. startSol: painéis geram energia; o DIRETOR escolhe os alertas do dia (continuações,
//      evento real do Sol do DONKI, eventos da base) e coloca cada um num lugar do mapa.
//   2. a criança anda até os alertas, na ordem que quiser: openAlert() + choose().
//   3. (opcional) muda a divisão de energia: setAllocation() — ela continua nos próximos sóis.
//   4. dormir: endSol() aplica a divisão com a energia que sobrou, calcula a noite e começa o próximo sol.
//
// Todas as funções públicas são puras: recebem um estado e devolvem um NOVO estado.

import * as B from "./balance";
import { pickWeighted, randInt, rngFor } from "./rng";
import type {
  Alert,
  Allocation,
  Choice,
  Effect,
  GameEvent,
  GameState,
  Level,
  Snapshot,
  ModuleKey,
  NightReport,
} from "./types";
import { EVENTS } from "../../content/events";
import { RESERVE_EVENTS, type SolarEvent } from "../../data/donki";

function clone<T>(x: T): T {
  return structuredClone(x);
}

/** Cópia do estado SEM copiar as partes grandes que nunca mudam (fotos e lista da NASA). */
function cloneState(s: GameState): GameState {
  const { checkpoints, donkiPool, ...rest } = s;
  return { ...structuredClone(rest), checkpoints, donkiPool };
}

function snapshotOf(s: GameState): Snapshot {
  const { checkpoints: _c, donkiPool: _d, ...rest } = s;
  return structuredClone(rest);
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

function snapshot(s: GameState) {
  return {
    ...s.resources,
    energia: s.energiaHoje,
    bateria: s.bateria,
    ciencia: s.ciencia,
    escudo: s.escudo,
    solar: s.solar,
  };
}

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
  const after = snapshot(s);
  const out: Effect = {};
  for (const k of Object.keys(before) as (keyof typeof before)[]) {
    const d = Math.round((after[k] - before[k]) * 100) / 100;
    if (d !== 0) out[k] = d;
  }
  return out;
}

export function sumEffects(a: Effect, b: Effect): Effect {
  const out: Effect = { ...a };
  for (const [k, v] of Object.entries(b) as [keyof Effect, number][]) out[k] = (out[k] ?? 0) + v;
  return out;
}

// ---------------------------------------------------------------- missão

export function defaultAllocation(): Allocation {
  return { ar: 4, estufa: 4, ciencia: 2, escudo: 0 };
}

export function newMission(
  opts: {
    seed?: number;
    level?: Level;
    donkiPool?: SolarEvent[];
    /** eventos vistos nas últimas missões (o sorteio prefere outros para variar) */
    recentes?: string[];
  } = {},
  catalog: GameEvent[] = EVENTS,
): GameState {
  const level = opts.level ?? "cadete";
  const seed = opts.seed ?? Math.floor(Math.random() * 2 ** 31); // única exceção: escolher a semente
  const cfg = B.LEVELS[level];
  const s: GameState = {
    version: 2,
    seed,
    rng: seed,
    level,
    sol: 1,
    totalSols: cfg.totalSols,
    resources: { ar: cfg.inicioAr, comida: cfg.inicioComida, saude: B.START.saude },
    energiaHoje: 0,
    producaoHoje: 0,
    bateriaManha: 0,
    bateria: B.START.bateria,
    escudo: 0,
    solar: 1,
    ciencia: 0,
    metaCiencia: cfg.metaCiencia,
    allocation: defaultAllocation(),
    flags: {},
    vars: {},
    scheduled: [],
    lastSeen: {},
    ...(opts.recentes?.length ? { recentes: [...new Set(opts.recentes)] } : {}),
    alerts: [],
    donkiPool:
      opts.donkiPool && opts.donkiPool.length ? clone(opts.donkiPool) : clone(RESERVE_EVENTS),
    donkiUsed: [],
    lastDonkiSol: 0,
    realEvents: [],
    history: [{ sol: 0, ar: cfg.inicioAr, comida: cfg.inicioComida, saude: B.START.saude, ciencia: 0 }],
    log: [],
    status: "jogando",
    checkpoints: [],
  };
  startSol(s, catalog);
  return s;
}

/** Quantos alertas hoje (2 a 4). */
export function alertCount(s: GameState): number {
  if (s.sol === 1) return 2;
  const r = s.resources;
  if (r.ar < 30 || r.comida < 30 || r.saude < 30) return 2;
  if (r.ar > 70 && r.comida > 70 && r.saude > 70) return 4;
  return 3;
}

function startSol(s: GameState, catalog: GameEvent[]): void {
  s.producaoHoje = Math.round(B.PAINEIS * s.solar);
  s.bateriaManha = s.bateria;
  s.energiaHoje = s.producaoHoje + s.bateria;
  s.bateria = 0;
  s.alerts = [];
  const rng = rngFor(s);
  const alvo = alertCount(s);

  // 1) continuações de histórias agendadas para hoje (até 4)
  const hoje = s.scheduled.filter((x) => x.sol <= s.sol);
  s.scheduled = s.scheduled.filter((x) => x.sol > s.sol);
  for (const item of hoje) {
    const ev = findEvent(item.eventId, catalog);
    if (s.alerts.length < B.MAX_ALERTAS && !placeTaken(s, ev)) addAlert(s, ev, item.vars ?? {});
    else s.scheduled.push({ ...item, sol: s.sol + 1 });
  }

  // 2) sol 1: chegada (tutorial)
  if (s.sol === 1) {
    const chegada = catalog.find((e) => e.id === "chegada");
    if (chegada) addAlert(s, chegada, {});
  }

  // 3) evento real do Sol (DONKI): pelo menos 1 a cada 2 sóis
  const precisaSol = s.sol === 1 || s.sol - s.lastDonkiSol >= 2 || rng() < 0.35;
  if (precisaSol && s.alerts.length < Math.max(alvo, 2)) pickDonkiEvent(s, catalog, rng);

  // 4) eventos da base até completar
  let tentativas = 0;
  while (s.alerts.length < alvo && tentativas++ < 10) {
    const ev = pickBaseEvent(s, catalog, rng);
    if (!ev) break;
    addAlert(s, ev, {});
  }

  // foto da manhã (alertas prontos) para "voltar ao sol X"
  s.checkpoints = [...s.checkpoints, snapshotOf(s)];
}

function placeTaken(s: GameState, ev: GameEvent): boolean {
  return s.alerts.some((a) => a.place === ev.place);
}

function cadeiasAtivas(s: GameState, catalog: GameEvent[]): Set<string> {
  const ids = [...s.scheduled.map((x) => x.eventId), ...s.alerts.map((a) => a.eventId)];
  return new Set(
    ids.map((id) => catalog.find((e) => e.id === id)?.chain).filter(Boolean) as string[],
  );
}

function podeSortear(s: GameState, ev: GameEvent, ativas: Set<string>, relaxar = false): boolean {
  if (ev.onlyScheduled || ev.id === "chegada") return false;
  if (ativas.has(ev.chain)) return false;
  if (placeTaken(s, ev)) return false;
  if (ev.urgent && s.alerts.some((a) => a.urgent)) return false;
  const visto = s.lastSeen[ev.id];
  if (visto === s.sol) return false;
  if (!relaxar && visto !== undefined && s.sol - visto < (ev.cooldown ?? 3)) return false;
  return ev.canHappen ? ev.canHappen(s) : true;
}

const peso = (s: GameState, ev: GameEvent) =>
  typeof ev.weight === "function" ? ev.weight(s) : (ev.weight ?? 1);

/**
 * Eventos da base que apareceram nesta missão, mais os de antes, sem repetir (para o próximo
 * newMission({ recentes })). Só ids de eventos: nada sobre a criança.
 */
export function recentesDepois(
  s: GameState,
  antes: string[] = [],
  catalog: GameEvent[] = EVENTS,
): string[] {
  const daMissao = Object.keys(s.lastSeen).filter((id) => {
    const ev = catalog.find((e) => e.id === id);
    return ev && !ev.donki && !ev.onlyScheduled && ev.id !== "chegada";
  });
  return [...new Set([...daMissao, ...antes])].slice(0, B.RECENTES_MAX);
}

/**
 * Peso para variar os eventos da base (não muda os eventos do Sol):
 * - já apareceu nesta missão → bem menos provável (a missão mostra coisas novas primeiro);
 * - apareceu nas últimas missões deste aparelho → menos provável (cada missão parece diferente);
 * - o mesmo lugar teve alerta ontem → um pouco menos provável (os alertas passeiam pela base).
 */
function pesoVariado(s: GameState, ev: GameEvent, catalog: GameEvent[]): number {
  let p = peso(s, ev);
  if (s.lastSeen[ev.id] !== undefined) p *= B.PESO_JA_VISTO;
  else if (s.recentes?.includes(ev.id)) p *= B.PESO_RECENTE;
  const lugarOntem = Object.entries(s.lastSeen).some(
    ([id, sol]) => sol === s.sol - 1 && catalog.find((e) => e.id === id)?.place === ev.place,
  );
  if (lugarOntem) p *= B.PESO_LUGAR_ONTEM;
  return p;
}

function addAlert(
  s: GameState,
  ev: GameEvent,
  vars: Record<string, string | number>,
  real?: SolarEvent,
): void {
  const alert: Alert = {
    id: `${s.sol}-${s.alerts.length}`,
    eventId: ev.id,
    place: ev.place,
    urgent: !!ev.urgent,
    vars,
    opened: false,
    done: false,
  };
  if (real) alert.real = real;
  s.alerts.push(alert);
  s.lastSeen[ev.id] = s.sol;
}

export function varsFromReal(e: SolarEvent): Record<string, string | number> {
  return {
    data: e.date,
    tamanho: e.label,
    forca: e.forca,
    estrelas: "⭐".repeat(e.forca),
    link: e.link,
  };
}

/** Escolhe um evento do Sol que faz sentido agora e um evento REAL do DONKI do mesmo tipo. */
function pickDonkiEvent(s: GameState, catalog: GameEvent[], rng: () => number): void {
  const ativas = cadeiasAtivas(s, catalog);
  const candidatos = catalog.filter(
    (ev) =>
      ev.donki &&
      podeSortear(s, ev, ativas) &&
      (s.sol !== 1 || ev.donki === "FLR") && // sol 1: só um clarão, para o tutorial
      s.donkiPool.some((e) => e.kind === ev.donki),
  );
  const ev = pickWeighted(
    rng,
    candidatos.map((item) => ({ item, weight: peso(s, item) })),
  );
  if (!ev || !ev.donki) return;
  const doTipo = s.donkiPool.filter((e) => e.kind === ev.donki);
  const naoUsados = doTipo.filter((e) => !s.donkiUsed.includes(e.donkiId));
  const aoVivo = naoUsados.filter((e) => e.live);
  const lista = aoVivo.length ? aoVivo : naoUsados.length ? naoUsados : doTipo;
  const real = lista[Math.floor(rng() * lista.length)];
  if (!real) return;
  s.donkiUsed.push(real.donkiId);
  s.lastDonkiSol = s.sol;
  s.realEvents.push({ sol: s.sol, event: real });
  addAlert(s, ev, varsFromReal(real), real);
}

function pickBaseEvent(
  s: GameState,
  catalog: GameEvent[],
  rng: () => number,
): GameEvent | undefined {
  const ativas = cadeiasAtivas(s, catalog);
  // 1º tenta respeitando o intervalo entre repetições; se faltar evento, relaxa (nunca o mesmo no mesmo sol)
  for (const relaxar of [false, true]) {
    const candidatos = catalog.filter((ev) => !ev.donki && podeSortear(s, ev, ativas, relaxar));
    const ev = pickWeighted(
      rng,
      candidatos.map((item) => ({ item, weight: pesoVariado(s, item, catalog) })),
    );
    if (ev) return ev;
  }
  return undefined;
}

// ---------------------------------------------------------------- jogada

export function getAlert(s: GameState, alertId: string): Alert | undefined {
  return s.alerts.find((a) => a.id === alertId);
}

/** Abre a carta (aplica o efeito de abertura uma vez, ex.: a nuvem do Sol chegou). */
export function openAlert(
  state: GameState,
  alertId: string,
  catalog: GameEvent[] = EVENTS,
): GameState {
  const a0 = getAlert(state, alertId);
  if (!a0 || a0.opened || state.status !== "jogando") return state;
  const s = cloneState(state);
  const a = getAlert(s, alertId)!;
  a.opened = true;
  const ev = findEvent(a.eventId, catalog);
  if (ev.onOpen) {
    a.openDelta = applyEffect(s, ev.onOpen(s, a));
    s.log.push({
      sol: s.sol,
      kind: "evento",
      eventId: ev.id,
      choiceId: "inicio",
      delta: a.openDelta,
    });
    checkRescue(s);
  }
  return s;
}

/** Quanta energia falta para pagar esta escolha (0 = dá para pagar). */
export function energiaFaltando(s: GameState, c: Choice): number {
  const custo = -(c.effects.energia ?? 0);
  return custo > 0 ? Math.max(0, custo - s.energiaHoje) : 0;
}

/** Efeito final da escolha. Se faltar energia, a tripulação faz "no braço": −2 ❤️ por ⚡ que faltou. */
export function choiceEffect(s: GameState, a: Alert, c: Choice): Effect {
  let e = c.dynamic ? sumEffects(c.effects, c.dynamic(s, a)) : { ...c.effects };
  const falta = energiaFaltando(s, c);
  if (falta > 0) {
    e = { ...e, energia: -s.energiaHoje };
    e = sumEffects(e, { saude: -B.SAUDE_POR_ENERGIA_FALTANDO * falta });
  }
  return e;
}

/**
 * Pode escolher? Escolhas que custam mais energia do que há ficam bloqueadas,
 * a não ser que NENHUMA escolha da carta caiba na energia (aí todas liberam e o que falta custa saúde).
 */
export function isChoiceAvailable(s: GameState, c: Choice, irmas: Choice[] = [c]): boolean {
  if (c.available && !c.available(s)) return false;
  if (energiaFaltando(s, c) === 0) return true;
  return irmas
    .filter((x) => !x.available || x.available(s))
    .every((x) => energiaFaltando(s, x) > 0);
}

export function choicesFor(s: GameState, alertId: string, catalog: GameEvent[] = EVENTS): Choice[] {
  const a = getAlert(s, alertId);
  if (!a) return [];
  return (findEvent(a.eventId, catalog).choices ?? []).filter(
    (c) => !c.available || c.available(s),
  );
}

/** Responde a carta. Notícia: chame sem choiceId. */
export function choose(
  state: GameState,
  alertId: string,
  choiceId?: string,
  catalog: GameEvent[] = EVENTS,
): GameState {
  if (state.status !== "jogando") return state;
  let s = state;
  if (!getAlert(s, alertId)?.opened) s = openAlert(s, alertId, catalog);
  if (s.status !== "jogando") return s;
  s = s === state ? cloneState(state) : s;
  const a = getAlert(s, alertId);
  if (!a || a.done) return state;
  const ev = findEvent(a.eventId, catalog);

  if (ev.choices && ev.choices.length > 0) {
    const c = ev.choices.find((x) => x.id === choiceId);
    if (!c) throw new Error(`Escolha inválida "${choiceId}" para ${ev.id}`);
    if (!isChoiceAvailable(s, c, ev.choices))
      throw new Error(`Escolha indisponível agora: ${c.id}`);
    const delta = applyEffect(s, choiceEffect(s, a, c));
    for (const f of c.setFlags ?? []) s.flags[f] = s.sol;
    for (const f of c.clearFlags ?? []) delete s.flags[f];
    const rng = rngFor(s);
    for (const sc of c.schedule ?? []) {
      const n = Array.isArray(sc.inSols) ? randInt(rng, sc.inSols[0], sc.inSols[1]) : sc.inSols;
      // continuação nunca cai depois do fim da missão (senão a escolha sairia de graça)
      const quando = Math.min(s.sol + Math.max(1, n), Math.max(s.sol + 1, s.totalSols));
      s.scheduled.push({ eventId: sc.eventId, sol: quando, vars: { ...a.vars } });
    }
    a.choiceId = c.id;
    a.delta = delta;
    s.log.push({
      sol: s.sol,
      kind: "evento",
      eventId: ev.id,
      choiceId: c.id,
      delta,
      lessonKey: `ev.${ev.id}.${c.id}.lesson`,
    });
  }
  a.done = true;
  checkRescue(s);
  return s;
}

// ---------------------------------------------------------------- energia e noite

export function allocationTotal(a: Allocation): number {
  return a.ar + a.estufa + a.ciencia + a.escudo;
}

/** Muda a divisão de energia (continua valendo nos próximos sóis). */
export function setAllocation(state: GameState, alloc: Allocation): GameState {
  const s = cloneState(state);
  const ok = (n: number) => clamp(Math.round(Number.isFinite(n) ? n : 0), 0, B.ALOCACAO_MAX);
  s.allocation = {
    ar: ok(alloc.ar),
    estufa: ok(alloc.estufa),
    ciencia: ok(alloc.ciencia),
    escudo: ok(alloc.escudo),
  };
  return s;
}

/** Ordem em que módulos ficam sem energia quando falta: o ar é o último. */
export const ORDEM_CORTE: ModuleKey[] = ["ciencia", "escudo", "estufa", "ar"];

/** Quanto cada módulo recebe de verdade com a energia que sobrou hoje. */
export function plannedAllocation(s: GameState): { real: Allocation; faltou: ModuleKey[] } {
  const real = { ...s.allocation };
  let excesso = allocationTotal(real) - s.energiaHoje;
  const faltou: ModuleKey[] = [];
  for (const k of ORDEM_CORTE) {
    if (excesso <= 0) break;
    const corte = Math.min(real[k], excesso);
    if (corte > 0) {
      real[k] -= corte;
      excesso -= corte;
      faltou.push(k);
    }
  }
  return { real, faltou };
}

/** As perdas da escolha mais cara de um alerta (o que acontece se ninguém decidir). */
function piorEscolha(s: GameState, a: Alert, catalog: GameEvent[]): Effect {
  const cs = (findEvent(a.eventId, catalog).choices ?? []).filter((c) => !c.available || c.available(s));
  let pior: Effect = {};
  let menor = Infinity;
  for (const c of cs) {
    const e = c.dynamic ? sumEffects(c.effects, c.dynamic(s, a)) : c.effects;
    const custo =
      Math.min(0, e.ar ?? 0) +
      Math.min(0, e.comida ?? 0) +
      Math.min(0, e.saude ?? 0) * 2 +
      Math.min(0, e.energia ?? 0) * 3 +
      Math.min(0, e.ciencia ?? 0);
    if (custo < menor) {
      menor = custo;
      pior = e;
    }
  }
  return pior;
}

export function canSleep(s: GameState): boolean {
  return s.status === "jogando" && s.alerts.every((a) => a.done);
}

/** Saúde que a tripulação perde se for dormir agora, com os alertas que ainda faltam. */
export function sleepPenalty(s: GameState): number {
  return s.alerts.filter((a) => !a.done).length * B.SAUDE_POR_ALERTA_PERDIDO;
}

/** A tripulação ainda está acordada quando a noite chega? Já pagou o cansaço deste sol? */
export function jaAnoiteceu(s: GameState): boolean {
  return s.flags["anoiteceu"] === s.sol;
}

/**
 * A noite chegou e a tripulação ainda está acordada: cansaço, perde SAUDE_AO_ANOITECER uma vez
 * por sol. Quem foi dormir antes (todos os alertas resolvidos) não paga.
 */
export function anoitecer(state: GameState): GameState {
  if (state.status !== "jogando" || jaAnoiteceu(state)) return state;
  const s = cloneState(state);
  s.flags["anoiteceu"] = s.sol;
  const delta = applyEffect(s, { saude: -B.SAUDE_AO_ANOITECER });
  s.log.push({ sol: s.sol, kind: "cansaco", delta });
  checkRescue(s);
  return s;
}

/**
 * Dormir: aplica a divisão de energia, calcula a noite e começa o próximo sol.
 * `forcado`: a noite chegou e a tripulação vai dormir mesmo com alertas sem resposta.
 * Cada alerta que ficou para trás custa saúde (SAUDE_POR_ALERTA_PERDIDO) e some.
 */
export function endSol(
  state: GameState,
  catalog: GameEvent[] = EVENTS,
  opts: { forcado?: boolean } = {},
): GameState {
  if (state.status !== "jogando") return state;
  if (!opts.forcado && !canSleep(state))
    throw new Error("Resolva todos os alertas antes de dormir.");
  const s = cloneState(state);
  const pendentes = s.alerts.filter((a) => !a.done);
  const perdidos = pendentes.length;
  const danoPerdidos = perdidos * B.SAUDE_POR_ALERTA_PERDIDO;
  // ignorar não é de graça: o problema piora sozinho e cobra as perdas da pior escolha
  const piora: Effect = {};
  for (const a of pendentes) {
    const e = piorEscolha(s, a, catalog);
    for (const k of ["ar", "comida", "saude", "energia", "ciencia"] as const) {
      const v = e[k] ?? 0;
      if (v < 0) piora[k] = (piora[k] ?? 0) + v;
    }
  }
  if (piora.energia) s.energiaHoje = Math.max(0, s.energiaHoje + piora.energia);
  for (const a of s.alerts) a.done = true;
  const cfg = B.LEVELS[s.level];
  const { real, faltou } = plannedAllocation(s);

  const escudoNovo = Math.min(
    Math.floor(real.escudo / B.ENERGIA_POR_ESCUDO),
    B.ESCUDO_MAX - s.escudo,
  );
  const usado = real.ar + real.estufa + real.ciencia + escudoNovo * B.ENERGIA_POR_ESCUDO;
  const sobra = Math.max(0, s.energiaHoje - usado);
  const escudoDepois = s.escudo + escudoNovo;
  const escudoPct = Math.round(escudoDepois * B.ESCUDO_REDUCAO * 100);
  const dose = Math.max(
    1,
    Math.round(B.DOSE_BASE * cfg.doseMult * (1 - escudoDepois * B.ESCUDO_REDUCAO)),
  );
  const critico = s.resources.ar < B.LIMITE_CRITICO || s.resources.comida < B.LIMITE_CRITICO;
  const arFeito = real.ar * B.AR_POR_ENERGIA;
  const comidaFeita = real.estufa * B.COMIDA_POR_ENERGIA;
  // rádio mudo hoje (clarão do Sol / esperando a Terra): o laboratório só envia metade dos dados
  const radioMudo = s.flags["radio_mudo"] === s.sol;
  const ciencia = Math.floor(real.ciencia * B.CIENCIA_POR_ENERGIA * (radioMudo ? 0.5 : 1));

  let saude = -dose - danoPerdidos;
  if (s.resources.ar < B.LIMITE_CRITICO) saude -= B.DANO_CRITICO;
  if (s.resources.comida < B.LIMITE_CRITICO) saude -= B.DANO_CRITICO;

  const delta = applyEffect(s, {
    ar: arFeito - cfg.consumoAr + (piora.ar ?? 0),
    comida: comidaFeita - cfg.consumoComida + (piora.comida ?? 0),
    ciencia: ciencia + (piora.ciencia ?? 0),
    escudo: escudoNovo,
    saude: saude + (piora.saude ?? 0),
  });
  s.bateria = Math.min(B.BATERIA_MAX, s.bateria + sobra);
  s.energiaHoje = 0;
  const night: NightReport = {
    sol: s.sol,
    arFeito,
    arUsado: cfg.consumoAr,
    comidaFeita,
    comidaUsada: cfg.consumoComida,
    dose,
    escudoPct,
    ciencia,
    escudoNovo,
    bateria: s.bateria,
    faltou,
    critico,
    ...(perdidos ? { perdidos, danoPerdidos, piora } : {}),
    delta,
  };
  s.night = night;
  s.log.push({ sol: s.sol, kind: "fim-do-sol", delta: { ...delta, bateria: s.bateria } });
  s.history.push({ sol: s.sol, ...s.resources, ciencia: s.ciencia });

  checkRescue(s);
  if (s.status !== "jogando") return s;
  if (s.sol >= s.totalSols) {
    // sobreviveu até o fim = venceu; a ciência vira estrelas no relatório
    s.status = "vitoria";
    return s;
  }
  s.sol += 1;
  startSol(s, catalog);
  return s;
}

function checkRescue(s: GameState): void {
  if (s.status !== "jogando") return;
  const r = s.resources;
  if (r.ar <= 0 || r.comida <= 0 || r.saude <= 0) {
    s.status = "resgate";
    if (s.history[s.history.length - 1]?.sol !== s.sol)
      s.history.push({ sol: s.sol, ...s.resources, ciencia: s.ciencia });
  }
}

/** "Voltar ao começo do sol X" — mesma semente, mesmos alertas, outra decisão. */
export function rewindTo(state: GameState, sol: number): GameState {
  const cp = state.checkpoints[sol - 1];
  if (!cp) return state;
  const s: GameState = {
    ...clone(cp),
    checkpoints: state.checkpoints.slice(0, sol),
    donkiPool: state.donkiPool,
  };
  s.vars = { ...s.vars, tentativas: Number(state.vars["tentativas"] ?? 0) + 1 };
  return s;
}
