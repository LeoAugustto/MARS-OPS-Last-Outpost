import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppFooter, LangSelector } from "@/components/AppHeader";
import { useDocumentTitle, useLang, useT } from "@/i18n";
import { listSaves } from "@/lib/saves";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operação Marte: Última Base — Jogo de Marte para crianças" },
      { name: "description", content: "Mantenha sua base em Marte viva! Um jogo educativo com dados reais da NASA." },
      { property: "og:title", content: "Operação Marte: Última Base" },
      { property: "og:description", content: "Mantenha sua base em Marte viva! Jogo educativo com dados reais da NASA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const t = useT();
  useDocumentTitle();
  const [hasSave, setHasSave] = useState(false);
  useEffect(() => setHasSave(listSaves().length > 0), []);
  // Split the localized title at the first ":" so it always breaks right after it
  const fullTitle = t("app.title");
  const colon = fullTitle.indexOf(":");
  const titleLines: [string, string] =
    colon === -1 ? [fullTitle, ""] : [fullTitle.slice(0, colon + 1), fullTitle.slice(colon + 1).trim()];
  // English joins into a single line on sm+ screens; the other languages always stay on two lines
  const singleLineOnWide = useLang().lang === "en";

  return (
    <main className="bg-mars flex h-[100dvh] flex-col overflow-hidden">
      <div className="mx-auto flex w-full max-w-3xl shrink-0 justify-end px-4 pt-2">
        <LangSelector />
      </div>
      <section className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col items-center justify-center gap-[clamp(0.25rem,1.5dvh,1rem)] px-4 py-1 text-center">
        {/* Fixed height (per screen height) so the image is the same size in every language */}
        <div className="hidden h-[30dvh] w-full items-center justify-center [@media(min-height:420px)]:flex [@media(min-height:650px)]:h-[40dvh] [@media(min-height:850px)]:h-[48dvh]">
          <div className="relative aspect-square h-full max-w-full">
            <img
              src="/assets/map/base.png"
              alt=""
              width={1024}
              height={1024}
              className="pixelated pixel-frame h-full w-full object-cover"
            />
            <img src="/assets/astronaut/f/s_1.png" alt="" aria-hidden width={128} height={128}
              className="pixelated absolute -bottom-2 left-0 -translate-x-1/3 h-[clamp(4rem,30%,6rem)] w-auto" />
            <img src="/assets/astronaut/m/s_1.png" alt="" aria-hidden width={128} height={128}
              className="pixelated absolute -bottom-2 right-0 translate-x-1/3 h-[clamp(4rem,30%,6rem)] w-auto" />
          </div>
        </div>
        <h1 className="shrink-0 font-bold leading-tight text-highlight text-[clamp(1.5rem,min(7vw,7dvh),4rem)]">
          {/* Two lines, breaking right after the colon; English joins into one line on sm+ screens */}
          <span className={`block whitespace-nowrap${singleLineOnWide ? " sm:hidden" : ""}`}>{titleLines[0]}</span>
          <span className={`block whitespace-nowrap${singleLineOnWide ? " sm:hidden" : ""}`}>{titleLines[1]}</span>
          {singleLineOnWide && <span className="hidden whitespace-nowrap sm:block">{fullTitle}</span>}
        </h1>
        <p className="shrink-0 text-[clamp(1rem,min(4vw,3dvh),1.5rem)] font-semibold">{t("tagline")}</p>
        <div className="flex w-full max-w-sm shrink-0 flex-col gap-2">
          <Button asChild variant="chunky" size="xl">
            <Link to="/play" search={{ mode: "new" }}>🚀 {t("playNow")}</Link>
          </Button>
          {hasSave && (
            <Button asChild variant="chunkySand" size="tap">
              <Link to="/play" search={{ mode: "continue" }}>{t("continueMission")}</Link>
            </Button>
          )}
        </div>
        <nav className="flex shrink-0 flex-wrap items-center justify-center gap-x-3 text-sm font-semibold sm:text-base">
          <Link to="/fontes" className="flex min-h-12 items-center text-highlight underline underline-offset-4">
            {t("dataSources")}
          </Link>
          <span aria-hidden className="text-muted-foreground">·</span>
          <Link to="/sobre" className="flex min-h-12 items-center text-muted-foreground underline underline-offset-4">
            {t("about")}
          </Link>
        </nav>
      </section>
      <AppFooter compact />
    </main>
  );
}
