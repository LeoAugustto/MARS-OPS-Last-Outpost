// ARTE DO JOGO (pixel art) — dono: Yckler + time de arte. Detalhes em docs/ART.md.
// Arquivos em public/assets/. Originais (sem cortar) em art-source/.
// Grupo com `ready: false` usa a arte provisória (emoji).

import type { PlaceId } from "@/game/engine";

/** Personagem escolhido pela criança: menina (f) ou menino (m). */
export type Gender = "f" | "m";
export type Dir8 = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";
/** Hora do sol no mapa: muda a arte do mapa (relógio em GameApp.tsx). */
export type Periodo = "dia" | "entardecer" | "noite";

export const ART = {
  /** Mapa da base visto de cima (1024×1024). */
  map: { ready: true, src: "/assets/map/base.png" },

  /** O mesmo mapa em 3 horas do sol (1024×1024, mesmas posições do mapa de cima). */
  mapPeriodo: {
    dia: "/assets/map/base_dia.webp",
    entardecer: "/assets/map/base_entardecer.webp",
    noite: "/assets/map/base_noite.webp",
  } as Record<Periodo, string>,

  /** Astronauta andando: 8 direções × 3 quadros (128×128, pés embaixo). Tocar 0,1,2,1. */
  astronaut: {
    ready: true,
    frame: (g: Gender, d: Dir8, i: number) => `/assets/astronaut/${g}/${d}_${i}.png`,
  },

  /** Retratos da caixa de diálogo (256×256). Controle de Missão e Rovi ainda sem arte. */
  portraits: {
    astronauta: { ready: true, src: (g: Gender) => `/assets/portraits/astronauta_${g}.png` },
    controle: { ready: false, src: "/assets/portraits/controle.png" },
    rovi: { ready: false, src: "/assets/portraits/rovi.png" },
  },

  /** Ícones redondos dos lugares (128×128). O rover não tem ícone ainda. */
  icons: {
    habitat: "/assets/icons/habitat.png",
    paineis: "/assets/icons/paineis.png",
    antena: "/assets/icons/antena.png",
    ar: "/assets/icons/ar.png",
    estufa: "/assets/icons/estufa.png",
    lab: "/assets/icons/lab.png",
    abrigo: "/assets/icons/abrigo.png",
  } as Partial<Record<PlaceId, string>>,

  /** Cena de DENTRO de cada lugar (1280×560) — ainda sem arte. */
  places: {
    ready: false,
    src: (p: PlaceId) => `/assets/places/${p}.png`,
  },
} as const;

/** Direção (8) a partir do movimento. y cresce para baixo. */
export function dirFrom(dx: number, dy: number): Dir8 {
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI; // 0 = direita, 90 = baixo
  const dirs: Dir8[] = ["e", "se", "s", "sw", "w", "nw", "n", "ne"];
  return dirs[Math.round(((ang + 360) % 360) / 45) % 8]!;
}

export type Speaker = "astronauta" | "controle" | "rovi";
