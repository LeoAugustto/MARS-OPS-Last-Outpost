# src/routes

- Home video and poster are plain static files in `public/assets/hub/` referenced by `/assets/hub/...` URLs, because Lovable-managed asset URLs (`/__l5e/...`) do not resolve in a plain Vite dev/build. The home picks the 4K or 1080p MP4 with `<source media>` and forces `muted` before every `play()` so autoplay is never blocked.
- Home text sizes are measured with DOM spans using the same font classes, never canvas: canvas ignores the `font-size-adjust` set in `src/styles.css`.
