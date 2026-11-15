// HUD em pixel art (modelo do time em art-source): barras no topo + barra de ações embaixo.
// Ícone + número sempre (nunca só cor). Ícones em public/assets/ui/.
import { BALANCE, type GameState } from "@/game/engine";
import type { Periodo } from "./art";
import { PixelIcon } from "./PixelIcon";
import { FullscreenButton, useGT } from "./shared";

/** Barra verde-azulada com contorno, como no modelo (vermelha quando está baixa). */
function Bar({ icon, value, label }: { icon: string; value: number; label: string }) {
  const cor = value < 25 ? "bg-[#c2312b]" : value < 50 ? "bg-[#e2a02b]" : "bg-[#1f8a85]";
  return (
    <div
      className="flex min-w-0 flex-1 items-center gap-1.5"
      title={label}
      aria-label={`${label}: ${value}`}
    >
      <PixelIcon name={icon} size={26} />
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
      className="flex shrink-0 items-center gap-0.5 border-2 border-[#c9a27c] bg-[#f3dcc0] px-0.5 py-0.5 text-sm font-bold min-[400px]:gap-1 min-[400px]:px-1 sm:px-2 sm:text-base"
      aria-label={label}
    >
      <PixelIcon name={icon} size={18} />
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
      className="grid h-12 w-12 shrink-0 place-items-center active:translate-y-0.5"
    >
      <PixelIcon name={img} size={42} />
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

const ICONE_PERIODO: Record<Periodo, string> = { dia: "sol", entardecer: "entardecer", noite: "lua" };

export function TopHud({
  state,
  onMenu,
  onHelp,
  onEnergy,
  relogio,
  periodo,
}: {
  state: GameState;
  onMenu: () => void;
  onHelp: () => void;
  /** abre a divisão de energia do dia */
  onEnergy: () => void;
  relogio?: number;
  periodo?: Periodo;
}) {
  const { t } = useGT();
  const r = state.resources;
  return (
    <header className="flex shrink-0 flex-col gap-1 border-b-[6px] border-[#c4581f] bg-[#fbe6c8] px-2 py-1.5 text-[#3a2015] shadow-[0_3px_0_#7a2f12]">
      <div className="flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-2">
        <SquareBtn img="btn_menu" label={t("ui.menu.titulo")} onClick={onMenu} />
        <div className="mr-auto flex min-w-0 flex-col items-start gap-x-2 sm:flex-row sm:items-center">
          <span className="whitespace-nowrap font-display text-[10px] font-bold leading-tight min-[400px]:text-sm sm:text-lg">
            {t("hud.sol", { sol: state.sol, total: state.totalSols })}
          </span>
          {relogio !== undefined && periodo && (
            <span
              data-tut="relogio"
              className={`inline-flex items-center gap-1 px-1 text-sm font-black ${
                periodo === "noite"
                  ? "bg-[#2b2350] text-[#ffe9a8]"
                  : periodo === "entardecer"
                    ? "bg-[#f2a33a] text-[#3a1f10]"
                    : "bg-muted"
              }`}
              aria-label={`${t("ui.relogio")}: ${horaDoSol(relogio)} · ${t(`ui.periodo.${periodo}`)}`}
              title={t(`ui.periodo.${periodo}`)}
            >
              <PixelIcon name={ICONE_PERIODO[periodo]} size={16} /> {horaDoSol(relogio)}
            </span>
          )}
        </div>
        {/* botão Energia: abre a divisão de energia do dia (ar, estufa, laboratório, escudo) */}
        <button
          type="button"
          data-tut="energia"
          onClick={onEnergy}
          aria-label={`${t("ui.energia.abrir")}: ${state.energiaHoje}`}
          className="flex h-12 min-w-12 shrink-0 items-center justify-center gap-0.5 border-2 border-[#a5461f] bg-[#fbe2c2] px-0.5 text-base min-[400px]:border-[3px] min-[400px]:px-1 font-bold text-[#4a2615] shadow-[0_3px_0_#6e2a10] hover:brightness-105 active:translate-y-0.5 focus-visible:outline-4 focus-visible:outline-[#ffd23f] sm:gap-1 sm:px-2"
        >
          <PixelIcon name="raio" size={18} />
          <span className="hidden sm:inline">{t("ui.energia.abrir")}</span>
          <span>{state.energiaHoje}</span>
        </button>
        <Pill icon="microscopio" label={t("recurso.ciencia")}>
          {state.ciencia}/{state.metaCiencia}
        </Pill>
        <SquareBtn img="btn_ajuda" label={t("ui.glossario.titulo")} onClick={onHelp} />
        <FullscreenButton />
      </div>
      <div data-tut="barras" className="flex items-center gap-3 px-1">
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
      <PixelIcon name={faltam > 0 && !noite ? "alerta" : "cama"} size={24} />
      <span
        className={`text-center text-sm font-bold sm:text-base ${noite ? "animate-pulse" : ""}`}
      >
        {texto}
      </span>
    </footer>
  );
}
