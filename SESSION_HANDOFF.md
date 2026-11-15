# Passagem de bastão

## 2026-11-15 · Claude Code · regras de vitória, noite e equilíbrio

- **Feito (commit `ea620b9`, main)** — Sobreviver até o fim = vitória; ciência vira 1–3 estrelas (`estrelasDe`, `debrief().estrelas`). Noite com a equipe acordada: −4 de saúde uma vez por sol (`anoitecer`, `SAUDE_AO_ANOITECER`); alerta sem resposta: −2 (`SAUDE_POR_ALERTA_PERDIDO`). Comandante com 10 sóis. Textos de energia recebem números das constantes (`NUMEROS_ENERGIA` em Panels.tsx).
- **Simulação (300 missões, perfil atento = divide energia pelo que falta, aleatório = escolhe ao acaso e esquece 25% dos alertas)** — Cadete: atento 100%, aleatório 99%. Piloto: atento 81%, aleatório 5%. Comandante: atento 43%, aleatório 0%.
- **Testes** — 28 testes passaram, `tsc` e `npm run build` ok.
- **Lovable (pedido enviado, `umsg_01m7fyf81cfm7ramyqvc3k4bbh`)** — tutorial do sol 1 com setas, avisos do Rovi, menu "Como jogar", glossário ampliado, estrelas na tela de fim, revisão de textos nas 5 línguas, 5 eventos novos no Abrigo. Autorizado só nesta tarefa a editar `src/game/ui` e `src/content`.
- **Próximo passo** — Revisar o que o Lovable fizer (testes, build, textos); testar áreas de toque e uma missão por nível; publicar na Vercel (`NITRO_PRESET=vercel`, falta autorizar o time no MCP da Vercel pelo link).

## 2026-11-14 · Codex

- **Última etapa** — Codex configurou a continuidade entre agentes e registrou no Orca o checkout existente. O autor da edição mais recente do jogo na árvore de trabalho não foi confirmado.
- **Branch e base** — `feat/ui-arte-interiores-icones`, HEAD `4175d75`. O Orca aponta para a worktree principal já existente. As 18 modificações rastreadas e as 31 entradas não rastreadas abaixo antecedem este handoff.
- **Arquivos desta etapa** — `AGENTS.md`, `CLAUDE.md`, `PROJECT_CONTEXT.md` e `SESSION_HANDOFF.md`.
- **Trabalho de jogo em andamento** — `docs/ART.md`; `src/content/locales/{en,es,fr,it,pt,ui}.ts`; `src/game/ui/{BaseMap,EventCard,GameApp,Hud,Interior,Panels,Screens,PixelIcon,shared}.tsx`; `src/game/ui/art.ts`; `src/routes/{index,sobre}.tsx`; novos PNGs em `public/assets/ui/` e novos interiores em `public/assets/places/`. Consulte o Git para a lista atual.
- **Decisões** — Use o mesmo checkout e a mesma branch para preservar as mudanças em progresso. Use o histórico nativo para retomar o mesmo agente e estes documentos para continuar com o outro. Sessões antigas podem apontar para a pasta pai do Git ou para outro workspace. Confira a pasta antes de editar.
- **Testes** — `npm test` no checkout atual passou com 23 testes em 5 arquivos. Build e teste visual nesta etapa seguem pendentes.
- **Pendências** — Revisar a troca de ícones e a integração dos interiores, comparar com `docs/PENDENCIAS-PIXEL.md` e verificar se as pendências antigas ainda se reproduzem.
- **Próximo passo** — A partir da raiz do Git, revisar o diff de UI/arte e conferir numa partida Cadete a navegação no mapa, entrada e saída dos interiores, menu, cartas e legibilidade em tela pequena. Rodar `npm run build` após a revisão e registrar os resultados aqui.

### Retomada no Orca

Na barra lateral direita, abra **Agentes → Todos**. O Orca exibiu **Treinador de Missões para Astronautas** (Claude) e **Integrar eventos do Bruno** (Codex) com ações de retomada e transferência. A prévia do Codex relata a integração dos interiores e ícones. Confirme a pasta de origem da sessão e compare o relato com o diff antes de continuar no checkout atual.

