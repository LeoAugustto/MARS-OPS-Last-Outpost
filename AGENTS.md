<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

# AGENTS.md — regras para QUALQUER IA (Claude Code, ChatGPT/Codex, Lovable, Cursor…)

> Fonte única de verdade. O `CLAUDE.md` importa este arquivo. Se mudar uma regra, mude AQUI.
> Leia também: `docs/GAME_DESIGN.md` (regras do jogo), `docs/STYLE_GUIDE.md` (como escrever para crianças), `docs/TEAM.md` (quem faz o quê).

## O projeto em 30 segundos
**Operação Marte: Última Base** (EN: *MARS OPS: Last Outpost*) — jogo de navegador para crianças de **7 a 12 anos** (NASA Space Apps 2026, desafio *Build a Junior Astronaut Mission Trainer*).
A criança comanda uma base em Marte, **um sol (dia marciano) por vez**, andando num **mapa 2D da base** (sempre o mesmo). A cada sol surgem **2 a 4 alertas** nos lugares da base (cartas com escolhas que custam algo) e ela divide a energia entre **ar, estufa, laboratório e escudo** (a divisão continua de um dia pro outro). Desenho completo: `docs/GAME_DESIGN.md` (v2). Eventos reais da NASA (tempestades solares do **DONKI**) disparam histórias encadeadas. Quando dá errado, **não tem game over**: o Controle de Missão explica por quê e a criança pode voltar a um sol anterior.

Prazo: submissão até **15/11/2026 23:59** (horário local). Simples e funcionando > bonito e quebrado.

## Regras do desafio que NUNCA podem ser quebradas
1. **Sem conta, sem login, sem download.** Entrou no site, jogou. Save só no `localStorage` via `src/lib/saves.ts` (sempre com try/catch).
2. **Nenhuma escolha de graça.** Toda escolha tem custo agora ou depois (`deferredCost` + `schedule`). O teste `validateCatalog` reprova escolha sem custo.
3. **Poucos recursos na tela:** 3 barras (Ar, Comida, Saúde) + Energia (moeda do dia). Não adicione barra nova sem falar com o time.
4. **Dado real é honesto:** dado selecionado aparece como "📚 Evento real de <data>", nunca como "ao vivo". Só mostre "📡 ao vivo" se veio de uma chamada de API agora. Número inventado para jogabilidade nunca é apresentado como dado da NASA.
5. **Toda fonte citada dentro do jogo** (selo na carta + página `/fontes`).
6. **Linguagem de criança:** frases curtas, sem jargão; termo científico inevitável (sol, radiação, tempestade solar) vem explicado na mesma frase. Ver `docs/STYLE_GUIDE.md`.
7. **5 idiomas sempre completos: PT (padrão), EN, ES, FR, IT.** Nenhum texto visível hardcoded em componente. Adicionou chave? Adicione nos 5 arquivos. Seletor de idioma = bandeiras em SVG (emoji de bandeira não aparece no Windows).
8. **Mobile first:** tem que funcionar em celular (toque, botões ≥ 48px) e PC.

## Stack
- App: **TanStack Start** (React 19 + TypeScript + Vite) + Tailwind 4 + shadcn/ui, gerado e publicado pelo **Lovable**. Rotas em `src/routes/` (`index`, `play`, `fontes`, `sobre`).
- Repositório sincronizado com o Lovable nos 2 sentidos (branch `main`). **Nunca** force push, rebase, amend ou squash de commits já enviados (apaga o histórico do Lovable). Tudo que vai pra `main` aparece no Lovable: mantenha a `main` funcionando.
- i18n da UI do site: `src/i18n/locales/*.ts` + `useT()` (feito pelo Lovable). i18n do jogo: `src/content/locales/*.ts` + `t()`. Mesmo tipo `Lang`.
- Supabase aparece no projeto (Lovable Cloud), mas **não é usado**: sem conta, sem banco. Não adicione migrations; mudança de banco só pelo Lovable.
- Motor do jogo: **TypeScript puro** em `src/game/engine/` (sem React, sem DOM, sem `Math.random`).
- Telas do jogo: **React puro** em `src/game/ui/` (mapa andável em HTML/CSS, sem Phaser — mais leve no celular e sem brigar com o SSR do TanStack). A rota `src/routes/play.tsx` só monta `<GameApp />`.
- Arte: **pixel art**. Lista de arquivos e tamanhos em `src/game/ui/art.ts` (mapa, astronauta em 8 direções, retratos da caixa de diálogo, cena de cada lugar). Sem arte pronta, o jogo usa formas + emoji.
- **Nada de logo da NASA** (nem "meatball" nem "worm") em arte, retrato ou tela: as regras de marca da NASA proíbem uso que pareça apoio oficial. Citar a NASA como **fonte dos dados** pode e deve.
- Testes: Vitest (`npm test`, ambiente jsdom, `vitest.config.ts`).
- Sem backend. Eventos do Sol buscados **ao vivo** no DONKI pelo navegador (`src/data/donki-live.ts`, sem chave), com reserva conferida em `src/data/donki.ts`.

