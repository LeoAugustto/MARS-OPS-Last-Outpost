# cavalodetroia.exe

Team for **MARS OPS: Last Outpost**, 2026 NASA Space Apps Challenge, *Build a Junior Astronaut Mission Trainer*.

- [Leonardo Augusto de Oliveira Santos](https://www.linkedin.com/in/leoaugustto/)
- [Bruno Assis Oliveira](https://www.linkedin.com/in/bruno-assis-oliveira)
- [Vinicius da Silva Lima](https://www.linkedin.com/in/viniciusdasilvalima123)
- [Felipe Souza Siqueira](https://www.linkedin.com/in/felipe-souza-siqueira/)
- [Bernardo Galvao Alvarenga Morais e Silva](https://www.linkedin.com/in/bernardo-morais-ti)
- [Yckler Ryan Duarte Tomicki](https://www.linkedin.com/in/ycklertomicki)

Everyone worked across the whole project during the hackathon: game design, engine, events and writing, art, interface, audio, testing and the presentation.

## How we worked

- **Bug reports as GitHub issues.** Anyone who found a bug while playing opened an [issue](https://github.com/LeoAugustto/MARS-OPS-Last-Outpost/issues) using the bug template. Bruno built a bug-fixing agent (`.claude/agents/dev-bugs.md` and the `/corrige-issues` skill) that reads each issue, reproduces the bug with screenshots on desktop and mobile, fixes it on its own branch and closes the issue once the fix reaches `main`.
- **Git.** Work starts from the updated `main`. Keep changes focused and run `npm test` and `npm run build` before committing. Lovable also syncs with `main`, so published history is never rewritten. [Project instructions](../AGENTS.md)
- **Handoffs.** [Project context](../PROJECT_CONTEXT.md) and [Session handoff](../SESSION_HANDOFF.md) carry the state between contributors and AI assistants. The [game design](GAME_DESIGN.md), [data sources](DATA_SOURCES.md) and [writing guide](STYLE_GUIDE.md) cover rules and content.
