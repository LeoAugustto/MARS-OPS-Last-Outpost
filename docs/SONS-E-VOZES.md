# Sound, music, and voices

The repository includes background tracks and 8-bit interface effects. The browser unlocks audio after the first click, tap, or key press. Music and ambient playback pause when the tab is hidden, and only one voice recording plays at a time. Sound preferences are stored locally. [Audio manager](../src/game/ui/audio.ts)

| Channel | Runtime path under `public/audio/` | Use |
| --- | --- | --- |
| Music | `musica/<name>.mp3` | Menu, map, sunset, night, rover trip, solar storm, victory, and rescue |
| Effects | `sfx/<name>.wav` or `sfx/<name>.mp3` | Alerts, cards, button actions, resource changes, bedtime, and stickers |
| Ambience | `ambiente/<name>.mp3` | Background loops when the scene and asset are available |
| Voice | `voz/<language>/<character>/<key>.mp3` | Prerecorded lines where the corresponding file is available |

The runtime continues in silence if a sound file is unavailable. The checked-in audio at the documentation review includes music and effects. The voice pipeline can read lines in all five game languages. Voice source sheets and a runtime integration do not indicate that every voice file has been bundled.

## Production

- Generate the synthesized interface effects with [the 8-bit sound script](../scripts/gerar-efeitos-8bit.py). Keep UI cues short and distinct, with softer sounds for repeated actions.
- The [music brief](audio/2-SUNO-musicas.md) records Suno production prompts and filenames. Check that map and menu loops join cleanly.
- The [voice and ambience brief](audio/1-ELEVENLABS-vozes-e-efeitos.md) records the ElevenLabs plan. Rovi speaks clearly and warmly, Mission Control sounds calm over the radio, and the player astronaut uses a confident, natural voice.
- Refresh the localized line exports with `python scripts/gerar-falas-audio.py .`. Review pronunciations and keep file keys aligned with the game’s dictionaries.
- Record the origin of generated audio, where each file is used, and the applicable attribution in the project’s materials.

The [Portuguese production plan](SONS-E-VOZES.pt-BR.md) retains the original sound cue table and prompts. The [8-bit effects brief](audio/3-LEO-gratis-efeitos-8bit.md) retains the detailed source list.
