// Onde o astronauta pode andar no mapa (public/assets/map/base*.webp).
// Coordenadas em % do mapa (0–100). Se a arte mudar, ajuste PREDIOS e PORTAS aqui.
// Regra: o chão todo (terra e estrada) é livre. Só os PRÉDIOS bloqueiam: não dá para atravessar,
// só entrar pela porta. Os avisos "!" não bloqueiam nada: são só desenho por cima do mapa.
import type { PlaceId } from "@/game/engine";

type Ponto = [number, number];
/** retângulo [x0, y0, x1, y1] em % do mapa */
type Caixa = [number, number, number, number];

/**
 * Onde cada construção está no desenho (conferido por cima da arte 1024×1024).
 * A posição do astronauta é a dos PÉS: se os pés cairiam dentro de uma caixa, ele não passa.
 */
export const PREDIOS: Record<PlaceId, Caixa[]> = {
  paineis: [[7, 9, 36, 27.5]],
  antena: [
    [67, 16, 86, 27.5], // base
    [72, 3, 89.5, 16], // torre e prato
  ],
  ar: [[4.5, 34.5, 28.5, 56]],
  habitat: [[37, 35, 63, 57]],
  estufa: [[71, 35.5, 97, 55.5]],
  lab: [
    [3.5, 63.5, 30.5, 83], // prédio e telescópio
    [4.5, 82.5, 16, 89.5], // caixas de amostras
  ],
  rover: [[41, 75, 59.5, 89]], // o carro (a garagem em volta é chão)
  abrigo: [[68, 65, 98.5, 85]],
};

/** Na frente de cada porta (do lado de fora). O rover se "entra" chegando pela frente dele. */
export const PORTAS: Record<PlaceId, Ponto> = {
  paineis: [20, 29.5],
  antena: [77, 29.5],
  ar: [15.5, 57.5],
  habitat: [50, 58.5],
  estufa: [84, 57.5],
  lab: [19.5, 85],
  rover: [50, 73.5],
  abrigo: [83, 86.5],
};

/**
 * Teclado: o lugar abre quando o astronauta ANDA CONTRA o prédio bem na frente da porta
 * (como empurrar a porta). Passar perto, de lado, não abre mais nada.
 */
export const RAIO_PORTA = 3.5;
/** Precisa se afastar isto (%) da porta para ela poder abrir de novo. */
export const RAIO_SAIDA = 4.5;

export const INICIO: Ponto = [50, 61];

/** Limites dos pés para o desenho do astronauta caber no mapa (iguais aos do BaseMap). */
const X_MIN = 5.5;
const X_MAX = 94.5;
const Y_MIN = 12;
const Y_MAX = 96;

/** Qual prédio está neste ponto (ou nenhum). */
export function predioEm(x: number, y: number): PlaceId | null {
  for (const [pl, caixas] of Object.entries(PREDIOS) as [PlaceId, Caixa[]][])
    if (caixas.some(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1)) return pl;
  return null;
}

/** Dá para pisar aqui? (dentro do mapa e fora dos prédios) */
export function podePisar(x: number, y: number): boolean {
  return x >= X_MIN && x <= X_MAX && y >= Y_MIN && y <= Y_MAX && predioEm(x, y) === null;
}

// ---------------------------------------------------------------- grade 100×100 (1 célula = 1%)
const N = 100;

const GRADE: boolean[] = (() => {
  const g = new Array<boolean>(N * N).fill(false);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) g[y * N + x] = podePisar(x + 0.5, y + 0.5);
  return g;
})();

const cel = (v: number) => Math.max(0, Math.min(N - 1, Math.floor(v)));

/** Ponto livre mais perto de (x, y) (ex.: tocou em cima de um prédio ou fora da borda). */
export function maisPerto(x: number, y: number): Ponto {
  if (podePisar(x, y)) return [x, y];
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

/** A linha reta de a até b não passa por nenhum prédio? */
function retaLivre([ax, ay]: Ponto, [bx, by]: Ponto): boolean {
  const passos = Math.ceil(Math.hypot(bx - ax, by - ay) / 0.4);
  for (let i = 0; i <= passos; i++) {
    const t = passos ? i / passos : 0;
    if (!podePisar(ax + (bx - ax) * t, ay + (by - ay) * t)) return false;
  }
  return true;
}

/**
 * Caminho de `de` até `para` contornando os prédios. Se a reta estiver livre, vai reto.
 * Senão, busca em largura na grade (8 direções) e guarda só as curvas.
 */
export function caminho(de: Ponto, para: Ponto): Ponto[] {
  const destino = maisPerto(para[0], para[1]);
  if (retaLivre(de, destino)) return [destino];
  const ini = maisPerto(de[0], de[1]);
  const si = cel(ini[1]) * N + cel(ini[0]);
  const fi = cel(destino[1]) * N + cel(destino[0]);
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
      // diagonal só se as duas laterais também forem livres (não corta quina de prédio)
      if (dx && dy && (!GRADE[cy * N + nx] || !GRADE[ny * N + cx])) continue;
      veio[n] = c;
      fila.push(n);
    }
  }
  if (veio[fi] === -1) return [destino];
  const cels: number[] = [];
  for (let c = fi; c !== si; c = veio[c]!) cels.push(c);
  cels.reverse();
  // simplifica: pula pontos enquanto a reta continuar livre (caminho mais natural)
  const pts: Ponto[] = [];
  let atual: Ponto = de;
  let i = 0;
  while (i < cels.length) {
    let j = i;
    while (j + 1 < cels.length) {
      const c = cels[j + 1]!;
      if (!retaLivre(atual, [(c % N) + 0.5, Math.floor(c / N) + 0.5])) break;
      j++;
    }
    const c = cels[j]!;
    atual = [(c % N) + 0.5, Math.floor(c / N) + 0.5];
    pts.push(atual);
    i = j + 1;
  }
  pts.push(destino);
  return pts;
}

/**
 * Teclado: o astronauta tentou andar para dentro de um prédio. Se ele estiver na frente da
 * porta desse prédio, devolve o lugar para abrir; senão, nada (é só parede).
 */
export function bateuNaPorta(x: number, y: number, tx: number, ty: number): PlaceId | null {
  const pl = predioEm(tx, ty);
  if (!pl) return null;
  const [px, py] = PORTAS[pl];
  return Math.hypot(px - x, py - y) <= RAIO_PORTA ? pl : null;
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
