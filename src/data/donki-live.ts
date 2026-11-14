// Busca AO VIVO o flare solar mais forte dos últimos dias no DONKI. Dono: Felipe.
// - Não precisa de chave: o serviço web do DONKI (CCMC/NASA) libera CORS (Access-Control-Allow-Origin: *).
// - Se falhar (sem internet, timeout, nada forte na semana), o jogo segue com a lista conferida de donki.ts.
// - Chame UMA vez ao abrir /play: `loadLiveSolarEvent().then(setLiveEvent)`.

import { forcaDaClasse, type SolarEvent } from './donki';

const BASE = 'https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR';

interface DonkiFlare {
  flrID: string;
  classType?: string;
  peakTime?: string;
  beginTime: string;
  link?: string;
}

/** intensidade comparável: X1 = 100, M1 = 10, C1 = 1 (escala do GOES) */
const intensidade = (c: string) => ({ X: 100, M: 10, C: 1 }[c[0]] ?? 0) * (parseFloat(c.slice(1)) || 1);

export async function loadLiveSolarEvent(days = 7, timeoutMs = 5000): Promise<SolarEvent | null> {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86_400_000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}?startDate=${fmt(start)}&endDate=${fmt(end)}`, { signal: ctrl.signal });
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return null;
    const fortes = (data as DonkiFlare[]).filter((f) => /^[MX]/.test(f.classType ?? ''));
    if (!fortes.length) return null;
    const maior = fortes.reduce((a, b) => (intensidade(b.classType!) > intensidade(a.classType!) ? b : a));
    return {
      date: (maior.peakTime ?? maior.beginTime).slice(0, 10),
      classType: maior.classType!,
      forca: forcaDaClasse(maior.classType!),
      donkiId: maior.flrID,
      link: maior.link ?? null,
      verified: true,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
