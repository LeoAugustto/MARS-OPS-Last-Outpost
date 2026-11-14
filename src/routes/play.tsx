import { createFileRoute } from "@tanstack/react-router";
import { useDocumentTitle } from "@/i18n";
import { GameApp } from "@/game/ui/GameApp";

export const Route = createFileRoute("/play")({
  // mode tells the game whether to start fresh or load the latest local save.
  validateSearch: (s: Record<string, unknown>): { mode?: "new" | "continue" } =>
    s["mode"] === "new" || s["mode"] === "continue" ? { mode: s["mode"] } : {},
  head: () => ({
    meta: [
      { title: "Jogar — Operação Marte: Última Base" },
      { name: "description", content: "Comande sua base em Marte, um sol de cada vez." },
      { property: "og:title", content: "Jogar | Operação Marte" },
      { property: "og:description", content: "Comande sua base em Marte, um sol de cada vez." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Play,
});

// O jogo fica em src/game/ (não editar pelo Lovable). Esta rota só monta o jogo.
function Play() {
  useDocumentTitle("titlePlay");
  const { mode } = Route.useSearch();
  return <GameApp mode={mode} />;
}
