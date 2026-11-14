# Fontes de dados — o que é real e o que é jogo

> Os jurados vão olhar isto. Tudo que aparece no jogo como "real" precisa estar aqui, com link e status de verificação.
> Status: ✅ conferido na fonte · ⚠️ a conferir (escrito de memória para o esqueleto) · 🎮 número de jogo (não é dado real)

## Conjuntos de dados da NASA usados
| Fonte | Para quê no jogo | Como entra | Status |
|---|---|---|---|
| **DONKI** — https://ccmc.gsfc.nasa.gov/tools/DONKI/ · API `https://api.nasa.gov` `/DONKI/FLR` | Força e data das tempestades solares (`sol_agitado` → `tempestade_chega`) | 1º alerta da missão: flare M/X mais forte dos últimos 7 dias, **ao vivo** (`src/data/donki-live.ts`, sem chave, CORS liberado). Demais alertas: 16 flares conferidos com ID e link do DONKI (`src/data/donki.ts`, gerado por `scripts/fetch-donki.mjs`) | ✅ conferido em 14/11/2026 |
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
| Mai/2024 (20/05): evento solar chegou a Marte; Curiosity mediu ~8.100 µGy ≈ 30 raios-X de tórax. **Não está no DONKI** (foi no lado oculto do Sol), então não ligar a nenhum flare da lista | `fato.marte_2024` | NASA, jun/2024 | ⚠️ |
| Perseverance coleta rochas com sinais de água antiga (Jezero) | `laboratorio` | NASA | ⚠️ |

### Fatos dos eventos por lugar da base (`src/content/events.ts`, bloco "EVENTOS POR LUGAR")

Conferidos em 14/11/2026 por busca na web (fontes NASA/JPL e imprensa que cita a NASA). Antes da submissão, vale abrir o link da NASA de cada um e colar aqui.