## Mapa de pastas e DONOS (não edite pasta de outro sem combinar)
| Pasta | O que é | Quem mexe |
|---|---|---|
| `src/routes`, `src/components`, `src/i18n`, `src/lib`, `src/assets` | Telas do site, HUD, i18n da UI, save local | **Lovable** + Leo |
| `src/game/engine/` | Regras, simulação, diretor de eventos, relatório | Vinicius (Claude/ChatGPT) — **Lovable NÃO edita** |
| `src/game/ui/` | Telas do jogo: mapa, cartas, energia, noite, relatório, tutorial | Leo/Yckler — **Lovable NÃO edita** |
| `public/assets/` | Arte pixel art (nomes em `src/game/ui/art.ts`) | Yckler + time de arte |
| `src/content/` | Catálogo de eventos + textos nos 5 idiomas | Bruno — **Lovable NÃO edita** |
| `src/data/`, `scripts/` | Dados reais da NASA + scripts de coleta | Felipe — **Lovable NÃO edita** |
| `docs/` | Design, fontes, time, guia de texto | todos |

## Arquitetura do motor (leia antes de mexer)
- Estado único `GameState` (serializável em JSON → vai direto pro save).
- Funções puras: `newMission`, `choose`, `endSol`, `rewindTo`, `debrief` — recebem estado, devolvem **novo** estado.
- Aleatório só via `rngFor(state)` (semente). Mesma semente = mesma missão. Isso sustenta o "voltar ao sol" e os testes.
- Eventos em `src/content/events.ts`: cada um tem `chain` (história), `canHappen` (coerência), `weight`, `cooldown`, `choices` com `effects`, `setFlags`, `schedule` (continuação). O **diretor** nunca abre uma história que já está em andamento.
- Textos NÃO ficam no motor: chaves por convenção `ev.<id>.title|body` e `ev.<id>.<choice>.label|outcome|lesson` em `src/content/locales/<lang>.ts`. Use `t(key, lang, vars)`.
- Números de balanceamento só em `src/game/engine/balance.ts`, com comentário dizendo se é real (fonte) ou "jogo".

## Como trabalhar (humano ou IA)
1. `git pull` antes de começar. Branch por tarefa: `feat/<area>-<coisa>` (ex.: `feat/engine-ventania`).
2. Mudanças pequenas e focadas. Não reformate arquivos inteiros. Não renomeie/mova pastas de outro dono.
3. Antes de commitar: `npm test` e `npm run build` passando.
4. Commit em português, curto, no imperativo: `adiciona evento de ventania`, `corrige save no Safari`.
5. PR para `main`; Leo revisa e faz merge. O Lovable commita direto na `main` — por isso ele só mexe nas pastas dele.
6. Nunca commitar chaves/segredos (ex.: `NASA_API_KEY`). Use variável de ambiente.

## Checklist para adicionar um EVENTO novo
- [ ] Entrada em `src/content/events.ts` com `chain`, `canHappen` coerente e custo em toda escolha.
- [ ] Se for continuação: `onlyScheduled: true` e alguém agenda via `schedule`.
- [ ] Textos `ev.<id>.*` nos **5** arquivos de `src/content/locales/`.
- [ ] Lição ("Por quê?") verdadeira e simples; se for fato da NASA, fonte anotada em `docs/DATA_SOURCES.md`.
- [ ] `npm test` verde (o validador confere tudo isso).

## O que NÃO fazer
- Não adicionar login, cadastro, analytics com dados pessoais ou coleta de dados de crianças.
- Não usar `Math.random()` no motor nem guardar funções no `GameState`.
- Não apresentar dado selecionado como "ao vivo".
- Não copiar arte/nome/personagens de jogos existentes (inspiração de gênero tudo bem).
- Não adicionar dependência pesada sem combinar (o jogo tem que abrir rápido no celular).

## Continuidade entre Codex e Claude Code

1. No início de cada etapa ou retomada, leia `PROJECT_CONTEXT.md` e `SESSION_HANDOFF.md`. Na raiz do checkout, confira `git status --short --branch`, `git branch --show-current` e `git log -5 --oneline`. Use `git diff` e `git diff --cached` para entender o trabalho existente antes de editar.
2. Ao assumir uma tarefa em andamento, continue no mesmo checkout e na mesma branch. A regra de pull e branch por tarefa acima se aplica a trabalho novo. Se o fluxo de integração for necessário durante uma retomada, combine antes. Preserve as mudanças existentes e confirme no código o que ainda falta.
3. Ao concluir uma etapa importante, ou antes de trocar de agente, atualize `SESSION_HANDOFF.md` com agente, objetivo, arquivos, decisões, testes realmente executados, pendências e próximo passo. Atualize `PROJECT_CONTEXT.md` quando a arquitetura ou as funcionalidades mudarem.
4. No Orca, use **Resume** no histórico para continuar uma conversa do mesmo agente e confira o diretório registrado. Para trocar de agente, use **Hand Off to Another Agent** no terminal e confira se o destino está no mesmo checkout. A transferência leva um resumo limitado. Se o agente de origem estiver sem cota, abra o outro agente na mesma branch e peça que continue pelos dois arquivos de contexto e pelo diff.
5. Faça commit ou push só com autorização. Preserve os históricos dos agentes, mantenha credenciais fora dos documentos e use permissões Auto quando disponíveis.
