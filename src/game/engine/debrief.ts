// Relatório do Controle de Missão: em vez de "game over", explica POR QUÊ.
// Devolve só chaves de texto + dados; a UI traduz com t().

import type { GameState, LogEntry, TextKey } from "./types";

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
}

export function debrief(s: GameState): Debrief {
  const fatoKey = "fato.reabastecimento";
  if (s.status === "vitoria")
    return {
      status: s.status,
      titleKey: "fim.vitoria.title",
      bodyKey: "fim.vitoria.body",
      momentos: [],
      fatoKey,
    };
  if (s.status === "vitoria-parcial")
    return {
      status: s.status,
      titleKey: "fim.parcial.title",
      bodyKey: "fim.parcial.body",
      momentos: [],
      fatoKey,
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
    fatoKey,
  };
}
