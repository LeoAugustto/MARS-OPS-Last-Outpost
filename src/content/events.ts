// Catálogo de eventos. Donos: Bruno (histórias/textos) + Vinicius (números).
//
// COMO FUNCIONA A ALEATORIEDADE COM SENTIDO
//  - Cada evento pertence a uma "cadeia" (história): tempestade, poeira, estufa, ar, ciencia, saude, comunicacao.
//  - Eventos "de abertura" são sorteados, mas só se canHappen() for verdade (ex.: só chega poeira se o painel está limpo).
//  - A escolha da criança AGENDA a continuação (schedule) e liga flags. A continuação lê as flags.
//    Ex.: "Preparar abrigo" liga a flag abrigo_pronto -> amanhã a tempestade chega e machuca bem menos.
//  - O diretor nunca abre uma história que já está em andamento (não chegam duas poeiras ao mesmo tempo).
//  - Toda escolha tem custo (agora ou depois). O teste src/game/engine/validate.test.ts garante isso.
//
// TEXTOS: não escreva texto aqui. Use as chaves em src/content/locales/<lang>.ts:
//   ev.<id>.title, ev.<id>.body, ev.<id>.<choiceId>.label/.outcome/.lesson

import type { GameEvent, GameState } from '../game/engine/types';
import * as B from '../game/engine/balance';
import { LIVE_EVENT, SOLAR_EVENTS } from '../data/donki';

const estrelas = (n: number) => '⭐'.repeat(n);

