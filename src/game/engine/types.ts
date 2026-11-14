// Tipos centrais do motor. TypeScript puro: sem React, sem Phaser, sem DOM.

/** 5 idiomas. TODO texto que a criança vê existe nos 5 (ver src/content/locales/). */
export type Lang = "pt" | "en" | "es" | "fr" | "it";
export const LANGS: Lang[] = ["pt", "en", "es", "fr", "it"];

/**
 * Textos NÃO ficam no motor. Cada texto tem uma chave por convenção:
 *   ev.<eventoId>.title / ev.<eventoId>.body
 *   ev.<eventoId>.<escolhaId>.label / .outcome / .lesson
 * e a tradução fica em src/content/locales/<lang>.ts (mesmas chaves nos 5 arquivos).
 */
export type TextKey = string;

export type Level = "cadete" | "piloto" | "comandante";

/** As 3 barras que a criança vê (0..100). */
export interface Resources {
  ar: number;
  comida: number;
  saude: number;
}

/** Onde a energia do dia pode ser gasta. O que sobrar vai para a bateria. */
export type ModuleKey = "ar" | "estufa" | "ciencia" | "escudo";
export type Allocation = Record<ModuleKey, number>;

/** Mudanças que uma escolha/evento causa. Números negativos = custo. */
export interface Effect {
  ar?: number;
  comida?: number;
  saude?: number;
  /** energia disponível HOJE para distribuir */
  energia?: number;
  bateria?: number;
  ciencia?: number;
  /** níveis de blindagem (0..ESCUDO_MAX) */
  escudo?: number;
  /** muda o fator solar (0..1). Ex.: poeira no painel = -0.4 */
  solar?: number;
}

export interface ScheduleRef {
  eventId: string;
  /** daqui a quantos sóis. [min,max] sorteia no intervalo */
  inSols: number | [number, number];
}

export interface Choice {
  id: string;
  effects: Effect;
  /** a escolha só aparece se isto for verdade (coerência!) */
  available?: (s: GameState) => boolean;
  setFlags?: string[];
  clearFlags?: string[];
  /** consequência que chega depois (encadeamento) */
  schedule?: ScheduleRef[];
  /**
   * true quando o custo da escolha vem DEPOIS (via schedule) em vez de agora.
   * O validador exige: todo Choice tem efeito negativo OU deferredCost.
   */
  deferredCost?: boolean;
  // textos (por convenção de chave): label, outcome (o que acontece), lesson ("Por quê?")
}

export interface GameEvent {
  id: string;
  /** agrupa eventos de uma mesma história (ex.: 'tempestade', 'poeira') */
  chain: string;
  icon: string;
  // textos (por convenção de chave): title, body
  /** de onde vem o dado real, para mostrar o selo na carta */
  source?: "donki" | "osdr" | "radlab" | "marstrek" | "csa" | "nasa-fato";
  /** só acontece quando agendado por outro evento (continuação de história) */
  onlyScheduled?: boolean;
  /** pode ser sorteado hoje? Use para manter tudo coerente. */
  canHappen?: (s: GameState) => boolean;
  /** peso no sorteio (maior = mais provável). Pode depender do estado. */
  weight?: number | ((s: GameState) => number);
  /** sóis mínimos até poder repetir */
  cooldown?: number;
  /** roda quando o evento aparece (antes da escolha). Ex.: a tempestade bate. */
  onStart?: (s: GameState) => Effect;
  /** prepara variáveis do texto, ex.: escolhe um evento real do DONKI */
  prepare?: (s: GameState, rng: () => number) => void;
  /** sem choices = carta de notícia (botão "OK") */
  choices?: Choice[];
}

export interface LogEntry {
  sol: number;
  kind: "evento" | "fim-do-sol";
  eventId?: string;
  choiceId?: string;
  delta: Effect;
  /** chave do texto "Por quê?" */
  lessonKey?: TextKey;
}

export type Status = "jogando" | "vitoria" | "vitoria-parcial" | "resgate";

export interface GameState {
  version: 1;
  seed: number;
  rng: number;
  level: Level;
  sol: number;
  totalSols: number;
  resources: Resources;
  energiaHoje: number;
  bateria: number;
  escudo: number;
  solar: number;
  ciencia: number;
  metaCiencia: number;
  /** flag -> sol em que foi ligada */
  flags: Record<string, number>;
  /** variáveis para textos e lógica (ex.: tempestade escolhida do DONKI) */
  vars: Record<string, string | number>;
  scheduled: { eventId: string; sol: number }[];
  lastSeen: Record<string, number>;
  /** eventos de hoje ainda sem resposta (fila) */
  pending: string[];
  log: LogEntry[];
  status: Status;
  /** foto do estado no começo de cada sol, para "voltar ao sol X" */
  checkpoints: Omit<GameState, "checkpoints">[];
}
