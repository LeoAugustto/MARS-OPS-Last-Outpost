# Game testing report

This report summarizes the 15 November 2026 QA runs. The original run logs, case tables, and reproduction details are available in [the full Portuguese report](RELATORIO-TESTES-CHATGPT.md).

The first round used the code at `8c1f82d` plus the fixes recorded in `b6f5507`. The follow-up used `b6f5507`. The results are snapshots of those revisions.

## Coverage

| Area | What was tested | Recorded result |
| --- | --- | --- |
| Initial engine runs | 63 combinations of difficulty, strategy, and solar pool with 20 seeds per combination | 1,260 missions. All 84 catalog events appeared. All 1,260 action replays matched. |
| Browser missions | Three difficulty settings, three solar modes, five languages, and three viewport sizes | 32 endings, 27 wins, and 5 rescues. The run checked 257 overnight summaries. |
| Catalog and translations | Choice costs, deferred effects, language coverage, and placeholders | 854 keys per game language at the tested revision. The validator found no missing translations or choices without a declared cost. |
| Larger balance runs | 240 seeds per scenario across difficulties, strategies, and solar pools | 8,640 baseline simulations and 2,160 paired runs with temporary alternative settings. |
| Recovery | Network failures, blocked storage, invalid and older saves, saved rescue, and rewind | 9 of 10 cases passed in the recorded revision. |
| Responsive UI | Home, help, sources, about, and mission setup in five languages | 17 viewport/language profiles and 187 observations. The sampled screens had no horizontal scrolling or interactive targets below 44 px. |

The browser runs used Chrome and controlled DONKI responses. Animations and the mission clock were accelerated in the browser matrix. These measurements describe automated runs and do not establish how long a child takes to finish a mission.

## Changes exercised in the initial round

- Mission setup kept difficulty cards within narrow screens and expanded the historical storm buttons to 48 px targets.
- Help controls used 48×48 px targets and wrapped on narrow screens.
- The habitat bed explained why the crew could not sleep yet when daytime alerts were still pending.
- Localized text used shorter instructions and left the exact cleaning cost to the resource chips.

The recorded checks include tutorial arrows, changing languages during a mission, checkpoints after rescue, mission stars, and local save reloads. The browser test observed 112 solar cards and verified their source badges against the controlled test data. The normal suite reported 45 tests in seven files. TypeScript, the production build, and the Git whitespace check passed in that round. A separate build with `NITRO_PRESET=vercel` produced `.vercel/output/config.json`.

## Balance sample

The table below shows survival in the larger round, using the bundled solar pool. Each cell uses 240 seeds. These are simulated strategies, with no measurements of child players.

| Strategy | Cadet | Pilot | Commander |
| --- | ---: | ---: | ---: |
| Random decisions | 96.3% | 20.8% | 1.7% |
| Average planning | 100% | 90.4% | 55.4% |
| Attentive planning | 100% | 95.4% | 56.3% |
| Attentive planning with investment in shielding | 100% | 99.2% | 95.0% |

The paired experiments varied initial food in Pilot and radiation multipliers in Commander. Their alternative values were applied only during testing. The full tables include low-strength events and a control scenario where solar cards were removed.

## Follow-up cases recorded

- **Same-location follow-ups.** All 25 isolated follow-ups due on the final sol appeared. In 24 prepared conflicts with two alerts at the same place, one alert was deferred past the end. The tests did not measure how often that conflict occurs in a normal mission.
- **Ignored events and conditional costs.** Some historical test states made an ignored alert cheaper than opening it, or made a science penalty worth zero when the lab already had no power. Use the source report’s reproducible states when validating a newer revision.
- **Incomplete version-2 save.** The historical recovery run reproduced an error screen from a structurally incomplete save. It verified that malformed JSON and an unsupported version could be bypassed. Because later commits can change the save reader, check the current code or rerun this case before treating it as open.
- **Remaining coverage.** The recorded rounds covered emulated viewports and controlled network responses. Physical-device checks, comprehension with children, and a fresh live DONKI check are separate from this evidence.

[Full case tables and original notes in Portuguese](RELATORIO-TESTES-CHATGPT.md)
