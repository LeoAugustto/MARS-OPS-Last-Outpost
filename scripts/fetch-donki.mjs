// Baixa flares reais do DONKI e imprime no formato de src/data/donki.ts.
// Uso:
//   node scripts/fetch-donki.mjs 2024-01-01 2024-12-31
// Fonte principal: serviço web do próprio DONKI (CCMC/NASA), não precisa de chave.
// Fallback: api.nasa.gov (precisa de NASA_API_KEY na variável de ambiente — NUNCA commite a chave).
// Obs. (14/11/2026): api.nasa.gov/DONKI/FLR estava devolvendo 404; o CCMC funcionava.

const [start = '2024-01-01', end = '2024-12-31'] = process.argv.slice(2);
const urls = [
  `https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR?startDate=${start}&endDate=${end}`,
  `https://api.nasa.gov/DONKI/FLR?startDate=${start}&endDate=${end}&api_key=${process.env.NASA_API_KEY || 'DEMO_KEY'}`,
];

let data;
for (const url of urls) {
  try {
    const res = await fetch(url);
    data = await res.json();
    if (Array.isArray(data)) break;
  } catch {
    /* tenta o próximo */
  }
}
if (!Array.isArray(data)) {
  console.error('Resposta inesperada:', JSON.stringify(data).slice(0, 300));
  process.exit(1);
}

const forca = (c) => (c[0] === 'X' ? (parseFloat(c.slice(1)) >= 5 ? 3 : 2) : 1);
const fortes = data.filter((f) => /^[MX]/.test(f.classType ?? ''));
for (const f of fortes) {
  const date = (f.peakTime ?? f.beginTime).slice(0, 10);
  console.log(
    `  { date: '${date}', classType: '${f.classType}', forca: ${forca(f.classType)}, donkiId: '${f.flrID}', link: '${f.link}', verified: true },`,
  );
}
console.error(`${fortes.length} flares M/X de ${data.length} no período.`);
