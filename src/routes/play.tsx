import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  const navigate = useNavigate();
  // link direto para /play (aba nova, link compartilhado) vai para a tela inicial;
  // quem veio da tela inicial nesta aba (ou recarregou no meio do jogo) continua
  const [liberado, setLiberado] = useState(false);
  useEffect(() => {
    let veio = false;
    try {
      veio = sessionStorage.getItem("marsops:veio_do_inicio") === "1";
    } catch {
      veio = true;
    }
    if (veio) setLiberado(true);
    else navigate({ to: "/", replace: true });
  }, [navigate]);
  return liberado ? <GameApp mode={mode} /> : null;
}
