# Prompt para o ChatGPT/Codex: bateria de testes completa do jogo

Copie tudo abaixo da linha e mande para o ChatGPT (Codex) com acesso ao repositório.

---

Você vai testar a fundo o jogo **Operação Marte: Última Base** (repositório `LeoAugustto/MARS-OPS-Last-Outpost`, branch `main`). É um jogo de navegador para crianças de 7 a 12 anos (NASA Space Apps 2026). Antes de tudo, leia `AGENTS.md`, `PROJECT_CONTEXT.md`, `SESSION_HANDOFF.md` e `docs/GAME_DESIGN.md`.

## Regras
- **Primeiro corrija, depois relate.** Bug claro e pequeno (texto errado, botão pequeno, número que não bate, travamento) você corrige. Mudança de equilíbrio ou de design você **não** faz: só registra no relatório com números.
- Não mexa em `src/game/engine/balance.ts` nem nas regras do motor sem registrar o motivo no relatório.
- Sem force push, rebase ou amend. Commits pequenos em português, no imperativo. Antes de cada commit rode `npm test`, `npx tsc --noEmit -p .` e `npm run build`.
- Nenhum emoji, nenhum logo da NASA, os 5 idiomas sempre completos (pt, en, es, fr, it), botões com 44px ou mais.
- Não envie nada para fora do repositório e não use chaves de API.

## Parte 1: simulação automática (motor)
Crie um teste TEMPORÁRIO `src/game/engine/sim.tmp.test.ts` (apague antes de commitar) que joga missões completas usando as funções de `src/game/engine` (`newMission`, `openAlert`, `choose`, `setAllocation`, `anoitecer`, `endSol`, `rewindTo`, `debrief`, `estrelasDe`) com `RESERVE_EVENTS` de `src/data/donki.ts`.

Rode **todas as combinações abaixo, cada uma com pelo menos 3 sementes diferentes, e no total pelo menos 20 missões completas por combinação**:
- Níveis: `cadete`, `piloto`, `comandante`.
- Eventos do Sol: fortes (`RESERVE_EVENTS`), fracos (`forca: 1`), lista vazia.
- Tipos de criança:
  - **aleatória** (escolhe ao acaso, esquece 25% dos alertas, quase sempre chega acordada à noite);
  - **média** (escolhe bem 60%, só mexe na energia quando o recurso está abaixo de 40 e caindo);
  - **atenta** (escolhe bem 80%, divide a energia pelo que falta);
  - **escudo** (atenta, põe energia no escudo quando sobra);
  - **cientista** (põe quase tudo no laboratório);
  - **ignora tudo** (não responde nenhum alerta);
  - **caos** (divisão de energia aleatória de 0 a 20 em cada módulo, volta ao sol anterior às vezes).

Para cada combinação, registre:
- % de vitória;
- estrelas 1/2/3;
- ciência média vs meta;
- em que sol acontece o resgate e qual recurso acabou;
- cartas por missão;
- % de cartas do Sol;
- alertas por sol;
- de onde vem a perda de saúde (radiação, cansaço da noite, alertas ignorados, tempestades, eventos).

Verifique também, em todas as missões:
- recursos sempre entre 0 e 100;
- nada de `NaN`;
- bateria e escudo dentro do máximo;
- o jogo sempre termina;
- a mesma semente com as mesmas ações dá o mesmo resultado;
- `rewindTo` volta com os mesmos alertas;
- o estado vira JSON sem erro;
- todo evento de `src/content/events.ts` aparece pelo menos uma vez em algum nível (liste os que nunca aparecem);
- nenhuma escolha sai de graça;
- ignorar um alerta nunca é mais barato que a pior escolha.

Metas de referência (compare e diga se está dentro):
- criança atenta: Cadete ~100%, Piloto ~70–85%, Comandante ~40–55%;
- criança aleatória: quase nunca é resgatada no Cadete;
- quem ignora tudo: perde quase sempre.

## Parte 2: jogar de verdade no navegador
Rode `npm run dev` e jogue no navegador (Playwright ou similar).

Faça **pelo menos 20 missões completas, do sol 1 ao último sol**, cobrindo:
- os 3 níveis;
- os 3 modos de eventos do Sol (Surpresa, O Sol desta semana, Tempestade famosa);
- os 5 idiomas;
- tela de celular (360×640 e 375×812) e de computador (1280×800);
- vitória e resgate (perder de propósito pelo menos 1 vez por nível, usando "voltar ao sol" no relatório).

Em cada missão confira:
- **Tutorial do sol 1:** a seta aponta para o lugar certo em cada passo; "Pular tutorial" funciona; rever o tutorial pelo menu funciona.
- **Avisos do Rovi:** aparecem na hora certa, uma vez cada, e dizem o que fazer. Cubra a dica de energia no sol 2, recurso baixo, entardecer, tempestade, bateria cheia e custo da ampulheta.
- **Relógio:** anda ao andar e ao escolher, e para com carta, menu ou tutorial abertos. No entardecer aparece o aviso. À noite a equipe perde 4 de saúde uma vez. Dormir só na cama da Casa.
- **Relatório da noite:** mostra ar, comida, radiação, energia que faltou, cansaço, alertas ignorados e o que piorou.
- **Painel de energia:** + e − funcionam e o aviso de falta de energia aparece.
- **Escudo:** o módulo se chama "Escudo de areia".
- **Tela de fim:** mostra 1 a 3 estrelas certas, as figurinhas e o relatório; "Nova missão" e "voltar ao sol" funcionam.
- **Save:** recarregar a página no meio continua do mesmo ponto.
- **Menus:** "Como jogar" (7 páginas), glossário, menu do jogo, troca de idioma no meio da partida.
- **Tamanho e layout:** nenhum botão com menos de 44px, nenhuma rolagem para o lado, nenhum texto cortado ou sobreposto.
- **Erros:** nenhum erro no console.

## Parte 3: textos
Nos 5 idiomas, confira:
- textos faltando, iguais ao português por engano, ou com `{variavel}` diferente;
- número de regra escrito à mão em vez de vir do jogo;
- frases longas ou difíceis para 7–9 anos;
- erros de gramática e plural;
- qualquer frase que sugira apoio oficial da NASA.

## Parte 4: relatório
Crie `docs/RELATORIO-TESTES-CHATGPT.md` com:
1. **Resumo:** o que foi testado, quantas missões, quanto tempo levou.
2. **O que você corrigiu:** commit, arquivo e o porquê.
3. **Bugs não corrigidos,** do mais grave para o mais leve, com passos para reproduzir.
4. **Tabelas da simulação:** todas as combinações da Parte 1.
5. **Equilíbrio:** está dentro das metas? O que você mudaria, com números, sem aplicar.
6. **Experiência da criança:** onde ela pode ficar perdida, texto difícil, momento chato ou injusto.
7. **Lista final** de o que falta antes da entrega.

Faça commit do relatório (e das correções) na `main` e responda com um resumo curto.
