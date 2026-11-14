import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";

export const Route = createFileRoute("/fontes")({
  head: () => ({
    meta: [
      { title: "De onde vêm os dados? — MARS OPS" },
      { name: "description", content: "As fontes reais da NASA e da Agência Espacial Canadense usadas no jogo." },
      { property: "og:title", content: "De onde vêm os dados? — MARS OPS" },
      { property: "og:description", content: "As fontes reais da NASA e da CSA usadas no jogo." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Fontes,
});

const SOURCES = [
  {
    icon: "☀️",
    name: "NASA DONKI",
    key: "srcDonki" as const,
    url: "https://api.nasa.gov/",
  },
  {
    icon: "🧬",
    name: "NASA OSDR",
    key: "srcOsdr" as const,
    url: "https://osdr.nasa.gov/",
  },
  {
    icon: "☢️",
    name: "NASA RadLab",
    key: "srcRadlab" as const,
    url: "https://visualization.osdr.nasa.gov/radlab/",
  },
  {
    icon: "🗺️",
    name: "NASA Mars Trek",
    key: "srcTrek" as const,
    url: "https://trek.nasa.gov/mars/",
  },
  {
    icon: "🥬",
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
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-bold text-secondary sm:text-4xl">{t("sourcesTitle")}</h1>
        <p className="mt-2 text-lg">{t("sourcesIntro")}</p>
        <ul className="mt-6 grid gap-4">
          {SOURCES.map((s) => (
            <li key={s.name} className="flex flex-col gap-3 rounded-3xl border-4 border-border bg-card p-5 sm:flex-row sm:items-center">
              <span className="text-4xl" aria-hidden>{s.icon}</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="text-muted-foreground">{t(s.key)}</p>
              </div>
              <Button asChild variant="chunkySand" size="tap">
                <a href={s.url} target="_blank" rel="noreferrer" aria-label={t("visitSite", { name: s.name })}>{t("visit")} ↗</a>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
