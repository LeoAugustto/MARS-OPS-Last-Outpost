# Pedido para o ElevenLabs: vozes e efeitos realistas

Jogo: **Operação Marte: Última Base**, um jogo de navegador em pixel art para crianças de 7 a 12 anos. A criança comanda uma base em Marte, com a ajuda de um robô chamado **Rovi** e de mensagens do **Controle de Missão** na Terra.

Obrigado por ajudar! Tudo o que precisa está aqui e nos arquivos `vozes/`.

## Parte A: vozes

### Arquivos com as falas
- `vozes/falas_pt.csv`, `falas_en.csv`, `falas_es.csv`, `falas_fr.csv`, `falas_it.csv`: **fase 1 (obrigatória).** São 68 falas por idioma, cerca de 4.500 caracteres por idioma (~23 mil no total).
- `vozes/fase2_cartas_<idioma>.csv`: **fase 2 (opcional, só se sobrar crédito).** São as falas do astronauta ao fazer uma escolha. 115 por idioma (~8 mil caracteres) e **vezes 2**, porque cada uma é gravada com a voz de menina e a de menino.

Abra no Excel ou no Google Sheets (separador **;**). Colunas:
- `arquivo`: o nome exato do arquivo para salvar, já com a pasta. Exemplo: `pt/rovi/tut.andar.mp3`.
- `personagem`: qual voz usar.
- `emocao`: a emoção da fala.
- `texto_para_colar_v3`: o texto **com as tags de emoção**, para colar direto no modelo **Eleven v3**.
- `texto_sem_tags`: o mesmo texto sem tags, para modelos que não entendem tags (Multilingual v2). Nesse caso, ajuste a emoção pelos controles da voz.

### Modelo e configuração
- **Modelo:** **Eleven v3** (entende tags como `[excited]`, `[sighs]`, `[yawns]`). As tags ficam em inglês em todos os idiomas, e é assim mesmo.
- **Idiomas:** português do Brasil, inglês, espanhol, francês e italiano. Use **a mesma voz** de cada personagem nos 5 idiomas, para a criança reconhecer o personagem.
- **Pausas:** use reticências (`...`) ou `[pause]`. Em v2, use `<break time="0.5s" />`.
- **Velocidade:** um pouco mais lenta que o normal (0,9×). Crianças pequenas estão aprendendo a ler.
- **Exportar:** MP3, 44,1 kHz, 128 kbps, mono. Corte o silêncio do começo e do fim (no máximo 0,1 s).
- **Volume:** todas as falas no mesmo volume (normalizar em −16 LUFS, ou "normalize" no Audacity).
- **Números:** quando aparecer "-4 de saúde", deve ser lido como "menos quatro de saúde" (no idioma da fala).

### As vozes (use o Voice Design ou escolha da biblioteca)
| Personagem | Pasta | Como deve soar | Prompt para o Voice Design |
|---|---|---|---|
| **Rovi** (robô ajudante) | `rovi/` | Animado, simpático, um pouco agudo, claro. É o "amigo-professor" da criança. Depois de gerar, um leve efeito metálico (opcional). | "A friendly, upbeat small robot companion for a kids' space game, slightly high-pitched, clear and warm, playful but easy to understand, speaks slowly and clearly" |
| **Controle de Missão** (Terra) | `controle/` | Adulto, calmo, confiante, acolhedor. Fala pelo rádio. Depois, filtro de rádio (opcional). | "A calm, warm adult mission controller speaking over the radio, reassuring and clear, gentle authority, kids' educational game" |
| **Astronauta menina** | `astronauta_menina/` | Jovem adulta, corajosa, alegre. | "A young adult female astronaut, cheerful and brave, friendly, clear, kids' game" |
| **Astronauta menino** | `astronauta_menino/` | Jovem adulto, corajoso, alegre. | "A young adult male astronaut, cheerful and brave, friendly, clear, kids' game" |

Na fase 2, `astronauta_X` no nome do arquivo quer dizer: grave duas vezes e salve uma em `astronauta_menina/` e outra em `astronauta_menino/`.

