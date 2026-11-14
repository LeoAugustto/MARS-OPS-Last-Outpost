// HUD em pixel art (modelo do time em art-source): barras no topo + barra de ações embaixo.
// Ícone + número sempre (nunca só cor). Ícones em public/assets/ui/.
import { Button } from "@/components/ui/button";
import { BALANCE, type GameState } from "@/game/engine";
import type { Periodo } from "./art";
import { useGT } from "./shared";

const UI = (n: string) => `/assets/ui/${n}.png`;

/** Ícone pixel do HUD. */
export function HudIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <img
      src={UI(name)}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className="shrink-0"
      style={{ width: size, height: size, imageRendering: "pixelated" }}
      draggable={false}
    />
  );
}

/** Barra verde-azulada com contorno, como no modelo (vermelha quando está baixa). */
function Bar({ icon, value, label }: { icon: string; value: number; label: string }) {
  const cor = value < 25 ? "bg-[#c2312b]" : value < 50 ? "bg-[#e2a02b]" : "bg-[#1f8a85]";
  return (
    <div
      className="flex min-w-0 flex-1 items-center gap-1.5"
      title={label}
      aria-label={`${label}: ${value}`}
    >
      <HudIcon name={icon} size={26} />
      <div className="h-3.5 min-w-8 flex-1 overflow-hidden rounded-full border-2 border-[#c9a27c] bg-[#f3dcc0] sm:h-4">
        <div
          className={`h-full rounded-full transition-all duration-500 ${cor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span
        className={`w-8 text-right text-sm font-bold sm:text-base ${value < 25 ? "text-[#c2312b]" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

/** Pílula creme com ícone + número (energia, ciência). */
function Pill({
  icon,
  children,
  label,
}: {
  icon: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="flex items-center gap-1 rounded-xl border-2 border-[#c9a27c] bg-[#f3dcc0] px-2 py-0.5 text-sm font-bold sm:text-base"
      aria-label={label}
    >
      <HudIcon name={icon} size={20} />
      {children}
    </span>
  );
}

/** Botão quadrado pixel (menu / ajuda) com a arte do modelo. */
function SquareBtn({ img, label, onClick }: { img: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 shrink-0 place-items-center active:translate-y-0.5"
    >
      <HudIcon name={img} size={42} />
    </button>
  );
}

/** Relógio do sol: 0 = 07:00 (acordar) … 1 = 19:00 (hora de dormir). Horário só de jogo. */
export function horaDoSol(relogio: number): string {
  const min = Math.round((7 + Math.min(1, Math.max(0, relogio)) * BALANCE.HORAS_DO_SOL) * 60);
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
    <header className="flex shrink-0 flex-col gap-1 border-b-[6px] border-[#c4581f] bg-[#fbe6c8] px-2 py-1.5 text-[#3a2015] shadow-[0_3px_0_#7a2f12]">
      <div className="flex items-center gap-2">
        <SquareBtn img="btn_menu" label={t("ui.menu.titulo")} onClick={onMenu} />
        <span className="font-display text-lg font-bold">
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
        <span className="ml-auto" />
        <Pill icon="raio" label={t("recurso.energia")}>
          {state.energiaHoje}
        </Pill>
        <Pill icon="microscopio" label={t("recurso.ciencia")}>
          {state.ciencia}/{state.metaCiencia}
        </Pill>
        <SquareBtn img="btn_ajuda" label={t("ui.glossario.titulo")} onClick={onHelp} />
      </div>
      <div className="flex items-center gap-3 px-1">
        <Bar icon="o2" value={r.ar} label={t("recurso.ar")} />
        <Bar icon="batata" value={r.comida} label={t("recurso.comida")} />
        <Bar icon="coracao" value={r.saude} label={t("recurso.saude")} />
      </div>
    </header>
  );
}

/**
 * Barra de baixo (o time vai remodelar): só mostra o status do dia.
 * A energia se divide no painel da FÁBRICA DE AR; dormir é na CAMA da casa.
 */
export function BottomBar({ state, noite = false }: { state: GameState; noite?: boolean }) {
  const { t } = useGT();
  const faltam = state.alerts.filter((a) => !a.done).length;
  const dano = faltam * BALANCE.SAUDE_POR_ALERTA_PERDIDO;
  const texto =
    faltam > 0 && !noite
      ? t("ui.alertas_faltam", { n: faltam })
      : faltam > 0
        ? `${t("ui.dormir_dica")} ${t("ui.dormir_custo", { dano })}`
        : t("ui.dormir_dica");
  return (
    <footer className="flex shrink-0 items-center justify-center gap-2 border-t-[6px] border-[#c4581f] bg-[#fbe6c8] p-2 text-[#3a2015]">
      <HudIcon name={faltam > 0 && !noite ? "coracao" : "cama"} size={24} />
      <span
        className={`text-center text-sm font-bold sm:text-base ${noite ? "animate-pulse" : ""}`}
      >
        {texto}
      </span>
    </footer>
  );
}
