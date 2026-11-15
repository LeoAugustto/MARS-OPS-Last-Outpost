import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider, useT, type MessageKey } from "@/i18n";
import { FUNDO_HUB, PAINEL_HUB, TituloHub } from "@/game/ui/hub";
import { FullscreenButton } from "@/game/ui/shared";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

/**
 * Moldura das páginas de aviso (404 e erro), no mesmo estilo do menu inicial: arte da base ao
 * fundo, painel com moldura, rover "perdido" e título amarelo. Tem o próprio I18nProvider porque a
 * página de erro aparece no lugar do layout inteiro (fora do provider do site).
 */
function PaginaAviso({ numero, titulo, texto, children }: { numero?: string; titulo: MessageKey; texto: MessageKey; children: ReactNode }) {
  const t = useT();
  return (
    <main className="flex min-h-screen items-center justify-center p-4" style={FUNDO_HUB}>
      <div className={`${PAINEL_HUB} relative flex w-full max-w-lg flex-col items-center gap-4 p-6 text-center`}>
        <FullscreenButton className="absolute right-2 top-2" />
        <div className="relative">
          <img src="/assets/rover/sw_0.png" alt="" width={168} height={168} className="pixelated h-[clamp(110px,22vw,168px)] w-auto" />
          <span
            className="absolute right-2 top-2 grid h-10 w-10 place-items-center border-4 border-[#5a1d07] bg-[#f3c916] font-display text-xl font-bold text-[#2a0508] shadow-[0_4px_0_#1c0703]"
            aria-hidden
          >
            ?
          </span>
        </div>
        {numero && <TituloHub className="text-[clamp(2.5rem,10vw,4rem)] leading-none">{numero}</TituloHub>}
        <TituloHub as={numero ? "h2" : "h1"} className="text-[clamp(1rem,4vw,1.5rem)]">
          {t(titulo)}
        </TituloHub>
        <p className="text-lg leading-snug text-[#fbe6c8]">{t(texto)}</p>
        <div className="flex w-full flex-col gap-2 pt-1">{children}</div>
      </div>
    </main>
  );
}

function BotaoLink({ href, principal = false, children }: { href: string; principal?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`botao-arte flex min-h-14 w-full items-center justify-center px-5 font-display text-base ${principal ? "" : "brightness-[0.88] saturate-[0.9]"} hover:brightness-110`}
    >
      {children}
    </a>
  );
}

function NotFoundComponent() {
  return (
    <I18nProvider>
      <NotFoundConteudo />
    </I18nProvider>
  );
}
function NotFoundConteudo() {
  const t = useT();
  return (
    <PaginaAviso numero="404" titulo="notFoundTitle" texto="notFoundText">
      <Link
        to="/"
        className="botao-arte flex min-h-14 w-full items-center justify-center px-5 font-display text-base hover:brightness-110"
      >
        {t("backHome")}
      </Link>
    </PaginaAviso>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <I18nProvider>
      <ErroConteudo reset={reset} />
    </I18nProvider>
  );
}
function ErroConteudo({ reset }: { reset: () => void }) {
  const t = useT();
  const router = useRouter();
  return (
    <PaginaAviso titulo="errorTitle" texto="errorText">
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="botao-arte flex min-h-14 w-full items-center justify-center px-5 font-display text-base hover:brightness-110"
      >
        {t("tryAgain")}
      </button>
      <BotaoLink href="/">{t("backHome")}</BotaoLink>
    </PaginaAviso>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#2a0508" },
      { name: "application-name", content: "Operação Marte" },
      { name: "apple-mobile-web-app-title", content: "Operação Marte" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      { name: "msapplication-TileColor", content: "#2a0508" },
      { title: "Operação Marte: Última Base" },
      { name: "description", content: "Jogo educativo: mantenha sua base em Marte viva!" },
      { property: "og:title", content: "Operação Marte: Última Base" },
      { property: "og:description", content: "Jogo educativo: mantenha sua base em Marte viva!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap",
      },
      // ícones (gerados por art-source/favicon/gera_icones.py): abas, iPhone, Android e Windows
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <I18nProvider>
        <Outlet />
        <Toaster />
      </I18nProvider>
    </QueryClientProvider>
  );
}
