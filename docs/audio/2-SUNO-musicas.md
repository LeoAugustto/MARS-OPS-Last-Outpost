# Pedido para o Suno: músicas do jogo

Jogo: **Operação Marte: Última Base**, um jogo de navegador em **pixel art** para crianças de 7 a 12 anos, com uma base em Marte. Toda música deve ser **chiptune 8-bit (estilo NES/Game Boy)**, **instrumental (sem voz)**, alegre ou calma, nunca assustadora.

## Como gerar
- Use o modo **Custom**. Cole o texto de **Style** e marque **Instrumental**.
- Gere 2 ou 3 versões de cada e escolha a que tiver o melhor **loop** (o fim tem que emendar no começo sem pulo).
- Na que for loop, se o fim não emendar, corte num ponto onde a melodia recomeça (Audacity ou o editor do Suno).
- **Exportar:** MP3 44,1 kHz, 192 kbps. Volume parecido entre as faixas.
- **Nomes:** use exatamente os nomes da tabela, porque o jogo procura a música pelo nome.

## Faixas

| Arquivo | Onde toca | Duração | Loop | Style (colar no Suno) |
|---|---|---|---|---|
| `musica/tema_menu.mp3` | tela inicial e escolha do nível | 60–90 s | **sim** | `8-bit chiptune, NES style, cheerful curious space adventure theme for kids, square lead melody, triangle bass, noise drums, 110 BPM, major key, catchy, instrumental, seamless loop` |
| `musica/mapa_dia.mp3` | andando pela base de dia | 90–120 s | **sim** | `calm 8-bit chiptune, exploring a small base on Mars, gentle arpeggios, soft triangle bass, light percussion, 90 BPM, relaxed but focused, Game Boy style, instrumental, seamless loop` |
| `musica/mapa_entardecer.mp3` | fim da tarde (o relógio está acabando) | 60–90 s | **sim** | `8-bit chiptune, sunset on Mars, warm and slightly hurried, same mood as an exploration theme but more tension, 100 BPM, instrumental, seamless loop` |
| `musica/noite.mp3` | noite e resumo do dia | 60 s | **sim** | `slow 8-bit chiptune lullaby, night on Mars, soft pulse waves, music box feel, 70 BPM, peaceful, a bit dreamy, not sad, instrumental, seamless loop` |
| `musica/tempestade.mp3` | quando chega uma tempestade solar | 45–60 s | **sim** | `8-bit chiptune, solar storm approaching, exciting tension like a boss warning but kid-friendly, fast arpeggios, 130 BPM, minor key, not scary, instrumental, seamless loop` |
| `musica/rover_viagem.mp3` | cena do rover saindo em expedição | 30–45 s | **sim** | `upbeat 8-bit chiptune road trip on Mars, small rover driving, bouncy bass, 120 BPM, adventurous and fun, instrumental, seamless loop` |
| `musica/vitoria.mp3` | fim da missão (sobreviveu) | 6–10 s | não | `short 8-bit chiptune victory fanfare, triumphant and happy, NES style, ends on a bright major chord, instrumental` |
| `musica/resgate.mp3` | fim com resgate (perdeu) | 8–12 s | não | `short gentle 8-bit chiptune melody, hopeful and calm, a rescue ship arrives, nobody is hurt, warm, major key, instrumental` |
| `musica/estrelas.mp3` (opcional) | aparecendo as estrelas | 4–6 s | não | `very short 8-bit chiptune jingle, three rising sparkly notes, celebration, instrumental` |

Dica: para todas soarem como do mesmo jogo, gere o **tema do menu** primeiro e use a função de **Cover/Extend** dele para criar as outras com a mesma "cara".

Entrega: pasta `musica/` zipada para o Leo.
