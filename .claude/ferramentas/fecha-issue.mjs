// Fecha uma issue do GitHub depois que a correção chegou na main, com um comentário dizendo onde foi corrigida.
// Uso:
//   node .claude/ferramentas/fecha-issue.mjs <n> <commit>
//     <commit>: o commit da correção (ou o merge) que já está em origin/main.
// Precisa de GITHUB_TOKEN no ambiente (token fino do GitHub com permissão "Issues: leitura e escrita"
// só neste repositório). O token NUNCA vai para o repositório: fica só na variável de ambiente.
// Sem token, a ferramenta só confere o estado e mostra o link para fechar à mão.
// Variáveis: REPO (padrão LeoAugustto/MARS-OPS-Last-Outpost).
import { execFileSync } from "node:child_process";

const REPO = process.env.REPO || "LeoAugustto/MARS-OPS-Last-Outpost";
const API = `https://api.github.com/repos/${REPO}`;
const [n, commit] = process.argv.slice(2);
if (!n || !/^\d+$/.test(n) || !commit) {
  console.error("uso: node .claude/ferramentas/fecha-issue.mjs <numero-da-issue> <commit-na-main>");
  process.exit(1);
}
const token = process.env.GITHUB_TOKEN;
const headers = { Accept: "application/vnd.github+json", "User-Agent": "mars-ops-agente-bugs" };
if (token) headers.Authorization = `Bearer ${token}`;

async function api(metodo, caminho, corpo) {
  const r = await fetch(API + caminho, {
    method: metodo,
    headers: corpo ? { ...headers, "Content-Type": "application/json" } : headers,
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  if (!r.ok) throw new Error(`GitHub respondeu ${r.status} em ${metodo} ${caminho}: ${await r.text()}`);
  return r.json();
}

// 1) segurança: só fecha se a correção já está na main do GitHub
const git = (...a) => execFileSync("git", a, { encoding: "utf8" }).trim();
git("fetch", "-q", "origin", "main");
let sha;
try {
  sha = git("rev-parse", "--verify", `${commit}^{commit}`);
  execFileSync("git", ["merge-base", "--is-ancestor", sha, "origin/main"]);
} catch {
  console.error(`O commit ${commit} ainda não está em origin/main. Junte e envie a correção antes de fechar a issue.`);
  process.exit(3);
}
const curto = sha.slice(0, 7);

// 2) estado atual
const issue = await api("GET", `/issues/${n}`);
if (issue.pull_request) {
  console.error(`#${n} é um pull request, não uma issue.`);
  process.exit(1);
}
if (issue.state === "closed") {
  console.log(`#${n} já está fechada (${issue.state_reason || "fechada"}). Nada a fazer.`);
  process.exit(0);
}

// 3) sem token: não dá para fechar daqui
if (!token) {
  console.log(`#${n} continua ABERTA e não há GITHUB_TOKEN para fechar daqui.`);
  console.log(`Feche à mão: ${issue.html_url}`);
  console.log(`Comentário sugerido: Corrigido em ${curto} (já na main).`);
  process.exit(2);
}

// 4) comenta e fecha
await api("POST", `/issues/${n}/comments`, {
  body: `Corrigido em ${curto}, que já está na \`main\`. Fechado pelo agente de bugs (\`/corrige-issues\`).`,
});
const fechada = await api("PATCH", `/issues/${n}`, { state: "closed", state_reason: "completed" });
console.log(`#${n} fechada (${fechada.state}). ${fechada.html_url}`);
