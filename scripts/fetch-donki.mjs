// Baixa flares reais do DONKI e imprime no formato de src/data/donki.ts.
// Uso:
//   NASA_API_KEY=suachave node scripts/fetch-donki.mjs 2024-01-01 2024-12-31
// Chave grátis em https://api.nasa.gov (a DEMO_KEY estoura rápido em rede compartilhada).
// NUNCA commite a chave. Ela fica só na variável de ambiente.

const key = process.env.NASA_API_KEY || 'DEMO_KEY';
const [start = '2024-01-01', end = '2024-12-31'] = process.argv.slice(2);
const url = `https://api.nasa.gov/DONKI/FLR?startDate=${start}&endDate=${end}&api_key=${key}`;

const res = await fetch(url);
const data = await res.json();
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
