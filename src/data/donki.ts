// Eventos solares REAIS do DONKI (NASA). Dono: Felipe.
//
// Fonte: DONKI — https://ccmc.gsfc.nasa.gov/tools/DONKI/  (serviço web: https://ccmc.gsfc.nasa.gov/DONKI/WS/get/…)
//
// O jogo busca AO VIVO (src/data/donki-live.ts). Esta lista é a RESERVA conferida (14/11/2026),
// usada só se a NASA não responder. Cada item tem ID e link oficial do DONKI.
// Selo no jogo: live=true → "📡 ao vivo"; live=false → "📚 evento real de <data>".

/** FLR = clarão solar · CME = nuvem de partículas · SEP = chuva de partículas · GST = tempestade magnética na Terra */
export type DonkiKind = "FLR" | "CME" | "SEP" | "GST";

export interface SolarEvent {
  kind: DonkiKind;
  /** AAAA-MM-DD (UTC) */
  date: string;
  /** o que mostrar como "tamanho": classe do clarão (X9.3), velocidade da nuvem (km/s) ou nível Kp */
  label: string;
  /** força no jogo: 1 fraca · 2 forte · 3 muito forte */
  forca: 1 | 2 | 3;
  donkiId: string;
  link: string;
  /** veio da busca ao vivo agora (últimos dias)? */
  live: boolean;
}

export function forcaDoClarao(classType: string): 1 | 2 | 3 {
  const letra = classType.charAt(0).toUpperCase();
  const n = parseFloat(classType.slice(1)) || 1;
  if (letra === "X" && n >= 5) return 3;
  if (letra === "X") return 2;
  return 1;
}
export function forcaDaNuvem(speedKmS: number): 1 | 2 | 3 {
  if (speedKmS >= 2000) return 3;
  if (speedKmS >= 1000) return 2;
  return 1;
}
export function forcaDaTempestade(kp: number): 1 | 2 | 3 {
  if (kp >= 8) return 3;
  if (kp >= 7) return 2;
  return 1;
}

const V = "https://ccmc.gsfc.nasa.gov/DONKI/view/";
const flr = (date: string, cls: string, id: string, n: number): SolarEvent => ({
  kind: "FLR",
  date,
  label: cls,
  forca: forcaDoClarao(cls),
  donkiId: id,
  link: `${V}FLR/${n}/-1`,
  live: false,
});
const cme = (date: string, speed: number, id: string, n: number): SolarEvent => ({
  kind: "CME",
  date,
  label: `${speed} km/s`,
  forca: forcaDaNuvem(speed),
  donkiId: id,
  link: `${V}CMEAnalysis/${n}/-1`,
  live: false,
});
const sep = (date: string, id: string, n: number, forca: 1 | 2 | 3): SolarEvent => ({
  kind: "SEP",
  date,
  label: "SEP",
  forca,
  donkiId: id,
  link: `${V}SEP/${n}/-1`,
  live: false,
});
const gst = (date: string, kp: number, id: string, n: number): SolarEvent => ({
  kind: "GST",
  date,
  label: `Kp ${kp}`,
  forca: forcaDaTempestade(kp),
  donkiId: id,
  link: `${V}GST/${n}/-1`,
  live: false,
});

export const RESERVE_EVENTS: SolarEvent[] = [
  // clarões (FLR)
  flr("2017-09-06", "X9.3", "2017-09-06T11:53:00-FLR-001", 13010),
  flr("2017-09-10", "X8.2", "2017-09-10T15:35:00-FLR-001", 13098),
  flr("2023-12-14", "X2.8", "2023-12-14T16:47:00-FLR-001", 28145),
  flr("2023-12-31", "X5.0", "2023-12-31T21:40:00-FLR-001", 28419),
  flr("2024-02-22", "X6.3", "2024-02-22T22:08:00-FLR-001", 29349),
  flr("2024-05-14", "X8.7", "2024-05-14T16:46:00-FLR-001", 30849),
  flr("2024-10-03", "X9.0", "2024-10-03T12:08:00-FLR-001", 33693),
  flr("2024-05-04", "M9.1", "2024-05-04T06:02:00-FLR-001", 30424),
  // nuvens de partículas (CME, velocidade medida)
  cme("2017-09-10", 2650, "2017-09-10T16:09:00-CME-001", 13115),
  cme("2017-09-06", 1238, "2017-09-06T12:24:00-CME-001", 13032),
  cme("2023-12-31", 2184, "2023-12-31T22:00:00-CME-001", 28429),
  cme("2024-02-12", 3529, "2024-02-12T06:36:00-CME-001", 29167),
  cme("2024-02-09", 2534, "2024-02-09T13:23:00-CME-001", 29086),
  cme("2024-02-16", 1613, "2024-02-16T01:36:00-CME-001", 29268),
  cme("2023-12-12", 943, "2023-12-12T19:12:00-CME-001", 28124),
  cme("2024-05-08", 1156, "2024-05-08T12:24:00-CME-001", 30573),
  // chuvas de partículas (SEP)
  sep("2017-09-10", "2017-09-10T16:25:00-SEP-001", 13101, 3),
  sep("2017-09-04", "2017-09-04T22:56:00-SEP-001", 13004, 2),
  sep("2023-12-15", "2023-12-15T10:05:00-SEP-001", 28177, 1),
  sep("2024-01-02", "2024-01-02T23:22:00-SEP-001", 28444, 2),
  sep("2024-02-09", "2024-02-09T15:09:00-SEP-001", 29076, 2),
  sep("2024-05-10", "2024-05-10T12:59:00-SEP-001", 30675, 2),
  // tempestades magnéticas na Terra (GST, nível Kp 0–9)
  gst("2024-05-10", 9, "2024-05-10T15:00:00-GST-001", 30693),
  gst("2024-10-10", 8.67, "2024-10-10T15:00:00-GST-001", 33913),
  gst("2017-09-07", 8, "2017-09-07T21:00:00-GST-001", 13054),
  gst("2024-10-07", 7.33, "2024-10-07T12:00:00-GST-001", 33817),
  gst("2023-12-18", 6, "2023-12-18T06:00:00-GST-001", 28236),
];
