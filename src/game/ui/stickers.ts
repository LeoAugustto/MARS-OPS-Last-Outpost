// Figurinhas de conquista: ganhas no fim da missão, guardadas só neste aparelho.
// Ícones: por enquanto, os ícones pixel que já existem (ver docs/PENDENCIAS-PIXEL.md para arte própria).
import { estrelasDe, type GameState } from "@/game/engine";

export interface Sticker {
  id: string;
  icone: string;
  ganhou: (s: GameState) => boolean;
}

const COLHEITAS = [
  "colheita_boa",
  "rabanete",
  "rabanete_de_novo",
  "alface_pronta",
  "batata_pronta",
  "pimentas_vermelhas",
];

export const STICKERS: Sticker[] = [
  {
    id: "sobreviveu",
    icone: "/assets/ui/coracao.png",
    ganhou: (s) => estrelasDe(s) > 0,
  },
  {
    id: "cientista",
    icone: "/assets/ui/microscopio.png",
    ganhou: (s) => s.ciencia >= s.metaCiencia,
  },
  {
    id: "tempestade",
    icone: "/assets/ui/raio.png",
    ganhou: (s) => s.realEvents.length > 0 && s.status !== "resgate",
  },
  {
    id: "ao_vivo",
    icone: "/assets/icons/antena.png",
    ganhou: (s) => s.realEvents.some((r) => r.event.live),
  },
  { id: "escudo", icone: "/assets/icons/abrigo.png", ganhou: (s) => s.escudo >= 4 },
  {
    id: "colheita",
    icone: "/assets/ui/batata.png",
    ganhou: (s) => s.log.some((l) => l.eventId && COLHEITAS.includes(l.eventId)),
  },
  {
    id: "comandante",
    icone: "/assets/ui/estrela.png",
    ganhou: (s) => s.level === "comandante" && estrelasDe(s) > 0,
  },
];

const KEY = "marsops:figurinhas";

export function loadStickers(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Guarda as figurinhas desta missão e devolve só as NOVAS. */
export function collectStickers(s: GameState): string[] {
  const tinha = loadStickers();
  const novas = STICKERS.filter((k) => k.ganhou(s) && !tinha.includes(k.id)).map((k) => k.id);
  if (novas.length) {
    try {
      localStorage.setItem(KEY, JSON.stringify([...tinha, ...novas]));
    } catch {
      /* sem storage: só não guarda */
    }
  }
  return novas;
}
