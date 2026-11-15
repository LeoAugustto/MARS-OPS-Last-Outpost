import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";

export const Route = createFileRoute("/fontes")({
  head: () => ({
    meta: [
      { title: "De onde vêm os dados? | Operação Marte" },
      { name: "description", content: "As fontes reais da NASA e da Agência Espacial Canadense usadas no jogo." },
      { property: "og:title", content: "De onde vêm os dados? | Operação Marte" },
      { property: "og:description", content: "As fontes reais da NASA e da CSA usadas no jogo." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Fontes,
});

const SOURCES = [
  {
    icon: "/assets/icons/paineis.png",
    name: "NASA DONKI",
    key: "srcDonki" as const,
    url: "https://ccmc.gsfc.nasa.gov/tools/DONKI/",
  },
  {
    icon: "/assets/icons/lab.png",
    name: "NASA OSDR",
    key: "srcOsdr" as const,
    url: "https://osdr.nasa.gov/",
  },
  {
    icon: "/assets/icons/abrigo.png",
    name: "NASA RadLab",
    key: "srcRadlab" as const,
    url: "https://visualization.osdr.nasa.gov/radlab/",
  },
  {
    icon: "/assets/icons/antena.png",
    name: "NASA Mars Trek",
    key: "srcTrek" as const,
    url: "https://trek.nasa.gov/mars/",
  },
  {
    icon: "/assets/icons/estufa.png",
    name: "CSA — Food Production",
    key: "srcCsa" as const,
    url: "https://www.asc-csa.gc.ca/eng/sciences/food-production/",
  },
];

function Fontes() {
  const t = useT();
  useDocumentTitle("titleSources");
  return (
    <main className="bg-mars min-h-screen">
      <AppHeader />
      <section className="mx-auto max-w-3xl px-4 pb-12 text-xl">
        <h1 className="text-xl leading-normal text-highlight sm:text-2xl">{t("sourcesTitle")}</h1>
        <p className="mt-2 text-2xl leading-snug">{t("sourcesIntro")}</p>
        <ul className="mt-6 grid gap-4">
          {SOURCES.map((s) => (
            <li key={s.name} className="flex flex-col gap-3 pixel-frame bg-card text-card-foreground p-5 sm:flex-row sm:items-center">
              <img src={s.icon} alt="" aria-hidden width={64} height={64} className="pixelated h-16 w-16 shrink-0" />
              <div className="flex-1">
                <h2 className="text-sm leading-normal sm:text-base">{s.name}</h2>
                <p className="text-card-foreground/85">{t(s.key)}</p>
              </div>
              <Button asChild variant="chunkySand" size="tap" className="text-xl">
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={t("visitSite", { name: s.name })}>{t("visit")} ↗</a>
              </Button>
            </li>
          ))}
        </ul>
      </section>
      <AppFooter />
    </main>
  );
}
