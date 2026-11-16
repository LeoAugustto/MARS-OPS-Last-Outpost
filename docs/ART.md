# Game art and assets

The game uses pixel art in a rust, cream, orange, and teal palette. Sources are in [art-source](../art-source). Runtime assets are in [public/assets](../public/assets). [Asset mappings](../src/game/ui/art.ts)

| Asset | Runtime location |
| --- | --- |
| Base map and variations by time of day | `public/assets/map/` |
| Astronaut walk cycles | `public/assets/astronaut/{m,f}/{dir}_{0,1,2}.png` |
| Astronaut, Mission Control, and Rovi portraits | `public/assets/portraits/` |
| Building and rover markers | `public/assets/icons/` |
| Eight base interiors | `public/assets/places/{place}.jpg` |
| HUD and menu icons | `public/assets/ui/` |
| Home animation, poster, and button art | `public/assets/hub/` |

The astronaut has eight directions and three frames per direction. The walking loop uses frame order 0 → 1 → 2 → 1. The game draws each playable interior from its full scene. Event cards can reuse a crop of the scene beside the place icon. `PixelIcon` renders the HUD and menu icon set.

Use the active mappings in `art.ts` when replacing assets. Check the placement and touch targets in [BaseMap](../src/game/ui/BaseMap.tsx) and [Interior](../src/game/ui/Interior.tsx). Use original art and keep NASA logos off game assets. The submission presentation identifies AI-generated game art on the slides where it appears.
