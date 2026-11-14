import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { useI18n } from "@/i18n";

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
    url: "https://api.nasa.gov/",
    pt: "Um diário das tempestades do Sol. Quando o Sol dá um 'espirro' forte, sua base precisa do escudo!",
    en: "A diary of storms on the Sun. When the Sun 'sneezes' hard, your base needs its shield!",
  },
  {
    icon: "🧬",
    name: "NASA OSDR",
    url: "https://osdr.nasa.gov/",
    pt: "Experimentos de cientistas com plantas e seres vivos no espaço. Ajuda a saber como cultivar comida.",
    en: "Scientists' experiments with plants and living things in space. Helps us learn how to grow food.",
  },
  {
    icon: "☢️",
    name: "NASA RadLab",
    url: "https://visualization.osdr.nasa.gov/radlab/",
    pt: "Medidas de radiação no espaço — uma luz invisível que pode fazer mal aos astronautas.",
    en: "Measurements of space radiation — invisible light that can hurt astronauts.",
  },
  {
    icon: "🗺️",
    name: "NASA Mars Trek",
    url: "https://trek.nasa.gov/mars/",
    pt: "Um mapa de verdade de Marte, com montanhas, crateras e vales para explorar.",
    en: "A real map of Mars, with mountains, craters and valleys to explore.",
  },
  {
    icon: "🥬",
    name: "CSA — Food Production",
    url: "https://www.asc-csa.gc.ca/eng/sciences/food-production/",
    pt: "Ideias da Agência Espacial Canadense sobre como plantar comida longe da Terra.",
    en: "Ideas from the Canadian Space Agency on how to grow food far from Earth.",
  },
];

function Fontes() {
  const { t, lang } = useI18n();
  return (
    <main className="bg-mars min-h-screen">
      <AppHeader />
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h1 className="text-3xl font-bold text-secondary sm:text-4xl">{t.sourcesTitle}</h1>
        <p className="mt-2 text-lg">{t.sourcesIntro}</p>
        <ul className="mt-6 grid gap-4">
          {SOURCES.map((s) => (
            <li key={s.name} className="flex flex-col gap-3 rounded-3xl border-4 border-border bg-card p-5 sm:flex-row sm:items-center">
              <span className="text-4xl" aria-hidden>{s.icon}</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{s.name}</h2>
                <p className="text-muted-foreground">{s[lang]}</p>
              </div>
              <Button asChild variant="chunkySand" size="tap">
                <a href={s.url} target="_blank" rel="noreferrer">{t.visit} ↗</a>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