## 2026-11-14 · Codex · preparação do envio de interiores e ícones

- **Objetivo** — Revisar e enviar todas as alterações locais autorizadas por Leo, incluindo os oito interiores e os 29 novos ícones.
- **Checkout** — Checkout principal registrado no Orca, branch `feat/ui-arte-interiores-icones`. Base inicial `4175d75`; o fetch encontrou `origin/main` em `c796112`, com o novo menu inicial.
- **Escopo revisado** — 20 arquivos rastreados modificados e 40 arquivos novos: continuidade, documentação de arte, traduções nos cinco idiomas, UI do jogo, rotas, oito JPGs e 29 PNGs. Sem alterações no motor, banco ou dados NASA.
- **Validação executada** — `npm test`: 23 testes passaram em 5 arquivos. `npm run build`: passou (cliente, SSR e Nitro), com avisos de tamanho de chunk e configuração do Vite. `git diff --check`: passou.
- **Integração** — Preservar o menu inicial novo da main ao integrar a branch; abrir PR para revisão de Leo, conforme AGENTS.md. Não reescrever histórico publicado.
- **Lovable** — Leo pediu preferência pelo Lovable nas áreas permitidas. A integração oficial foi localizada e a conexão solicitada; autorização da conta ainda não confirmada. Lovable não deve editar `src/game`, `src/content` ou `src/data`.
- **Pendências** — Concluir integração com main, validar novamente, enviar a branch e abrir PR. Validação visual/mobile completa e sincronização no editor Lovable ainda não foram verificadas nesta etapa.

### Resultado da integração para envio

- Commit das alterações locais: `1c4fb8e` (`integra interiores e ícones em pixel art`).
- Integrada a main remota `c796112` por merge, preservando o histórico. O único conflito foi na home: manteve-se integralmente o menu de hub já publicado pelo time; a troca de emoji do botão antigo ficou superada por esse novo menu.
- Após resolver o conflito: `npm test` passou novamente com 23 testes em 5 arquivos; `npm run build` passou novamente; `git diff --cached --check` passou.
- Próximo passo: enviar esta branch e abrir PR para `main`. A sincronização do Lovable depende da integração na `main`, cuja revisão e merge cabem a Leo conforme `AGENTS.md`.

## 2026-11-14 · Codex · envio concluído

- **Autorização** — Leo confirmou a conexão do Lovable e autorizou o restante, incluindo o merge na main.
- **Resultado** — PR #1 (`https://github.com/LeoAugustto/MARS-OPS-Last-Outpost/pull/1`) integrado por merge, sem reescrever histórico. Commit na main: `b500808` (`integra interiores e ícones na main`). Os oito interiores, 29 ícones e demais alterações revisadas estão no GitHub.
- **Checkout** — Mesmo checkout principal e mesma branch `feat/ui-arte-interiores-icones`, atualizada por fast-forward até a main integrada.
- **Validação** — Mantidos os resultados da etapa anterior: 23 testes em 5 arquivos e build de produção passaram após integrar o menu novo. Não houve alteração de código após esses testes.
- **Lovable** — Catálogo confirmou a integração instalada nesta etapa. As ferramentas do Lovable ainda não foram expostas nesta sessão; sincronização no editor e atualização do site publicado não foram verificadas. Usar Lovable nas próximas tarefas das áreas permitidas, respeitando a propriedade de pastas no AGENTS.md.
- **Pendências** — Confirmar a sincronização no editor Lovable e fazer a revisão visual/mobile completa. Nenhuma mudança do jogo desta etapa ficou apenas local.

## 2026-11-14 · Codex · primeira rodada de QA

