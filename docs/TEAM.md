# Time e tarefas

Prazo final: **15/11/2026 23:59**. Congelar o código às **20h do dia 15** e só cuidar da submissão.

| Pessoa | Frente | Pastas | Primeiras tarefas |
|---|---|---|---|
| **Leo** | Tech lead: repositório, Lovable, telas, save local, deploy, revisão de PR | `src/routes`, `src/components`, `src/i18n`, `src/lib` | Ligar o motor na rota `/play` (HUD: barras, carta do dia, divisão de energia, botão dormir, relatório) · publicar |
| **Vinicius** | Motor e balanceamento | `src/game/engine/` | Ajustar `balance.ts` jogando de verdade · nível Cadete fácil de vencer, Comandante desafiador · mais testes |
| **Yckler** | Cena 2D (Phaser) | `src/game/scene/`, `public/assets/` | Base vista de cima com 4 módulos clicáveis + dia/noite + efeito de tempestade/poeira · controle por toque |
| **Felipe** | Dados reais da NASA | `src/data/`, `scripts/` | Pegar chave em api.nasa.gov · rodar `scripts/fetch-donki.mjs` e substituir a lista · flare "ao vivo" com fallback · 1 estudo OSDR + dado RadLab · conferir `docs/DATA_SOURCES.md` |
| **Bruno** | Conteúdo educativo | `src/content/` | Revisar textos (PT) · criar 3–4 eventos novos (ver checklist no AGENTS.md) · glossário na tela · conferir traduções |
| **6º integrante** | Arte, UX, pitch e submissão | `public/assets/`, `docs/` | Ícones/arte CC0 · testar no celular · vídeo/slides da demo · texto da submissão no site da Space Apps |

## Fluxo de Git
```bash
git pull origin main
git checkout -b feat/engine-ventania
# ... trabalha ...
npm test && npm run build
git add -A && git commit -m "adiciona evento de ventania"
git push -u origin feat/engine-ventania
# abre PR para main no GitHub → Leo revisa e faz merge
```
O Lovable commita direto na `main`. Dê `git pull` com frequência.

## Usando IA
- **Claude Code**: lê `CLAUDE.md` automaticamente (que importa o `AGENTS.md`).
- **ChatGPT / Codex**: cole o `AGENTS.md` no começo da conversa (ou use um projeto com ele como instrução) + o arquivo que vai editar.
- **Lovable**: só para telas/UI. Sempre lembre no prompt: *"não edite src/game, src/content, src/data"*.

## Cronograma
| Quando | Meta |
|---|---|
| 14/11 tarde | Esqueleto no ar + 1 sol jogável na `/play` (mesmo feio) |
| 14/11 noite | Missão completa (7 sóis) + relatório + dados DONKI conferidos |
| 15/11 manhã | Cena 2D, visual, mobile, 5 idiomas revisados |
| 15/11 tarde | Teste com alguém de fora, balancear, pitch |
| 15/11 20h | Congelar código · submissão até 23:59 |
