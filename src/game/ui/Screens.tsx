// Telas fora do mapa: escolher nível, abertura, fim da missão, relatório; e o robô guia (tutorial).
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/AppHeader";
import {
  BALANCE,
  debrief,
  eventKey,
  type GameState,
  type HistoryPoint,
  type Level,
} from "@/game/engine";
import { AstronautSprite, DialogBox, formatarData, PlaceIcon, useGT } from "./shared";
import { NAME_MAX, cleanName, type Player } from "./player";
import { FAMOSAS, type Famosa, type ModoSol } from "@/data/donki-live";
import { STICKERS, loadStickers } from "./stickers";
import { ART, type Gender } from "./art";
import { PixelIcon } from "./PixelIcon";

// ---------------------------------------------------------------- escolher nível
const MODOS: ModoSol[] = ["surpresa", "semana", "famosa"];
const FAMOSAS_LISTA = Object.keys(FAMOSAS) as Famosa[];

export function LevelSelect({
  modo,
  famosa,
  onModo,
  loading,
  nasaInfo,
  saveSol,
  onStart,
  onContinue,
}: {
  modo: ModoSol;
  famosa: Famosa;
  onModo: (m: ModoSol, f?: Famosa) => void;
  loading: boolean;
  nasaInfo: string;
  saveSol: number | null;
  onStart: (l: Level) => void;
  onContinue: () => void;
}) {
  const { t } = useGT();
  const [nivel, setNivel] = useState<Level>("cadete");
  const niveis: { l: Level; estrelas: number }[] = [
    { l: "cadete", estrelas: 1 },
    { l: "piloto", estrelas: 2 },
    { l: "comandante", estrelas: 3 },
  ];
  return (
    <div className="flex h-full flex-col items-center gap-3 overflow-y-auto p-4">
      <div className="flex w-full max-w-xl items-center justify-between">
        <Button asChild variant="ghost" size="tap">
          <Link to="/">← {t("ui.inicio")}</Link>
        </Button>
        <LangSelector />
      </div>
      <h1 className="text-center font-display text-3xl font-bold text-[#ffd23f]">
        {t("ui.nivel.titulo")}
      </h1>
      <div className="grid w-full max-w-xl gap-3" role="radiogroup" aria-label={t("ui.nivel.titulo")}>
        {niveis.map(({ l, estrelas }) => (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={nivel === l}
            disabled={loading}
            onClick={() => setNivel(l)}
            className={`relative flex min-h-20 items-stretch gap-2 border-4 p-1.5 text-left text-[#3a2015] shadow-[0_6px_0_#7a2f12] transition hover:brightness-105 active:translate-y-1 active:shadow-none disabled:opacity-50 ${
              nivel === l
                ? "border-[#e2672b] bg-[#ffe9cc] ring-4 ring-[#ffd23f]"
                : "border-[#c4581f] bg-[#fbe6c8]"
            }`}
          >
            {[
              "left-0.5 top-0.5",
              "right-0.5 top-0.5",
              "left-0.5 bottom-0.5",
              "right-0.5 bottom-0.5",
            ].map((c) => (
              <span
                key={c}
                className={`absolute ${c} h-2 w-2 rounded-full bg-[#f2a33a] ring-1 ring-[#7a2f12]`}
                aria-hidden
              />
            ))}
            <span className="flex flex-1 flex-col justify-center px-3 py-1">
              <span className="flex items-center gap-2 font-display text-2xl font-bold">
                {t(`nivel.${l}`)}
                {nivel === l && <PixelIcon name="ok" size={22} />}
              </span>
              <span className="block text-[#5a3424]">{t(`ui.nivel.${l}`)}</span>
            </span>
            <span
              className="flex w-24 shrink-0 items-center justify-center gap-0.5 border-4 border-[#e8c39c] bg-[#c99a72] sm:w-28"
              aria-hidden
            >
              {Array.from({ length: estrelas }, (_, i) => (
                <img
                  key={i}
                  src="/assets/ui/estrela.png"
                  alt=""
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  style={{ imageRendering: "pixelated" }}
                />
              ))}
            </span>
          </button>
        ))}
      </div>
      <fieldset className="w-full max-w-xl border-4 border-[#c4581f] bg-[#fbe6c8] p-3 text-[#3a2015] shadow-[0_6px_0_#7a2f12]">
        <legend className="bg-[#fbe6c8] px-2 font-display text-lg font-bold">
          {t("ui.fonte.titulo")}
        </legend>
        <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
          {MODOS.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={modo === m}
              disabled={loading}
              onClick={() => onModo(m)}
              className={`border-4 p-2 text-left transition active:translate-y-0.5 ${
                modo === m
                  ? "border-[#e2672b] bg-[#ffe9cc]"
                  : "border-[#e8c39c] bg-[#f6dcb8] opacity-80"
              }`}
            >
              <span className="block font-bold">{t(`ui.fonte.${m}`)}</span>
              <span className="block text-xs text-[#5a3424]">{t(`ui.fonte.${m}.desc`)}</span>
            </button>
          ))}
        </div>
        {modo === "famosa" && (
          <div className="mt-2 grid gap-1.5">
            {FAMOSAS_LISTA.map((f) => (
              <button
                key={f}
                type="button"
                disabled={loading}
                onClick={() => onModo("famosa", f)}
                className={`border-2 px-2 py-1.5 text-left text-sm font-bold ${
                  famosa === f ? "border-[#e2672b] bg-[#ffe9cc]" : "border-[#e8c39c] bg-[#f6dcb8]"
                }`}
              >
                {t(`ui.famosa.${f}`)}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      {/* embaixo da fonte dos dados: continuar a missão salva ou começar uma nova */}
      <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
        {saveSol !== null && (
          <Button variant="chunkySand" size="tap" className="w-full" onClick={onContinue}>
            <PixelIcon name="play" /> {t("ui.continuar", { sol: saveSol })}
          </Button>
        )}
        <Button
          variant="chunky"
          size="tap"
          className={`w-full ${saveSol === null ? "sm:col-span-2" : ""}`}
          onClick={() => onStart(nivel)}
        >
          <PixelIcon name="foguete" /> {t("ui.iniciar")}
        </Button>
      </div>
      <p className="text-center text-sm text-foreground/80" aria-live="polite">
        {loading ? <><PixelIcon name="ampulheta" size={20} /> {t("ui.carregando")}</> : nasaInfo}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- perfil: nome + personagem
export function ProfileScreen({
  initial,
  onBack,
  onDone,
}: {
  initial: Player;
  onBack: () => void;
  onDone: (p: Player) => void;
}) {
  const { t } = useGT();
  const [gender, setGender] = useState<Gender>(initial.gender);
  const [name, setName] = useState(initial.name);
  const opcoes: Gender[] = ["f", "m"];
  return (
    <form
      className="flex h-full flex-col items-center gap-4 overflow-y-auto p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onDone({ gender, name: cleanName(name) });
      }}
    >
      <div className="flex w-full max-w-xl">
        <Button type="button" variant="ghost" size="tap" onClick={onBack}>
          ← {t("ui.nivel.titulo")}
        </Button>
      </div>
      <h1 className="text-center font-display text-3xl font-bold text-foreground">
        {t("ui.perfil.titulo")}
      </h1>
      <p className="font-bold text-foreground">{t("ui.perfil.escolha")}</p>
      <div
        className="grid w-full max-w-md grid-cols-2 gap-3"
        role="radiogroup"
        aria-label={t("ui.perfil.escolha")}
      >
        {opcoes.map((g) => (
          <button
            key={g}
            type="button"
            role="radio"
            aria-checked={gender === g}
            onClick={() => setGender(g)}
            className={`flex flex-col items-center gap-2 border-4 bg-card p-3 text-card-foreground transition active:translate-y-1 ${
              gender === g
                ? "border-primary shadow-[0_6px_0_#9a3a14]"
                : "border-border opacity-80 shadow-[0_6px_0_#6e2a10]"
            }`}
          >
            <AstronautSprite gender={g} size={112} />
            <span className="text-lg font-bold">
              {t(`ui.perfil.${g === "f" ? "menina" : "menino"}`)}
            </span>
          </button>
        ))}
      </div>
      <label className="flex w-full max-w-md flex-col gap-1">
        <span className="font-bold text-foreground">{t("ui.perfil.nome")}</span>
        <input
          value={name}
          maxLength={NAME_MAX}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          placeholder={t("ui.perfil.padrao")}
          className="min-h-12 border-4 border-border bg-card px-3 text-xl font-bold text-card-foreground outline-none focus:border-primary"
        />
        <span className="text-sm text-foreground/80">{t("ui.perfil.dica")}</span>
      </label>
      <Button type="submit" variant="chunky" size="tap" className="w-full max-w-md text-lg">
        {t("ui.proximo")} <PixelIcon name="play" />
      </Button>
    </form>
  );
}

// ---------------------------------------------------------------- abertura (3 quadros)
export function Intro({ level, onDone }: { level: Level; onDone: () => void }) {
  const { t } = useGT();
  const [i, setI] = useState(0);
  const cfg = BALANCE.LEVELS[level];
  const quadros = [
    { icons: ["cama"], text: t("ui.abertura.1") },
    { icons: ["o2", "batata", "coracao"], text: t("ui.abertura.2") },
    { icons: ["sol", "ao_vivo"], text: t("ui.abertura.3") },
  ];
  const q = quadros[i]!;
  const ultimo = i === quadros.length - 1;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
      <img src={ART.portraits.rovi.src} alt="" width={96} height={96} className="object-contain" />
      <div className="max-w-md border-4 border-border bg-card p-6 text-card-foreground shadow-[0_5px_0_#6e2a10]">
        <div className="mb-3 flex justify-center gap-2">
          {q.icons.map((name) => <PixelIcon key={name} name={name} size={48} />)}
        </div>
        <p className="text-xl font-bold leading-snug">{q.text}</p>
        {ultimo && (
          <p className="mt-3 rounded-2xl bg-accent p-3 text-lg text-accent-foreground">
            {t("ui.abertura.meta", { sois: cfg.totalSols, meta: cfg.metaCiencia })}
          </p>
        )}
      </div>
      <div className="flex gap-2" aria-hidden>
        {quadros.map((_, k) => (
          <span key={k} className={`h-3 w-3 rounded-full ${k === i ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
      <div className="flex w-full max-w-md gap-2">
        <Button variant="ghost" size="tap" onClick={onDone}>
          {t("ui.pular")}
        </Button>
        <Button
          variant="chunky"
          size="tap"
          className="flex-1 text-lg"
          onClick={() => (ultimo ? onDone() : setI(i + 1))}
        >
          {ultimo ? t("ui.comecar") : t("ui.proximo")}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- fim da missão
/** Figurinhas: as que tem ficam coloridas; as que faltam, apagadas. */
export function StickerGrid({ ids, so }: { ids: string[]; so?: string[] }) {
  const { t } = useGT();
  const lista = so ? STICKERS.filter((k) => so.includes(k.id)) : STICKERS;
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {lista.map((k) => {
        const tem = ids.includes(k.id);
        return (
          <div
            key={k.id}
            className={`flex flex-col items-center gap-1 border-4 p-2 text-center ${
              tem
                ? "border-[#e2672b] bg-[#ffe9cc] text-[#3a2015]"
                : "border-[#8a6a52] bg-[#5a3a2c] text-[#c9a27c] opacity-70"
            }`}
            title={t(`fig.${k.id}.desc`)}
          >
            <img
              src={k.icone}
              alt=""
              className={`h-12 w-12 ${tem ? "" : "grayscale"}`}
              style={{ imageRendering: "pixelated" }}
            />
            <span className="text-sm font-bold leading-tight">{t(`fig.${k.id}`)}</span>
            <span className="text-xs leading-tight">{t(`fig.${k.id}.desc`)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function EndScreen({
  state,
  onReport,
  onNew,
  novas = [],
}: {
  state: GameState;
  onReport: () => void;
  onNew: () => void;
  /** figurinhas ganhas agora */
  novas?: string[];
}) {
  const { t } = useGT();
  const d = debrief(state);
  const icon = state.status === "vitoria" ? "vitoria" : state.status === "vitoria-parcial" ? "ok" : "foguete";
  return (
    <div className="flex h-full flex-col items-center gap-4 overflow-y-auto p-6 text-center">
      <PixelIcon name={icon} size={96} />
      <p className="border-2 border-border bg-card px-3 py-1 font-bold text-card-foreground">
        {t("ui.fim.quem")}
      </p>
      <h1 className="font-display text-4xl font-bold text-[#ffd23f]">{t(d.titleKey)}</h1>
      <p className="max-w-md text-xl">{t(d.bodyKey)}</p>
      <p className="text-lg font-bold">
        {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })} ·{" "}
        {t("ui.relatorio.sois", { n: Math.max(0, d.soisCompletos), total: d.totalSols })}
      </p>
      {novas.length > 0 && (
        <section className="w-full max-w-xl">
          <h2 className="mb-2 font-display text-2xl font-bold text-[#ffd23f]">
            {t("ui.fig.novas")}
          </h2>
          <StickerGrid ids={novas} so={novas} />
        </section>
      )}
      <div className="flex w-full max-w-md flex-col gap-2">
        <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onReport}>
          <PixelIcon name="relatorio" /> {t("ui.relatorio.ver")}
        </Button>
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onNew}>
          <PixelIcon name="recomecar" /> {t("botao.nova_missao")}
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- relatório
function Chart({ history }: { history: HistoryPoint[] }) {
  const { t } = useGT();
  const W = 300;
  const H = 120;
  const n = Math.max(1, history.length - 1);
  const xy = (i: number, v: number) =>
    `${(i / n) * (W - 20) + 10},${H - 10 - (v / 100) * (H - 20)}`;
  const linhas = [
    { k: "ar" as const, cor: "oklch(0.7 0.12 230)", icon: "o2" },
    { k: "comida" as const, cor: "oklch(0.8 0.12 85)", icon: "batata" },
    { k: "saude" as const, cor: "oklch(0.65 0.2 25)", icon: "coracao" },
  ];
  return (
    <figure className="rounded-2xl bg-muted p-3 text-card-foreground">
      <figcaption className="mb-2 font-bold">{t("ui.relatorio.grafico")}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={t("ui.relatorio.grafico")}
      >
        <line
          x1="10"
          y1={H - 10}
          x2={W - 10}
          y2={H - 10}
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <line x1="10" y1={10} x2={W - 10} y2={10} stroke="currentColor" strokeOpacity="0.1" />
        {linhas.map((l) => (
          <polyline
            key={l.k}
            fill="none"
            stroke={l.cor}
            strokeWidth="3"
            strokeLinejoin="round"
            points={history.map((h, i) => xy(i, h[l.k])).join(" ")}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-center gap-4 text-sm">
        {linhas.map((l) => (
          <span key={l.k} className="flex items-center gap-1">
            <span className="inline-block h-2 w-4 rounded" style={{ background: l.cor }} />
            <PixelIcon name={l.icon} size={18} /> {t(`recurso.${l.k}`)}
          </span>
        ))}
      </div>
    </figure>
  );
}

export function Report({
  state,
  onRewind,
  onNew,
}: {
  state: GameState;
  onRewind: (sol: number) => void;
  onNew: () => void;
}) {
  const { t, lang } = useGT();
  const d = debrief(state);
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="text-center font-display text-3xl font-bold text-[#ffd23f]">
          <PixelIcon name="relatorio" /> {t("ui.relatorio.titulo")}
        </h1>
        <p className="text-center text-lg font-bold">
          {t(d.titleKey)} · {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })}
        </p>

        <Chart history={d.history} />

        {d.causaKey && (
          <section className="rounded-2xl border-4 border-destructive/50 bg-card p-3 text-card-foreground">
            <p className="text-lg font-bold">{t(d.causaKey)}</p>
            {d.dicaKey && <p className="mt-1">{t(d.dicaKey)}</p>}
          </section>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-bold text-[#ffd23f]">
            {t("ui.relatorio.decisoes")}
          </h2>
          {d.momentos.length === 0 && <p>{t("ui.relatorio.sem_decisoes")}</p>}
          {d.momentos.map((m) => (
            <div
              key={`${m.sol}-${m.eventId}-${m.choiceId}`}
              className="rounded-2xl bg-muted p-3 text-card-foreground"
            >
              <p className="text-sm font-bold text-muted-foreground">
                {t("ui.relatorio.sol", { sol: m.sol })}
              </p>
              {m.eventId && <p className="font-bold">{t(eventKey.title(m.eventId))}</p>}
              {m.eventId && m.choiceId && m.choiceId !== "inicio" && (
                <p>→ {t(eventKey.label(m.eventId, m.choiceId))}</p>
              )}
              {m.lessonKey && <p className="mt-1 rounded-xl bg-accent p-2"><PixelIcon name="lampada" size={20} /> {t(m.lessonKey)}</p>}
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-bold text-[#ffd23f]">
            <PixelIcon name="sol" /> {t("ui.relatorio.reais")}
          </h2>
          <p className="text-sm text-foreground/80">{t("ui.relatorio.reais_explica")}</p>
          {d.realEvents.length === 0 && <p>{t("ui.relatorio.nenhum")}</p>}
          {d.realEvents.map(({ sol, event }) => (
            <div
              key={`${sol}-${event.donkiId}`}
              className="flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-3 text-card-foreground"
            >
              <span className="font-bold">{t(`donki.${event.kind}`)}</span>
              <span className="inline-flex" role="img" aria-label={t("ui.forca", { n: event.forca })}>
                {Array.from({ length: event.forca }, (_, i) => <PixelIcon key={i} name="estrela" size={18} />)}
              </span>
              <span className="text-sm">
                {formatarData(event.date, lang)} · {event.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {event.live ? t("selo.ao_vivo") : ""}
              </span>
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-sm font-semibold text-secondary underline underline-offset-4"
              >
                {t("ui.relatorio.ver_nasa")}
              </a>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-bold text-[#ffd23f]">{t("ui.fig.album")}</h2>

          <StickerGrid ids={loadStickers()} />
        </section>

        <p className="rounded-2xl bg-accent p-3 text-accent-foreground"><PixelIcon name="lampada" size={20} /> {t(d.fatoKey)}</p>

        <div className="flex flex-col gap-2 pb-4">
          {d.voltarAoSol !== undefined && state.status === "resgate" && (
            <Button
              variant="chunky"
              size="tap"
              className="w-full text-lg"
              onClick={() => onRewind(d.voltarAoSol!)}
            >
              <PixelIcon name="voltar" /> {t("botao.voltar_sol", { sol: d.voltarAoSol })}
            </Button>
          )}
          <Button variant="chunkySand" size="tap" className="w-full" onClick={onNew}>
            <PixelIcon name="recomecar" /> {t("botao.nova_missao")}
          </Button>
          <Button asChild variant="ghost" size="tap" className="w-full">
            <Link to="/"><PlaceIcon place="habitat" size={24} /> {t("ui.inicio")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- robô guia (tutorial)
export function TutorialBubble({
  step,
  onOk,
  onSkip,
}: {
  step: number;
  onOk: () => void;
  onSkip: () => void;
}) {
  const { t } = useGT();
  const texto = t(`tut.${step + 1}`);
  return (
    <div
      className="pointer-events-auto absolute inset-x-2 bottom-2 z-30 mx-auto flex max-w-md flex-col gap-1 opacity-95"
      role="status"
    >
      <DialogBox speaker="rovi" text={texto} compact />
      <div className="flex items-center gap-2">
        <Button variant="chunky" size="sm" className="min-h-10 flex-1" onClick={onOk}>
          {t("tut.ok")}
        </Button>
        <button
          type="button"
          className="min-h-10 px-2 text-xs text-foreground underline"
          onClick={onSkip}
        >
          {t("tut.pular")}
        </button>
      </div>
    </div>
  );
}
