// Busca AO VIVO no DONKI (NASA) os eventos do Sol para a missão. Dono: Felipe.
// - Sem chave: o serviço web do DONKI libera CORS (Access-Control-Allow-Origin: *).
// - Junta: últimos 30 dias (live=true) + 1 semana histórica sorteada (live=false).
// - Se tudo falhar ou vier vazio, completa com RESERVE_EVENTS (src/data/donki.ts).

import {
  RESERVE_EVENTS,
  forcaDaNuvem,
  forcaDaTempestade,
  forcaDoClarao,
  type DonkiKind,
  type SolarEvent,
} from "./donki";

const BASE = "https://ccmc.gsfc.nasa.gov/DONKI/WS/get/";
const DAY = 86_400_000;
const fmt = (d: Date) => d.toISOString().slice(0, 10);

async function getJson(url: string, timeoutMs: number): Promise<unknown[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    const data: unknown = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

type Raw = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");

/** Busca os 4 tipos num intervalo e converte para SolarEvent. */
export async function fetchWindow(
  start: Date,
  end: Date,
  live: boolean,
  timeoutMs = 6000,
): Promise<SolarEvent[]> {
  const q = `startDate=${fmt(start)}&endDate=${fmt(end)}`;
  const [flr, cme, sep, gst] = await Promise.all([
    getJson(`${BASE}FLR?${q}`, timeoutMs),
    getJson(
      `${BASE}CMEAnalysis?${q}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL`,
      timeoutMs,
    ),
    getJson(`${BASE}SEP?${q}`, timeoutMs),
    getJson(`${BASE}GST?${q}`, timeoutMs),
  ]);
  const out: SolarEvent[] = [];
  for (const x of flr as Raw[]) {
    const cls = str(x["classType"]);
    if (!/^[MX]/.test(cls)) continue; // só clarões fortes
    out.push({
      kind: "FLR",
      date: str(x["peakTime"] || x["beginTime"]).slice(0, 10),
      label: cls,
      forca: forcaDoClarao(cls),
      donkiId: str(x["flrID"]),
      link: str(x["link"]),
      live,
    });
  }
  const vistos = new Set<string>();
  for (const x of cme as Raw[]) {
    const id = str(x["associatedCMEID"]);
    const speed = Number(x["speed"]) || 0;
    if (!id || vistos.has(id) || speed < 500) continue;
    vistos.add(id);
    out.push({
      kind: "CME",
      date: (str(x["time21_5"]) || id).slice(0, 10),
      label: `${Math.round(speed)} km/s`,
      forca: forcaDaNuvem(speed),
      donkiId: id,
      link: str(x["link"]),
      live,
    });
  }
  for (const x of sep as Raw[]) {
    out.push({
      kind: "SEP",
      date: str(x["eventTime"]).slice(0, 10),
      label: "SEP",
      forca: 2,
      donkiId: str(x["sepID"]),
      link: str(x["link"]),
      live,
    });
  }
  for (const x of gst as Raw[]) {
    const kps = Array.isArray(x["allKpIndex"])
      ? (x["allKpIndex"] as Raw[]).map((k) => Number(k["kpIndex"]) || 0)
      : [0];
    const kp = Math.max(...kps);
    out.push({
      kind: "GST",
      date: str(x["startTime"]).slice(0, 10),
      label: `Kp ${Math.round(kp * 10) / 10}`,
      forca: forcaDaTempestade(kp),
      donkiId: str(x["gstID"]),
      link: str(x["link"]),
      live,
    });
  }
  return out.filter((e) => e.donkiId && e.date);
}

/** Semana histórica sorteada em anos de Sol ativo (máximos solares 2012–2015 e 2022–hoje). */
function semanaHistorica(rand: () => number, hoje: Date): [Date, Date] {
  const janelas: [number, number][] = [
    [Date.UTC(2012, 0, 1), Date.UTC(2015, 11, 31)],
    [Date.UTC(2022, 0, 1), hoje.getTime() - 40 * DAY],
  ];
  const [a, b] = janelas[Math.floor(rand() * janelas.length)] ?? janelas[0]!;
  const inicio = new Date(a + Math.floor(rand() * Math.max(1, b - a)));
  return [inicio, new Date(inicio.getTime() + 7 * DAY)];
}

export interface DonkiPool {
  events: SolarEvent[];
  /** quantos vieram da NASA agora (0 = usando só a reserva) */
  fromNasa: number;
  liveCount: number;
  /** modo "semana": o Sol não teve eventos fortes nos últimos 7 dias */
  calmo?: boolean;
  /** modo "famosa": eventos de uma semana histórica (não são de agora) */
  famosa?: boolean;
}

/**
 * Monta a lista de eventos do Sol para UMA missão.
 * Garante pelo menos 1 de cada tipo (completa com a reserva se faltar).
 */
/** De onde vêm os eventos do Sol da missão (a criança escolhe na tela de missão). */
export type ModoSol = "surpresa" | "semana" | "famosa";

/** Semanas históricas famosas (datas conferidas no DONKI; ver docs/DATA_SOURCES.md). */
export const FAMOSAS = {
  maio2024: ["2024-05-08", "2024-05-16"], // a maior tempestade magnética em mais de 20 anos (Kp 9)
  set2017: ["2017-09-04", "2017-09-12"], // clarões X9.3 e X8.2; auroras em Marte
  out2024: ["2024-10-01", "2024-10-11"], // clarão X9.0, o maior do ciclo até então
} as const;
export type Famosa = keyof typeof FAMOSAS;

const dia = (iso: string) => new Date(`${iso}T00:00:00Z`);

/**
 * Monta a lista de eventos do Sol para UMA missão.
 * - surpresa: últimos 30 dias (ao vivo) + 1 semana histórica sorteada; completa os tipos com a reserva.
 * - semana: só os últimos 7 dias (ao vivo). Sol calmo demais? usa a reserva (selo "evento real").
 * - famosa: só a semana histórica escolhida (com a reserva daquela semana, se a NASA não responder).
 */
export async function loadDonkiPool(
  rand: () => number = Math.random,
  modo: ModoSol = "surpresa",
  famosa: Famosa = "maio2024",
): Promise<DonkiPool> {
  const hoje = new Date();
  if (modo === "semana") {
    const recentes = await fetchWindow(new Date(hoje.getTime() - 7 * DAY), hoje, true);
    if (recentes.length)
      return { events: recentes, fromNasa: recentes.length, liveCount: recentes.length };
    return { events: [...RESERVE_EVENTS], fromNasa: 0, liveCount: 0, calmo: true };
  }
  if (modo === "famosa") {
    const [ini, fim] = FAMOSAS[famosa];
    const daNasa = await fetchWindow(dia(ini), dia(fim), false);
    const daReserva = RESERVE_EVENTS.filter((e) => e.date >= ini && e.date <= fim);
    const base = daNasa.length ? daNasa : daReserva.length ? daReserva : [...RESERVE_EVENTS];
    // semana famosa: os eventos FORTES daquela semana vêm na frente (cada tipo, se tiver)
    const events = (["FLR", "CME", "SEP", "GST"] as DonkiKind[]).flatMap((k) => {
      const doTipo = base.filter((e) => e.kind === k);
      const fortes = doTipo.filter((e) => e.forca >= 2);
      return fortes.length ? fortes : doTipo;
    });
    return { events, fromNasa: daNasa.length, liveCount: 0, famosa: true };
  }
  const [hIni, hFim] = semanaHistorica(rand, hoje);
  const [recentes, historicos] = await Promise.all([
    fetchWindow(new Date(hoje.getTime() - 30 * DAY), hoje, true),
    fetchWindow(hIni, hFim, false),
  ]);
  const daNasa = [...recentes, ...historicos];
  const tipos: DonkiKind[] = ["FLR", "CME", "SEP", "GST"];
  const events = [...daNasa];
  for (const k of tipos) {
    if (!events.some((e) => e.kind === k))
      events.push(...RESERVE_EVENTS.filter((e) => e.kind === k));
  }
  return { events, fromNasa: daNasa.length, liveCount: recentes.length };
}