export const EVENTS: GameEvent[] = [
  // ------------------------------------------------------------ chegada (sol 1, sempre)
  {
    id: 'chegada',
    chain: 'intro',
    icon: '🚀',
    source: 'marstrek',
    choices: [
      { id: 'explorar', effects: { ar: -6, ciencia: 2 } },
      { id: 'arrumar', effects: { energia: -3, escudo: 1 } },
    ],
  },

  // ------------------------------------------------------------ cadeia: tempestade solar (DONKI)
  {
    id: 'sol_agitado',
    chain: 'tempestade',
    icon: '☀️',
    source: 'donki',
    cooldown: 5,
    weight: 1.3,
    canHappen: (s) => s.sol >= 2 && s.sol < s.totalSols,
    prepare: (s, rng) => {
      const ev = LIVE_EVENT ?? SOLAR_EVENTS[Math.floor(rng() * SOLAR_EVENTS.length)];
      s.vars.classe = ev.classType;
      s.vars.data = ev.date;
      s.vars.forca = ev.forca;
      s.vars.estrelas = estrelas(ev.forca);
      s.vars.aoVivo = LIVE_EVENT ? 1 : 0;
      s.vars.fato = ev.factKey ?? '';
    },
    choices: [
      {
        id: 'abrigo',
        effects: { energia: -3 },
        setFlags: ['abrigo_pronto'],
        schedule: [{ eventId: 'tempestade_chega', inSols: 1 }],
      },
      {
        id: 'pesquisar',
        effects: { ciencia: 2 },
        deferredCost: true,
        schedule: [{ eventId: 'tempestade_chega', inSols: 1 }],
      },
    ],
  },
  {
    id: 'tempestade_chega',
    chain: 'tempestade',
    icon: '🌩️',
    source: 'donki',
    onlyScheduled: true,
    onStart: (s: GameState) => {
      const forca = Number(s.vars.forca ?? 2);
      const abrigo = s.flags.abrigo_pronto !== undefined ? B.ABRIGO_FATOR : 1;
      const escudo = 1 - s.escudo * B.ESCUDO_REDUCAO;
      const dose = B.DOSE_TEMPESTADE * forca * B.LEVELS[s.level].doseMult * escudo * abrigo;
      return { saude: -Math.round(dose) };
    },
    choices: [
      { id: 'ficar', effects: { energia: -2 }, clearFlags: ['abrigo_pronto'] },
      { id: 'trabalhar', effects: { saude: -4, ciencia: 2 }, clearFlags: ['abrigo_pronto'] },
    ],
  },

  // ------------------------------------------------------------ cadeia: poeira
  {
    id: 'poeira_vem',
    chain: 'poeira',
    icon: '🌪️',
    source: 'nasa-fato',
    cooldown: 5,
    canHappen: (s) => s.solar >= 0.8 && s.sol < s.totalSols,
    choices: [
      { id: 'guardar', effects: { energia: -3, bateria: 3 }, schedule: [{ eventId: 'painel_sujo', inSols: 1 }] },
      {
        id: 'ignorar',
        effects: { ciencia: 1 },
        deferredCost: true,
        schedule: [{ eventId: 'painel_sujo', inSols: 1 }],
      },
    ],
  },
  {
    id: 'painel_sujo',
    chain: 'poeira',
    icon: '🔆',
    source: 'nasa-fato',
    onlyScheduled: true,
    onStart: () => ({ solar: -0.4 }),
    choices: [
      { id: 'limpar', effects: { ar: -6, saude: -2, solar: 0.4 } },
      { id: 'esperar', effects: {}, deferredCost: true, schedule: [{ eventId: 'vento_limpa', inSols: [2, 3] }] },
    ],
  },
  {
    id: 'vento_limpa',
    chain: 'poeira',
    icon: '🍃',
    source: 'nasa-fato',
    onlyScheduled: true,
    onStart: () => ({ solar: 0.4 }),
  },

  // ------------------------------------------------------------ cadeia: estufa (CSA)
  {
    id: 'broto',
    chain: 'estufa',
    icon: '🌱',
    source: 'csa',
    cooldown: 4,
    canHappen: (s) => s.resources.comida < 85 && s.sol <= s.totalSols - 2,
    weight: (s) => (s.resources.comida < 50 ? 2.5 : 1),
    choices: [
      { id: 'luz', effects: { energia: -2 }, schedule: [{ eventId: 'colheita_boa', inSols: 2 }] },
      { id: 'economizar', effects: {}, deferredCost: true, schedule: [{ eventId: 'colheita_fraca', inSols: 2 }] },
    ],
  },
  { id: 'colheita_boa', chain: 'estufa', icon: '🥔', source: 'csa', onlyScheduled: true, onStart: () => ({ comida: 12 }) },
  { id: 'colheita_fraca', chain: 'estufa', icon: '🥀', source: 'csa', onlyScheduled: true, onStart: () => ({ comida: 4 }) },

  // ------------------------------------------------------------ cadeia: ar
  {
    id: 'filtro_entupido',
    chain: 'ar',
    icon: '💨',
    source: 'nasa-fato',
    cooldown: 4,
    canHappen: (s) => s.sol >= 3,
    choices: [
      { id: 'peca', effects: { energia: -1 }, setFlags: ['sem_reserva'], available: (s) => s.flags.sem_reserva === undefined },
      { id: 'limpar', effects: { energia: -3, ciencia: -1 } },
      { id: 'deixar', effects: { ar: -12 } },
    ],
  },

  // ------------------------------------------------------------ cadeia: ciência
  {
    id: 'rocha',
    chain: 'ciencia',
    icon: '🪨',
    source: 'nasa-fato',
    cooldown: 3,
    canHappen: (s) => s.sol < s.totalSols,
    choices: [
      { id: 'robo', effects: { energia: -3, ciencia: 3 } },
      {
        id: 'astronauta',
        effects: { ar: -8, saude: -3, ciencia: 4 },
        schedule: [{ eventId: 'laboratorio', inSols: [1, 2] }],
      },
    ],
  },
  { id: 'laboratorio', chain: 'ciencia', icon: '🔬', source: 'nasa-fato', onlyScheduled: true, onStart: () => ({ ciencia: 3 }) },

  // ------------------------------------------------------------ cadeia: saúde (OSDR)
  {
    id: 'exercicio',
    chain: 'saude',
    icon: '🏋️',
    source: 'osdr',
    cooldown: 3,
    weight: (s) => (s.sol >= 3 ? 1.5 : 0.5),
    choices: [
      { id: 'treinar', effects: { energia: -1, comida: -3, saude: 4 } },
      { id: 'pular', effects: { saude: -3, ciencia: 1 } },
    ],
  },

  // ------------------------------------------------------------ cadeia: comunicação com a Terra
  {
    id: 'contato_terra',
    chain: 'comunicacao',
    icon: '📡',
    source: 'nasa-fato',
    cooldown: 4,
    canHappen: (s) => s.sol < s.totalSols,
    choices: [
      { id: 'conselho', effects: { energia: -1 }, schedule: [{ eventId: 'resposta_terra', inSols: 1 }] },
      { id: 'fotos', effects: { energia: -2, ciencia: 2 } },
    ],
  },
  { id: 'resposta_terra', chain: 'comunicacao', icon: '📨', source: 'nasa-fato', onlyScheduled: true, onStart: () => ({ comida: 5 }) },
];
