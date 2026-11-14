// Tipos centrais do motor (v2). TypeScript puro: sem React, sem DOM.
import type { DonkiKind, SolarEvent } from "../../data/donki";

/** 5 idiomas. TODO texto que a criança vê existe nos 5 (ver src/content/locales/). */
export type Lang = "pt" | "en" | "es" | "fr" | "it";
export const LANGS: Lang[] = ["pt", "en", "es", "fr", "it"];

/**
 * Textos NÃO ficam no motor. Chaves por convenção:
 *   ev.<eventoId>.title / ev.<eventoId>.body
 *   ev.<eventoId>.<escolhaId>.label / .outcome / .lesson
 */
export type TextKey = string;

export type Level = "cadete" | "piloto" | "comandante";

/** Os lugares fixos da base (ver docs/GAME_DESIGN.md). */
export type PlaceId =
  "habitat" | "paineis" | "antena" | "ar" | "estufa" | "lab" | "abrigo" | "rover";
export const PLACES: PlaceId[] = [
  "habitat",
  "paineis",
  "antena",
  "ar",
  "estufa",
  "lab",
  "abrigo",
  "rover",
];

/** As 3 barras que a criança vê (0..100). */
export interface Resources {
  ar: number;
  comida: number;
  saude: number;
}

/** Para onde vai a energia (divisão que continua de um sol para o outro). */
export type ModuleKey = "ar" | "estufa" | "ciencia" | "escudo";
export type Allocation = Record<ModuleKey, number>;

/** Mudanças que uma escolha/evento causa. Negativo = custo. */
export interface Effect {
  ar?: number;
  comida?: number;
  saude?: number;
  /** energia de HOJE */
  energia?: number;
  bateria?: number;
  ciencia?: number;
  /** níveis de escudo (0..ESCUDO_MAX) */
  escudo?: number;
  /** limpeza dos painéis (0..1). Poeira = negativo */
  solar?: number;
}

export interface ScheduleRef {
  eventId: string;
  /** daqui a quantos sóis. [min,max] sorteia */
  inSols: number | [number, number];
}

export interface Choice {
  id: string;
  effects: Effect;
  /** efeito extra calculado na hora (ex.: radiação depende do escudo). Sempre soma ao `effects`. */
  dynamic?: (s: GameState, alert: Alert) => Effect;
  /** só aparece se for verdade (coerência!) */
  available?: (s: GameState) => boolean;
  setFlags?: string[];
  clearFlags?: string[];
  schedule?: ScheduleRef[];
  /** custo vem DEPOIS (via schedule). O validador exige: efeito negativo OU deferredCost. */
  deferredCost?: boolean;
}

export interface GameEvent {
  id: string;
  /** história a que pertence (ex.: 'poeira', 'nuvem') */
  chain: string;
  /** onde o alerta aparece no mapa */
  place: PlaceId;
  icon: string;
  /** evento do Sol: usa um evento real do DONKI desse tipo */
  donki?: DonkiKind;
  /** abre sozinho na hora (ex.: chuva de partículas) */
  urgent?: boolean;
  source?: "donki" | "osdr" | "radlab" | "marstrek" | "csa" | "nasa-fato";
  onlyScheduled?: boolean;
  canHappen?: (s: GameState) => boolean;
  weight?: number | ((s: GameState) => number);
  cooldown?: number;
  /** roda quando o alerta abre (antes da escolha) */
  onOpen?: (s: GameState, alert: Alert) => Effect;
  /** sem choices = notícia (botão OK) */
  choices?: Choice[];
}

/** Um alerta do dia (❗ no mapa). */
export interface Alert {
  id: string;
  eventId: string;
  place: PlaceId;
  urgent: boolean;
  /** variáveis do texto desta carta (ex.: dados do evento real do DONKI) */
  vars: Record<string, string | number>;
  /** evento real do DONKI usado nesta carta */
  real?: SolarEvent;
  opened: boolean;
  /** efeito aplicado ao abrir */
  openDelta?: Effect;
  done: boolean;
  choiceId?: string;
  delta?: Effect;
}

export interface LogEntry {
  sol: number;
  kind: "evento" | "fim-do-sol";
  eventId?: string;
  choiceId?: string;
  delta: Effect;
  lessonKey?: TextKey;
}

export type Status = "jogando" | "vitoria" | "vitoria-parcial" | "resgate";

/** Resumo da última noite (para a tela "Boa noite"). */
export interface NightReport {
  sol: number;
  arFeito: number;
  arUsado: number;
  comidaFeita: number;
  comidaUsada: number;
  dose: number;
  escudoPct: number;
  ciencia: number;
  escudoNovo: number;
  bateria: number;
  /** módulos que receberam menos energia do que a divisão pedia */
  faltou: ModuleKey[];
  critico: boolean;
  /** alertas que ficaram sem resposta quando a noite chegou (dormiu sem terminar) */
  perdidos?: number;
  /** saúde perdida por causa deles */
  danoPerdidos?: number;
  delta: Effect;
}

export interface HistoryPoint {
  sol: number;
  ar: number;
  comida: number;
  saude: number;
  ciencia: number;
}

export interface RealEventSeen {
  sol: number;
  event: SolarEvent;
}

export interface GameState {
  version: 2;
  seed: number;
  rng: number;
  level: Level;
  sol: number;
  totalSols: number;
  resources: Resources;
  /** energia que ainda dá para gastar hoje (cartas + divisão ao dormir) */
  energiaHoje: number;
  /** quanto os painéis fizeram hoje de manhã */
  producaoHoje: number;
  /** bateria que entrou hoje de manhã */
  bateriaManha: number;
  bateria: number;
  escudo: number;
  solar: number;
  ciencia: number;
  metaCiencia: number;
  allocation: Allocation;
  flags: Record<string, number>;
  vars: Record<string, string | number>;
  scheduled: { eventId: string; sol: number; vars?: Record<string, string | number> }[];
  lastSeen: Record<string, number>;
  alerts: Alert[];
  /** eventos do Sol disponíveis nesta missão (ao vivo + históricos) */
  donkiPool: SolarEvent[];
  donkiUsed: string[];
  lastDonkiSol: number;
  realEvents: RealEventSeen[];
  history: HistoryPoint[];
  night?: NightReport;
  log: LogEntry[];
  status: Status;
  /** fotos da manhã de cada sol (sem checkpoints e sem donkiPool, que não mudam) */
  checkpoints: Snapshot[];
}

/** Estado sem as partes grandes que nunca mudam (usado nas fotos de "voltar ao sol"). */
export type Snapshot = Omit<GameState, "checkpoints" | "donkiPool">;