### Guia de emoções usadas
| Tag | Quando | Como soar |
|---|---|---|
| `[excited]` / `[very excited]` | abertura, estrelas, vitória | energia alta, sorrindo |
| `[cheerful]` / `[happy]` / `[pleased]` | ajuda, bom dia, figurinha | alegre, leve |
| `[friendly]` / `[helpful]` / `[warm]` | tutorial e dicas | gentil, paciente, explicando |
| `[thoughtful]` / `[curious]` | custos, curiosidades | pensativo, intrigado |
| `[serious]` | regra importante | firme, mas sem medo |
| `[worried]` / `[concerned]` | ar ou comida acabando | preocupado, mas calmo; **nunca assustar a criança** |
| `[urgent]` / `[slightly urgent]` | tempestade, entardecer | rápido e firme, sem gritar |
| `[sighs] [tired]` | cansaço da noite | suspiro, cansado |
| `[yawns] [sleepy]` | hora de dormir | bocejo, sonolento |
| `[calm] [soft]` / `[calm] [reassuring]` | noite, resgate | baixo, tranquilo, acolhedor |
| `[sighs] [relieved]` | "ufa" | alívio |
| `[proud]` | missão cumprida | orgulhoso e caloroso |
| `[encouraging]` | dicas depois de perder | motivador, "você consegue" |

Importante: é para crianças. Nada de tom assustador, triste demais ou irônico. O resgate é **calmo e positivo** ("ninguém se machucou").

### Como entregar
Uma pasta `voz/` com as subpastas exatamente como na coluna `arquivo`:
```
voz/pt/rovi/tut.andar.mp3
voz/pt/controle/fim.vitoria.body.mp3
voz/en/astronauta_menina/astro.vamos.mp3
...
```
Zipe e mande para o Leo. Os nomes têm que ser **iguais**, porque o jogo procura o arquivo pelo nome.

## Parte B: efeitos realistas e ambientes (ElevenLabs Sound Effects)

Os sons "de verdade" (máquinas, vento, rádio). Os bipes 8-bit ficam com o Leo. Estilo geral: **um pouco lo-fi, para combinar com pixel art**, nada assustador.

| Arquivo | Prompt | Duração | Loop? |
|---|---|---|---|
| `ambiente/vento_marte.mp3` | "soft thin wind on Mars, quiet and calm, no gusts, lo-fi, seamless loop" | 20 s | sim |
| `ambiente/base_dentro.mp3` | "quiet hum of a small space base interior, gentle air vents, soft electronic hum, seamless loop" | 20 s | sim |
| `ambiente/noite_base.mp3` | "very quiet night on a Mars base, soft electronic hum, faint wind, peaceful, seamless loop" | 20 s | sim |
| `sfx/porta_abre.mp3` | "short sci-fi pneumatic door opening hiss, lo-fi, friendly" | 0,6 s | não |
| `sfx/porta_fecha.mp3` | "short sci-fi pneumatic door closing hiss, lo-fi" | 0,6 s | não |
| `sfx/passo_areia_1.mp3` e `_2` | "single soft footstep on dusty sand, light, lo-fi" | 0,2 s | não |
| `sfx/radio_chiado.mp3` | "short retro radio static burst ending with a beep, lo-fi" | 0,8 s | não |
| `sfx/tempestade_chegando.mp3` | "low rumbling solar storm with crackling static, ominous but not scary, kids game" | 2 s | não |
| `sfx/rover_liga.mp3` | "small electric rover motor starting up, cute, lo-fi" | 1,5 s | não |
| `sfx/rover_andando.mp3` | "small electric rover driving on gravel, steady, seamless loop, lo-fi" | 4 s | sim |
| `sfx/rover_freia.mp3` | "small electric rover slowing down and stopping on gravel" | 1,5 s | não |
| `sfx/estacao_bipe.mp3` | "remote science station beeping and whirring as it receives data, lo-fi" | 1,5 s | não |
| `sfx/painel_limpo.mp3` | "brushing dust off solar panels, soft swipes, lo-fi" | 1 s | não |
| `sfx/estufa_agua.mp3` | "small water sprinkler in a greenhouse, gentle, lo-fi" | 1 s | não |
| `sfx/fabrica_ar.mp3` | "air machine humming and puffing, gentle, lo-fi" | 1,5 s | não |

Entregar em `ambiente/` e `sfx/` com esses nomes, MP3 44,1 kHz, volume normalizado.
