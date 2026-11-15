# Operação Marte: Última Base

Jogo educacional de navegador para crianças de 7 a 12 anos, criado para o desafio *Build a Junior Astronaut Mission Trainer* do NASA Space Apps Challenge 2026. A criança administra uma base em Marte, divide energia, reage a alertas e aprende com as consequências das escolhas ao longo de 7, 10 ou 14 sóis.

## Arquitetura e estrutura

| Local | Responsabilidade |
| --- | --- |
| `src/routes/`, `src/components/`, `src/i18n/` | Site em TanStack Start, React 19, TypeScript, Vite, Tailwind 4 e shadcn/ui. Rotas Início, Jogar, Fontes e Sobre. Textos do site em cinco idiomas. |
| `src/game/engine/` | Motor TypeScript puro com estado serializável, RNG com semente, regras de recursos, sorteio de alertas, alocação de energia, checkpoints e relatório. |
| `src/game/ui/` | Fluxo da missão e tutorial em `GameApp.tsx`, mapa 2D em HTML/CSS, interiores, cartas, HUD, painéis e telas. |
| `src/content/` | Catálogo e cadeias de eventos, consequências, continuações e traduções PT, EN, ES, FR e IT. |
| `src/data/`, `scripts/` | Dados e coleta. O navegador consulta o NASA DONKI por `donki-live.ts` e pode usar os registros de reserva de `donki.ts`. |
| `src/lib/saves.ts`, `public/assets/`, `art-source/` | Save local via `localStorage`, arte usada no jogo e arquivos-fonte da arte. |
| `docs/`, `vitest.config.ts` | Design, fontes, arte, divisão de responsabilidades e configuração dos testes Vitest com jsdom. |

## Funcionalidades disponíveis no código

- Seleção de dificuldade e perfil local, tutorial, mapa navegável por toque ou teclado, relógio por sol, alertas e decisões com custos.
- Gestão de ar, comida, saúde e energia, alocação persistente ao longo dos sóis, cadeias de eventos da base e do Sol, relatório e retorno a um sol anterior.
- Site e jogo em cinco idiomas. Os textos de eventos e de interface do jogo ficam em `src/content/locales/`.
- Pixel art para mapa, astronautas, retratos e elementos de interface. A branch em andamento acrescenta arte dos interiores e ícones. Veja o estado específico em `SESSION_HANDOFF.md`.
- Home com vídeo 4K de 8 segundos em loop, sem som, com poster e respeito a `prefers-reduced-motion`. MP4/poster em `public/assets/hub/`, servidos por URLs estáticas para também funcionar fora do Lovable.
- Tipografia do site e do jogo: Press Start 2P nos títulos e VT323 nos textos/botões. Tokens em `src/styles.css` e carregamento em `src/routes/__root.tsx`; as medições da home usam a família de cada elemento. O jogo usa os mesmos tokens e mantém o carregamento das fontes em `shared.tsx`.

## Decisões para preservar

- A experiência de jogo usa save no dispositivo e abre sem conta. As integrações e migrations do Lovable seguem as regras de `AGENTS.md`.
- A sincronização do Lovable usa `main`. A propriedade das áreas e as regras de publicação estão em `AGENTS.md` e `docs/TEAM.md`.
- O estado do motor precisa ser reproduzível. Toda escolha tem custo imediato ou diferido. Preserve os contratos do catálogo e as traduções completas.
- Indique quando os dados da NASA vêm de registros históricos e quando a consulta ocorreu ao vivo. Cite as fontes no jogo e mantenha a linguagem acessível a crianças.

## Pendências e problemas a validar

- Validar a branch de arte no navegador e em celular, em especial interiores, HUD, menus, cartas, legibilidade, interação por toque e ícones/fontes nos cinco idiomas. `docs/PENDENCIAS-PIXEL.md` registra o escopo e observações de uma rodada Cadete. Compare seus itens com o código atual antes de reabrir tarefas.
- A rodada Cadete registrou pouco impacto do relógio, falta frequente de energia no laboratório e pouca orientação sobre o escudo. Confirme esses pontos na versão atual antes de ajustar o equilíbrio. `docs/HANDOFF.md` também sinaliza o equilíbrio de Piloto.
- Conferir as referências marcadas em `docs/DATA_SOURCES.md`, incluindo OSDR, RadLab e as citações exibidas em `/fontes`.
- Voz está desativada por decisão registrada em `docs/PENDENCIAS-PIXEL.md`. O áudio de jogo está adiado.
- Validar o build, a versão publicada em dispositivos reais e os materiais de submissão. O status atual da publicação e da submissão precisa ser confirmado com o time.

Os eventos do Bruno e os retratos/ícone do rover aparecem no histórico integrado de `main` (`4a5b2a9` e `5dbc5e8`). Use `docs/HANDOFF.md` como registro histórico dessas etapas e `SESSION_HANDOFF.md` para a tarefa atual.