- **Objetivo autorizado por Leo** — Revisar o aplicativo, retomar o plano do Claude, identificar melhorias e corrigir bugs reproduzidos. Preferir Lovable nas áreas permitidas.
- **Base/checkout** — Mesmo checkout principal e branch `feat/ui-arte-interiores-icones`. Recebida a main `e3d4a67` por fast-forward durante a rodada, preservando as edições locais. Sem novo commit/push do Codex nesta rodada.
- **Lovable** — Acesso pelo navegador do Orca confirmado, com comunicação de ida e volta. A sincronização dos interiores/ícones foi confirmada no histórico e na resposta do Lovable. A pedido do Codex, o Lovable corrigiu o href DONKI em `src/routes/fontes.tsx`, commit `e8003f0`, já na main; href conferido localmente. Preservada a tarefa simultânea do Yckler de botões da missão (`a211530`) e seu roadmap (`e3d4a67`). Lovable informou que não publicou.
- **Correções locais** — `src/game/ui/BaseMap.tsx` e `Interior.tsx`: ativação de botões por teclado/tecnologia assistiva e foco visível. `src/game/ui/Screens.tsx`: bloqueia Iniciar Missão durante consulta dos dados, acompanhando o bloqueio dos seletores. Sem mudanças no motor ou conteúdo.
- **Percurso manual** — Home, Cadete, perfil sem nome, abertura/tutorial, interiores rover/antena/ar/casa, dois alertas do sol 1, explicação, energia e aviso de insuficiência, dormir, noite e manhã do sol 2, recarregar/continuar e dica do escudo. Enter no computador e Espaço na cama testados após a correção; ESC no interior abre menu.
- **Demais verificações** — `/fontes` nos 5 idiomas em tela estreita, `/sobre`, três finais por estados válidos preparados com o motor, relatório e retorno ao sol 4. Cenários preparados não equivalem a uma partida inteira manual. Restaurado o save local de QA do sol 2 ao concluir os cenários.
- **Simulação exploratória** — 100 sementes por nível, escolhas aleatórias disponíveis, energia padrão e reserva DONKI. Cadete: 34 vitórias/66 parciais/0 resgates; Piloto: 8/89/3; Comandante: 1/61/38. Sem simular demora de navegação ou penalidade noturna. Priorizar clareza da meta de ciência antes de alterar dano.
- **Testes finais executados** — `npm test`: 23 testes/5 arquivos passaram; `npx tsc --noEmit -p .`: passou; `npm run build`: passou; `git diff --check`: passou. Após integrar Lovable e concluir as três correções.
- **Registro completo** — `docs/QA-2026-11-14.md`: cobertura, limitações, correções, simulações e prioridades.
- **Pendências** — Enviar as três correções locais com autorização de commit/push; revisão editorial com Bruno (inclui a frase de vitória que atribui orgulho à NASA e plurais); nome da equipe em Sobre (pergunta enviada a Leo, sem resposta até aqui); revisão de fontes OSDR/RadLab com Felipe; áreas de toque e foco das janelas; quatro interiores restantes, partida manual completa por dificuldade, rede/armazenamento bloqueados e celular físico. Publicação e submissão não realizadas.
- **Próximo passo** — Revisar o diff desta rodada e enviar as correções; depois validar a versão do Lovable e tratar as prioridades do relatório com os donos. Servidor de QA iniciado em `http://127.0.0.1:5173`.

### Nome da equipe

- Leo confirmou **cavalodetroia.exe**, com essa grafia em minúsculas.
- Solicitada ao Lovable a atualização somente de `aboutTeam` nos cinco arquivos de `src/i18n/locales/`, sem acrescentar integrantes e sem publicar o site. Confirmar o resultado abaixo/na main antes de repetir a solicitação.
- **Concluído** — Commit `f6e9399` confirmado na main remota, com `aboutTeam: "cavalodetroia.exe"` nos cinco idiomas. O Lovable informou verificação no navegador, 23 testes e build passando. Commit adicional `5889ad0` atualiza seu roadmap. O nome foi salvo; o site não foi publicado. O checkout local não foi atualizado para essa nova main nesta tarefa, preservando as correções de QA pendentes.

## 2026-11-14 · Codex + Lovable · vídeo e tipografia

