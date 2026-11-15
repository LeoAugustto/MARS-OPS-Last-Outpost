// Tira fotos do jogo em vários tamanhos de tela (PC e celular) com o Chrome em modo headless.
// Também guarda os erros do console de cada tamanho (erros.txt), para ver bug que não aparece na tela.
//
// Uso:
//   node .claude/ferramentas/fotos.mjs <roteiro.json> <pasta-de-saida> [tamanhos]
//   tamanhos: lista separada por vírgula (padrão: pc,cel). Opções: pc, pc-grande, notebook,
//             tablet, cel, cel-deitado, ou LARGURAxALTURA (ex.: 412x915).
// Variáveis: BASE (padrão http://localhost:5186), CHROME (caminho do Chrome, se não achar sozinho).
//
// Roteiro: lista de passos [tipo, valor]. Tipos:
//   ["vai", "/play"]            abre o endereço e espera a página carregar
//   ["js", "codigo"]            roda código na página (pode usar await). Ajudas prontas:
//                                 __clk(/texto/)            clica no 1º botão/link com esse texto
//                                 __clk(/rotulo/, 'aria-label')  pelo aria-label
//                                 await __espera(() => cond, ms)  espera a condição ficar verdadeira
//   ["espera", 800]             espera em milissegundos
//   ["foto", "nome"]            salva <pasta>/<tamanho>/<nome>.png
// Receitas prontas (começar missão, pular tutorial, mexer no save): .claude/skills/corrige-issues/roteiros.md
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [arqRoteiro, saida, listaTamanhos = "pc,cel"] = process.argv.slice(2);
if (!arqRoteiro || !saida) {
  console.error("uso: node .claude/ferramentas/fotos.mjs <roteiro.json> <pasta-de-saida> [pc,cel,...]");
  process.exit(1);
}
const BASE = process.env.BASE || "http://localhost:5186";
const TAMANHOS = {
  pc: [1366, 768],
  "pc-grande": [1920, 1080],
  notebook: [1366, 650],
  tablet: [768, 1024],
  cel: [390, 844],
  "cel-deitado": [844, 390],
};
const roteiro = JSON.parse(readFileSync(arqRoteiro, "utf8"));
const OUT = resolve(saida); // o Chrome precisa do caminho completo da pasta de perfil

const CHROMES = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const CHROME = CHROMES.find((c) => existsSync(c));
if (!CHROME) {
  console.error("Chrome não encontrado. Defina a variável CHROME com o caminho dele.");
  process.exit(1);
}
const dorme = (ms) => new Promise((r) => setTimeout(r, ms));

const AJUDA = `
window.__clk = (re, attr) => { const b=[...document.querySelectorAll('button,a,[role=button]')].find(b=>re.test(attr ? (b.getAttribute(attr)||'') : b.textContent.trim())); if (b) b.click(); return b ? (b.getAttribute(attr||'')||b.textContent.trim()).slice(0,40) : null; };
window.__espera = async (fn, ms=8000) => { const t0=Date.now(); while(Date.now()-t0<ms){ try{ if(fn()) return true; }catch{} await new Promise(r=>setTimeout(r,100)); } return false; };
`;

async function rodar(nomeTam, W, H, porta) {
  const pasta = join(OUT, nomeTam);
  mkdirSync(pasta, { recursive: true });
  const chrome = spawn(CHROME, [
    "--headless=new", `--remote-debugging-port=${porta}`, `--user-data-dir=${join(pasta, "_perfil")}`,
    "--no-first-run", "--hide-scrollbars", "--mute-audio", `--window-size=${W},${H}`, "about:blank",
  ], { stdio: "ignore" });
  try {
    let alvo;
    for (let i = 0; i < 200 && !alvo; i++) {
      try {
        const lista = await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json();
        alvo = lista.find((t) => t.type === "page");
      } catch {}
      if (!alvo) await dorme(200);
    }
    if (!alvo) throw new Error("o Chrome não abriu a porta de depuração");
    const ws = new WebSocket(alvo.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener("open", r, { once: true }));
    let id = 0;
    const pend = new Map();
    const erros = [];
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
      if (m.method === "Runtime.exceptionThrown") erros.push("EXCEÇÃO: " + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
      if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error")
        erros.push("console.error: " + m.params.args.map((a) => a.value ?? a.description ?? "").join(" "));
      if (m.method === "Log.entryAdded" && m.params.entry.level === "error") erros.push("log: " + m.params.entry.text + " " + (m.params.entry.url || ""));
    });
    const cmd = (method, params = {}) => new Promise((r) => { const k = ++id; pend.set(k, r); ws.send(JSON.stringify({ id: k, method, params })); });
    await cmd("Page.enable");
    await cmd("Runtime.enable");
    await cmd("Log.enable");
    const movel = W < 768;
    await cmd("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: movel });
    if (movel) await cmd("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

    for (const [tipo, v] of roteiro) {
      if (tipo === "vai") { await cmd("Page.navigate", { url: BASE + v }); await dorme(3500); }
      else if (tipo === "espera") await dorme(v);
      else if (tipo === "foto") {
        await dorme(400);
        const r = await cmd("Page.captureScreenshot", { format: "png" });
        writeFileSync(join(pasta, v + ".png"), Buffer.from(r.result.data, "base64"));
        console.log(`[${nomeTam}] foto ${v}`);
      } else if (tipo === "js") {
        const r = await cmd("Runtime.evaluate", { expression: `(async()=>{ ${AJUDA}; ${v} })()`, awaitPromise: true, returnByValue: true });
        const val = r.result?.result?.value ?? r.result?.exceptionDetails?.exception?.description ?? r.result?.exceptionDetails?.text;
        console.log(`[${nomeTam}] js →`, JSON.stringify(val)?.slice(0, 200));
      }
    }
    writeFileSync(join(pasta, "erros.txt"), erros.length ? erros.join("\n") : "(nenhum erro no console)");
    console.log(`[${nomeTam}] erros no console: ${erros.length}`);
    ws.close();
  } finally {
    chrome.kill();
  }
}

let porta = 9340;
for (const t of listaTamanhos.split(",").map((s) => s.trim()).filter(Boolean)) {
  const m = /^(\d+)x(\d+)$/.exec(t);
  const [W, H] = m ? [Number(m[1]), Number(m[2])] : TAMANHOS[t] ?? [];
  if (!W) { console.error("tamanho desconhecido:", t); continue; }
  await rodar(t, W, H, porta++);
}
process.exit(0);
