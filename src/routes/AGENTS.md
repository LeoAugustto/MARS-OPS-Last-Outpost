# src/routes

- Home video and poster are plain static files in `public/assets/hub/` referenced by `/assets/hub/...` URLs, because Lovable-managed asset URLs (`/__l5e/...`) do not resolve in a plain Vite dev/build. The home picks the 4K or 1080p MP4 with `<source media>` and forces `muted` before every `play()` so autoplay is never blocked; it never auto-pauses for reduced motion — a corner pause button (choice in `src/lib/animacao.ts`) is the accessibility control.
- Home text sizes are measured with DOM spans using the same font classes, never canvas: canvas ignores the `font-size-adjust` set in `src/styles.css`.
- The home "Como jogar" button opens the same `ComoJogar` pages as the in-game menu (from `src/game/ui/`), so the help text lives in one place.
