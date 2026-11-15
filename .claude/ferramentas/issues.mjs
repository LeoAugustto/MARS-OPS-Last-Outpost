// Lê as issues do GitHub do projeto (sem instalar nada; o repositório é público).
// Uso:
//   node .claude/ferramentas/issues.mjs            lista as issues abertas
//   node .claude/ferramentas/issues.mjs 12         mostra a issue 12 inteira, com comentários e links de imagens
// Variáveis: REPO (padrão LeoAugustto/MARS-OPS-Last-Outpost), GITHUB_TOKEN (opcional, só para ter mais limite).
const REPO = process.env.REPO || "LeoAugustto/MARS-OPS-Last-Outpost";
const API = `https://api.github.com/repos/${REPO}`;
const headers = { Accept: "application/vnd.github+json", "User-Agent": "mars-ops-agente-bugs" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GitHub respondeu ${r.status}: ${await r.text()}`);
  return r.json();
}
const imagens = (txt) => [...(txt || "").matchAll(/https:\/\/[^\s)"'<>]+\.(?:png|jpe?g|gif|webp)|https:\/\/github\.com\/user-attachments\/assets\/[\w-]+/gi)].map((m) => m[0]);

const n = process.argv[2];
if (!n) {
  const lista = (await get(`${API}/issues?state=open&per_page=100`)).filter((i) => !i.pull_request);
  if (!lista.length) console.log("Nenhuma issue aberta.");
  for (const i of lista) {
    const rot = i.labels.map((l) => l.name).join(", ");
    console.log(`#${i.number}  ${i.title}${rot ? `  [${rot}]` : ""}  (por ${i.user.login}, ${i.created_at.slice(0, 10)})`);
  }
} else {
  const i = await get(`${API}/issues/${n}`);
  console.log(`#${i.number} ${i.title}  [${i.state}]`);
  console.log(`rótulos: ${i.labels.map((l) => l.name).join(", ") || "-"}   por: ${i.user.login}   em: ${i.created_at}`);
  console.log(`link: ${i.html_url}\n`);
  console.log(i.body || "(sem descrição)");
  const coms = i.comments ? await get(i.comments_url) : [];
  for (const c of coms) console.log(`\n--- comentário de ${c.user.login} (${c.created_at.slice(0, 10)}) ---\n${c.body}`);
  const imgs = [i.body, ...coms.map((c) => c.body)].flatMap(imagens);
  if (imgs.length) console.log(`\nImagens anexadas:\n${imgs.join("\n")}`);
}
