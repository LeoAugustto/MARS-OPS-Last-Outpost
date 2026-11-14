# Pendências — tudo em pixel art (anotado 14/11, fazer de uma vez quando a arte chegar)

## Mudanças pedidas (código)
1. Barra de baixo: **tirar o botão Energia** (energia só no painel da fábrica de ar). Barra será remodelada.
2. **ESC abre o menu** (o mesmo do botão sanduíche). No interior, ESC hoje sai do lugar → passa a abrir o menu.
3. Menu: **botão X para fechar** (canto de cima).
4. **Nenhum emoji** em lugar nenhum: trocar todos pelos ícones próprios (lista abaixo), em telas E nos textos dos 5 idiomas.
5. Janelas (carta, energia, manhã, noite, glossário, menu) e tela inicial em pixel art.
6. Interiores com a arte de cada lugar (descrições do Vinicius → geração).

## Ícones (PNG, fundo transparente, pixel art na paleta do jogo)
Pasta: `public/assets/ui/` (64×64) — nome do arquivo entre parênteses.

### A. Já existem (reusar em tudo, inclusive nos textos)
| Emoji hoje | Vira | Arquivo |
|---|---|---|
| 💨 ar | tanque de O₂ | `ui/o2.png` |
| 🥔 comida | batata | `ui/batata.png` |
| ❤️ saúde | coração | `ui/coracao.png` |
| ⚡ energia | raio | `ui/raio.png` |
| 🔬 ciência / laboratório | microscópio | `ui/microscopio.png` |
| 🛏️ dormir / cama | beliche | `ui/cama.png` |
| ⭐ força / dificuldade | estrela | `ui/estrela.png` |
| 🤖 robô guia | Rovi | `portraits/rovi.png` |
| 🛰️ Controle de Missão | retrato | `portraits/controle.png` |
| 🧑‍🚀 astronauta | sprite | `astronaut/{f,m}/s_1.png` |
| 🏠 🔆 📡 🌱 🛡️ 🚙 lugares | ícones redondos | `icons/<lugar>.png` |
| ☰ ❓ | botões menu / ajuda | `ui/btn_menu.png`, `ui/btn_ajuda.png` |

### B. Faltam — recursos e estados (usados em vários lugares)
| Emoji hoje | Para quê | Arquivo |
|---|---|---|
| 🔋 | bateria | `ui/bateria.png` |
| 🛡️ (recurso) | escudo / camada de areia | `ui/escudo.png` |
| ☀️ | dia / luz dos painéis | `ui/sol.png` |
| 🌇 | fim de tarde | `ui/entardecer.png` |
| 🌙 | noite | `ui/lua.png` |
| 🌅 | bom dia (manhã) | `ui/amanhecer.png` |
| ☢️ | radiação | `ui/radiacao.png` |
| ❗ | alerta | `ui/alerta.png` |
| 🚨 | alerta urgente | `ui/urgente.png` |
| ⚠️ | aviso (faltou energia) | `ui/aviso.png` |
| ⏳ | custo depois | `ui/ampulheta.png` |
| 💡 | "Por quê?" / dica | `ui/lampada.png` |
| 📡 | dado AO VIVO da NASA | `ui/ao_vivo.png` |
| 📚 | evento real (arquivo) | `ui/arquivo.png` |
| 📻 | mensagem de rádio | `ui/radio.png` |
| 😟 | tripulação cansada | `ui/cansado.png` |
| ▰ | nível do escudo (barrinha) | `ui/nivel.png` |

### C. Faltam — botões e telas
| Emoji hoje | Onde | Arquivo |
|---|---|---|
| ✕ | fechar janela | `ui/btn_fechar.png` |
| ▶ | continuar / voltar ao jogo / próximo | `ui/play.png` |
| 🔄 | recomeçar / nova missão | `ui/recomecar.png` |
| ⏪ | voltar ao sol X | `ui/voltar.png` |
| 🔊 | ouvir (voz) | `ui/som.png` |
| 📖 | palavras do espaço (glossário) | `ui/livro.png` |
| 📋 | relatório | `ui/relatorio.png` |
| 🎉 | missão cumprida | `ui/vitoria.png` |
| 🙂 | todos voltaram bem | `ui/ok.png` |
| 🚀 | resgate / chegada | `ui/foguete.png` |
| 🖥️ | computador (interior) | `ui/computador.png` |
| 🚪 | porta de saída (interior) | `ui/porta.png` |

