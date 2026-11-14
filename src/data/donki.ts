// Eventos solares REAIS usados nas tempestades do jogo. Dono: Felipe.
//
// Fonte: NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
//   https://ccmc.gsfc.nasa.gov/tools/DONKI/  ·  API: https://api.nasa.gov (endpoint /DONKI/FLR)
//
// ✅ Lista conferida em 14/11/2026 com `node scripts/fetch-donki.mjs <inicio> <fim>` (serviço web do DONKI/CCMC).
//    Cada item tem o ID e o link oficial do DONKI. Esta lista é ARQUIVO selecionado: selo "📚 Evento real".
//    Dado ao vivo vem de src/data/donki-live.ts (selo "📡 ao vivo").

export interface SolarEvent {
  /** data do pico (UTC), AAAA-MM-DD */
  date: string;
  /** classe do flare: C < M < X (cada letra é ~10x mais forte que a anterior) */
  classType: string;
  /** força no jogo: 1 fraca, 2 forte, 3 muito forte */
  forca: 1 | 2 | 3;
  donkiId: string | null;
  link: string | null;
  verified: boolean;
  /** chave de um fato extra em src/content/locales (opcional) */
  factKey?: string;
}

export function forcaDaClasse(classType: string): 1 | 2 | 3 {
  const letra = classType[0]?.toUpperCase();
  const n = parseFloat(classType.slice(1)) || 1;
  if (letra === "X" && n >= 5) return 3;
  if (letra === "X") return 2;
  return 1;
}

export const SOLAR_EVENTS: SolarEvent[] = [
  {
    date: "2017-09-06",
    classType: "X9.3",
    forca: 3,
    donkiId: "2017-09-06T11:53:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/13010/-1",
    verified: true,
  },
  {
    date: "2017-09-10",
    classType: "X8.2",
    forca: 3,
    donkiId: "2017-09-10T15:35:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/13098/-1",
    verified: true,
    factKey: "fato.marte_2017",
  },
  {
    date: "2023-12-14",
    classType: "X2.8",
    forca: 2,
    donkiId: "2023-12-14T16:47:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/28145/-1",
    verified: true,
  },
  {
    date: "2023-12-31",
    classType: "X5.0",
    forca: 3,
    donkiId: "2023-12-31T21:40:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/28419/-1",
    verified: true,
  },
  {
    date: "2024-02-09",
    classType: "X3.3",
    forca: 2,
    donkiId: "2024-02-09T12:53:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/29062/-1",
    verified: true,
  },
  {
    date: "2024-02-22",
    classType: "X6.3",
    forca: 3,
    donkiId: "2024-02-22T22:08:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/29349/-1",
    verified: true,
  },
  {
    date: "2024-05-06",
    classType: "X4.5",
    forca: 2,
    donkiId: "2024-05-06T05:38:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30484/-1",
    verified: true,
  },
  {
    date: "2024-05-11",
    classType: "X5.8",
    forca: 3,
    donkiId: "2024-05-11T01:10:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30711/-1",
    verified: true,
  },
  {
    date: "2024-05-14",
    classType: "X8.7",
    forca: 3,
    donkiId: "2024-05-14T16:46:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30849/-1",
    verified: true,
  },
  {
    date: "2024-10-01",
    classType: "X7.1",
    forca: 3,
    donkiId: "2024-10-01T21:58:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33656/-1",
    verified: true,
  },
  {
    date: "2024-10-03",
    classType: "X9.0",
    forca: 3,
    donkiId: "2024-10-03T12:08:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33693/-1",
    verified: true,
  },
  {
    date: "2024-10-09",
    classType: "X1.8",
    forca: 2,
    donkiId: "2024-10-09T01:25:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33863/-1",
    verified: true,
  },
  {
    date: "2023-12-14",
    classType: "M5.8",
    forca: 1,
    donkiId: "2023-12-14T07:11:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/28139/-1",
    verified: true,
  },
  {
    date: "2024-02-07",
    classType: "M5.1",
    forca: 1,
    donkiId: "2024-02-07T03:04:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/29025/-1",
    verified: true,
  },
  {
    date: "2024-05-04",
    classType: "M9.1",
    forca: 1,
    donkiId: "2024-05-04T06:02:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/30424/-1",
    verified: true,
  },
  {
    date: "2024-10-09",
    classType: "M7.7",
    forca: 1,
    donkiId: "2024-10-09T22:59:00-FLR-001",
    link: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/33897/-1",
    verified: true,
  },
];

/**
 * Hook para dado AO VIVO (Felipe): uma edge function/fetch pode preencher isto com o flare
 * mais recente do DONKI. Se preenchido, o jogo mostra o selo "📡 ao vivo"; senão, "📚 evento real de <data>".
 */
export let LIVE_EVENT: SolarEvent | null = null;
export function setLiveEvent(e: SolarEvent | null): void {
  LIVE_EVENT = e;
}
