# MARS OPS project context

MARS OPS: Last Outpost is a browser game for ages 7–12, built for *Build a Junior Astronaut Mission Trainer* at the 2026 NASA Space Apps Challenge. Cadet missions last seven sols. Pilot and Commander missions last ten. The [game design](docs/GAME_DESIGN.md) explains the loop, difficulty, and rescue report.

| Location | Responsibility |
| --- | --- |
| `src/routes`, `src/components`, `src/i18n` | TanStack Start pages, shared site UI, and site localization |
| `src/game/engine` | Serializable state, deterministic events, resource rules, night, rescue, and rewind |
| `src/game/ui` | Mission flow, walkable map and interiors, cards, HUD, energy, tutorial, and sound |
| `src/content` | Event catalog, chains, consequences, and all five game languages |
| `src/data`, `scripts` | NASA DONKI queries and reserves, the Earth–Mars radio estimate, and asset scripts |
| `src/lib/saves.ts` | Local mission saves |
| `public/assets`, `public/audio`, `art-source` | Runtime art and audio, plus original art files |
| `docs`, `vitest.config.ts` | Project documentation and Vitest configuration |

The home starts at `/`. The other public routes are `/play` for mission setup, `/fontes` for data sources, and `/sobre` for the project page. The home video and poster are static assets under `public/assets/hub`. The site and game use Press Start 2P for display text and VT323 for much of the interface. Keep the language selector and touch controls usable at narrow widths.

The game opens without an account and stores progress locally. Use the same seed and actions for reproducible simulation runs. Every choice has an immediate or deferred cost. Keep all five languages complete so costs, explanations, and source labels agree across languages. [Project instructions](AGENTS.md) · [Writing guide](docs/STYLE_GUIDE.md)

DONKI records carry the original event date and source link. The game’s radiation, resource costs, and night-to-night timing are simulation values. [Data sources](docs/DATA_SOURCES.md)

## Working on the repository

Lovable syncs with `main`. Read the ownership and Git rules before making changes. Preserve any staged and unstaged work from other contributors. Use the [session handoff](SESSION_HANDOFF.md) for the latest branch, open work, and test evidence. Use the [QA report](docs/QA_REPORT.md) for the documented release test rounds.
