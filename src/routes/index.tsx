import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/AppHeader";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
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
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function playAsGuest() {
    setBusy(true);
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
        setBusy(false);
        toast.error(t.errorGeneric);
        return;
      }
    }
    navigate({ to: "/play" });
  }

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
          <Button variant="chunky" size="xl" onClick={playAsGuest} disabled={busy}>
            🚀 {busy ? t.loading : t.playNow}
          </Button>
          <Button asChild variant="chunkySand" size="tap">
            <Link to="/auth">{t.signIn}</Link>
          </Button>
        </div>
        <Link to="/fontes" className="min-h-12 py-3 text-lg font-semibold text-secondary underline underline-offset-4">
          {t.dataSources}
        </Link>
      </section>
    </main>
  );
}