- **Pedido de Leo** — Usar `Downloads/tela_inicial_4k.mp4` como vídeo em loop na home e substituir a fonte atual por fontes pixel no estilo das duas imagens anexadas. Mantida a preferência por editar pelo Lovable nas áreas permitidas.
- **Base/checkout** — Mesmo checkout e branch. Main recebida por fast-forward até `c22a7dd`, preservando todas as correções de QA locais. Não houve novo commit/push do Codex.
- **Lovable/main** — A home já tinha recebido o vídeo 4K (`31eab2c`). Em `5f5edd7`, o Lovable trocou as fontes do site e exportou vídeo/poster para `public/assets/hub/`; em `c22a7dd`, afastou o título do seletor de idioma após sobreposição reproduzida pelo Codex em 390×844. Arquivos: `src/styles.css`, `src/routes/{__root,index,sobre,fontes}.tsx`, `src/components/AppHeader.tsx`, mídia da home, `src/routes/AGENTS.md` (nota técnica) e roadmap. Manifests gerenciados preservados. Nada foi publicado.
- **Vídeo** — MP4 original, 4240998 bytes, SHA256 `304cc21195035f39a24b75911c66d73ca3ac665738cc92d23e55d9aa77aa89a2`, igual ao anexo de Leo. Browser confirmou 3840×2160, 8 segundos, muted/playsInline/autoplay/loop; tempo avançou e voltou ao início no teste do loop. Com preferência de reduzir movimento, pausa. Emulação `no-preference` usada apenas no navegador de QA para testar a reprodução, sem mudar o Windows.
- **Portabilidade** — O endereço interno `/__l5e/assets-v1/...` retornava o fallback HTML no Vite local e o vídeo não carregava. Resolvido pelo Lovable usando `/assets/hub/cena_loop_4k.mp4` e `/assets/hub/cena_poster_4k.webp`.
- **Fontes** — Press Start 2P em títulos, VT323 em leitura/botões, fallback monospace. As referências visuais são inspiração, não uma identificação exata das fontes das fotos. Famílias e suporte Latin Extended conferidos nos metadados oficiais do Google Fonts: `https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/METADATA.pb` e `https://raw.githubusercontent.com/google/fonts/main/ofl/vt323/METADATA.pb` (OFL).
- **Adaptação local do jogo** — `src/game/ui/shared.tsx`: usa o token `--font-sans` e carrega as duas famílias novas. `src/game/ui/GameApp.tsx`: títulos usam `--font-display`, removendo a imposição de Pixelify. Nenhuma mudança de regras. Essas duas edições ainda não estão na main/Lovable; seguem junto das três correções anteriores de QA, pendentes de autorização de commit/push.
- **Verificação real** — Fontes computadas confirmadas na home e no jogo; screenshot da manhã do sol 2 em 390×844 sem rolagem horizontal. Home nos cinco idiomas em 390×844: título começa em 80px, seletor termina em 56px, sem interseção; links dentro da tela. Conferido também em 1366×768. Lovable informou conferência adicional em 360×640 e tela deitada. A busca em TS/TSX/CSS não encontrou mais Pixelify no código atual.
- **Testes locais finais** — 23 testes em 5 arquivos passaram; `npx tsc --noEmit -p .` e `npm run build` passaram após integrar `c22a7dd` e adaptar as fontes do jogo. Mantidos avisos conhecidos de configuração/chunk do Vite.
- **Próximo passo** — Leo conferir a prévia e autorizar o envio das alterações locais (QA + tipografia do jogo + documentos). Depois validar o jogo com a versão sincronizada e publicar somente quando solicitado.

## 2026-11-14 · Codex · envio autorizado do QA e das fontes

- **Autorização** — Leo respondeu: "pode commitar e fazer tudo". Autorizados commit, envio e integração das alterações locais; comunicado o passo de publicação da versão atualizada no Lovable.
- **Escopo** — Ativação por teclado e foco visível em mapa/interiores; bloqueio de Iniciar Missão durante consulta; fontes do jogo alinhadas ao site; contexto, handoff e relatório da revisão. Sem alterações no motor, dados ou traduções de eventos.
- **Base e validação** — Base `c22a7dd`. Não houve mudança de código desde a última rodada validada: 23 testes em 5 arquivos, TypeScript e build passaram. `git diff --check` conferido antes do commit. O vídeo original também está presente no build com o mesmo SHA256 do anexo.
- **Fluxo de envio** — Commit na mesma branch, push, PR e merge normal para main; sem reescrever histórico. Após integrar, conferir sincronização no Lovable e publicar a versão atualizada. O resultado final da publicação deve ser registrado abaixo.
