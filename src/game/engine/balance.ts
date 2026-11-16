// Números de balanceamento. Dono: Vinicius.
// Regra: número que vem de dado real tem comentário com a fonte (ver docs/DATA_SOURCES.md).
// Número inventado para jogabilidade fica marcado como "jogo" — e nunca é apresentado como real.

import type { Level } from "./types";

/**
 * Por nível (jogo). consumoAr/consumoComida: quanto a tripulação gasta por sol. A divisão de
 * energia padrão NÃO cobre esse gasto: a criança precisa ajustar ar e estufa, e isso tira
 * energia da ciência — é aí que ela pode errar e aprender.
 */
export const LEVELS: Record<
  Level,
  {
    totalSols: number;
    metaCiencia: number;
    doseMult: number;
    consumoAr: number;
    consumoComida: number;
    /** ar e comida guardados no começo da missão */
    inicioAr: number;
    inicioComida: number;
  }
> = {
  cadete: { inicioAr: 38, inicioComida: 32, totalSols: 7, metaCiencia: 18, doseMult: 0.8, consumoAr: 16, consumoComida: 12 }, // 7–9 anos
  piloto: { inicioAr: 40, inicioComida: 30, totalSols: 10, metaCiencia: 34, doseMult: 1.6, consumoAr: 16, consumoComida: 12 },
  comandante: { inicioAr: 38, inicioComida: 28, totalSols: 10, metaCiencia: 36, doseMult: 2.8, consumoAr: 16, consumoComida: 13 },
};

export const START = {
  ar: 80,
  comida: 60, // comida embalada trazida da Terra (jogo)
  saude: 100,
  bateria: 2,
};

/** energia produzida pelos painéis num sol com céu limpo (jogo) */
export const PAINEIS = 11;
export const BATERIA_MAX = 10;

/** consumo diário da tripulação no nível mais fácil (jogo); cada nível tem o seu em LEVELS */
export const CONSUMO_AR = LEVELS.cadete.consumoAr;
export const CONSUMO_COMIDA = LEVELS.cadete.consumoComida;

/** quanto cada 1 de energia rende (jogo) */
export const AR_POR_ENERGIA = 4;
export const COMIDA_POR_ENERGIA = 3;
export const CIENCIA_POR_ENERGIA = 2;
/** energia para o robô cobrir a base com mais um nível de areia (regolito) */
export const ENERGIA_POR_ESCUDO = 2;
export const ESCUDO_MAX = 4;
/** cada nível de escudo corta 15% da radiação (jogo, inspirado em blindagem por regolito) */
export const ESCUDO_REDUCAO = 0.2;

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
/** alertas por sol em cada nível (jogo): +1 com a base tranquila, −1 com recurso crítico (mínimo 2) */
export const ALERTAS_POR_NIVEL: Record<Level, number> = { cadete: 3, piloto: 3, comandante: 3 };
/** com ar, comida e saúde todos acima disto, o sol tem 1 alerta a mais (jogo) */
export const ALERTAS_MAIS_ACIMA = 45;
/** dia de rádio mudo: o laboratório perde pelo menos isto de ciência (dados que não chegam à Terra) (jogo) */
export const RADIO_MUDO_PERDA = 2;
/** evento real do Sol: pelo menos 1 a cada tantos sóis, e esta chance nos outros dias (jogo) */
export const SOL_A_CADA = 3;
export const CHANCE_SOL_EXTRA = 0.2;
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
  // 16 s por hora do relógio: a noite (18h30) chega em ~3 min de mapa livre
  cadete: 272,
  // 13 s por hora: ~2,5 min até a noite
  piloto: 221,
  // 11 s por hora: ~2 min até a noite
  comandante: 187,
};
/** duração do sol no relógio do jogo: 07:00 → 24:00 (meia-noite: o relógio para e espera a cama) (jogo) */
export const HORAS_DO_SOL = 17;
/** fração do sol em que começa o entardecer (16h00) e a noite (19h00) (0 = 07:00, 1 = 24:00) (jogo)
 * 3 horas de fim de tarde: dá tempo de ver o aviso, resolver o que falta e ir para a cama */
export const ENTARDECER_EM = 9 / HORAS_DO_SOL;
export const NOITE_EM = 12 / HORAS_DO_SOL;
/** a noite chegou e a tripulação ainda está acordada: cansaço, uma vez por sol (jogo) */
export const SAUDE_AO_ANOITECER = 4;
/** dormir com alerta sem resposta: a tripulação dorme preocupada, por alerta (jogo) */
export const SAUDE_POR_ALERTA_PERDIDO = 2;
/** estrelas de ciência no fim: 2 estrelas a partir desta fração da meta, 3 na meta (jogo) */
export const ESTRELA_2_EM = 0.4;

// ---------------------------------------------------------------- variedade do sorteio (jogo)
/** evento da base que já apareceu nesta missão: peso multiplicado por isto */
export const PESO_JA_VISTO = 0.2;
/** evento que apareceu nas últimas missões deste aparelho (e ainda não nesta) */
export const PESO_RECENTE = 0.35;
/** o mesmo lugar teve alerta ontem: os alertas "passeiam" pela base */
export const PESO_LUGAR_ONTEM = 0.6;
/** quantos eventos das últimas missões o aparelho lembra (só ids de eventos, nada pessoal) */
export const RECENTES_MAX = 40;

/** andar o lado inteiro do mapa gasta 1 hora (jogo) */
export const HORAS_POR_MAPA_ANDADO = 1;
