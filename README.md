# Mars Base Adventure

Project: "MARS OPS: Last Outpost" — an educational browser game for kids aged 7–12 (NASA Space Apps 2026, challenge "Build a Junior Astronaut Mission Trainer"). Players run a small Mars base, one "sol" (Mars day) at a time, splitting limited energy between air, food, shield and science. Real NASA data (DONKI solar storms) triggers events.

In THIS first step build ONLY the app shell (no game logic — the game engine and 2D scene will be written by developers in src/game/ and must not be created or edited by you):

1. Language: Brazilian Portuguese by default, with a PT/EN toggle (simple i18n dictionary in src/i18n/). Plain, friendly words for kids — no technical jargon.
2. Visual style: mobile-first, warm Mars palette (rust orange, sand, deep space navy), rounded chunky buttons (min 48px tap targets), friendly rounded font (e.g. Fredoka or Nunito from Google Fonts), playful but clean. Works on phone and PC.
3. Pages/routes:
   - "/" Home: game title, short tagline ("Mantenha sua base em Marte viva!"), big button "Jogar agora" (plays as guest, NO signup required), secondary button "Entrar / Criar conta", link "De onde vêm os dados?".
   - "/auth" Login + Sign up (email + password, password strength hint, show/hide password). "Esqueci minha senha" flow that sends a 6-digit CODE by email (OTP), user types the code and sets a new password. Text should say the account is for a parent/teacher/older player; do not ask kids for personal data beyond email.
   - "/play" Game page: full-screen container with a top HUD placeholder and a div with id "game-root" where the game will be mounted later. Show a placeholder message "O jogo aparece aqui".
   - "/fontes" Data sources page: list NASA DONKI (api.nasa.gov), OSDR, RadLab, Mars Trek, CSA food production toolkit, with short kid-friendly explanations and links.
   - "/perfil" (logged in only): nickname, "Minhas missões" list placeholder, logout.
4. Backend (Lovable Cloud / Supabase):
   - Auth: email+password, email OTP for password recovery, and ANONYMOUS sign-in so "Jogar agora" creates an anonymous session; later the player can "Salvar minha base na nuvem" which links an email/password to that same anonymous user so progress is kept.
   - Table "profiles" (id = auth user id, nickname, created_at).
   - Table "saves" (id uuid, user_id, slot int, state jsonb, sol int, updated_at) with RLS: users can only read/write their own rows.
   - A small typed client module src/lib/saves.ts with loadSave(slot) / writeSave(slot, state) functions.
5. Do NOT create anything inside src/game/, src/content/ or src/data/ — those folders belong to the developers.
Keep the code simple and well organized.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bedd89e3-d75e-4d30-aca6-0a37da005e2e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
