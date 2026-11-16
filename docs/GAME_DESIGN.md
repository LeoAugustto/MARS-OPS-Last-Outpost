# Game design

**MARS OPS: Last Outpost** puts a junior astronaut in charge of a small Mars base. Each decision spends a resource now or carries a consequence into a later sol. The player learns to compare crew needs, explain a trade-off, and revise a plan after a setback.

This guide describes the implemented game. [Balance constants](../src/game/engine/balance.ts) · [Mission engine](../src/game/engine/engine.ts)

## Mission flow

```text
Home → difficulty → local profile → mission intro → sols → ending → report
                                                   ↑                   │
                                                   └── retry a sol ────┘
```

The first sol introduces movement, building terminals, resource costs, energy, and the bed. Rovi gives guidance and first-time tips. The menu includes **How to play** and a glossary. The interface supports five languages, and players can switch language during a mission.

| Difficulty | Mission length | Science target | Radiation multiplier |
| --- | ---: | ---: | ---: |
| Cadet | 7 sols | 18 | 0.8× |
| Pilot | 10 sols | 34 | 1.6× |
| Commander | 10 sols | 36 | 2.8× |

The HUD uses icons, labels, and numbers to show air, food, health, available energy, science, and time. On touch screens, tap the ground or a building. On desktop, click or move with the arrow keys or WASD. In a building, use its terminal to open the pending alert or learn what the building does.

## Places and power

| Place | What happens there |
| --- | --- |
| Habitat | Home for the crew. The bed ends the sol. |
| Solar panels | Supply energy. Dust and damage can reduce their output. |
| Antenna | Receives alerts and messages from Earth, including solar flare notices. |
| Air maker | Produces four units of air per energy. |
| Greenhouse | Produces three units of food per energy. |
| Lab | Produces two units of science per energy. |
| Shelter | Adds one sand shield layer for two energy, up to four layers. Each layer cuts simulated radiation by 20 percentage points. |
| Rover | Takes the player on expeditions outside the base. |

Clean solar panels produce 11 units of energy. The daily budget also includes stored battery energy. The default allocation puts four into air, four into the greenhouse, and two into the lab. The allocation carries over. The player can change it in the energy panel. Choices can spend the same daily budget and reduce how much is left for the overnight plan. Unused energy goes into the battery, which holds up to ten units.

## One sol

1. The morning shows available power and the base’s alerts. The first sol targets two alerts. Later sols usually target three, with an extra alert when all three crew resources exceed 45 and one fewer when a resource falls below 20.
2. The player chooses which alerts to investigate. Cards show choices and their costs. An hourglass marks a deferred cost. The outcome describes what changed, and **Why?** explains the science.
3. The clock starts at 07:00. Walking and actions spend in-game time, and reading an open card or menu pauses the free-running clock. Dusk begins at 16:30 and night at 18:30. Staying awake when night begins costs four health once per sol.
4. The crew sleeps in the habitat bed. During the day, the bed waits for the player to resolve the alerts. At night, the crew can sleep with alerts pending. Each unresolved alert costs two health, and an unattended problem can also worsen.
5. The overnight report shows consumption, production, and resource changes. The next sol starts with the same power plan.

The event scheduler considers due follow-ups first, then eligible solar events, then other events that fit the base’s current state. It normally places one alert at a location per sol. Solar events are eligible on sol 1 and after a three-sol gap, with a 20% chance on other eligible sols. Space in the alert queue and available records affect what appears. The engine uses a seeded random number generator so a checkpoint can reproduce the same situation.

## Solar alerts

Mission setup offers a mixed pool of recent and historical events, the past week, and selected historical periods. Dates and source links come from NASA DONKI records. The scenarios, timing, resource effects, and choices are designed for the game. [Data sources](DATA_SOURCES.md)

| DONKI record | In-game example |
| --- | --- |
| Solar flare (FLR) | A radio disruption prompts a choice between using the backup antenna and turning the antenna off. |
| Coronal mass ejection (CME) | A warning gives the crew time to prepare for a later particle cloud. |
| Solar energetic particle event (SEP) | An urgent alert asks the crew whether to seek shelter. |
| Geomagnetic storm (GST) | An event at Earth affects communications with Mission Control. |

## Ending, report, and save

Surviving through the final sol earns one star. Reaching 40% of the science target earns two. Reaching the full target earns three. Air, food, or health reaching zero triggers an Earth rescue.

The mission report shows resource history, important decisions, lessons, and any DONKI records encountered. On a rescue, a checkpoint can offer a return to an earlier sol to try a different plan. Saves and preferences stay in the browser. The mission’s save is handled by [saves.ts](../src/lib/saves.ts).
