// Onde o astronauta pode andar no mapa: SÓ nas estradas da arte (public/assets/map/base*.png).
// Coordenadas em % do mapa (0–100). Se a arte mudar, ajuste ESTRADAS e PORTAS aqui.
// As construções (áreas marcadas pelo time) ficam de fora: não dá para atravessar, só entrar pela porta.
import type { PlaceId } from "@/game/engine";

type Ponto = [number, number];

/** Linhas centrais das estradas (conferidas por cima da arte). */
export const ESTRADAS: [Ponto, Ponto][] = [
  [
    [50, 3],
    [50, 33],
  ], // estrada que vem do alto
  [
    [20, 28],
    [20, 31],
  ], // porta dos painéis
  [
    [20, 31],
    [34, 31],
  ],
  [
    [34, 31],
    [36, 33],
  ],
  [
    [77, 28],
    [77, 31],
  ], // porta da antena
  [
    [77, 31],
    [65, 31],
  ],
  [
    [65, 31],
    [64, 33],
  ],
  [
    [36, 33],
    [64, 33],
  ], // anel em volta da casa
  [
    [64, 33],
    [64, 59],
  ],
  [
    [64, 59],
    [36, 59],
  ],
  [
    [36, 59],
    [36, 33],
  ],
  [
    [14, 59],
    [86, 59],
  ], // avenida: fábrica de ar ↔ estufa
  [
    [15, 57],
    [15, 59],
  ], // porta da fábrica de ar
  [
    [85, 57],
    [85, 59],
  ], // porta da estufa
  [
    [50, 57],
    [50, 59],
  ], // porta da casa
  [
    [33, 59],
    [33, 76],
  ], // desce para o laboratório
  [
    [50, 59],
    [50, 78],
  ], // desce para o rover
  [
    [67, 59],
    [67, 73],
  ], // desce para o abrigo
];

/** Largura da estrada (meia largura, em %). */
const MEIA_LARGURA = 2.4;

/** Onde fica a entrada de cada lugar. Os de baixo entram onde a estrada encosta na construção. */
export const PORTAS: Record<PlaceId, Ponto> = {
  paineis: [20, 28],
  antena: [77, 28],
  ar: [15, 57],
  estufa: [85, 57],
  habitat: [50, 57],
  lab: [33, 76],
  rover: [50, 78],
  abrigo: [67, 73],
};

/** Ao chegar a esta distância (%) da porta, o lugar abre. */
export const RAIO_PORTA = 2.6;
/** Precisa se afastar isto (%) da porta para ela poder abrir de novo. */
export const RAIO_SAIDA = 4.5;

export const INICIO: Ponto = [50, 61];

// ---------------------------------------------------------------- grade 100×100 (1 célula = 1%)
const N = 100;

function distSeg(px: number, py: number, [ax, ay]: Ponto, [bx, by]: Ponto): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

const GRADE: boolean[] = (() => {
  const g = new Array<boolean>(N * N).fill(false);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const cx = x + 0.5;
      const cy = y + 0.5;
      g[y * N + x] = ESTRADAS.some(([a, b]) => distSeg(cx, cy, a, b) <= MEIA_LARGURA);
    }
  return g;
})();

const cel = (v: number) => Math.max(0, Math.min(N - 1, Math.floor(v)));

/** Dá para pisar aqui? */
export function podePisar(x: number, y: number): boolean {
  return GRADE[cel(y) * N + cel(x)] ?? false;
}

/** Ponto de estrada mais perto de (x, y). */
export function maisPerto(x: number, y: number): Ponto {
  let melhor: Ponto = INICIO;
  let d = Infinity;
  for (let gy = 0; gy < N; gy++)
    for (let gx = 0; gx < N; gx++) {
      if (!GRADE[gy * N + gx]) continue;
      const dd = (gx + 0.5 - x) ** 2 + (gy + 0.5 - y) ** 2;
      if (dd < d) {
        d = dd;
        melhor = [gx + 0.5, gy + 0.5];
      }
    }
  return melhor;
}

/**
 * Caminho mais curto pela estrada (busca em largura na grade, 8 direções) de `de` até `para`.
 * Devolve pontos de passagem já simplificados (só as curvas), terminando exatamente em `para`.
 */
export function caminho(de: Ponto, para: Ponto): Ponto[] {
  const ini = maisPerto(de[0], de[1]);
  const fim = maisPerto(para[0], para[1]);
  const si = cel(ini[1]) * N + cel(ini[0]);
  const fi = cel(fim[1]) * N + cel(fim[0]);
  const veio = new Int32Array(N * N).fill(-1);
  veio[si] = si;
  const fila = [si];
  const VIZ: Ponto[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  for (let i = 0; i < fila.length && veio[fi] === -1; i++) {
    const c = fila[i]!;
    const cx = c % N;
    const cy = Math.floor(c / N);
    for (const [dx, dy] of VIZ) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      const n = ny * N + nx;
      if (!GRADE[n] || veio[n] !== -1) continue;
      // diagonal só se as duas laterais também forem estrada (não corta quina)
      if (dx && dy && (!GRADE[cy * N + nx] || !GRADE[ny * N + cx])) continue;
      veio[n] = c;
      fila.push(n);
    }
  }
  if (veio[fi] === -1) return [para];
  const cels: number[] = [];
  for (let c = fi; c !== si; c = veio[c]!) cels.push(c);
  cels.reverse();
  // simplifica: guarda só onde a direção muda
  const pts: Ponto[] = [];
  let dirAnt = "";
  for (let i = 0; i < cels.length; i++) {
    const c = cels[i]!;
    const prox = cels[i + 1];
    const dir = prox === undefined ? "fim" : String(prox - c);
    if (dir !== dirAnt) pts.push([(c % N) + 0.5, Math.floor(c / N) + 0.5]);
    dirAnt = dir;
  }
  pts.push(para);
  return pts;
}

/** Porta mais perto do ponto, se estiver dentro do raio. */
export function portaPerto(x: number, y: number, raio = RAIO_PORTA): PlaceId | null {
  let melhor: PlaceId | null = null;
  let d = raio;
  for (const [pl, [px, py]] of Object.entries(PORTAS) as [PlaceId, Ponto][]) {
    const dd = Math.hypot(px - x, py - y);
    if (dd <= d) {
      d = dd;
      melhor = pl;
    }
  }
  return melhor;
}
