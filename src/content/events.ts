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

/** cooldown maior que a missão mais longa (14 sóis): o evento aparece no máximo 1 vez. */
const UMA_VEZ = 99;

export const EVENTS: GameEvent[] = [
  // ============================================================ chegada (sol 1)
  {
    id: "chegada",
    chain: "intro",
    place: "rover",
    source: "marstrek",
    choices: [
      { id: "explorar", horas: 2, effects: { ar: -6, ciencia: 2 } },
      { id: "arrumar", effects: { energia: -3, escudo: 1 } },
    ],
  },

  // ============================================================ EVENTOS DO SOL (DONKI)
  // Clarão solar (FLR): rádio atrapalhado hoje
  {
    id: "sol_clarao",
    chain: "sol-clarao",
    place: "antena",
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
    source: "donki",
    onlyScheduled: true,
    onOpen: (s, a) => {
      const abrigo = s.flags["abrigo_pronto"] !== undefined ? B.ABRIGO_FATOR : 1;
      const dose =
        B.DOSE_TEMPESTADE * forcaDo(a) * B.LEVELS[s.level].doseMult * reducaoEscudo(s) * abrigo;
      return { saude: -Math.round(dose) };
    },
    choices: [
      { id: "ficar", horas: 5, effects: { energia: -2 }, clearFlags: ["abrigo_pronto"] },
      { id: "trabalhar", effects: { saude: -4, ciencia: 2 }, clearFlags: ["abrigo_pronto"] },
    ],
  },
  // Chuva de partículas (SEP): URGENTE, chega em minutos
  {
    id: "sol_chuva",
    chain: "sol-chuva",
    place: "abrigo",
    donki: "SEP",
    urgent: true,
    source: "donki",
    cooldown: 4,
    weight: 1,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "correr", horas: 3, effects: { energia: -1, ciencia: -1 } },
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
    mission: "Opportunity",
    chain: "poeira",
    place: "paineis",
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
    mission: "Opportunity",
    chain: "poeira",
    place: "paineis",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ solar: -0.4 }),
    choices: [
      { id: "limpar", horas: 2, effects: { ar: -6, saude: -2, solar: 0.4 } },
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
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ solar: 0.4, ar: -3 }),
  },

  // ============================================================ estufa
  {
    id: "broto",
    chain: "estufa",
    place: "estufa",
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
    source: "csa",
    onlyScheduled: true,
    onOpen: () => ({ comida: 12 }),
  },
  {
    id: "colheita_fraca",
    chain: "estufa",
    place: "estufa",
    source: "csa",
    onlyScheduled: true,
    onOpen: () => ({ comida: -3 }),
  },

  // ============================================================ fábrica de ar
  {
    id: "filtro_entupido",
    chain: "ar",
    place: "ar",
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
      { id: "limpar", horas: 4, effects: { energia: -3, ciencia: -1 } },
      { id: "deixar", effects: { ar: -12 } },
    ],
  },

  // ============================================================ rover + laboratório
  {
    id: "rocha",
    chain: "ciencia",
    place: "rover",
    source: "nasa-fato",
    cooldown: 3,
    canHappen: (s) => s.sol < s.totalSols,
    choices: [
      { id: "robo", effects: { energia: -3, ciencia: 3 } },
      {
        id: "astronauta", horas: 3,
        effects: { ar: -8, saude: -3, ciencia: 4 },
        schedule: [{ eventId: "laboratorio", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "laboratorio",
    mission: "Perseverance",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ciencia: 3 }),
  },

  // ============================================================ habitat: saúde (OSDR)
  {
    id: "exercicio",
    chain: "saude",
    place: "habitat",
    source: "osdr",
    cooldown: 3,
    weight: (s) => (s.sol >= 3 ? 1.5 : 0.5),
    choices: [
      { id: "treinar", horas: 2, effects: { energia: -1, comida: -3, saude: 4 } },
      { id: "pular", effects: { saude: -3, ciencia: 1 } },
    ],
  },

  // ============================================================ antena: falar com a Terra
  {
    id: "contato_terra",
    chain: "comunicacao",
    place: "antena",
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
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 5 }),
  },

  // ============================================================ EVENTOS POR LUGAR DA BASE
  // Dono: Bruno. Um bloco por lugar (o lugar de cada evento fica no campo `place`).
  // Regras seguidas: 2 escolhas, as duas com custo (agora ou depois), lição real com fonte em
  // docs/DATA_SOURCES.md. Todos os números abaixo são de JOGO (balanceamento), não medições.
  // UMA_VEZ = cooldown maior que qualquer missão: o evento aparece no máximo 1 vez.

  // ------------------------------------------------------------ ☀️ painéis solares
  {
    // Redemoinho de poeira: o resultado depende do estado do painel (sujo → limpa; limpo → suja um pouco).
    id: "redemoinho",
    mission: "Spirit",
    chain: "poeira",
    place: "paineis",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    weight: (s) => (s.solar < 1 ? 1.5 : 0.8),
    choices: [
      { id: "cobrir", effects: { energia: -3 } },
      {
        id: "observar",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "redemoinho_passou", inSols: 1 }],
      },
    ],
  },
  {
    id: "redemoinho_passou",
    chain: "poeira",
    place: "paineis",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: (s: GameState) => ({ solar: s.solar < 1 ? 0.3 : -0.2 }),
  },
  {
    id: "painel_rachado",
    mission: "InSight",
    chain: "paineis",
    place: "paineis",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3 && s.solar >= 0.6,
    weight: 0.8,
    choices: [
      { id: "consertar", effects: { energia: -2, ar: -4 } },
      { id: "desligar", effects: { solar: -0.2 } },
    ],
  },
  {
    // Só nas missões mais longas (Piloto e Comandante), da metade em diante.
    id: "inverno",
    mission: "Opportunity",
    chain: "paineis",
    place: "paineis",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) =>
      s.totalSols >= 10 &&
      s.sol >= Math.ceil(s.totalSols / 2) &&
      s.sol < s.totalSols &&
      s.solar >= 0.6,
    onOpen: () => ({ solar: -0.2 }),
    choices: [
      { id: "inclinar", effects: { energia: -3, solar: 0.2 } },
      { id: "economizar", effects: { bateria: 3 }, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },

  // ------------------------------------------------------------ 💨 fábrica de ar
  {
    id: "vazamento",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2 && s.sol + 3 <= s.totalSols,
    choices: [
      { id: "procurar", horas: 3, effects: { energia: -3 } },
      {
        id: "remendo",
        effects: { energia: -1 },
        schedule: [{ eventId: "vazamento_volta", inSols: [2, 3] }],
      },
    ],
  },
  {
    id: "vazamento_volta",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ar: -5 }),
  },
  {
    id: "gerador_barulho",
    mission: "Perseverance · MOXIE",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 3 && s.sol + 2 <= s.totalSols,
    choices: [
      { id: "desligar", effects: { ar: -6 } },
      {
        id: "continuar",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "gerador_quebrou", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "gerador_quebrou",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ar: -8, energia: -2 }),
  },
  {
    id: "agua_do_ar",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 3 && s.resources.comida < 75,
    choices: [
      { id: "coletar", effects: { energia: -2, comida: 5 } },
      { id: "guardar", effects: { comida: -3, bateria: 2 } },
    ],
  },

  // ------------------------------------------------------------ 🌱 estufa
  {
    // A ideia original era "praga"; usamos mofo porque é o que aconteceu de verdade na Estação Espacial.
    id: "mofo",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "cortar", horas: 2, effects: { comida: -4 } },
      { id: "ventilar", effects: { energia: -2, comida: -1 } },
    ],
  },
  {
    id: "rabanete",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    weight: (s) => (s.resources.comida < 50 ? 2 : 1),
    choices: [
      { id: "comer", effects: { energia: -1, comida: 7 } },
      {
        id: "sementes",
        effects: { energia: -1, comida: 2 },
        available: (s) => s.sol + 3 <= s.totalSols,
        schedule: [{ eventId: "rabanete_de_novo", inSols: 3 }],
      },
    ],
  },
  {
    id: "rabanete_de_novo",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 9 }),
  },
  {
    id: "sementes_terra",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol + 2 <= s.totalSols,
    choices: [
      {
        id: "alface",
        effects: { energia: -1 },
        schedule: [{ eventId: "alface_pronta", inSols: 2 }],
      },
      {
        id: "batata",
        effects: { energia: -2 },
        available: (s) => s.sol + 4 <= s.totalSols,
        schedule: [{ eventId: "batata_pronta", inSols: 4 }],
      },
    ],
  },
  {
    id: "alface_pronta",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 5 }),
  },
  {
    id: "batata_pronta",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 12 }),
  },

  // ------------------------------------------------------------ 🔬 laboratório
  {
    id: "microscopio",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "imprimir", effects: { energia: -3 } },
      { id: "lupa", effects: {}, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },
  {
    id: "gelo",
    mission: "Phoenix",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "estudar", effects: { energia: -2, ciencia: 3 } },
      { id: "derreter", effects: { comida: 5 }, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },
  {
    id: "bacterias",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 4 && s.sol < s.totalSols,
    choices: [
      { id: "caixa", effects: { energia: -3, ciencia: 4 } },
      {
        id: "mesa",
        effects: { energia: -1, ciencia: 3 },
        schedule: [{ eventId: "lab_contaminado", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "lab_contaminado",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -2 }),
  },

  // ------------------------------------------------------------ 🛡️ abrigo
  {
    id: "rachadura",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.escudo > 0,
    choices: [
      { id: "tapar", effects: { energia: -3 } },
      { id: "depois", effects: { escudo: -1 } },
    ],
  },
  {
    id: "treino",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol <= s.totalSols - 2,
    choices: [
      { id: "treinar", horas: 2, effects: { energia: -2, ciencia: -1 } },
      {
        id: "adiar",
        effects: { ciencia: 2 },
        deferredCost: true,
        schedule: [{ eventId: "alarme_teste", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "alarme_teste",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -3, saude: -2 }),
  },

  // ------------------------------------------------------------ 📡 antena
  {
    id: "aniversario",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "festa", effects: { comida: -4, saude: 4 } },
      { id: "depois", effects: { saude: -2, ciencia: 2 } },
    ],
  },
  {
    id: "escola",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "video", effects: { energia: -2, saude: 2 } },
      { id: "dados", effects: { saude: -2, ciencia: 2 } },
    ],
  },
  {
    // Só depois de alguma história de vento/poeira na missão (coerência).
    id: "antena_torta",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) =>
      s.lastSeen["poeira_vem"] !== undefined || s.lastSeen["redemoinho"] !== undefined,
    choices: [
      { id: "astronauta", horas: 2, effects: { ar: -5, saude: -1 } },
      { id: "robo", effects: { energia: -3 } },
    ],
  },

  // ------------------------------------------------------------ 🛏️ cama (habitat)
  {
    id: "sem_sono",
    chain: "saude",
    place: "habitat",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "descansar", horas: 4, effects: { saude: 4 }, setFlags: ["radio_mudo"], deferredCost: true },
      { id: "luzes", effects: { energia: -2, saude: 2 } },
    ],
  },
  {
    id: "saudade",
    chain: "saude",
    place: "habitat",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= Math.ceil(s.totalSols / 2),
    choices: [
      { id: "folga", horas: 4, effects: { comida: -4, saude: 4 } },
      { id: "plantas", effects: { energia: -2, saude: 3 } },
    ],
  },

  // ------------------------------------------------------------ 🚙 rover
  {
    id: "pneu",
    mission: "Curiosity",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3 && s.sol + 2 <= s.totalSols,
    choices: [
      { id: "devagar", effects: { energia: -2, ciencia: -1 } },
      {
        id: "seguir",
        effects: { ciencia: 2 },
        deferredCost: true,
        schedule: [{ eventId: "roda_conserto", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "roda_conserto",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -3 }),
  },
  {
    id: "dunas",
    mission: "Spirit",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols - 1,
    choices: [
      {
        id: "entrar",
        effects: { ciencia: 3 },
        deferredCost: true,
        schedule: [{ eventId: "rover_atolou", inSols: 1 }],
      },
      { id: "estudar", horas: 2, effects: { energia: -2, ciencia: 1 } },
    ],
  },
  {
    id: "rover_atolou",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -3 }),
  },
  {
    id: "fossil",
    mission: "Perseverance",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols - 1,
    choices: [
      {
        id: "analisar",
        effects: { energia: -3 },
        schedule: [{ eventId: "fossil_resultado", inSols: [1, 2] }],
      },
      { id: "foto", effects: { energia: -1, ciencia: 1 } },
    ],
  },
  {
    id: "fossil_resultado",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ciencia: 4 }),
  },

  // ============================================================ MAIS EVENTOS POR LUGAR (lote 2)
  // Dono: Bruno. Mesmas regras do lote 1. Números = jogo. Fontes em docs/DATA_SOURCES.md.

  // ------------------------------------------------------------ ☀️ painéis solares
  {
    id: "geada",
    mission: "Viking",
    chain: "paineis",
    place: "paineis",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "esperar", effects: { energia: -3 } },
      { id: "raspar", effects: { ar: -4, saude: -1 } },
    ],
  },
  {
    id: "eclipse_fobos",
    mission: "Perseverance",
    chain: "ceu",
    place: "paineis",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "filmar", effects: { energia: -2, ciencia: 2 } },
      { id: "guardar", effects: { bateria: 2 }, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },
  {
    // painel com poeira: o truque da InSight (jogar areia no vento) ou escovar lá fora
    id: "truque_areia",
    mission: "InSight",
    chain: "poeira",
    place: "paineis",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.solar < 1,
    weight: 1.5,
    choices: [
      { id: "areia", effects: { energia: -1, solar: 0.2 } },
      { id: "escovar", effects: { ar: -5, solar: 0.4 } },
    ],
  },

  // ------------------------------------------------------------ 💨 fábrica de ar
  {
    id: "filtro_co2",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      {
        id: "reserva",
        effects: { energia: -1 },
        setFlags: ["sem_reserva"],
        available: (s) => s.flags["sem_reserva"] === undefined,
      },
      { id: "improvisar", effects: { ar: -4, energia: -1 } },
    ],
  },
  {
    id: "eletrolise",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2 && s.resources.ar < 85,
    weight: (s) => (s.resources.ar < 50 ? 2 : 1),
    choices: [
      { id: "fazer_ar", effects: { comida: -4, ar: 8 } },
      { id: "guardar_agua", effects: { ar: -3, comida: 2 } },
    ],
  },
  {
    id: "poeira_dentro",
    chain: "ar",
    place: "ar",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "aspirar", effects: { energia: -2 } },
      { id: "depois", effects: { saude: -3 } },
    ],
  },

  // ------------------------------------------------------------ 🌱 estufa
  {
    id: "luz_rosa",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "rosa", effects: { energia: -1, comida: 3 } },
      { id: "branca", effects: { energia: -3, comida: 4, saude: 1 } },
    ],
  },
  {
    id: "pimentas",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    // folga para a colheita (2 sóis) chegar antes do fim da missão
    canHappen: (s) => s.sol >= 2 && s.sol <= s.totalSols - 3,
    choices: [
      { id: "verdes", effects: { energia: -1, comida: 4 } },
      {
        id: "vermelhas",
        effects: { energia: -1 },
        schedule: [{ eventId: "pimentas_vermelhas", inSols: 2 }],
      },
    ],
  },
  {
    id: "pimentas_vermelhas",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 8 }),
  },
  {
    id: "adubo",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol <= s.totalSols - 3,
    choices: [
      {
        id: "compostar",
        effects: { energia: -1 },
        schedule: [{ eventId: "adubo_pronto", inSols: 2 }],
      },
      { id: "jogar_fora", effects: { saude: -2, comida: 1 } },
    ],
  },
  {
    id: "adubo_pronto",
    chain: "estufa",
    place: "estufa",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ comida: 6 }),
  },

  // ------------------------------------------------------------ 🔬 laboratório
  {
    id: "meteorito",
    mission: "Opportunity",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "analisar", effects: { energia: -2, ciencia: 3 } },
      { id: "foto", effects: { energia: -1, ciencia: 1 } },
    ],
  },
  {
    id: "tubo_amostra",
    mission: "Perseverance",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3 && s.sol < s.totalSols,
    choices: [
      { id: "cuidado", effects: { energia: -2, ciencia: 2 } },
      {
        id: "rapido",
        effects: { ciencia: 2 },
        deferredCost: true,
        schedule: [{ eventId: "amostra_vazia", inSols: [1, 2] }],
      },
    ],
  },
  {
    id: "amostra_vazia",
    chain: "ciencia",
    place: "lab",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ ciencia: -3 }),
  },
  {
    id: "nuvens",
    mission: "Curiosity",
    chain: "ceu",
    place: "lab",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "noite", effects: { saude: -2, ciencia: 3 } },
      { id: "uma_foto", effects: { energia: -1, ciencia: 1 } },
    ],
  },

  // ------------------------------------------------------------ 🛡️ abrigo
  {
    id: "tijolos",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2 && s.escudo < 4,
    choices: [
      { id: "imprimir", effects: { energia: -3, escudo: 1 } },
      { id: "sacos", effects: { ar: -4, saude: -1, escudo: 1 } },
    ],
  },
  {
    id: "tremor",
    mission: "InSight",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "conferir", effects: { energia: -2 } },
      {
        id: "seguir",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "tremor_estrago", inSols: 1 }],
      },
    ],
  },
  {
    id: "tremor_estrago",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -2, saude: -1 }),
  },
  // abrigo: vida da equipe (convivência, saúde, exercício, sono) e a casa (janela)
  {
    id: "briga",
    chain: "equipe",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "conversar", horas: 2, effects: { ciencia: -1, saude: 2 } },
      { id: "separar", effects: { ciencia: 1, saude: -3 } },
    ],
  },
  {
    id: "dor_cabeca",
    chain: "equipe",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "ventilar", effects: { energia: -2, saude: 2 } },
      {
        id: "seguir",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "dor_cabeca_piora", inSols: 1 }],
      },
    ],
  },
  {
    id: "dor_cabeca_piora",
    chain: "equipe",
    place: "abrigo",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ saude: -4, ciencia: -1 }),
  },
  {
    id: "esteira",
    chain: "equipe",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "correr", effects: { comida: -3, saude: 3 } },
      { id: "pular", effects: { ciencia: 1, saude: -2 } },
    ],
  },
  {
    id: "janela",
    chain: "abrigo",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "trocar", horas: 2, effects: { energia: -3 } },
      { id: "fita", effects: { ar: -4 } },
    ],
  },
  {
    id: "barulho",
    chain: "equipe",
    place: "abrigo",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "consertar", effects: { energia: -2 } },
      { id: "tampoes", effects: { saude: -1 } },
    ],
  },

  // ------------------------------------------------------------ 📡 antena
  {
    id: "conjuncao",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3 && !hoje(s, "radio_mudo"),
    choices: [
      { id: "mandar_tudo", effects: { energia: -2, ciencia: 2 } },
      { id: "silencio", effects: { saude: -2, bateria: 2 } },
    ],
  },
  {
    id: "satelite",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: 5,
    canHappen: (s) => s.sol >= 2 && !hoje(s, "radio_mudo"),
    choices: [
      { id: "satelite", effects: { energia: -1, ciencia: 2 } },
      { id: "direto", effects: { energia: -3, ciencia: 3 } },
    ],
  },
  {
    id: "musica",
    chain: "comunicacao",
    place: "antena",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "tocar", effects: { energia: -1, saude: 3 } },
      { id: "dormir_mais", effects: { saude: 1 }, setFlags: ["radio_mudo"], deferredCost: true },
    ],
  },

  // ------------------------------------------------------------ 🛏️ casa (habitat)
  {
    id: "cardapio",
    chain: "saude",
    place: "habitat",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "tempero", effects: { comida: -3, saude: 3 } },
      { id: "de_sempre", effects: { saude: -2 } },
    ],
  },
  {
    id: "diario",
    chain: "saude",
    place: "habitat",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2,
    choices: [
      { id: "escrever", effects: { saude: 2 }, setFlags: ["radio_mudo"], deferredCost: true },
      { id: "trabalhar", effects: { saude: -2, ciencia: 1 } },
    ],
  },
  {
    id: "resfriado",
    chain: "saude",
    place: "habitat",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: "isolar", effects: { saude: 2 }, setFlags: ["radio_mudo"], deferredCost: true },
      { id: "seguir", effects: { saude: -4, ciencia: 1 } },
    ],
  },

  // ------------------------------------------------------------ 🚙 rover
  {
    id: "noite_gelada",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    cooldown: 6,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    choices: [
      { id: "aquecer", effects: { energia: -2 } },
      {
        id: "deixar",
        effects: {},
        deferredCost: true,
        schedule: [{ eventId: "rover_frio", inSols: 1 }],
      },
    ],
  },
  {
    id: "rover_frio",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    onlyScheduled: true,
    onOpen: () => ({ energia: -3 }),
  },
  {
    id: "drone",
    mission: "Ingenuity",
    chain: "rover",
    place: "rover",
    source: "nasa-fato",
    cooldown: UMA_VEZ,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols - 1,
    choices: [
      { id: "voar", effects: { energia: -3, ciencia: 2 } },
      {
        id: "sem_olhar",
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: "rover_atolou", inSols: 1 }],
      },
    ],
  },
];
