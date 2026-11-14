// Catálogo de eventos (v2). Donos: Bruno (histórias/textos) + Vinicius (números).
//
// COMO FUNCIONA
//  - Cada evento tem um LUGAR (place) na base: o alerta ❗ aparece ali no mapa.
//  - Eventos com `donki` usam um evento REAL do Sol (DONKI/NASA) do mesmo tipo, buscado ao vivo.
//    As variáveis {data}, {tamanho}, {estrelas} vêm desse evento real.
//  - Escolhas agendam continuações (schedule) e ligam flags: histórias encadeadas e coerentes.
//  - Toda escolha tem custo (agora ou depois). O teste do validador garante isso.
//
// TEXTOS: ficam em src/content/locales/ (chaves ev.<id>.title, ev.<id>.body,
//         ev.<id>.<escolha>.label/.outcome/.lesson) nos 5 idiomas.

import type { Alert, GameEvent, GameState } from "../game/engine/types";
import * as B from "../game/engine/balance";

const forcaDo = (a: Alert) => Number(a.vars["forca"] ?? 2);
const reducaoEscudo = (s: GameState) => 1 - s.escudo * B.ESCUDO_REDUCAO;
const hoje = (s: GameState, flag: string) => s.flags[flag] === s.sol;

export const EVENTS: GameEvent[] = [
  // ============================================================ chegada (sol 1)
  {
    id: "chegada",
    chain: "intro",
    place: "rover",
    icon: "🚀",
    source: "marstrek",
    choices: [
      { id: "explorar", effects: { ar: -6, ciencia: 2 } },
      { id: "arrumar", effects: { energia: -3, escudo: 1 } },
    ],
  },

  // ============================================================ EVENTOS DO SOL (DONKI)
  // Clarão solar (FLR): rádio atrapalhado hoje
  {
    id: "sol_clarao",
    chain: "sol-clarao",
    place: "antena",
    icon: "⚡",
    donki: "FLR",
    source: "donki",
    cooldown: 3,
    weight: 1,
    choices: [
      { id: "reserva", effects: { energia: -3, ciencia: 1 } },
      { id: "desligar", effects: { bateria: 2 }, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },
  // Nuvem de partículas (CME): chega em 1 a 3 sóis
  {
    id: "sol_nuvem",
    chain: "sol-nuvem",
    place: "antena",
    icon: "☄️",
    donki: "CME",
    source: "donki",
    cooldown: 4,
    weight: 1.4,
    canHappen: (s) => s.sol < s.totalSols,
    choices: [
      {
        id: "abrigo",
        effects: { energia: -3 },
        setFlags: ["abrigo_pronto"],
        schedule: [{ eventId: "sol_nuvem_chega", inSols: [1, 3] }],
      },
      {
        id: "trabalhar",
        effects: { ciencia: 2 },
        deferredCost: true,
        schedule: [{ eventId: "sol_nuvem_chega", inSols: [1, 3] }],
      },
    ],
  },
  {
    id: "sol_nuvem_chega",
    chain: "sol-nuvem",
    place: "abrigo",
    icon: "🌩️",
    source: "donki",
    onlyScheduled: true,
    onOpen: (s, a) => {
      const abrigo = s.flags["abrigo_pronto"] !== undefined ? B.ABRIGO_FATOR : 1;
      const dose =
        B.DOSE_TEMPESTADE * forcaDo(a) * B.LEVELS[s.level].doseMult * reducaoEscudo(s) * abrigo;
      return { saude: -Math.round(dose) };
    },
    choices: [
      { id: "ficar", effects: { energia: -2 }, clearFlags: ["abrigo_pronto"] },
      { id: "trabalhar", effects: { saude: -4, ciencia: 2 }, clearFlags: ["abrigo_pronto"] },
    ],
  },
  // Chuva de partículas (SEP): URGENTE, chega em minutos
  {
    id: "sol_chuva",
    chain: "sol-chuva",
    place: "abrigo",
    icon: "🚨",
    donki: "SEP",
    urgent: true,
    source: "donki",
    cooldown: 4,
    weight: 1,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "correr", effects: { energia: -1, ciencia: -1 } },
      {
        id: "terminar",
        effects: { saude: -2, ciencia: 2 },
        dynamic: (s, a) => ({ saude: -Math.round(5 * forcaDo(a) * reducaoEscudo(s)) }),
      },
    ],
  },
  // Tempestade magnética na Terra (GST): a Terra responde atrasado
  {
    id: "sol_terra",
    chain: "sol-terra",
    place: "antena",
    icon: "🌍",
    donki: "GST",
    source: "donki",
    cooldown: 5,
    weight: 0.8,
    canHappen: (s) => s.sol >= 2,
    choices: [
      {
        id: "esperar",
        effects: {},
        setFlags: ["terra_atrasada", "radio_mudo"],
        deferredCost: true,
      },
      { id: "sozinhos", effects: { energia: -2, ciencia: 1 } },
    ],
  },

  // ============================================================ painéis: poeira
  {
    id: "poeira_vem",
    chain: "poeira",
    place: "paineis",
    icon: "🌪️",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.solar >= 0.8 && s.sol < s.totalSols,
    choices: [
      {
        id: "guardar",
        effects: { energia: -3, bateria: 3 },
        schedule: [{ eventId: "painel_sujo", inSols: 1 }],
      },
      {
        id: "ignorar",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "painel_sujo", inSols: 1 }],
      },
    ],
  },
  {
    id: "painel_sujo",
    chain: "poeira",
    place: "paineis",
    icon: "🔆",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ solar: -0.4 }),
    choices: [
      { id: "limpar", effects: { ar: -6, saude: -2, solar: 0.4 } },
      {
        id: "esperar",
        effects: {},
        deferredCost: true,
        schedule: [{ eventId: "vento_limpa", inSols: [2, 3] }],
      },
    ],
  },
  {
    id: "vento_limpa",
    chain: "poeira",
    place: "paineis",
    icon: "🍃",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ solar: 0.4 }),
  },

  // ============================================================ estufa
  {
    id: "broto",
    chain: "estufa",
    place: "estufa",
    icon: "🌱",
    source: "csa",
    cooldown: 4,
    canHappen: (s) => s.resources.comida < 85 && s.sol <= s.totalSols - 2,
    weight: (s) => (s.resources.comida < 50 ? 2.5 : 1),
    choices: [
      { id: "luz", effects: { energia: -2 }, schedule: [{ eventId: "colheita_boa", inSols: 2 }] },
      {
        id: "economizar",
        effects: {},
        deferredCost: true,
        schedule: [{ eventId: "colheita_fraca", inSols: 2 }],
      },
    ],
  },
  {
    id: "colheita_boa",
    chain: "estufa",
    place: "estufa",
    icon: "🥔",
    source: "csa",
    onlyScheduled: true,
    onOpen: () => ({ comida: 12 }),
  },
  {
    id: "colheita_fraca",
    chain: "estufa",
    place: "estufa",
    icon: "🥀",
    source: "csa",
    onlyScheduled: true,
    onOpen: () => ({ comida: 4 }),
  },

  // ============================================================ fábrica de ar
  {
    id: "filtro_entupido",
    chain: "ar",
    place: "ar",
    icon: "💨",
    source: "nasa-fato",
    cooldown: 4,
    canHappen: (s) => s.sol >= 2,
    choices: [
      {
        id: "peca",
        effects: { energia: -1 },
        setFlags: ["sem_reserva"],
        available: (s) => s.flags["sem_reserva"] === undefined,
      },
      { id: "limpar", effects: { energia: -3, ciencia: -1 } },
      { id: "deixar", effects: { ar: -12 } },
    ],
  },

  // ============================================================ rover + laboratório
  {
    id: "rocha",
    chain: "ciencia",
    place: "rover",
    icon: "🪨",
    source: "nasa-fato",
    cooldown: 3,
    canHappen: (s) => s.sol < s.totalSols,
    choices: [
      { id: "robo", effects: { energia: -3, ciencia: 3 } },
      {
        id: "astronauta",
        effects: { ar: -8, saude: -3, ciencia: 4 },
        schedule: [{ eventId: "laboratorio", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "laboratorio",
    chain: "ciencia",
    place: "lab",
    icon: "🔬",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ciencia: 3 }),
  },

  // ============================================================ habitat: saúde (OSDR)
  {
    id: "exercicio",
    chain: "saude",
    place: "habitat",
    icon: "🏋️",
    source: "osdr",
    cooldown: 3,
    weight: (s) => (s.sol >= 3 ? 1.5 : 0.5),
    choices: [
      { id: "treinar", effects: { energia: -1, comida: -3, saude: 4 } },
      { id: "pular", effects: { saude: -3, ciencia: 1 } },
    ],
  },

  // ============================================================ antena: falar com a Terra
  {
    id: "contato_terra",
    chain: "comunicacao",
    place: "antena",
    icon: "📡",
    source: "nasa-fato",
    cooldown: 4,
    canHappen: (s) =>
      s.sol < s.totalSols &&
      !hoje(s, "radio_mudo") &&
      !(s.sol - (s.flags["terra_atrasada"] ?? -9) <= 1),
    choices: [
      {
        id: "conselho",
        effects: { energia: -1 },
        schedule: [{ eventId: "resposta_terra", inSols: 1 }],
      },
      { id: "fotos", effects: { energia: -2, ciencia: 2 } },
    ],
  },
  {
    id: "resposta_terra",
    chain: "comunicacao",
    place: "antena",
    icon: "📨",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 5 }),
  },
];
