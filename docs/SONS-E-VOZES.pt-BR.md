# Sons, música e vozes: plano e prompts

Este é o plano original de produção. Para o estado do código e as instruções atuais, consulte [o guia de áudio em inglês](SONS-E-VOZES.md).

Estado em 15/11/2026: o jogo não tem som e a voz está desligada (`VOZ_ATIVA=false`).

**Pedidos prontos para cada pessoa:** `docs/audio/1-ELEVENLABS-vozes-e-efeitos.md` (+ `docs/audio/vozes/*.csv`), `docs/audio/2-SUNO-musicas.md`, `docs/audio/3-LEO-gratis-efeitos-8bit.md`. Para regerar as falas depois de mudar textos: `python scripts/gerar-falas-audio.py .` Este documento diz **onde** ter som, **com que ferramenta** gerar cada coisa e traz os **prompts prontos**.

## 1. Ferramentas recomendadas

| O que | Ferramenta | Custo | Por quê |
|---|---|---|---|
| Efeitos 8-bit (cliques, alertas, conquista) | **jsfxr** (sfxr.me) ou **ChipTone** (sfbgames.itch.io/chiptone) | grátis, no navegador | Feitos para 8-bit. Exporta `.wav` e a licença é livre. É o melhor caminho para os efeitos. |
| Música de fundo 8-bit em loop | **BeepBox** (beepbox.co) ou **JummBox** | grátis | Chiptune de verdade, loop perfeito, exporta `.wav`. Dá para pedir a melodia ao ChatGPT em notas e digitar. |
| Música por IA | **Suno** (plano grátis) ou **Udio** | grátis com limite | Rápido, mas o plano grátis é só para uso não comercial (ok para hackathon) e o loop nem sempre fica perfeito. Corte no Audacity. |
| Sons ambientes (vento, zumbido da base) | **ElevenLabs Sound Effects** (cota grátis mensal) ou **Freesound.org** (filtre por licença CC0) | grátis | Ambiente fica melhor gravado ou gerado por IA, com um leve filtro "lo-fi". |
| Vozes humanas (5 idiomas) | **ElevenLabs** (cota grátis ~10 mil caracteres/mês) ou **OpenAI TTS** (pela API, pago por uso, barato) | grátis/baixo | Vozes naturais em pt, en, es, fr e it, várias vozes por personagem. |
| Cortar, normalizar e converter | **Audacity** | grátis | Deixar tudo em `.ogg`/`.mp3` curto e no mesmo volume. |

ChatGPT Plus e Claude Pro não geram arquivos de áudio bons para isso. Use os dois para **escrever as falas e as melodias** e as ferramentas acima para gerar o som.

## 2. Vozes: recomendação

O leitor antigo usava a voz do navegador (Web Speech). Ela soa robótica e muda de aparelho para aparelho.

**Proposta para o hackathon (simples):**
1. **Gravar só as falas fixas** com IA (ElevenLabs): tutorial do Rovi, avisos do Rovi, abertura, noite e fim. São cerca de 60 frases × 5 idiomas, em arquivos `public/audio/voz/<idioma>/<chave>.mp3`.
2. **Cartas de evento** (são muitas) continuam sem voz, ou usam a voz do navegador escolhendo a voz "Natural"/"Google" mais humana disponível.
3. **Uma voz por personagem:**
   - **Rovi (robô):** voz leve e animada, com leve efeito metálico (no Audacity: *Effect → Distortion* bem fraco, ou um filtro de rádio).
   - **Astronauta menina / menino:** vozes jovens, calmas e diferentes entre si, conforme o personagem escolhido no perfil.
   - **Controle de Missão:** voz adulta, calma, com filtro de rádio (tira graves e agudos, chiado baixo).
4. **Parar de falar ao sair da tela** (bug antigo): ao trocar de tela, fechar carta, abrir menu, sair de `/play` e em `visibilitychange` (aba escondida), chamar `stopSpeaking()` e pausar o `<audio>` atual. Um único player global de voz evita duas falas ao mesmo tempo.
5. **Botão para desligar** som e voz no menu, salvo no `localStorage`. Começar com **música baixa (30%)** e voz desligada até a criança tocar no alto-falante (o navegador exige um toque antes de tocar áudio).

## 3. Onde ter som no jogo

| Momento | Som | Tipo |
|---|---|---|
| Tela inicial / menu | música tema em loop | música |
| Mapa de dia | música calma em loop + vento leve de Marte | música + ambiente |
| Entardecer / noite | mesma música mais lenta e grave / grilos eletrônicos e zumbido da base | música + ambiente |
| Passos do astronauta | passinho em areia (2 variações) | efeito |
| Entrar / sair de prédio | porta pneumática "tsss" | efeito |
| Alerta novo no mapa | "bip-bip" curto | efeito |
| Alerta urgente | sirene curta de 2 notas | efeito |
| Abrir carta | "blip" de tela ligando | efeito |
| Escolher opção | clique confirmando | efeito |
| Custo que chega depois (ampulheta) | "tic-tac" curto + nota grave | efeito |
| Mensagem de rádio (Controle / DONKI) | chiado de rádio + bipe | efeito |
| Tempestade solar chegando | rugido grave com estática | efeito |
| Energia + / − | clique agudo / grave | efeito |
| Pronto (salvar energia) | acorde curto positivo | efeito |
| Recurso baixo (Rovi avisa) | dois bipes descendentes | efeito |
| Texto do Rovi aparecendo | "blips" de digitação, bem baixinhos | efeito |
| Dormir | jingle de ninar de 3 segundos | efeito |
| Bom dia / novo sol | jingle de amanhecer de 2 segundos | efeito |
| Rover: saída, viagem, estação, volta | motor elétrico, rodas no cascalho, bipe da estação, motor freando | efeito + ambiente |
| Figurinha nova | brilho "plim" | efeito |
| Fim: vitória | fanfarra 8-bit de 5 segundos | música |
| Fim: cada estrela | "ding" crescente (1, 2, 3) | efeito |
| Fim: resgate | melodia calma e esperançosa, nada triste | música |
| Botões gerais do menu | clique suave | efeito |

