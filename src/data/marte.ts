// Distância Terra–Marte de HOJE e quanto tempo uma mensagem de rádio leva para ir de um ao outro.
// Modelo simples (órbitas elípticas aproximadas, elementos médios J2000 da NASA/JPL "Keplerian Elements
// for Approximate Positions of the Major Planets"). Erro de poucos % — suficiente para "cerca de X minutos".

const GRAU = Math.PI / 180;
/** minutos que a luz leva para andar 1 unidade astronômica (149,6 milhões de km) */
const LUZ_MIN_POR_UA = 8.317;

interface Elementos {
  a: number; // semieixo maior (UA)
  e: number; // excentricidade
  L: number; // longitude média em J2000 (graus)
  Lpor: number; // graus por dia
  w: number; // longitude do periélio (graus)
}
const TERRA: Elementos = {
  a: 1.00000261,
  e: 0.01671123,
  L: 100.46457166,
  Lpor: 0.9856091,
  w: 102.93768193,
};
const MARTE: Elementos = {
  a: 1.52371034,
  e: 0.0933941,
  L: -4.55343205,
  Lpor: 0.5240384,
  w: -23.94362959,
};

/** posição (x, y) em UA no plano da órbita, num dia contado a partir de J2000 */
function posicao(p: Elementos, dias: number): [number, number] {
  const M = ((p.L + p.Lpor * dias - p.w) % 360) * GRAU; // anomalia média
  let E = M;
  for (let i = 0; i < 6; i++) E = E - (E - p.e * Math.sin(E) - M) / (1 - p.e * Math.cos(E)); // Kepler
  const x = p.a * (Math.cos(E) - p.e);
  const y = p.a * Math.sqrt(1 - p.e * p.e) * Math.sin(E);
  const w = p.w * GRAU;
  return [x * Math.cos(w) - y * Math.sin(w), x * Math.sin(w) + y * Math.cos(w)];
}

/** Distância Terra–Marte (UA) numa data. */
export function distanciaTerraMarte(data: Date = new Date()): number {
  const dias = (data.getTime() - Date.UTC(2000, 0, 1, 12)) / 86_400_000;
  const [tx, ty] = posicao(TERRA, dias);
  const [mx, my] = posicao(MARTE, dias);
  return Math.hypot(mx - tx, my - ty);
}

/** Minutos que uma mensagem de rádio (velocidade da luz) leva entre a Terra e Marte, hoje. */
export function atrasoRadioMin(data: Date = new Date()): number {
  return Math.round(distanciaTerraMarte(data) * LUZ_MIN_POR_UA);
}
