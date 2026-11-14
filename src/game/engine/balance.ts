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
