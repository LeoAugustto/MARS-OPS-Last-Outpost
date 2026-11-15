# src/routes

- Home video and poster are plain static files in `public/assets/hub/` referenced by `/assets/hub/...` URLs, because Lovable-managed asset URLs (`/__l5e/...`) do not resolve in a plain Vite dev/build.
