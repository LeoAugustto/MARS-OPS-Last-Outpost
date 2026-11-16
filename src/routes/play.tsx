import { useEffect, useRef, useState } from "react";
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
  // só entra no jogo vindo da tela inicial: link direto, aba nova ou F5 em /play voltam para o
  // menu principal (o "Continuar missão" de lá retoma a partida salva)
  const [liberado, setLiberado] = useState(false);
  const conferiu = useRef(false);
  useEffect(() => {
    if (conferiu.current) return; // o React em modo de desenvolvimento roda o efeito duas vezes
    conferiu.current = true;
    let veio = false;
    try {
      veio = sessionStorage.getItem("marsops:veio_do_inicio") === "1";
      // vale uma vez: recarregar a página já não tem a marca
      sessionStorage.removeItem("marsops:veio_do_inicio");
    } catch {
      veio = true;
    }
    if (veio) setLiberado(true);
    else navigate({ to: "/", replace: true });
  }, [navigate]);
  return liberado ? <GameApp mode={mode} /> : null;
}
