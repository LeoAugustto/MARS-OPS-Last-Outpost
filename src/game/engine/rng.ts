// Aleatório com semente (mulberry32). Mesma semente = mesma missão.
// Nunca use Math.random() no motor: quebra o "voltar ao sol" e os testes.

import type { GameState } from "./types";

/** Cria um gerador que avança s.rng a cada chamada. */
export function rngFor(s: GameState): () => number {
  return () => {
    s.rng = (s.rng + 0x6d2b79f5) | 0;
    let t = s.rng;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function pickWeighted<T>(
  rng: () => number,
  items: { item: T; weight: number }[],
): T | undefined {
  const total = items.reduce((acc, i) => acc + Math.max(0, i.weight), 0);
  if (total <= 0) return undefined;
  let r = rng() * total;
  for (const i of items) {
    r -= Math.max(0, i.weight);
    if (r < 0) return i.item;
  }
  return items[items.length - 1]?.item;
}
