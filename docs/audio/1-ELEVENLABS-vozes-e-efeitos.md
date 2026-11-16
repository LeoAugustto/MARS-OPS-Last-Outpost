# ElevenLabs production brief

MARS OPS: Last Outpost is a pixel-art browser game for ages 7–12. This brief specifies voice and ambience assets. See [Sound, music, and voices](../SONS-E-VOZES.md) for the runtime paths and current asset status.

## Voice lines

- `vozes/falas_<language>.csv` contains the first batch of 68 lines per language, about 23,000 characters in total.
- `vozes/fase2_cartas_<language>.csv` contains the optional card responses, 115 per language, with separate recordings for the two astronaut voices.

The CSVs use a semicolon delimiter. `arquivo` is the exact output path, `personagem` is the character, and `emocao` is the delivery. Copy `texto_para_colar_v3` for Eleven v3 or use `texto_sem_tags` for models that take plain text. Keep tags in English and keep each character’s voice consistent across Brazilian Portuguese, English, Spanish, French, and Italian.

Aim for clear speech at about 0.9× normal speed. Keep the tone calm when resources run low and reassuring during a rescue. Use short pauses. Read negative numbers naturally in the target language. Export mono MP3 at 44.1 kHz and 128 kbps, trim leading and trailing silence, and normalize voices to a consistent loudness. The production target is −16 LUFS.

| Character | Folder | Voice prompt |
| --- | --- | --- |
| Rovi | `rovi/` | A warm, upbeat little robot. Slightly high-pitched, playful, and easy to understand. |
| Mission Control | `controle/` | A calm adult mission controller. Clear and reassuring, with a gentle radio texture. |
| Female astronaut | `astronauta_menina/` | A cheerful, confident young adult. Clear, friendly delivery. |
| Male astronaut | `astronauta_menino/` | A cheerful, confident young adult. Clear, friendly delivery. |

Export both astronaut versions when `astronauta_X` appears in a card file path. Common delivery tags include `[friendly]` for tutorial prompts, `[thoughtful]` for explanations, `[urgent]` for time-sensitive alerts, `[sleepy]` at bedtime, and `[reassuring]` for a rescue. Match the original wording of each language.

```text
voz/pt/rovi/tut.andar.mp3
voz/pt/controle/fim.vitoria.body.mp3
voz/en/astronauta_menina/astro.vamos.mp3
```

Keep paths and filenames unchanged when sending the audio bundle to Leonardo.

## Ambience and realistic effects

Use a gentle, slightly lo-fi sound that fits the pixel art. Export MP3 at 44.1 kHz with consistent volume.

| File | Direction | Duration |
| --- | --- | --- |
| `ambiente/vento_marte.mp3` | Quiet Mars wind without gusts, seamless loop | 20 s |
| `ambiente/base_dentro.mp3` | Small base interior with gentle vents and a soft hum, seamless loop | 20 s |
| `ambiente/noite_base.mp3` | Very quiet base at night with a faint wind, seamless loop | 20 s |
| `sfx/porta_abre.mp3`, `sfx/porta_fecha.mp3` | Short pneumatic opening and closing hisses | 0.6 s |
| `sfx/passo_areia_1.mp3`, `sfx/passo_areia_2.mp3` | Two soft footsteps on dusty sand | 0.2 s |
| `sfx/radio_chiado.mp3` | Radio static ending with a beep | 0.8 s |
| `sfx/tempestade_chegando.mp3` | Low storm rumble, with gentle static | 2 s |
| `sfx/rover_liga.mp3`, `sfx/rover_freia.mp3` | Small electric rover starts or brakes on gravel | 1.5 s |
| `sfx/rover_andando.mp3` | Electric rover on gravel, seamless loop | 4 s |
| `sfx/estacao_bipe.mp3` | A remote station beeps as it receives data | 1.5 s |
| `sfx/painel_limpo.mp3` | Soft swipes brushing dust from panels | 1 s |
| `sfx/estufa_agua.mp3` | A gentle greenhouse sprinkler | 1 s |
| `sfx/fabrica_ar.mp3` | A soft mechanical hum with puffs of air | 1.5 s |
