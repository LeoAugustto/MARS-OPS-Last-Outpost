# Time e tarefas

Prazo final: **15/11/2026 23:59**. Congelar o código às **20h do dia 15** e só cuidar da submissão.

> O jogo jogável (motor v2, telas, mapa provisório, tutorial, relatório) está sendo feito pelo Claude com o Leo. As tarefas abaixo correm em paralelo.

| Pessoa | Frente | Pastas | Primeiras tarefas |
|---|---|---|---|
| **Leo** | Tech lead: repositório, Lovable, revisão de PR, deploy | `src/routes`, `src/components`, `src/i18n`, `src/lib` | Revisar `docs/GAME_DESIGN.md` v2 · organizar a arte com o time · publicar (Lovable/Vercel) |
| **Vinicius** | Motor e balanceamento | `src/game/engine/` | Ajustar `balance.ts` jogando de verdade · nível Cadete fácil de vencer, Comandante desafiador · mais testes |
| **Yckler** | Mapa 2D (Phaser) + arte | `src/game/scene/`, `public/assets/` | Gerar/escolher a arte (prompts do mapa, astronauta e ícones) · depois: trocar a base provisória pela arte, áreas de colisão, efeitos (poeira, tempestade, noite) |
| **Felipe** | Dados reais da NASA (DONKI ao vivo) | `src/data/`, `scripts/` | Serviço que busca no DONKI **na hora** (sem chave, `ccmc.gsfc.nasa.gov/DONKI/WS/get/…`): **FLR, CME, SEP e GST** dos últimos 30 dias + 1 semana histórica sorteada → lista normalizada (tipo, data, força 1–3, link) · cache na sessão · reserva = `src/data/donki.ts` · 1 estudo OSDR + dado RadLab para /fontes · conferir `docs/DATA_SOURCES.md` |
| **Bruno** | Conteúdo educativo | `src/content/` | Gerar ideias de eventos por lugar da base (ver `docs/GAME_DESIGN.md` → "Os lugares da base") e mandar pro Leo · depois escrever os escolhidos nos 5 idiomas seguindo o checklist do AGENTS.md · revisar textos PT |
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
