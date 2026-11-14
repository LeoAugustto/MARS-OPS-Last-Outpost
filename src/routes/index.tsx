import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/AppHeader";
import { useI18n } from "@/i18n";
import { listSaves } from "@/lib/saves";
import marsBase from "@/assets/mars-base.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MARS OPS: Última Base — Jogo de Marte para crianças" },
      { name: "description", content: "Mantenha sua base em Marte viva! Um jogo educativo com dados reais da NASA." },
      { property: "og:title", content: "MARS OPS: Última Base" },
      { property: "og:description", content: "Mantenha sua base em Marte viva! Jogo educativo com dados reais da NASA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
    const [hasSave, setHasSave] = useState(false);
  useEffect(() => setHasSave(listSaves().length > 0), []);

  return (
    <main className="bg-mars min-h-screen">
      <div className="mx-auto flex max-w-3xl justify-end p-4">
        <LangToggle />
      </div>
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 pb-12 text-center">
        <img
          src={marsBase}
          alt=""
          width={1280}
          height={768}
          className="w-full rounded-3xl border-4 border-border shadow-2xl"
        />
        <h1 className="text-4xl font-bold leading-tight text-secondary sm:text-6xl">{t.appName}</h1>
        <p className="text-xl font-semibold sm:text-2xl">{t.tagline}</p>
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Button asChild variant="chunky" size="xl">
            <Link to="/play" search={{ mode: "new" }}>🚀 {t.playNow}</Link>
          </Button>
          {hasSave && (
            <Button asChild variant="chunkySand" size="tap">
              <Link to="/play" search={{ mode: "continue" }}>{t.continueMission}</Link>
            </Button>
          )}
        </div>
        <Link to="/fontes" className="min-h-12 py-3 text-lg font-semibold text-secondary underline underline-offset-4">
          {t.dataSources}
        </Link>
        <Link to="/sobre" className="min-h-12 py-3 text-base font-semibold text-muted-foreground underline underline-offset-4">
          {t.about}
        </Link>
      </section>
    </main>
  );
}
