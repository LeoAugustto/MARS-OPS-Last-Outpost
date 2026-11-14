# Arte do jogo (pixel art)

**Originais** (como vieram do time): `art-source/`. **Usados no jogo** (cortados e padronizados): `public/assets/`.
Configuração: `src/game/ui/art.ts` (grupo com `ready: false` usa emoji provisório).

| Grupo | No jogo | Status |
|---|---|---|
| Mapa da base | `assets/map/base.png` (1024×1024) | ✅ |
| Astronauta menino / menina | `assets/astronaut/{m,f}/{dir}_{0,1,2}.png` — 8 direções (`n ne e se s sw w nw`) × 3 quadros, 128×128, caminhada 0→1→2→1 | ✅ |
| Retrato do astronauta (diálogo) | `assets/portraits/astronauta_{m,f}.png` (256×256) | ✅ |
| Ícones dos lugares | `assets/icons/{habitat,paineis,antena,ar,estufa,lab,abrigo}.png` (128×128) | ✅ (falta o rover) |
| Retrato do Controle de Missão | `assets/portraits/controle.png` (256×256) | ⏳ falta — pessoa genérica, **sem logo da NASA** |
| Retrato do Rovi (robô guia) | `assets/portraits/rovi.png` (256×256) | ⏳ falta |
| Ícone do rover | `assets/icons/rover.png` (128×128) | ⏳ falta |
| Cena de dentro de cada lugar | `assets/places/{lugar}.png` (1280×560) | ⏳ opcional |

**Para trocar/adicionar:** gere no mesmo estilo, salve com o nome da tabela e mude `ready` para `true` em `art.ts`.
Para recortar folhas novas (como a de ícones), dá para repetir o processo com Python + Pillow (peça ao Claude).

**Regras:** pixel art na paleta da base (ferrugem, creme, laranja, verde-azulado); arte original; **sem logo da NASA**.
Pontos de toque do mapa: `PLACE_POS` em `src/game/ui/shared.tsx` (% do quadrado).
