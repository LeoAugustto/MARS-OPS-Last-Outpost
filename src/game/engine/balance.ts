// Números de balanceamento. Dono: Vinicius.
// Regra: número que vem de dado real tem comentário com a fonte (ver docs/DATA_SOURCES.md).
// Número inventado para jogabilidade fica marcado como "jogo" — e nunca é apresentado como real.

import type { Level } from "./types";

export const LEVELS: Record<Level, { totalSols: number; metaCiencia: number; doseMult: number }> = {
  cadete: { totalSols: 7, metaCiencia: 24, doseMult: 0.8 }, // 7–9 anos
  piloto: { totalSols: 10, metaCiencia: 38, doseMult: 1.2 },
  comandante: { totalSols: 14, metaCiencia: 56, doseMult: 1.5 },
};

export const START = {
  ar: 80,
  comida: 60, // comida embalada trazida da Terra (jogo)
  saude: 100,
  bateria: 2,
};

/** energia produzida pelos painéis num sol com céu limpo (jogo) */
export const PAINEIS = 10;
export const BATERIA_MAX = 10;

/** consumo diário da tripulação (jogo) */
export const CONSUMO_AR = 10;
export const CONSUMO_COMIDA = 8;

/** quanto cada 1 de energia rende (jogo) */
export const AR_POR_ENERGIA = 4;
export const COMIDA_POR_ENERGIA = 3;
export const CIENCIA_POR_ENERGIA = 1;
/** energia para o robô cobrir a base com mais um nível de areia (regolito) */
export const ENERGIA_POR_ESCUDO = 3;
export const ESCUDO_MAX = 4;
/** cada nível de escudo corta 15% da radiação (jogo, inspirado em blindagem por regolito) */
export const ESCUDO_REDUCAO = 0.15;

/**
 * Radiação diária normal na superfície de Marte, em "pontos de saúde".
 * Real: o RAD do Curiosity mediu ~0,64 mSv/dia na superfície (Hassler et al., 2014) — VERIFICAR.
 * Convertido para jogo: 2 pontos/sol.
 */
export const DOSE_BASE = 2;

/** dano extra de uma tempestade solar por "força" (1 fraca .. 3 muito forte) (jogo) */
export const DOSE_TEMPESTADE = 8;
/** ficar no abrigo corta a tempestade para 30% (jogo; astronautas reais se abrigam na parte mais protegida) */
export const ABRIGO_FATOR = 0.3;

/** abaixo disso a tripulação começa a passar mal */
export const LIMITE_CRITICO = 20;
export const DANO_CRITICO = 5;

/** o fator solar volta sozinho até 1 aos poucos? Não: só com vento/limpeza. */
export const SOLAR_MIN = 0.2;

/** alertas por sol: 2 a 4 (ver alertCount em engine.ts) */
export const MAX_ALERTAS = 4;
/** limite por módulo no painel de energia */
export const ALOCACAO_MAX = 20;
/** sem energia para uma escolha: a tripulação faz "no braço" (jogo) */
export const SAUDE_POR_ENERGIA_FALTANDO = 2;

// ---------------------------------------------------------------- relógio do sol (jogo)
/**
 * Quanto dura um sol no mapa, em segundos de relógio (só conta com o mapa livre: carta, painel ou
 * tutorial abertos pausam o relógio). Cadete tem mais tempo. (jogo)
 */
export const SEGUNDOS_POR_SOL: Record<Level, number> = {
  cadete: 150,
  piloto: 120,
  comandante: 100,
};
/** fração do sol em que começa o entardecer e a noite (0 = manhã, 1 = hora de dormir) (jogo) */
export const ENTARDECER_EM = 0.6;
export const NOITE_EM = 0.82;
/** dormir com alerta sem resposta: a tripulação dorme preocupada e cansada, por alerta (jogo) */
export const SAUDE_POR_ALERTA_PERDIDO = 4;

// ---------------------------------------------------------------- variedade do sorteio (jogo)
/** evento da base que já apareceu nesta missão: peso multiplicado por isto */
export const PESO_JA_VISTO = 0.2;
/** evento que apareceu nas últimas missões deste aparelho (e ainda não nesta) */
export const PESO_RECENTE = 0.35;
/** o mesmo lugar teve alerta ontem: os alertas "passeiam" pela base */
export const PESO_LUGAR_ONTEM = 0.6;
/** quantos eventos das últimas missões o aparelho lembra (só ids de eventos, nada pessoal) */
export const RECENTES_MAX = 40;

/** duração do sol no relógio do jogo: 07:00 → 19:00 (jogo) */
export const HORAS_DO_SOL = 12;
/** andar o lado inteiro do mapa gasta 1 hora (jogo) */
export const HORAS_POR_MAPA_ANDADO = 1;
