import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FUNDO_HUB, PAINEL_HUB, TituloHub } from "@/game/ui/hub";
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
    icon: "/assets/icons/paineis.png?v=2",
    name: "NASA DONKI",
    key: "srcDonki" as const,
    url: "https://ccmc.gsfc.nasa.gov/tools/DONKI/",
  },
  {
    icon: "/assets/icons/lab.png?v=2",
    name: "NASA OSDR",
    key: "srcOsdr" as const,
    url: "https://osdr.nasa.gov/",
  },
  {
    icon: "/assets/icons/abrigo.png?v=2",
    name: "NASA RadLab",
    key: "srcRadlab" as const,
    url: "https://visualization.osdr.nasa.gov/radlab/",
  },
  {
    icon: "/assets/icons/antena.png?v=2",
    name: "NASA Mars Trek",
    key: "srcTrek" as const,
    url: "https://trek.nasa.gov/mars/",
  },
  {
    icon: "/assets/icons/estufa.png?v=2",
    name: "CSA — Food Production",
    key: "srcCsa" as const,
    url: "https://www.asc-csa.gc.ca/eng/sciences/food-production/",
  },
];

function Fontes() {
  const t = useT();
  useDocumentTitle("titleSources");
  return (
    <main className="min-h-screen" style={FUNDO_HUB}>
      <AppHeader />
      {/* telas bem largas (2xl): as 5 fontes lado a lado, para caber tudo sem rolar */}
      <section className="mx-auto max-w-3xl px-4 pb-12 text-xl 2xl:max-w-[1500px] 2xl:pb-4">
        <div className={`${PAINEL_HUB} grid gap-2 p-5`}>
          <TituloHub className="text-[clamp(1.1rem,4vw,1.75rem)]">{t("sourcesTitle")}</TituloHub>
          <p className="text-2xl leading-snug text-[#fbe6c8]">{t("sourcesIntro")}</p>
        </div>
        <ul className="mt-6 grid gap-4 2xl:grid-cols-5 2xl:gap-5">
          {SOURCES.map((s) => (
            <li key={s.name} className={`${PAINEL_HUB} flex flex-col gap-3 p-5 text-[#fbe6c8] sm:flex-row sm:items-center 2xl:flex-col 2xl:items-stretch`}>
              <img src={s.icon} alt="" aria-hidden width={64} height={64} className="pixelated h-16 w-16 shrink-0 border-4 border-[#5a1d07] bg-[#3b1206] p-1 2xl:self-center" />
              <div className="flex-1 2xl:text-center">
                <h2 className="text-sm leading-normal text-[#f3c916] sm:text-base">{s.name}</h2>
                <p className="text-[#fbe6c8]/85">{t(s.key)}</p>
              </div>
              <Button asChild variant="chunky" size="tap" className="text-xl">
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
