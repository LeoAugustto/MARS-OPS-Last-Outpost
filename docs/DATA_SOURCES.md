# Fontes de dados — o que é real e o que é jogo

> Os jurados vão olhar isto. Tudo que aparece no jogo como "real" precisa estar aqui, com link e status de verificação.
> Status: ✅ conferido na fonte · ⚠️ a conferir (escrito de memória para o esqueleto) · 🎮 número de jogo (não é dado real)

## Conjuntos de dados da NASA usados
| Fonte | Para quê no jogo | Como entra | Status |
|---|---|---|---|
| **DONKI** — https://ccmc.gsfc.nasa.gov/tools/DONKI/ · API `https://api.nasa.gov` `/DONKI/FLR` | Força e data das tempestades solares (`sol_agitado` → `tempestade_chega`) | `src/data/donki.ts` (lista selecionada) gerada por `scripts/fetch-donki.mjs`; opcional: flare recente "ao vivo" | ⚠️ lista atual escrita de memória, **rodar o script** |
| **OSDR** — https://osdr.nasa.gov | Evento `exercicio`: ossos/músculos enfraquecem com pouca gravidade | Lição da carta + link de um estudo na página /fontes | ⚠️ escolher 1 estudo e linkar |
| **RadLab (OSDR)** — https://visualization.osdr.nasa.gov/radlab/gui/data-api/ | Comparar a dose do jogo com a dose real medida na ISS | Fato no relatório / página /fontes | ⚠️ a fazer |
| **Mars Trek** — https://trek.nasa.gov/mars/ | Foto/mapa real do local de pouso (carta `chegada`) | Imagem em `public/assets/` com crédito | ⚠️ a fazer |
| **CSA — Food production** — https://www.asc-csa.gc.ca/eng/youth-educators/toolkits/food-production/ | Cadeia da estufa (luz, crescimento, colheita) | Lições das cartas `broto`/colheitas | ⚠️ conferir textos |

## Fatos usados nos textos (conferir antes da submissão)
| Fato no jogo | Onde | Fonte a citar | Status |
|---|---|---|---|
| Sol = 24 h 40 min (24h 39min 35s) | glossário | NASA Mars facts | ⚠️ |
| Gravidade de Marte ≈ 38% da Terra ("pouco mais de um terço") | `exercicio` | NASA Mars facts | ⚠️ |
| Ar de Marte é quase todo CO₂ (~95%) | `chegada` | NASA Mars facts | ⚠️ |
| Mensagem Marte↔Terra leva ~4 a 24 min | `contato_terra` | NASA/JPL | ⚠️ (há fontes que dizem 3–22 min; usar a da NASA) |
| Janela de lançamento Terra→Marte a cada ~26 meses | relatório | NASA | ⚠️ |
| Tempestade de poeira de 2018 encerrou o Opportunity | `poeira_vem` | NASA/JPL | ⚠️ |
| Vento limpou painéis do Spirit/Opportunity ("cleaning events") | `painel_sujo` | NASA/JPL | ⚠️ |
| Astronautas da ISS se exercitam ~2 h/dia | `exercicio` | NASA | ⚠️ |
| Na ISS, tripulação se abriga em área mais protegida em eventos solares | `sol_agitado` | NASA | ⚠️ |
| Radiação na superfície de Marte ~0,64 mSv/dia (RAD/Curiosity, Hassler et al. 2014) | `balance.ts` | Science 2014 / NASA | ⚠️ |
| Set/2017: tempestade solar gerou auroras em Marte e aumentou radiação medida pelo Curiosity | `fato.marte_2017` | NASA (MAVEN/Curiosity) | ⚠️ |
| Mai/2024: evento solar chegou a Marte; Curiosity mediu ~8.100 µGy ≈ 30 raios-X de tórax | `fato.marte_2024` | NASA, jun/2024 | ⚠️ |
| Perseverance coleta rochas com sinais de água antiga (Jezero) | `laboratorio` | NASA | ⚠️ |

## Números de jogo (🎮 — simplificados, não são dados da NASA)
Todos em `src/game/engine/balance.ts`: produção dos painéis (10 ⚡), consumo diário, rendimento por energia, força das tempestades, redução do escudo (15%/nível), fator do abrigo (30%).
A página `/fontes` deve dizer isso com clareza: *"Os números de energia e comida foram simplificados para o jogo. As tempestades, datas e fatos são reais."*

## Regra de honestidade
- Lista selecionada → selo **"📚 Evento real de <data>"**.
- Chamada de API feita agora → selo **"📡 Dado ao vivo da NASA"**.
- Nunca o contrário.
