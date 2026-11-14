// ARTE DO JOGO — dono: Yckler (+ time de arte).
// Coloque as imagens em public/assets/ com EXATAMENTE estes nomes e mude `ready` para true.
// Enquanto `ready` for false, o jogo usa a arte provisória (formas + emoji).
// Estilo: pixel art (as imagens são desenhadas com image-rendering: pixelated).

import type { PlaceId } from "@/game/engine";

export const ART = {
  /** Mapa da base visto de cima, QUADRADO (ex.: 1024×1024). Mesma disposição de docs/GAME_DESIGN.md. */
  map: { ready: false, src: "/assets/map/base.png" },

  /**
   * Astronauta andando em 8 direções (fundo transparente, quadrado, ex.: 128×128 cada).
   * n = para cima · s = para baixo · e = direita · w = esquerda · ne/nw/se/sw = diagonais.
   */
  astronaut: {
    ready: false,
    src: {
      n: "/assets/astronaut/n.png",
      ne: "/assets/astronaut/ne.png",
      e: "/assets/astronaut/e.png",
      se: "/assets/astronaut/se.png",
      s: "/assets/astronaut/s.png",
      sw: "/assets/astronaut/sw.png",
      w: "/assets/astronaut/w.png",
      nw: "/assets/astronaut/nw.png",
    },
  },

  /**
   * Retratos para a CAIXA DE DIÁLOGO (pixel art, quadrado, ex.: 256×256, fundo opaco ou transparente).
   * Sem logo da NASA (regras de uso de marca da NASA). Personagens genéricos.
   */
  portraits: {
    ready: false,
    src: {
      astronauta: "/assets/portraits/astronauta.png",
      controle: "/assets/portraits/controle.png",
      rovi: "/assets/portraits/rovi.png",
    },
  },

  /** Ilustração de DENTRO de cada lugar (cena com o astronauta), larga (ex.: 1280×720). Aparece atrás do card. */
  places: {
    ready: false,
    src: {
      habitat: "/assets/places/habitat.png",
      paineis: "/assets/places/paineis.png",
      antena: "/assets/places/antena.png",
      ar: "/assets/places/ar.png",
      estufa: "/assets/places/estufa.png",
      lab: "/assets/places/lab.png",
      abrigo: "/assets/places/abrigo.png",
      rover: "/assets/places/rover.png",
    } satisfies Record<PlaceId, string>,
  },
} as const;

export type Dir8 = keyof typeof ART.astronaut.src;

/** Direção (8) a partir do movimento. y cresce para baixo. */
export function dirFrom(dx: number, dy: number): Dir8 {
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI; // 0 = direita, 90 = baixo
  const dirs: Dir8[] = ["e", "se", "s", "sw", "w", "nw", "n", "ne"];
  return dirs[Math.round(((ang + 360) % 360) / 45) % 8]!;
}

export type Speaker = keyof typeof ART.portraits.src;
