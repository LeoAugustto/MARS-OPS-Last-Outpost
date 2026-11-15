# Game Design v2 — Operação Marte: Última Base

> Versão 2 (14/11/2026), atualizada em 15/11/2026 com as regras do código. Dono: Leo. Mudou algo? Atualize aqui antes de codar.
> Os números de verdade ficam em `src/game/engine/balance.ts`; em caso de dúvida, vale o código.

## Regras atuais (resumo, 15/11/2026)
- **Níveis:** Cadete 7 sóis · Piloto 10 · Comandante 10 (os números de cada um em `LEVELS`).
- **Vitória:** sobreviver até o último sol. A ciência vira **1 a 3 estrelas** (1 = sobreviveu, 2 = 40% da meta, 3 = bateu a meta). Não existe mais "vitória parcial". Resgate quando ar, comida ou saúde chega a 0.
- **Alertas:** 3 por sol (2 no sol 1); +1 se ar, comida e saúde estão acima de 45; −1 se algum está abaixo de 20.
- **Eventos do Sol (DONKI):** pelo menos 1 a cada 3 sóis e 20% de chance nos outros dias (cerca de 20% das cartas). A carta mostra a data, a força (1/3 a 3/3) e o atraso do rádio; a classe técnica fica no link da NASA.
- **Energia:** painéis fazem 11 × limpeza. Ar 4 por energia, comida 3, ciência 2, escudo 2 energia = 1 camada (−20% de radiação, até 4). Divisão inicial: ar 4, estufa 4, laboratório 2.
- **Relógio:** 07:00 a 19:00; andar e escolher gastam horas. A noite chegou com a equipe acordada: −4 de saúde, uma vez. Dormir só na cama da Casa.
- **Alerta sem resposta ao dormir:** −2 de saúde e o problema piora sozinho (perdas da pior escolha e o que ele faria ao abrir, como a dose da tempestade). No último sol as continuações aparecem mesmo com o lugar ocupado.
- **Custos que chegam depois (ampulheta):** sempre cobram de verdade. O validador reprova ampulheta cuja continuação não tenha perda nem decisão. Dia de rádio mudo: o laboratório rende metade e perde pelo menos 2 de ciência. Colheita fraca: −3 de comida. Vento que limpa os painéis: −3 de ar (poeira no filtro).
- **Meta de ciência:** Cadete 18, Piloto 34, Comandante 36.
- **Equilíbrio simulado (400 missões):** criança atenta vence 97% / 84% / 52%; criança média 91% / 65% / 22%; quem ignora tudo 27% / 0% / 0%.


## Ideia em uma frase
A criança comanda uma pequena base em Marte por **7 sóis** (dias marcianos). A base é **sempre a mesma**; o que muda a cada sol são os **eventos**, que aparecem como alertas nos lugares da base e incluem **eventos reais do Sol, puxados do DONKI da NASA**. Toda escolha custa algo. Se der errado, não tem game over: o Controle de Missão explica o porquê.

## Fluxo de telas
```
Home ──► Escolher nível ──► Abertura da missão ──► [ SOL 1 … SOL N ] ──► Fim da missão ──► Relatório ──► Jogar de novo / Home
                                                    (tutorial no sol 1)        ▲
                                                                               └── "Voltar ao sol X" (do relatório)
```
| Tela | O que tem |
|---|---|
| **Escolher nível** | 3 cartões grandes: Cadete (7–9 anos, 7 sóis) · Piloto (9–11, 10 sóis) · Comandante (11+, 10 sóis). Se existir save: "Continuar missão". |
| **Abertura** | 3 quadros curtos com o robô guia: "Esta é sua base" → "Mantenha ar, comida e saúde" → "O Sol de verdade vai mandar surpresas (dados da NASA)". Botão "Começar". |
| **Jogo** | Mapa da base + HUD. É onde a criança passa 95% do tempo. |
| **Fim da missão** | Vitória com 1 a 3 estrelas de ciência / Resgate (a Terra buscou a tripulação). Nunca "game over". |
| **Relatório** | Ver "Relatório da missão" abaixo. |

## A tela do jogo
**HUD (topo, sempre visível, ícone + número, nunca só cor):**
`Sol 3/7` · ☀️ momento do dia · 💨 Ar · 🥔 Comida · ❤️ Saúde · ⚡ energia restante hoje · 🔬 ciência 8/12 · botões ❓ (glossário) 🔊 (ler em voz alta) ☰ (menu)

