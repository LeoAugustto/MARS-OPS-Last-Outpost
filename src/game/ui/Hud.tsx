// HUD: barras no topo + barra de ações embaixo. Ícone + número sempre (nunca só cor).
import { Button } from "@/components/ui/button";
import type { GameState } from "@/game/engine";
import { useGT } from "./shared";

function Bar({ icon, value, label }: { icon: string; value: number; label: string }) {
  const cor = value < 25 ? "bg-destructive" : value < 50 ? "bg-primary" : "bg-success";
  return (
    <div
      className="flex min-w-0 flex-1 items-center gap-1"
      title={label}
      aria-label={`${label}: ${value}`}
    >
      <span className="text-lg" aria-hidden>
        {icon}
      </span>
      <div className="h-3.5 min-w-8 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${cor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`w-8 text-right text-sm font-black ${value < 25 ? "text-destructive" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export function TopHud({
  state,
  onMenu,
  onHelp,
}: {
  state: GameState;
  onMenu: () => void;
  onHelp: () => void;
}) {
  const { t } = useGT();
  const r = state.resources;
  return (
    <header className="flex shrink-0 flex-col gap-1 border-b-4 border-border bg-card px-2 py-1.5 text-card-foreground">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="tap"
          className="px-3 text-xl"
          onClick={onMenu}
          aria-label={t("ui.menu.titulo")}
        >
          ☰
        </Button>
        <span className="font-display text-lg font-bold text-secondary">
          {t("hud.sol", { sol: state.sol, total: state.totalSols })}
        </span>
        <span
          className="ml-auto rounded-full bg-muted px-2 py-0.5 text-sm font-black"
          aria-label={t("recurso.energia")}
        >
          ⚡ {state.energiaHoje}
        </span>
        <span
          className="rounded-full bg-muted px-2 py-0.5 text-sm font-black"
          aria-label={t("recurso.ciencia")}
        >
          🔬 {state.ciencia}/{state.metaCiencia}
        </span>
        <Button
          variant="ghost"
          size="tap"
          className="px-3 text-xl"
          onClick={onHelp}
          aria-label={t("ui.glossario.titulo")}
        >
          ❓
        </Button>
      </div>
      <div className="flex items-center gap-3 px-1">
        <Bar icon="💨" value={r.ar} label={t("recurso.ar")} />
        <Bar icon="🥔" value={r.comida} label={t("recurso.comida")} />
        <Bar icon="❤️" value={r.saude} label={t("recurso.saude")} />
      </div>
    </header>
  );
}

export function BottomBar({
  state,
  onEnergy,
  onSleep,
}: {
  state: GameState;
  onEnergy: () => void;
  onSleep: () => void;
}) {
  const { t } = useGT();
  const faltam = state.alerts.filter((a) => !a.done).length;
  return (
    <footer className="flex shrink-0 items-center gap-2 border-t-4 border-border bg-card p-2 text-card-foreground">
      <Button variant="chunkySand" size="tap" onClick={onEnergy}>
        ⚡ {t("ui.energia.abrir")}
      </Button>
      <span className="flex-1 text-center text-sm font-bold text-muted-foreground">
        {faltam > 0 ? `❗ ${t("ui.alertas_faltam", { n: faltam })}` : ""}
      </span>
      <Button
        variant="chunky"
        size="tap"
        onClick={onSleep}
        disabled={faltam > 0}
        title={faltam > 0 ? t("ui.dormir_bloqueado", { n: faltam }) : undefined}
      >
        {t("ui.dormir")}
      </Button>
    </footer>
  );
}