Pasta sugerida: `public/audio/musica/`, `public/audio/sfx/`, `public/audio/ambiente/`, `public/audio/voz/<idioma>/`. Formato `.ogg` (com `.mp3` de reserva), efeitos com menos de 1 s e 50 KB, músicas com menos de 1 MB.

## 4. Prompts prontos

### 4.1 Música (Suno/Udio, ou peça a melodia ao ChatGPT para digitar no BeepBox)
- **Tema do menu:** "8-bit chiptune loop, cheerful and curious space adventure for kids, NES style, square and triangle waves, 110 BPM, major key, seamless loop, no vocals, 60 seconds"
- **Mapa de dia:** "calm 8-bit chiptune loop, exploring a small base on Mars, gentle arpeggios, soft triangle bass, 90 BPM, relaxing but focused, seamless loop, no vocals, 90 seconds"
- **Entardecer/noite:** "slow 8-bit chiptune lullaby loop, night on Mars, minor-ish but not sad, soft pulse waves, 70 BPM, seamless loop, no vocals, 60 seconds"
- **Vitória:** "short 8-bit victory fanfare, triumphant and happy, kids game, 5 seconds, ends on a bright chord"
- **Resgate:** "short gentle 8-bit melody, hopeful and calm, a rescue ship arrives, nobody is hurt, 6 seconds"

Para o ChatGPT (BeepBox): "Escreva uma melodia chiptune de 8 compassos em Dó maior, 110 BPM, para loop, em notas por compasso (ex.: C5 E5 G5), com linha de baixo separada, para eu digitar no BeepBox."

### 4.2 Efeitos 8-bit (jsfxr/ChipTone, ou ElevenLabs Sound Effects com estes textos)
Use os presets do jsfxr como ponto de partida: *Pickup/Coin* para conquista, *Blip/Select* para cliques, *Hit* para custo, *Powerup* para "Pronto", *Explosion* bem curto e grave para tempestade.
- "8-bit retro beep-beep alert, two short high notes, game UI, 0.4 seconds"
- "8-bit short siren, two alternating notes, urgent but friendly, 0.8 seconds"
- "8-bit UI blip, screen turning on, 0.2 seconds"
- "8-bit confirm click, positive, 0.15 seconds"
- "8-bit hourglass tick-tock followed by a low note, 0.8 seconds"
- "retro radio static burst with a short beep, lo-fi, 0.7 seconds"
- "low rumbling solar storm with static crackle, 8-bit lo-fi, 1.5 seconds"
- "two descending 8-bit warning beeps, 0.5 seconds"
- "8-bit sparkle chime, sticker unlocked, 0.6 seconds"
- "8-bit ding, rising pitch, for star 1, 2 and 3"
- "8-bit tiny footstep on sand, 0.1 seconds, two variations"
- "sci-fi pneumatic door hiss, short, lo-fi 8-bit, 0.5 seconds"
- "small electric rover motor starting and driving on gravel, lo-fi, 3 seconds loop"
- "8-bit lullaby jingle, 3 seconds, sleeping" / "8-bit sunrise jingle, 2 seconds, new day"

### 4.3 Ambiente (ElevenLabs Sound Effects / Freesound CC0)
- "soft thin wind on Mars, quiet, seamless loop, 20 seconds, lo-fi"
- "quiet hum of a small space base interior, air vents, seamless loop, 20 seconds"
- "night on a Mars base, very quiet electronic hum and soft wind, seamless loop, 20 seconds"

### 4.4 Vozes (ElevenLabs/OpenAI TTS)
Instrução para escolher as vozes: "Voz para personagem de jogo infantil, fala clara e devagar, frases curtas, tom amigável. Gere em português do Brasil, inglês, espanhol, francês e italiano com a mesma voz."
- **Rovi:** voz jovem e animada, ritmo rápido mas claro; depois, leve efeito metálico.
- **Astronauta (menina) / (menino):** vozes de jovem adulto, calmas e confiantes.
- **Controle de Missão:** voz adulta, tranquila, com filtro de rádio.
Textos: exporte as chaves `tut.*`, `rovi.*`, `ui.manha.*`, `ui.noite.*`, `fim.*` de `src/content/locales/ui.ts` para uma planilha e gere um arquivo por chave e idioma, com o nome da chave.

## 5. Prompt para quem for implementar (Claude/Codex/Lovable)

> Implemente som no jogo sem dependência pesada. Crie `src/game/ui/audio.ts` com um gerenciador único: `tocarEfeito(nome)`, `tocarMusica(nome)` (loop com fade de 0,5 s ao trocar), `falar(chave, personagem)` e `pararTudo()`. Use `HTMLAudioElement` com pré-carregamento dos efeitos. Volume da música em 30%, dos efeitos em 70%. Respeite: nada toca antes do primeiro toque da criança; botão de som e de voz no menu, salvo no `localStorage` com try/catch; `pararTudo()` ao sair de `/play`, ao esconder a aba (`visibilitychange`) e ao trocar de tela; nunca duas vozes ao mesmo tempo. Ligue os sons nos momentos da tabela da seção 3 (`docs/SONS-E-VOZES.md`). Arquivos em `public/audio/...`; se um arquivo não existir, o jogo segue em silêncio sem erro. Textos novos (ex.: "Som", "Voz") nos 5 idiomas. Rode `npm test` e `npm run build`.