**Mapa:** visto de cima, quadrado; a câmera segue o astronauta. **Celular:** toque no chão → anda até lá; toque num lugar → anda e entra. **PC:** setas/WASD + clique. Chegou no lugar → abre o painel/carta daquele lugar.

## Os lugares da base
| Lugar | Posição no mapa | Para que serve | Energia | Eventos típicos | Muda no visual |
|---|---|---|---|---|---|
| 🏠 **Habitat + 🛏️ cama** | centro | Casa da tripulação. **Dormir = terminar o sol.** | — | exercício, sono, saudade de casa | luz acesa à noite |
| ☀️ **Painéis solares** | cima-esq. | Produzem a energia do dia: `11 × limpeza` | — | poeira, redemoinho, painel rachado | poeira cobrindo |
| 📡 **Antena** | cima-dir. | **Alertas do Sol (DONKI) chegam aqui.** Falar com a Terra (com atraso). | — | clarão, nuvem e chuva de partículas, mensagem da Terra | prato girando quando há alerta |
| 💨 **Fábrica de ar** | esquerda | **Painel de energia** (dividir ⚡). +4 ar por ⚡ | módulo `ar` | filtro entupido, vazamento | tanques enchendo |
| 🌱 **Estufa** | direita | +3 comida por ⚡ | módulo `estufa` | broto, praga, colheita | plantas crescendo |
| 🔬 **Laboratório** | baixo-esq. | +1 ciência por ⚡ (é assim que se vence) | módulo `ciencia` | rocha estranha, gelo, microscópio | luz do telescópio |
| 🛡️ **Abrigo** | baixo-dir. | Escudo de areia (2 ⚡ = +1 nível, máx. 4, cada nível −20% radiação). **Esconderijo nas tempestades.** | módulo `escudo` | rachadura, treino de emergência | camadas de areia subindo |
| 🚙 **Rover** | baixo-centro | Saídas de exploração | — | pneu furado, dunas, rocha | rover sai/volta |

**Energia (decisão do time: fica de um dia para o outro):** a divisão entre ar / estufa / laboratório / escudo **continua igual no sol seguinte**. A criança só mexe quando quer, no painel de energia (fábrica de ar ou botão ⚡ do HUD). As cartas gastam da **sobra** do dia. O que sobra ao dormir vai para a 🔋 bateria (máx. 10).

## Um sol, passo a passo
1. 🌅 **Manhã** — tela curta: "Bom dia! Os painéis fizeram ⚡11. Hoje há 3 alertas na base." Os alertas aparecem no mapa.
2. ❗ **Alertas** — **3 por sol** (2 no sol 1, ver regras atuais), cada um preso a um lugar. A criança escolhe **a ordem** (é estratégia: todas as cartas gastam a mesma energia do dia).
   - 🚨 **Urgente** (ex.: chuva de partículas): abre sozinho na hora, onde a criança estiver.
3. 🃏 **Carta** — título, imagem/ícone, texto curto, 2–3 escolhas **mostrando o custo** (ex.: `−3 ⚡`, `−6 💨`). Depois da escolha: resultado + botão **"Por quê?"** com a ciência real.
4. ⚡ **Ajustar energia** (opcional).
5. 🛏️ **Dormir** — na cama da Casa; à noite dá para dormir com alerta aberto, com custo. Resumo da noite: o que subiu/desceu e por quê (ex.: "A tripulação respirou 10 de ar; a fábrica fez 12").
6. ☀️ Próximo sol. Céu muda de cor na transição (~2 s).

**Tempo alvo:** ~30–40 s por carta, ~1,5–2 min por sol, **~12 min a missão Cadete**. Sem cronômetro.

## O diretor (quantos e quais eventos)
- **Quantos:** começa com 3. Sol 1 (tutorial) = 2. Alguma barra < 30 → −1 (dar respiro). Todas > 70 → +1. Sempre entre **2 e 4**.
- **Ordem de preenchimento:** 1) continuações agendadas (histórias encadeadas); 2) **evento do Sol (DONKI)** se não houve nenhum no sol anterior — **pelo menos 1 a cada 2 sóis**; 3) sorteio entre eventos que fazem sentido agora (`canHappen`), 1 por lugar, sem repetir história em andamento.
- **No máximo 1 urgente por sol.**
- Tudo com **semente**: mesma missão pode ser repetida (voltar ao sol, turma comparando estratégias).

