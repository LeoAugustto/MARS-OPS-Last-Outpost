import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppHeader } from "@/components/AppHeader";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — MARS OPS" },
      { name: "description", content: "Seu apelido de astronauta e suas missões em Marte." },
      { property: "og:title", content: "Meu perfil — MARS OPS" },
      { property: "og:description", content: "Seu apelido de astronauta e suas missões." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { t } = useI18n();
  const { user } = Route.useRouteContext();
  const { queryClient } = Route.useRouteContext();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    supabase.from("profiles").select("nickname").eq("id", user.id).maybeSingle()
      .then(({ data }) => setNickname(data?.nickname ?? ""));
  }, [user.id]);

  async function saveNick() {
    const { error } = await supabase.from("profiles").upsert({ id: user.id, nickname });
    if (error) toast.error(t.errorGeneric); else toast.success(t.saved);
  }

  async function logout() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="bg-mars min-h-screen">
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 pb-12">
        <div className="rounded-3xl border-4 border-border bg-card p-6">
          <h1 className="text-3xl font-bold text-secondary">👩‍🚀 {t.profile}</h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
          <div className="mt-5 grid gap-2">
            <Label htmlFor="nick" className="text-base">{t.nickname}</Label>
            <div className="flex gap-2">
              <Input id="nick" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={24}
                className="h-12 rounded-xl text-base" />
              <Button variant="chunkySand" size="tap" onClick={saveNick}>{t.save}</Button>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border-4 border-border bg-card p-6">
          <h2 className="text-2xl font-bold">{t.myMissions}</h2>
          <p className="mt-2 text-muted-foreground">{t.noMissions}</p>
        </div>
        <Button variant="destructive" size="tap" className="rounded-2xl" onClick={logout}>{t.logout}</Button>
      </section>
    </main>
  );
}
