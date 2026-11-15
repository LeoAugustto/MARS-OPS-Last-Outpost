import { createFileRoute } from "@tanstack/react-router";
import { AppFooter, AppHeader } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";
import { CARTAO_ESCURO, DESTAQUE, FUNDO_HUB, PAINEL_HUB, TituloHub } from "@/game/ui/hub";

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
  // mesmo estilo do menu inicial: arte da base ao fundo, painéis com moldura (src/game/ui/hub.tsx)
  return (
    <main className="min-h-screen" style={FUNDO_HUB}>
      <AppHeader />
      {/* telas bem largas (2xl): duas colunas, para caber tudo sem rolar */}
      <section className="mx-auto grid max-w-3xl gap-5 px-4 pb-12 text-xl 2xl:max-w-[1500px] 2xl:grid-cols-2 2xl:items-start 2xl:gap-8 2xl:pb-4">
        <div className={`${PAINEL_HUB} grid gap-4 p-6`}>
          <TituloHub className="text-[clamp(1.1rem,4vw,1.75rem)]">{t("aboutTitle")}</TituloHub>
          <p className="text-2xl leading-snug text-[#fbe6c8]">{t("aboutIntro", { app: t("app.title") })}</p>
        </div>
        <div className={`${PAINEL_HUB} p-6 2xl:row-span-2`}>
          <TituloHub as="h2" className="text-[clamp(0.95rem,3vw,1.25rem)]">{t("aboutLearnTitle")}</TituloHub>
          <ul className="mt-4 grid gap-2">
            {(["aboutLearn1", "aboutLearn2", "aboutLearn3", "aboutLearn4"] as const).map((k) => t(k)).map((item) => (
              <li key={item} className={`${CARTAO_ESCURO} flex gap-3 p-3`}>
                <img src="/assets/ui/estrela.png" alt="" width={22} height={22} className="pixelated mt-1 h-[22px] w-[22px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={`${PAINEL_HUB} p-6`}>
            <TituloHub as="h2" className="text-[clamp(0.85rem,2.6vw,1.05rem)]">{t("aboutTeamTitle")}</TituloHub>
            <p className="mt-3 text-[#fbe6c8]">{t("aboutTeam")}</p>
            <p className={`${DESTAQUE} mt-3 px-3 py-2 font-display text-sm`}>NASA Space Apps Challenge 2026</p>
          </div>
          <div className={`${PAINEL_HUB} p-6`}>
            <TituloHub as="h2" className="text-[clamp(0.85rem,2.6vw,1.05rem)]">{t("aboutPrivacyTitle")}</TituloHub>
            <p className="mt-3 text-[#fbe6c8]">{t("aboutPrivacy")}</p>
          </div>
        </div>
      </section>
      <AppFooter />
    </main>
  );
}
