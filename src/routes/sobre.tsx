import { createFileRoute } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto | Operação Marte" },
      { name: "description", content: "O que o jogo Operação Marte ensina, para jurados, pais e professores. NASA Space Apps 2026." },
      { property: "og:title", content: "Sobre o projeto | Operação Marte" },
      { property: "og:description", content: "Jogo educativo de Marte para o NASA Space Apps Challenge 2026." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  const t = useT();
  useDocumentTitle("titleAbout");
  return (
    <main className="bg-mars min-h-screen">
      <AppHeader />
      <section className="mx-auto grid max-w-3xl gap-5 px-4 pb-12">
        <h1 className="text-3xl font-bold text-highlight sm:text-4xl">{t("aboutTitle")}</h1>
        <p className="text-lg">{t("aboutIntro", { app: t("app.title") })}</p>
        <div className="pixel-frame bg-card text-card-foreground p-6">
          <h2 className="text-2xl font-bold">{t("aboutLearnTitle")}</h2>
          <ul className="mt-3 grid gap-2">
            {(["aboutLearn1", "aboutLearn2", "aboutLearn3", "aboutLearn4"] as const).map((k) => t(k)).map((item) => (
              <li key={item} className="flex gap-2"><img src="/assets/ui/estrela.png" alt="" width={18} height={18} className="pixelated h-[18px] w-[18px] shrink-0" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="pixel-frame bg-card text-card-foreground p-6">
            <h2 className="text-xl font-bold">{t("aboutTeamTitle")}</h2>
            <p className="mt-2 text-card-foreground/85">{t("aboutTeam")}</p>
            <p className="mt-2 font-semibold text-highlight">NASA Space Apps Challenge 2026</p>
          </div>
          <div className="pixel-frame bg-card text-card-foreground p-6">
            <h2 className="text-xl font-bold">{t("aboutPrivacyTitle")}</h2>
            <p className="mt-2 text-card-foreground/85">{t("aboutPrivacy")}</p>
          </div>
        </div>
      </section>
      <AppFooter />
    </main>
  );
}
