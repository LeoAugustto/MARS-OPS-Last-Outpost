// Relatório do Controle de Missão: em vez de "game over", explica POR QUÊ.
// Devolve só chaves de texto + dados; a UI traduz com t().

import { ESTRELA_2_EM } from "./balance";
import type { GameState, HistoryPoint, LogEntry, RealEventSeen, TextKey } from "./types";

export interface Debrief {
  status: GameState["status"];
  titleKey: TextKey;
  bodyKey: TextKey;
  /** recurso que acabou (só no resgate) */
  causa?: "ar" | "comida" | "saude";
  causaKey?: TextKey;
  dicaKey?: TextKey;
  /** as 2 decisões que mais pesaram no recurso que acabou, com o "Por quê?" */
  momentos: {
    sol: number;
    eventId: string | undefined;
    choiceId: string | undefined;
    lessonKey: TextKey | undefined;
    perda: number;
  }[];
  /** sol sugerido para "voltar e tentar diferente" */
  voltarAoSol?: number;
  fatoKey: TextKey;
  /** barras ao fim de cada sol (para o gráfico) */
  history: HistoryPoint[];
  /** eventos reais do Sol (DONKI) que apareceram na missão */
  realEvents: RealEventSeen[];
  ciencia: number;
  metaCiencia: number;
  soisCompletos: number;
  totalSols: number;
  /** estrelas de ciência (1 a 3) quando a tripulação sobreviveu; 0 no resgate */
  estrelas: 0 | 1 | 2 | 3;
}

/** 1 estrela = sobreviveu; 2 = chegou perto da meta de ciência; 3 = bateu a meta. */
export function estrelasDe(s: Pick<GameState, "status" | "ciencia" | "metaCiencia">): 0 | 1 | 2 | 3 {
  if (s.status !== "vitoria" && s.status !== "vitoria-parcial") return 0;
  if (s.ciencia >= s.metaCiencia) return 3;
  if (s.ciencia >= Math.ceil(s.metaCiencia * ESTRELA_2_EM)) return 2;
  return 1;
}

export function debrief(s: GameState): Debrief {
  const base = {
    fatoKey: "fato.reabastecimento",
    history: s.history,
    realEvents: s.realEvents,
    ciencia: s.ciencia,
    metaCiencia: s.metaCiencia,
    soisCompletos: s.history.filter((h) => h.sol > 0).length - (s.status === "resgate" ? 1 : 0),
    totalSols: s.totalSols,
    estrelas: estrelasDe(s),
  };
  if (s.status === "vitoria" || s.status === "vitoria-parcial")
    return {
      status: s.status,
      titleKey: "fim.vitoria.title",
      bodyKey: "fim.vitoria.body",
      momentos: momentosQueMaisPesaram(s),
      ...base,
    };

  const r = s.resources;
  const causa = (["ar", "comida", "saude"] as const).reduce((a, b) => (r[b] < r[a] ? b : a));

  const perdas = (e: LogEntry) => -(e.delta[causa] ?? 0);
  const momentos = s.log
    .filter((e) => e.kind === "evento" && perdas(e) > 0)
    .sort((a, b) => perdas(b) - perdas(a))
    .slice(0, 2)
    .map((e) => ({
      sol: e.sol,
      eventId: e.eventId,
      choiceId: e.choiceId,
      lessonKey: e.lessonKey,
      perda: perdas(e),
    }));

  const primeiro = momentos.length
    ? Math.min(...momentos.map((m) => m.sol))
    : Math.max(1, s.sol - 2);

  return {
    status: s.status,
    titleKey: "fim.resgate.title",
    bodyKey: "fim.resgate.body",
    causa,
    causaKey: `causa.${causa}`,
    dicaKey: `dica.${causa}`,
    momentos,
    voltarAoSol: primeiro,
    ...base,
  };
}

/** As 2 escolhas que mais custaram, somando ar, comida e saúde. */
function momentosQueMaisPesaram(s: GameState): Debrief["momentos"] {
  const custo = (e: LogEntry) =>
    -((e.delta.ar ?? 0) + (e.delta.comida ?? 0) + (e.delta.saude ?? 0));
  return s.log
    .filter((e) => e.kind === "evento" && e.lessonKey && custo(e) > 0)
    .sort((a, b) => custo(b) - custo(a))
    .slice(0, 2)
    .map((e) => ({
      sol: e.sol,
      eventId: e.eventId,
      choiceId: e.choiceId,
      lessonKey: e.lessonKey,
      perda: custo(e),
    }));
}
