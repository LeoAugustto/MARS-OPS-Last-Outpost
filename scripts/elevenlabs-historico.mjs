// Baixa do histórico do ElevenLabs as falas já geradas (não gasta créditos) e salva cada uma
// com o nome certo em public/audio/voz/<idioma>/<personagem>/<chave>.mp3, achando a fala pelo
// texto nas planilhas docs/audio/vozes/*.csv. Fica a tomada mais recente de cada fala.
// Uso:  node --env-file=.env.local scripts/elevenlabs-historico.mjs        (só mostra o que faria)
//       node --env-file=.env.local scripts/elevenlabs-historico.mjs baixar
// A chave fica em .env.local (ELEVENLABS_API_KEY), nunca no código.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("Falta ELEVENLABS_API_KEY (rode com --env-file=.env.local)");
  process.exit(1);
}
const API = "https://api.elevenlabs.io/v1";
const H = { "xi-api-key": KEY };
const PLAN = "docs/audio/vozes";
const DEST = "public/audio/voz";
const baixar = process.argv[2] === "baixar";

const norm = (t) =>
  (t || "")
    .replace(/\[[^\]]*\]/g, " ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "");

function personagemDaVoz(nome) {
  const n = (nome || "").toLowerCase();
  if (n.includes("menina")) return "astronauta_menina";
  if (n.includes("menino")) return "astronauta_menino";
  if (n.includes("rovi")) return "rovi";
  if (n.includes("controle") || n.includes("mission")) return "controle";
  return null;
}

// texto normalizado -> [{ lang, chave, personagem fixo (ou null) }]
const porTexto = new Map();
for (const f of readdirSync(PLAN).filter((f) => f.endsWith(".csv"))) {
  const linhas = readFileSync(join(PLAN, f), "utf8").replace(/^﻿/, "").split(/\r?\n/).slice(1);
  for (const l of linhas) {
    if (!l.trim()) continue;
    const c = l.split(";");
    const [lang, pers, arqChave] = c[0].split("/");
    const chave = arqChave.replace(/\.mp3$/, "");
    const texto = c[c.length - 1];
    const fixo = pers === "astronauta_X" ? null : pers;
    const k = norm(texto);
    if (!porTexto.has(k)) porTexto.set(k, []);
    porTexto.get(k).push({ lang, chave, fixo, original: texto });
  }
}

const itens = [];
for (let depois; ; ) {
  const u = new URL(`${API}/history`);
  u.searchParams.set("page_size", "1000");
  if (depois) u.searchParams.set("start_after_history_item_id", depois);
  const r = await fetch(u, { headers: H });
  if (!r.ok) throw new Error(`history ${r.status}`);
  const j = await r.json();
  itens.push(...j.history);
  if (!j.has_more) break;
  depois = j.last_history_item_id;
}

// fala reescrita (ex.: "-4" virou "menos quatro"): acha a linha da planilha com mais palavras em comum
const palavras = (t) =>
  new Set(
    (t || "").replace(/\[[^\]]*\]/g, " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .split(/[^a-z]+/).filter((w) => w.length > 2),
  );
const textos = [...porTexto.entries()].map(([k, v]) => ({ v, w: palavras(v[0].original) }));
function parecido(texto) {
  const w = palavras(texto);
  let melhor = null, nota = 0;
  for (const t of textos) {
    let comum = 0;
    for (const x of w) if (t.w.has(x)) comum++;
    const n = comum / Math.max(w.size, t.w.size, 1);
    if (n > nota) { nota = n; melhor = t.v; }
  }
  return nota >= 0.6 ? melhor : null;
}

const escolhido = new Map(); // destino -> item mais recente
const semPar = [];
for (const it of itens) {
  const d = it.dialogue?.[0];
  const texto = d?.text ?? it.text;
  const voz = d?.voice_name ?? it.voice_name;
  const cands = porTexto.get(norm(texto)) ?? parecido(texto);
  if (!cands) {
    semPar.push(`${voz} | ${(texto || "").slice(0, 60)}`);
    continue;
  }
  for (const c of cands) {
    const pers = c.fixo ?? personagemDaVoz(voz);
    if (!pers) continue;
    if (c.fixo && personagemDaVoz(voz) && personagemDaVoz(voz) !== c.fixo) continue;
    const dest = join(DEST, c.lang, pers, `${c.chave}.mp3`);
    const atual = escolhido.get(dest);
    if (!atual || it.date_unix > atual.date_unix) escolhido.set(dest, it);
  }
}

const porIdioma = {};
for (const dest of escolhido.keys()) {
  const lang = dest.split(/[\\/]/)[3];
  porIdioma[lang] = (porIdioma[lang] ?? 0) + 1;
}
console.log("histórico:", itens.length, "| falas reconhecidas:", escolhido.size, porIdioma, "| sem par:", semPar.length);
if (!baixar) {
  console.log(semPar.slice(0, 10).join("\n"));
  process.exit(0);
}
let ok = 0;
for (const [dest, it] of escolhido) {
  const r = await fetch(`${API}/history/${it.history_item_id}/audio`, { headers: H });
  if (!r.ok) {
    console.error("falhou", dest, r.status);
    continue;
  }
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  ok++;
}
console.log("salvos", ok, "em", DEST, existsSync(DEST) ? "" : "(pasta não criada)");