| Fato no jogo                                                                                                         | Evento                   | Fonte a citar                                                                                 | Status |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------- | ------ |
| Mar/2005: um redemoinho de poeira limpou os painéis do Spirit e a energia subiu muito                                | `redemoinho`             | NASA/JPL, status do Spirit (mar/2005); PIA03608 "Solar-Panel Dust Accumulation and Cleanings" | ✅     |
| A sonda InSight detectou pelo sismógrafo impactos de meteoroides em Marte (2020–2021, crateras confirmadas pelo MRO) | `painel_rachado`         | NASA/JPL, InSight (set/2022)                                                                  | ✅     |
| No inverno, o Opportunity estacionava em ladeiras viradas para o Sol para pegar mais luz                             | `inverno`                | NASA/JPL, Opportunity (Greeley Haven, 2012)                                                   | ✅     |
| Marte tem estações porque o eixo é inclinado, como o da Terra; no inverno o dia tem menos horas de sol               | `inverno`                | NASA Mars facts                                                                               | ⚠️     |
| 2020: tripulação da ISS soltou folhas de chá para achar um vazamento no módulo Zvezda e tapou com remendo provisório | `vazamento`              | NASA, blog da ISS (out/2020)                                                                  | ✅     |
| O MOXIE (Perseverance) produziu oxigênio a partir do CO₂ de Marte (2021–2023)                                        | `gerador_barulho`        | NASA/JPL, MOXIE                                                                               | ✅     |
| A ISS recupera cerca de 98% da água, incluindo umidade do ar (respiração e suor)                                     | `agua_do_ar`             | NASA, ECLSS (jun/2023)                                                                        | ✅     |
| 2015: zínias do Veggie pegaram mofo; Scott Kelly cortou partes doentes; ventiladores secaram demais as plantas       | `mofo`                   | NASA, Veggie (jan/2016)                                                                       | ✅     |
| Rabanetes do Plant Habitat-02 ficaram prontos em 27 dias (colheita em 30/11/2020)                                    | `rabanete`               | NASA, PH-02 (dez/2020)                                                                        | ✅     |
| Ago/2015: tripulação da ISS comeu alface plantada a bordo (Veggie)                                                   | `sementes_terra`         | NASA, Veggie (10/08/2015)                                                                     | ✅     |
| A viagem Terra→Marte leva muitos meses (texto não usa número)                                                        | `sementes_terra`         | NASA                                                                                          | ⚠️     |
| 2014: NASA enviou por mensagem o desenho de uma chave e ela foi impressa na impressora 3D da ISS                     | `microscopio`            | NASA, 3D Printing in Zero-G (dez/2014)                                                        | ✅     |
| 2008: a Phoenix confirmou gelo de água no subsolo de Marte                                                           | `gelo`                   | NASA/JPL, Phoenix (31/07/2008)                                                                | ✅     |
| Usar recursos de Marte (como gelo) é plano para bases futuras                                                        | `gelo`                   | NASA, ISRU                                                                                    | ⚠️     |
| A ISS tem uma caixa fechada com luvas para experimentos (Microgravity Science Glovebox)                              | `bacterias`              | NASA, MSG                                                                                     | ✅     |
| Proteção planetária: naves são limpas para não levar micróbios da Terra a Marte                                      | `bacterias`              | NASA Office of Planetary Protection                                                           | ⚠️     |
| Cobrir habitats com solo de Marte para blindar radiação é ideia em estudo (não algo já feito)                        | `rachadura`              | NASA, estudos de habitats                                                                     | ⚠️     |
| Tripulações da ISS treinam emergências como fogo e despressurização                                                  | `treino`                 | NASA, blog da ISS                                                                             | ✅     |
| Mensagem Marte↔Terra leva de ~4 a ~24 minutos                                                                        | `aniversario`            | NASA, "Space Communications: 7 Things"                                                        | ✅     |
| Isolamento e confinamento é um dos 5 riscos do Programa de Pesquisa Humana da NASA                                   | `aniversario`, `saudade` | NASA HRP                                                                                      | ✅     |
| ARISS: astronautas da ISS falam com escolas por rádio; mais de 1.100 escolas desde 2000                              | `escola`                 | NASA, ARISS                                                                                   | ✅     |
| A NASA ouve as naves com antenas gigantes em três lugares do mundo (Deep Space Network)                              | `antena_torta`           | NASA DSN                                                                                      | ⚠️     |
| Sol = 24 h 39 min; equipes de rovers viveram no horário de Marte e usavam cortinas escuras                           | `sem_sono`               | NASA/JPL (MER 2004, Curiosity 2012)                                                           | ✅     |
| A NASA estuda se cuidar de plantas ajuda astronautas isolados (pesquisa em andamento)                                | `saudade`                | NASA HRP, "Can space gardening help astronauts cope with isolation?"                          | ✅     |
| Rodas do Curiosity furadas por pedras pontudas; equipe passou a escolher caminhos mais lisos                         | `pneu`                   | NASA/JPL, Curiosity                                                                           | ✅     |
| 2009: o Spirit afundou em areia fofa sob uma crosta dura ("Troy") e não saiu mais                                    | `dunas`                  | NASA/JPL, Spirit                                                                              | ✅     |
| Até hoje nenhum fóssil foi encontrado em Marte                                                                       | `fossil`                 | NASA                                                                                          | ⚠️     |
| O Perseverance guarda amostras de rocha em tubos para um dia serem estudadas na Terra                                | `fossil`                 | NASA, Mars Sample Return                                                                      | ⚠️     |

Simplificações dos eventos por lugar (🎮): os custos e ganhos (energia, ar, comida, saúde, ciência, luz dos painéis) são de jogo; "praga" virou mofo (o caso real da ISS); a água recuperada entra como comida (água para a estufa), porque o jogo não tem barra de água.

## Números de jogo (🎮 — simplificados, não são dados da NASA)
Todos em `src/game/engine/balance.ts`: produção dos painéis (10 ⚡), consumo diário, rendimento por energia, força das tempestades, redução do escudo (15%/nível), fator do abrigo (30%).
A página `/fontes` deve dizer isso com clareza: *"Os números de energia e comida foram simplificados para o jogo. As tempestades, datas e fatos são reais."*

## Observações técnicas do DONKI
- `api.nasa.gov/DONKI/FLR` devolvia **404** em 14/11/2026; o serviço do próprio DONKI (`https://ccmc.gsfc.nasa.gov/DONKI/WS/get/FLR`) funcionava, sem chave e com CORS liberado.
- Intervalos muito longos (ex.: 1 ano) às vezes voltam vazios: busque mês a mês.
- A chave da api.nasa.gov do time **não vai para o repositório**. Se precisar, use `NASA_API_KEY` só no seu terminal.

## Regra de honestidade
- Lista selecionada → selo **"📚 Evento real de <data>"**.
- Chamada de API feita agora → selo **"📡 Dado ao vivo da NASA"**.
- Nunca o contrário.
