# Passagem de bastão (Claude → Codex) — 14/11/2026

> Historical handoff from 14 November 2026. Use the [English game design](GAME_DESIGN.md) and [session handoff](../SESSION_HANDOFF.md) for the current rules and work state.

Leia primeiro: `AGENTS.md` (regras), `docs/GAME_DESIGN.md` (v2), `docs/ART.md`, `docs/DATA_SOURCES.md`.

## Estado atual (tudo na `main`, sincronizada com o Lovable)
- **Jogo jogável do início ao fim** em `/play`: nível → perfil (nome + menina/menino) → abertura → 7/10/14 sóis
  (manhã → mapa andável com 2–4 alertas → cartas → energia → noite) → fim → relatório (com "voltar ao sol X").
- **Eventos do Sol ao vivo do DONKI** (FLR, CME, SEP, GST) via `https://ccmc.gsfc.nasa.gov/DONKI/WS/get/…`
  (sem chave, CORS liberado). Reserva conferida em `src/data/donki.ts`. `api.nasa.gov/DONKI/FLR` dava 404.
- **Arte pixel art** em `public/assets/` (originais em `art-source/`), ligada em `src/game/ui/art.ts`.
- **5 idiomas** (pt, en, es, fr, it). Textos do jogo em `src/content/locales/` (`pt/en/es/fr/it.ts` = eventos da base,
  `sol.ts` = eventos do Sol, `ui.ts` = telas). `{nome}` é preenchido sozinho pelo `useGT()`.
- **Verificação:** `npm test` (21 testes, inclui o validador de catálogo/idiomas), `npx tsc --noEmit -p .`, `npm run build`.
- Pedido em andamento no **Lovable**: deixar Início/Fontes/Sobre em pixel art (mapa como imagem principal,
  fonte Pixelify Sans, cores do jogo). Dê `git pull` e confira.

## Mapa do código do jogo
| Arquivo | O quê |
|---|---|
| `src/game/engine/engine.ts` | motor puro: `newMission`, `openAlert`, `choose`, `setAllocation`, `endSol`, `rewindTo`; diretor de alertas |
| `src/game/engine/balance.ts` | todos os números de jogo |
| `src/game/engine/validate.ts` | regras: nenhuma escolha grátis, continuações coerentes, 5 idiomas completos |
| `src/content/events.ts` | catálogo de eventos (lugar, cadeia, condições, escolhas, continuações) |
| `src/data/donki-live.ts` | busca ao vivo no DONKI |
| `src/game/ui/GameApp.tsx` | fluxo de telas, save, tutorial |
| `src/game/ui/BaseMap.tsx` | mapa andável (toque/setas), sprite animado |
| `src/game/ui/EventCard.tsx`, `Panels.tsx`, `Screens.tsx`, `Hud.tsx`, `shared.tsx` | telas e peças |
| `src/routes/play.tsx` | rota do Lovable que só monta `<GameApp />` |

## Cuidados que já custaram tempo
- `tsconfig` é estrito (`noPropertyAccessFromIndexSignature`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`):
  use `s.flags["x"]`, `s.vars["x"]`, `arr[i]!`.
- **Nunca** force push / rebase / amend em commit já enviado (quebra o histórico do Lovable).
- Lovable não mexe em `src/game`, `src/content`, `src/data`, `public/assets`, `art-source`.
- "Custo só em ciência" pode sair de graça quando a ciência é 0. Use a flag `radio_mudo` (o laboratório rende metade hoje)
  com `deferredCost: true`, como em `sol_clarao.desligar`.
- Toda escolha com custo atrasado tem `deferredCost: true` (aparece "⏳ tem custo depois").
- Sem logo da NASA em nenhuma arte/tela.

## Próximos passos (em ordem)
1. **Integrar os eventos do Bruno** (`docs/EVENTOS-BRUNO.md`, 26 eventos + continuações) em `src/content/events.ts`
   e nos 5 idiomas, com estes ajustes:
   - inverno→"pausar o laboratório", microscópio→"lupa", gelo→"derreter", sem sono→"descansar": trocar "−ciência"
     por `setFlags: ["radio_mudo"]` + `deferredCost: true` (laboratório rende metade hoje); ajustar o texto do resultado.
   - "rachadura": `canHappen: s.escudo > 0`.
   - continuação de "bactérias na mesa": `−2 energia` (limpar) em vez de `−2 ciência`.
   - batata (4 sóis) / rabanete (3 sóis): `available` só se `s.sol + N <= s.totalSols`.
   - "inverno": `onOpen: () => ({ solar: -0.2 })` e `canHappen: s.solar >= 0.6`; "painel_rachado": `canHappen: s.solar >= 0.6`.
   - "redemoinho" continuação: se `s.solar < 1` → `+0.3` solar, senão `−0.2`.
   - eventos da "Cama" vão no lugar `habitat`.
   - cada continuação = evento `onlyScheduled: true` (notícia com `onOpen`), na mesma `chain`.
   - fatos usados: anotar em `docs/DATA_SOURCES.md`.
   - rodar `npm test` (o validador aponta texto faltando/escolha grátis) e o teste de equilíbrio.
2. **Arte que falta:** retrato do Controle de Missão, retrato do Rovi, ícone do rover (ver `docs/ART.md`).
3. **Equilíbrio:** nível Piloto está fácil de sobreviver (jogando ao acaso quase ninguém precisa de resgate).
4. **/fontes:** escolher 1 estudo do OSDR (ossos/músculos) e um dado do RadLab; conferir os ⚠️ de `docs/DATA_SOURCES.md`.
5. **Publicar:** "Publish" no Lovable (ou Vercel). Testar no celular de verdade (as animações do mapa).
6. **Submissão Space Apps** até 15/11 23:59: vídeo/slides, texto, link do jogo e do repositório.
