# AGENTS.md — regras para QUALQUER IA (Claude Code, ChatGPT/Codex, Lovable, Cursor…)

> Fonte única de verdade. O `CLAUDE.md` importa este arquivo. Se mudar uma regra, mude AQUI.
> Leia também: `docs/GAME_DESIGN.md` (regras do jogo), `docs/STYLE_GUIDE.md` (como escrever para crianças), `docs/TEAM.md` (quem faz o quê).

## O projeto em 30 segundos
**Operação Marte: Última Base** (EN: *MARS OPS: Last Outpost*) — jogo de navegador para crianças de **7 a 12 anos** (NASA Space Apps 2026, desafio *Build a Junior Astronaut Mission Trainer*).
A criança comanda uma base em Marte, **um sol (dia marciano) por vez**: responde a uma carta de evento e divide a energia do dia entre **ar, estufa, laboratório e escudo**. Eventos reais da NASA (tempestades solares do **DONKI**) disparam histórias encadeadas. Quando dá errado, **não tem game over**: o Controle de Missão explica por quê e a criança pode voltar a um sol anterior.

Prazo: submissão até **15/11/2026 23:59** (horário local). Simples e funcionando > bonito e quebrado.

## Regras do desafio que NUNCA podem ser quebradas
1. **Sem conta, sem login, sem download.** Entrou no site, jogou. Save só no `localStorage` (sempre com try/catch).
2. **Nenhuma escolha de graça.** Toda escolha tem custo agora ou depois (`deferredCost` + `schedule`). O teste `validateCatalog` reprova escolha sem custo.
3. **Poucos recursos na tela:** 3 barras (Ar, Comida, Saúde) + Energia (moeda do dia). Não adicione barra nova sem falar com o time.
4. **Dado real é honesto:** dado selecionado aparece como "📚 Evento real de <data>", nunca como "ao vivo". Só mostre "📡 ao vivo" se veio de uma chamada de API agora. Número inventado para jogabilidade nunca é apresentado como dado da NASA.
5. **Toda fonte citada dentro do jogo** (selo na carta + página `/fontes`).
6. **Linguagem de criança:** frases curtas, sem jargão; termo científico inevitável (sol, radiação, tempestade solar) vem explicado na mesma frase. Ver `docs/STYLE_GUIDE.md`.
7. **5 idiomas sempre completos: PT (padrão), EN, ES, FR, IT.** Nenhum texto visível hardcoded em componente. Adicionou chave? Adicione nos 5 arquivos. Seletor de idioma = bandeiras em SVG (emoji de bandeira não aparece no Windows).
8. **Mobile first:** tem que funcionar em celular (toque, botões ≥ 48px) e PC.

## Stack
- App: React + TypeScript + Tailwind + shadcn/ui (scaffold do **Lovable**), deploy pelo Lovable.
- Motor do jogo: **TypeScript puro** em `src/game/engine/` (sem React, sem DOM, sem `Math.random`).
- Cena 2D: Phaser 3 em `src/game/scene/` (montada na div `#game-root` da rota `/play`). Assets CC0 (Kenney.nl) em `public/assets/`.
- Testes: Vitest (`npm test`).
- Sem backend por enquanto. Dado "ao vivo" do DONKI, se der tempo, via fetch com cache e fallback para `src/data/donki.ts`.

## Mapa de pastas e DONOS (não edite pasta de outro sem combinar)
| Pasta | O que é | Quem mexe |
|---|---|---|
| `src/pages`, `src/components`, `src/i18n`, `src/lib` | Telas do site, HUD, i18n da UI, save local | **Lovable** + Leo |
| `src/game/engine/` | Regras, simulação, diretor de eventos, relatório | Vinicius (Claude/ChatGPT) — **Lovable NÃO edita** |
| `src/game/scene/` | Cena Phaser 2D | Yckler — **Lovable NÃO edita** |
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
