<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

# Project instructions

`CLAUDE.md` imports this file. Keep project rules here and use the design, writing, and team documents for details. [Game design](docs/GAME_DESIGN.md) · [Writing guide](docs/STYLE_GUIDE.md) · [Team](docs/TEAM.md)

**MARS OPS: Last Outpost** (*Operação Marte: Última Base*) is a browser game for ages 7–12, built for the 2026 NASA Space Apps challenge *Build a Junior Astronaut Mission Trainer*. Players explore one Mars outpost, respond to alerts over successive sols, and allocate power to air, food, research, and shielding. NASA DONKI records can trigger solar event chains. When Earth rescues the crew, the report explains what happened and can offer a retry from an earlier sol.

The submission deadline is 15 November 2026 at 23:59 local time.

## Project rules

1. Keep the game playable without accounts, sign-in, downloads, or collection of children’s personal data. Store the mission locally through `src/lib/saves.ts` and handle storage errors.
2. Give every choice an immediate or deferred cost. Use `deferredCost` with the relevant scheduled event or state effect. `validateCatalog` checks the catalog.
3. Keep the main resources simple. The HUD uses air, food, and health bars plus the day's energy budget. Discuss new bars with the team.
4. Label records accurately. Archived DONKI records show a real event date. Only recent records fetched from the live feed receive the live badge. Keep simulated costs and effects distinct from source data.
5. Cite the source of real data on the event card and on [the data sources page](https://mars-ops-last-outpost.vercel.app/fontes).
6. Write for children. Use short sentences and explain terms such as sol and radiation when they first appear. [Writing guide](docs/STYLE_GUIDE.md)
7. Keep Brazilian Portuguese, English, Spanish, French, and Italian complete. Preserve the priority of a saved choice and the browser’s preferred languages. Add new visible text to all five dictionaries. Use SVG flags in the language selector.
8. Design for mobile and desktop. Keep touch targets at least 48 px and verify keyboard controls on desktop.
9. Use original art and avoid NASA logos and branding. Credit NASA for the data.

## Code ownership

| Area | Responsibility | Owner |
| --- | --- | --- |
| `src/routes`, `src/components`, `src/i18n`, `src/lib`, `src/assets` | Site pages, site localization, and saves | Leonardo and Lovable |
| `src/game/engine` | Deterministic simulation, events, and mission report | Vinicius |
| `src/game/ui` | Map, cards, HUD, panels, and tutorial | Leonardo and Yckler |
| `public/assets`, `art-source` | Game art and source files | Yckler and the art team |
| `src/content` | Event catalog and game translations | Bruno |
| `src/data`, `scripts` | Source data and collection scripts | Felipe |
| `docs` | Design, sources, writing, and team documentation | Everyone |

Coordinate edits with the area owner. Lovable handles the site UI. Keep it out of the game engine, game UI, event content, data code, and art.

## Architecture

- TanStack Start with React 19, TypeScript, Vite, Tailwind CSS, and shadcn/ui. `src/routes/play.tsx` mounts `GameApp`. The map runs in HTML and CSS.
- Site translations use `src/i18n/locales` and `useT()`. Game translations use `src/content/locales` and `t()`. Both share the `Lang` type.
- The engine uses serializable `GameState` and pure functions such as `newMission`, `choose`, `endSol`, `rewindTo`, and `debrief`. Use `rngFor(state)` for deterministic randomness. Keep React, the DOM, and `Math.random` out of the engine.
- Events in `src/content/events.ts` use `chain`, `canHappen`, `weight`, and `cooldown`. Choices can have effects, flags, and scheduled follow-ups. The scheduler avoids starting another event in an active chain.
- Keep balance values in `src/game/engine/balance.ts`. Cite source data and mark simulation values as game rules.
- `src/game/ui/art.ts` maps pixel art and sprites. The browser reads DONKI through `src/data/donki-live.ts` and can use the archive in `src/data/donki.ts`. The game uses no account or database. Supabase scaffolding is present under Lovable management.

## Changes and review

1. Update from the remote before starting new work. Create a task branch such as `feat/engine-dust-devil`.
2. Keep the diff focused and coordinate changes to shared areas. Never commit secrets, including `NASA_API_KEY`.
3. Run `npm test` and `npm run build` before committing. Use a short, imperative commit message in Portuguese.
4. Open a PR to `main` for Leonardo’s review when authorized. Lovable syncs with `main` in both directions. Preserve published commits and avoid force-push, rebase, amend, or squash of commits already sent.
5. Commit and push only with authorization.

### Adding an event

- Register the event in `src/content/events.ts` and give each choice a cost.
- Make follow-ups `onlyScheduled: true` and schedule them in the correct chain.
- Add `ev.<id>.title`, `ev.<id>.body`, and the `label`, `outcome`, and `lesson` keys for each choice in all five languages.
- Make the **Why?** lesson short and accurate. Record its source in [Data sources](docs/DATA_SOURCES.md).
- Run `npm test` to validate event costs, scheduling, and translations.

## Continuity between Codex and Claude Code

1. Read [Project context](PROJECT_CONTEXT.md) and [Session handoff](SESSION_HANDOFF.md) when starting or resuming. At the repository root, check `git status --short --branch`, the current branch, the last five commits, and both staged and unstaged diffs.
2. Resume ongoing work in the same checkout and branch. Preserve existing changes and coordinate integration when needed. Use a fresh task branch for new work.
3. At a significant milestone or before handing work off, record the agent, goal, files, decisions, checks, open issues, and next step in `SESSION_HANDOFF.md`. Update `PROJECT_CONTEXT.md` if architecture or features change.
4. In Orca, use **Resume** and confirm the checkout shown in the history. When handing off, verify the destination checkout and branch and ask the recipient to read the context and diff.
5. Preserve agent history, keep credentials out of documentation, and use automatic permissions where available.
