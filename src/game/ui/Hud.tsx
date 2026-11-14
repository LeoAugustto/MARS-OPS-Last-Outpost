// HUD: barras no topo + barra de ações embaixo. Ícone + número sempre (nunca só cor).
import { Button } from "@/components/ui/button";
import { BALANCE, type GameState } from "@/game/engine";
import type { Periodo } from "./art";
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

/** Relógio do sol: 0 = 07:00 (acordar) … 1 = 21:00 (hora de dormir). Horário só de jogo. */
export function horaDoSol(relogio: number): string {
  const min = Math.round((7 + Math.min(1, Math.max(0, relogio)) * 14) * 60);
  const h = Math.floor(min / 60);
  const m = Math.floor((min % 60) / 10) * 10; // de 10 em 10 minutos
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const ICONE_PERIODO: Record<Periodo, string> = { dia: "☀️", entardecer: "🌇", noite: "🌙" };

export function TopHud({
  state,
  onMenu,
  onHelp,
  relogio,
  periodo,
}: {
  state: GameState;
  onMenu: () => void;
  onHelp: () => void;
  relogio?: number;
  periodo?: Periodo;
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
        {relogio !== undefined && periodo && (
          <span
            className={`rounded-full px-2 py-0.5 text-sm font-black ${
              periodo === "noite"
                ? "bg-[#2b2350] text-[#ffe9a8]"
                : periodo === "entardecer"
                  ? "bg-[#f2a33a] text-[#3a1f10]"
                  : "bg-muted"
            }`}
            aria-label={`${t("ui.relogio")}: ${horaDoSol(relogio)} · ${t(`ui.periodo.${periodo}`)}`}
            title={t(`ui.periodo.${periodo}`)}
          >
            {ICONE_PERIODO[periodo]} {horaDoSol(relogio)}
          </span>
        )}
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
  noite = false,
}: {
  state: GameState;
  onEnergy: () => void;
  onSleep: () => void;
  /** já é noite: pode dormir mesmo com alerta aberto (perde saúde) */
  noite?: boolean;
}) {
  const { t } = useGT();
  const faltam = state.alerts.filter((a) => !a.done).length;
  const dano = faltam * BALANCE.SAUDE_POR_ALERTA_PERDIDO;
  const bloqueado = faltam > 0 && !noite;
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
        disabled={bloqueado}
        title={bloqueado ? t("ui.dormir_bloqueado", { n: faltam }) : undefined}
        className={noite ? "animate-pulse" : undefined}
      >
        {faltam > 0 && noite ? t("ui.dormir_custo", { dano }) : t("ui.dormir")}
      </Button>
    </footer>
  );
}
