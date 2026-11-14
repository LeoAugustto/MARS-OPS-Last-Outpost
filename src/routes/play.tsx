import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/AppHeader";
import { useI18n } from "@/i18n";
import { useSessionUser } from "@/hooks/use-session";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Jogar — MARS OPS: Última Base" },
      { name: "description", content: "Comande sua base em Marte, um sol de cada vez." },
      { property: "og:title", content: "Jogar MARS OPS" },
      { property: "og:description", content: "Comande sua base em Marte, um sol de cada vez." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Play,
});

function Play() {
  const { t } = useI18n();
  const { user } = useSessionUser();
  const isGuest = !user || user.is_anonymous;

  return (
    <main className="flex h-dvh flex-col bg-background">
      {/* HUD placeholder — the game fills this in later */}
      <header id="game-hud" className="flex items-center justify-between gap-2 border-b-4 border-border bg-card p-2">
        <Button asChild variant="ghost" size="tap">
          <Link to="/">←</Link>
        </Button>
        <span className="font-display text-lg font-bold text-secondary">{t.sol} 1</span>
        <div className="flex items-center gap-2">
          {isGuest ? (
            <Button asChild variant="chunky" size="tap" className="hidden sm:inline-flex">
              <Link to="/auth" search={{ mode: "save" }}>☁️ {t.saveCloudTitle}</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="tap">
              <Link to="/perfil">👩‍🚀</Link>
            </Button>
          )}
          <LangToggle />
        </div>
      </header>
      {isGuest && (
        <Button asChild variant="chunky" size="tap" className="m-2 sm:hidden">
          <Link to="/auth" search={{ mode: "save" }}>☁️ {t.saveCloudTitle}</Link>
        </Button>
      )}
      <div id="game-root" className="bg-mars relative flex flex-1 items-center justify-center overflow-hidden">
        <p className="font-display text-2xl text-muted-foreground">{t.gameHere}</p>
      </div>
    </main>
  );
}
