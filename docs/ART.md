# Arte do jogo (pixel art)

**Originais** (como vieram do time): `art-source/`. **Usados no jogo** (cortados e padronizados): `public/assets/`.
Configuração das cenas e retratos em `src/game/ui/art.ts`. Os ícones de interface são renderizados por `PixelIcon`.

| Grupo | No jogo | Status |
|---|---|---|
| Mapa da base | `assets/map/base.png` (1024×1024) | ✅ |
| Astronauta menino / menina | `assets/astronaut/{m,f}/{dir}_{0,1,2}.png` — 8 direções (`n ne e se s sw w nw`) × 3 quadros, 128×128, caminhada 0→1→2→1 | ✅ |
| Retrato do astronauta (diálogo) | `assets/portraits/astronauta_{m,f}.png` (256×256) | ✅ |
| Ícones dos lugares | `assets/icons/{habitat,paineis,antena,ar,estufa,lab,abrigo,rover}.png` (128×128) | ✅ |
| Retrato do Controle de Missão | `assets/portraits/controle.png` (256×256) | ✅ |
| Retrato do Rovi (robô guia) | `assets/portraits/rovi.png` (256×256) | ✅ |
| Ícone do rover | `assets/icons/rover.png` (128×128) | ✅ |
| Cena de dentro de cada lugar | `assets/places/{lugar}.jpg` (900×900) | ✅ oito cenas do Vinicius |
| Ícones da interface | `assets/ui/*.png` (64×64 para os novos) | ✅ pacote de 29 ícones do Vinicius |

Os interiores jogáveis usam a cena inteira. A carta usa uma faixa da mesma cena e um ícone do lugar. As artes individuais dos eventos ainda constam em `docs/PENDENCIAS-PIXEL.md`.

**Para trocar/adicionar:** gere no mesmo estilo, salve com o nome da tabela e mude `ready` para `true` em `art.ts`.
Para recortar folhas novas (como a de ícones), dá para repetir o processo com Python + Pillow (peça ao Claude).

**Regras:** pixel art na paleta da base (ferrugem, creme, laranja, verde-azulado); arte original; **sem logo da NASA**.
Pontos de toque do mapa: `PLACE_POS` em `src/game/ui/shared.tsx` (% do quadrado).
