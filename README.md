# MARS OPS: Last Outpost

[Leia em português](README.pt-BR.md)

**MARS OPS: Last Outpost** is a browser game for ages 7–12. Players command a Mars outpost and keep its crew supplied with air, food, and shelter. They split a limited energy budget between four systems, investigate alerts, and learn what each decision costs.

Built by **cavalodetroia.exe** for the **2026 NASA Space Apps Challenge**, *Build a Junior Astronaut Mission Trainer*.

[**Play MARS OPS**](https://mars-ops-last-outpost.vercel.app/)

## Play a mission

1. Choose **Cadet** (7 sols), **Pilot** (10 sols), or **Commander** (10 sols). A sol is a Martian day.
2. Follow the alert markers. Walk into a building and use its terminal to see what happened. The choices show their costs, and **Why?** explains the science behind the outcome.
3. Share power between the air maker, greenhouse, lab, and sand shield. The plan carries over to the next sol.
4. Go to the habitat bed to end the sol. At night, unresolved alerts can carry consequences.
5. Survive until the final sol and earn up to three stars based on science collected. If Earth rescues the crew, the mission report explains what happened and can let you replay an earlier sol.

Use touch on mobile or a mouse, arrow keys, or WASD on desktop. The game supports Brazilian Portuguese, English, Spanish, French, and Italian. On the first visit it checks the browser’s preferred languages. You can change the language in the game, and the browser remembers your choice.

## NASA data in the game

The game reads solar flares, coronal mass ejections, solar energetic particle events, and geomagnetic storms from NASA’s DONKI database. Those records provide dates and details for the alerts. If the connection fails, the game can use archived DONKI records included in the repository. The source links and dates are visible on event cards.

The Earth–Mars radio delay is an estimate from NASA/JPL orbital elements. Resource costs, radiation damage, and the timing of events in a mission are simulation rules. [Data sources and how they are used](docs/DATA_SOURCES.md)

## Privacy

The game requires no account or download and contains no ads. The mission save, optional player name, stickers, and preferences stay in the browser’s local storage. Clearing site data removes them. DONKI requests contain date ranges and query filters. The game keeps the player’s name and progress on the device.

## Run locally

```bash
npm install
npm run dev
npm test
npx tsc --noEmit -p .
npm run build
```

The project uses TanStack Start, React, TypeScript, Vite, Tailwind CSS, and Vitest. The TypeScript engine is in [src/game/engine](src/game/engine). The event catalog and five sets of game translations are in [src/content](src/content).

The public build runs on Vercel with `NITRO_PRESET=vercel`. This repository’s `main` branch syncs with Lovable. Preserve the shared Git history when working on published commits. [Lovable project](https://lovable.dev/projects/bedd89e3-d75e-4d30-aca6-0a37da005e2e) · [Contribution rules](AGENTS.md)

## Documentation

- [Game design](docs/GAME_DESIGN.md)
- [NASA data and science references](docs/DATA_SOURCES.md)
- [Writing and localization guide](docs/STYLE_GUIDE.md)
- [Art and asset guide](docs/ART.md)
- [Sound, music, and voices](docs/SONS-E-VOZES.md)
- [Testing report](docs/QA_REPORT.md)
- [Team and Git workflow](docs/TEAM.md)

## Team

- Leonardo Augusto de Oliveira Santos
- Bruno Assis Oliveira
- Vinicius da Silva Lima
- Felipe Souza Siqueira
- Bernardo Galvao Alvarenga Morais e Silva
- Yckler Ryan Duarte Tomicki

MARS OPS is an independent hackathon project. NASA is credited as a data source.
