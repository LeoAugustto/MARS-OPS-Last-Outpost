# Para o Leo: efeitos 8-bit grátis (jsfxr)

O que fica com você: os **bipes e jingles 8-bit** da interface. O ElevenLabs faz os sons realistas e o Suno faz as músicas.

## Ferramenta
- **jsfxr**: https://sfxr.me. É grátis, no navegador e sem conta.
  1. Clique no **preset** indicado (botões à esquerda).
  2. Clique de novo até gostar (cada clique sorteia uma variação), ou use **Mutate** para variar pouco.
  3. Ajuste o que a tabela diz: **Sustain** (duração), **Start frequency** (agudo/grave), **Slide** (sobe/desce).
  4. Exporte em **WAV** e salve com o nome da tabela.
- **Plano B:** ChipTone (https://sfbgames.itch.io/chiptone) tem mais controle e também é grátis.
- **Converter para MP3 e normalizar:** Audacity (grátis). *Effect → Normalize* (−1 dB), depois *File → Export → MP3*. Ou use https://cloudconvert.com.

Regra de ouro: **curto** (quase todos com menos de 0,5 s), **sem estridência** (é para criança, então baixe o agudo se doer no ouvido) e **volume parecido** entre todos.

## Lista de efeitos

| Arquivo | Onde toca | Preset jsfxr | Ajuste |
|---|---|---|---|
| `sfx/clique.mp3` | botões em geral | Blip/Select | bem curto (0,05–0,1 s), médio |
| `sfx/clique_grave.mp3` | botão − da energia | Blip/Select | frequência mais baixa |
| `sfx/clique_agudo.mp3` | botão + da energia | Blip/Select | frequência mais alta |
| `sfx/confirmar.mp3` | escolher uma opção da carta | Pickup/Coin | curto, 2 notas subindo |
| `sfx/pronto.mp3` | "Pronto" no painel de energia | Powerup | curto (0,3 s), subindo |
| `sfx/alerta.mp3` | alerta novo no mapa | Blip/Select | 2 bipes curtos (gere 1 e duplique no Audacity) |
| `sfx/urgente.mp3` | alerta urgente | Laser/Shoot | 2 notas alternando, 0,6 s, sem estridência |
| `sfx/abrir_carta.mp3` | abrir uma carta | Blip/Select | Slide para cima, 0,15 s ("tela ligando") |
| `sfx/custo.mp3` | perder recurso | Hit/Hurt | curto e grave |
| `sfx/ganho.mp3` | ganhar recurso | Pickup/Coin | curto e agudo |
| `sfx/ampulheta.mp3` | o custo de depois chegou | Blip/Select | dois "tic-tac" (duplique), depois uma nota grave |
| `sfx/aviso_rovi.mp3` | Rovi avisa ar/comida baixos | Blip/Select | 2 bipes descendo (Slide negativo) |
| `sfx/rovi_fala.mp3` | letrinhas aparecendo na fala do Rovi | Blip/Select | MUITO curto (0,03 s), bem baixo |
| `sfx/estrela.mp3` | cada estrela no fim | Pickup/Coin | brilhante; o jogo toca 3× subindo o tom |
| `sfx/figurinha.mp3` | figurinha nova | Powerup | brilho, 0,5 s |
| `sfx/bom_dia.mp3` | começo do sol | Powerup | jingle 3 notas subindo, ~1 s (ou faça no BeepBox) |
| `sfx/dormir.mp3` | ir para a cama | Blip/Select | 3 notas descendo, devagar, ~1 s (ou BeepBox) |
| `sfx/sem_energia.mp3` | tentar algo sem energia | Hit/Hurt | "bzzt" curto e grave |
| `sfx/abrir_menu.mp3` | abrir o menu/ajuda | Blip/Select | suave, curto |

### Jingles com melodia (opcional, no BeepBox)
Para `bom_dia` e `dormir` com cara de música:
- https://www.beepbox.co, grátis.
- **Bom dia:** 4 notas subindo, C5 E5 G5 C6, rápido, instrumento "square".
- **Dormir:** 4 notas descendo, G5 E5 C5 G4, devagar, instrumento "triangle" (mais suave).
- *File → Export → .wav*, depois converta para MP3.

## Onde salvar
Pasta `sfx/` com esses nomes. Junte com o que vier do ElevenLabs (`voz/`, `sfx/`, `ambiente/`) e do Suno (`musica/`) e coloque tudo em `public/audio/` no projeto:
```
public/audio/musica/...   (Suno)
public/audio/sfx/...      (você + ElevenLabs)
public/audio/ambiente/... (ElevenLabs)
public/audio/voz/...      (ElevenLabs)
```
Quando os arquivos chegarem, é só pedir para o Claude (ou o Lovable) implementar seguindo a seção 5 de `docs/SONS-E-VOZES.md`. O jogo vai procurar exatamente esses nomes, e o que faltar fica em silêncio, sem erro.