### D. Faltam — ícone de cada evento (aparece na carta)
Pasta `public/assets/events/` (96×96). Nome = id do evento.
| Emoji | Evento (`id`) |
|---|---|
| 🚀 | chegada (`chegada`) |
| ⚡ | clarão do Sol (`sol_clarao`) |
| ☄️ | nuvem de partículas (`sol_nuvem`) |
| 🌩️ | a nuvem chegou (`sol_nuvem_chega`) |
| 🚨 | chuva de partículas (`sol_chuva`) |
| 🌍 | tempestade na Terra (`sol_terra`) |
| 🌪️ | poeira vem aí (`poeira_vem`) |
| 🔆 | painel sujo (`painel_sujo`) |
| 🍃 | vento limpou (`vento_limpa`) |
| 🌀 | redemoinho (`redemoinho`) |
| 💥 | painel rachado (`painel_rachado`) |
| ❄️ | inverno (`inverno`) |
| 🌱 | broto (`broto`) |
| 🥔 | colheita boa (`colheita_boa`) |
| 🥀 | colheita fraca (`colheita_fraca`) |
| 🍂 | mofo nas folhas (`mofo`) |
| 🌶️ | rabanetes (`rabanete`) |
| 📦 | sementes da Terra (`sementes_terra`) |
| 🥬 | alface (`alface…`) |
| 💨 | filtro entupido (`filtro_entupido`) |
| 🚪 | porta chiando (`vazamento`) |
| 🛠️ / 🔧 | máquina com barulho / conserto (`gerador_barulho`, continuações) |
| 💧 | água do ar (`agua_do_ar`) |
| 🪨 | rocha diferente (`rocha`) |
| 🔬 | resultado do laboratório (`laboratorio`) |
| 🔬 | microscópio quebrou (`microscopio`) |
| 🧊 | gelo no chão (`gelo`) |
| 🦠 | bactérias (`bacterias`) |
| 🧽 | laboratório sujo (`lab_contaminado`) |
| 🧱 | rachadura no escudo (`rachadura`) |
| 🚨 | treino de emergência (`treino`) |
| 🏋️ | exercício (`exercicio`) |
| 😴 | sem sono (`sem_sono`) |
| 🏠 | saudade de casa (`saudade`) |
| 📡 | ligação para a Terra (`contato_terra`) |
| 📨 | resposta da Terra (`resposta_terra`) |
| 🎂 | aniversário (`aniversario`) |
| 🏫 | escola (`escola`) |
| 📡 | antena torta (`antena_torta`) |
| 🛞 | pneu furado (`pneu`) |
| 🏜️ | dunas (`dunas`) |
| 🐚 | fóssil? (`fossil`) |

(As bandeiras de idioma já são imagens SVG, não emoji.)

## Teste completo (missão Cadete, 14/11) — anotações
### Erros
- **Data no formato técnico** (2026-11-05) em todos os idiomas → formatar pelo idioma (05/11/2026, Nov 5 2026, 5 nov. 2026…).
- **Aviso de nuvem do Sol sem consequência no fim da missão:** avisada no sol 5 com "continuar trabalhando", ela chegaria em 1–3 sóis, mas a missão acabou antes → a escolha saiu de graça. Corrigir: só avisar se ainda couber, ou fazer a nuvem chegar no último sol.
### Equilíbrio / clareza
- O dia termina cedo (10:00–13:30): com 2–3 alertas de 1–2 h, o relógio quase não pesa.
- "Faltou energia para: Laboratório" quase toda noite: a divisão padrão não deixa sobra para as cartas e ninguém avisa a criança.
- O escudo nunca foi construído (radiação "−1 ❤️, escudo 15%" a missão toda): ninguém sugere investir no escudo.
- Cadete jogando ao acaso venceu (ok para 7–9 anos).

## Futuro (deixado de fora por decisão do time, 14/11)
- **Leitura em voz alta (🔊 Ouvir)** e acessibilidade por áudio: desligada (`VOZ_ATIVA = false` em `src/game/ui/shared.tsx`; código mantido).
- **Sons em 8 bits** (passo, alerta, escolha, vitória): não feito, junto com o áudio.
