# Arte do jogo (pixel art)

Coloque os arquivos em `public/assets/` com **exatamente** estes nomes. Depois, em `src/game/ui/art.ts`, mude `ready: false` → `true` do grupo correspondente. Até lá o jogo usa a arte provisória.

| Grupo | Arquivo(s) | Tamanho sugerido | Observações |
|---|---|---|---|
| Mapa da base | `assets/map/base.png` | 1024×1024 (quadrado) | Vista de cima, mesma disposição de `docs/GAME_DESIGN.md` (casa no centro; painéis cima-esq.; antena cima-dir.; fábrica de ar esq.; estufa dir.; laboratório baixo-esq.; abrigo baixo-dir.; rover baixo-centro). Sem texto, sem personagens. |
| Astronauta (8 direções) | `assets/astronaut/{n,ne,e,se,s,sw,w,nw}.png` | 128×128 cada, fundo transparente | n = andando para cima, s = para baixo, e = direita, w = esquerda; diagonais ne/nw/se/sw. |
| Retratos (caixa de diálogo) | `assets/portraits/{astronauta,controle,rovi}.png` | 256×256 | `controle` = pessoa do Controle de Missão (genérica, **sem logo da NASA**). `rovi` = o robô guia. |
| Cena de cada lugar | `assets/places/{habitat,paineis,antena,ar,estufa,lab,abrigo,rover}.png` | 1280×560 (larga) | Interior/close do lugar com o astronauta. Aparece no topo do card. |

**Regras**
- Estilo pixel art, paleta quente de Marte (laranja, areia, branco, toques de azul e verde).
- Arte original. Inspiração de gênero ok; não copiar personagens, cenários ou interface de jogos existentes.
- **Sem logo da NASA** em nenhuma imagem (regras de uso de marca da NASA). Pode ter uma antena/sala de "Controle de Missão" genérica.
- Os pontos de toque do mapa ficam em `PLACE_POS` (`src/game/ui/shared.tsx`, em % do quadrado). Se a arte final deslocar algum prédio, ajuste ali.
