// Eventos solares REAIS usados nas tempestades do jogo. Dono: Felipe.
//
// Fonte: NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
//   https://ccmc.gsfc.nasa.gov/tools/DONKI/  ·  API: https://api.nasa.gov (endpoint /DONKI/FLR)
//
// ⚠️ verified:false = escrito de memória para o esqueleto. Antes da submissão, rode
//    `node scripts/fetch-donki.mjs` (com NASA_API_KEY) e substitua por dados conferidos,
//    preenchendo donkiId e link. Nunca apresente esta lista como "ao vivo": é um arquivo selecionado.

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
  if (letra === 'X' && n >= 5) return 3;
  if (letra === 'X') return 2;
  return 1;
}

export const SOLAR_EVENTS: SolarEvent[] = [
  { date: '2017-09-06', classType: 'X9.3', forca: 3, donkiId: null, link: null, verified: false },
  { date: '2017-09-10', classType: 'X8.2', forca: 3, donkiId: null, link: null, verified: false, factKey: 'fato.marte_2017' },
  { date: '2024-05-14', classType: 'X8.7', forca: 3, donkiId: null, link: null, verified: false },
  { date: '2024-05-20', classType: 'X12', forca: 3, donkiId: null, link: null, verified: false, factKey: 'fato.marte_2024' },
  { date: '2024-10-03', classType: 'X9.0', forca: 3, donkiId: null, link: null, verified: false },
  { date: '2024-02-22', classType: 'X6.3', forca: 3, donkiId: null, link: null, verified: false },
  { date: '2024-05-10', classType: 'X3.9', forca: 2, donkiId: null, link: null, verified: false },
  { date: '2023-12-14', classType: 'X2.8', forca: 2, donkiId: null, link: null, verified: false },
  { date: '2023-12-31', classType: 'X5.0', forca: 3, donkiId: null, link: null, verified: false },
  { date: '2024-03-28', classType: 'X1.1', forca: 2, donkiId: null, link: null, verified: false },
  { date: '2024-06-01', classType: 'M7.3', forca: 1, donkiId: null, link: null, verified: false },
  { date: '2024-08-03', classType: 'M7.7', forca: 1, donkiId: null, link: null, verified: false },
];

/**
 * Hook para dado AO VIVO (Felipe): uma edge function/fetch pode preencher isto com o flare
 * mais recente do DONKI. Se preenchido, o jogo mostra o selo "📡 ao vivo"; senão, "📚 evento real de <data>".
 */
export let LIVE_EVENT: SolarEvent | null = null;
export function setLiveEvent(e: SolarEvent | null): void {
  LIVE_EVENT = e;
}