## Eventos do Sol (DONKI) — puxados ao vivo
Ao começar a missão o jogo busca no DONKI (`https://ccmc.gsfc.nasa.gov/DONKI/WS/get/…`, sem chave):
- **últimos 30 dias** → eventos com selo **📡 ao vivo**;
- **uma semana histórica sorteada** (2012–hoje) → selo **📚 evento real de <data>**.
Se a busca falhar, usa a lista conferida em `src/data/donki.ts` (rede de segurança, invisível para a criança).

| DONKI | No jogo | Onde | Decisão | Verdade por trás |
|---|---|---|---|---|
| **FLR** clarão solar | "Clarão do Sol!" | 📡 antena | sem rádio hoje: pedir ajuda da Terra não funciona | clarões fortes causam apagão de rádio |
| **CME** nuvem de partículas | "Uma nuvem do Sol vem aí" → chega em 1–3 sóis | 📡 → 🛡️ | preparar o abrigo antes (energia) ou seguir trabalhando | CMEs levam dias para cruzar o espaço |
| **SEP** chuva de partículas | 🚨 "Chuva de partículas AGORA!" | qualquer lugar | correr pro abrigo (perde o dia) ou terminar o serviço (radiação) | partículas rápidas chegam em minutos/horas |
| **GST** tempestade magnética (na Terra) | "Tempestade lá na Terra" | 📡 | respostas da Terra atrasam 1 sol | a Terra tem escudo magnético; Marte quase não tem |

Força no jogo: classe do flare / velocidade da CME / tamanho do SEP → força 1/3 (fraca) a 3/3 (muito forte).

## Tutorial (sol 1)
O **robô guia** (o rover da home) fala em balões curtos, com seta apontando:
1. "Este é você! Toque no chão para andar." (anda)
2. "Veja o ❗ nos painéis. Vá até lá." → carta fácil de poeira → "Toda escolha custa algo. Olhe o custo antes de escolher."
3. "Ar, comida e saúde: não deixe nenhum chegar a zero."
4. "Na fábrica de ar você divide a energia ⚡." (abre o painel, já preenchido)
5. "🚨 A antena recebeu um alerta REAL do Sol, medido pela NASA!" → carta DONKI.
6. "Tudo resolvido? Vá dormir na cama 🛏️."
Depois: **dica de primeira vez** para cada tipo novo de evento; ❓ glossário (sol, radiação, tempestade solar, escudo, abrigo); 🔊 lê cartas em voz alta (Web Speech API, 5 idiomas). Tutorial pode ser pulado e refeito no menu.

## Fim da missão e Relatório
| Final | Quando | Tom |
|---|---|---|
| 🏆 Missão cumprida | sobreviveu todos os sóis; 1 a 3 estrelas conforme a ciência | festa |
| 🚀 Resgate | ar, comida ou saúde chegou a 0 | calmo: "a Terra buscou a tripulação, ninguém se machucou" |

**Relatório da missão** (em todos os finais):
1. **Gráfico simples** das 3 barras ao longo dos sóis.
2. **As 2 decisões que mais pesaram** (sol, escolha, "Por quê?").
3. **Os eventos reais que você enfrentou** — lista dos eventos do DONKI da missão, com data, tipo e link oficial ("Isso aconteceu de verdade no Sol!").
4. **Uma dica** para a próxima + **um fato real** (ex.: naves da Terra só a cada ~26 meses).
5. Botões: **[Voltar ao sol X]** (mesma missão, decisão diferente) · **[Nova missão]** · **[Início]**.

## Níveis
| Nível | Idade | Sóis | Meta 🔬 | Radiação |
|---|---|---|---|---|
| Cadete | 7–9 | 7 | 12 | ×0,7 |
| Piloto | 9–11 | 10 | 20 | ×1 |
| Comandante | 11+ / pais / sala | 14 | 32 | ×1,3 |

## Save
Automático no `localStorage` ao fim de cada carta e ao dormir (`src/lib/saves.ts`). Home mostra "Continuar missão" se existir.

## Fora do escopo (por enquanto)
Modo "semana real" (replay de uma semana histórica inteira), modo sala de aula, foto do Mars Trek do local de pouso, ilustração por carta.
