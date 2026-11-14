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
import { AstronautSprite, DialogBox, SpeakButton, useGT } from "./shared";
import { NAME_MAX, cleanName, type Player } from "./player";
import type { Gender } from "./art";

// ---------------------------------------------------------------- escolher nível
export function LevelSelect({
  loading,
  nasaInfo,
  saveSol,
  onStart,
  onContinue,
}: {
  loading: boolean;
  nasaInfo: string;
  saveSol: number | null;
  onStart: (l: Level) => void;
  onContinue: () => void;
}) {
  const { t } = useGT();
  const niveis: { l: Level; icon: string }[] = [
    { l: "cadete", icon: "🧒" },
    { l: "piloto", icon: "🧑‍🚀" },
    { l: "comandante", icon: "👩‍🚀" },
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
      <div className="grid w-full max-w-xl gap-3">
        {niveis.map(({ l, icon }) => (
          <button
            key={l}
            type="button"
            disabled={loading}
            onClick={() => onStart(l)}
            className="flex min-h-20 items-center gap-4 rounded-3xl border-4 border-border bg-card p-4 text-left shadow-chunky-sand transition hover:border-primary active:translate-y-1 active:shadow-none disabled:opacity-50"
          >
            <span className="text-5xl" aria-hidden>
              {icon}
            </span>
            <span>
              <span className="block font-display text-2xl font-bold text-secondary">
                {t(`nivel.${l}`)}
              </span>
              <span className="block text-muted-foreground">{t(`ui.nivel.${l}`)}</span>
            </span>
          </button>
        ))}
        {saveSol !== null && (
          <Button variant="chunkySand" size="tap" className="w-full text-lg" onClick={onContinue}>
            ▶ {t("ui.continuar", { sol: saveSol })}
          </Button>
        )}
      </div>
      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {loading ? `⏳ ${t("ui.carregando")}` : nasaInfo}
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
        {t("ui.proximo")} ▶
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
    { icon: "🏠", text: t("ui.abertura.1") },
    { icon: "💨🥔❤️", text: t("ui.abertura.2") },
    { icon: "☀️📡", text: t("ui.abertura.3") },
  ];
  const q = quadros[i]!;
  const ultimo = i === quadros.length - 1;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="text-7xl" aria-hidden>
        🤖
      </div>
      <div className="max-w-md rounded-3xl border-4 border-border bg-card p-6 shadow-xl">
        <div className="mb-3 text-5xl" aria-hidden>
          {q.icon}
        </div>
        <p className="text-xl font-bold leading-snug">{q.text}</p>
        {ultimo && (
          <p className="mt-3 rounded-2xl bg-accent p-3 text-lg">
            {t("ui.abertura.meta", { sois: cfg.totalSols, meta: cfg.metaCiencia })}
          </p>
        )}
        <div className="mt-3 flex justify-center">
          <SpeakButton text={q.text} />
        </div>
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
export function EndScreen({
  state,
  onReport,
  onNew,
}: {
  state: GameState;
  onReport: () => void;
  onNew: () => void;
}) {
  const { t } = useGT();
  const d = debrief(state);
  const icon = state.status === "vitoria" ? "🎉" : state.status === "vitoria-parcial" ? "🙂" : "🚀";
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="text-8xl" aria-hidden>
        {icon}
      </div>
      <p className="border-2 border-border bg-card px-3 py-1 font-bold text-card-foreground">
        {t("ui.fim.quem")}
      </p>
      <h1 className="font-display text-4xl font-bold text-[#ffd23f]">{t(d.titleKey)}</h1>
      <p className="max-w-md text-xl">{t(d.bodyKey)}</p>
      <p className="text-lg font-bold">
        {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })} ·{" "}
        {t("ui.relatorio.sois", { n: Math.max(0, d.soisCompletos), total: d.totalSols })}
      </p>
      <div className="flex w-full max-w-md flex-col gap-2">
        <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onReport}>
          📋 {t("ui.relatorio.ver")}
        </Button>
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onNew}>
          🔄 {t("botao.nova_missao")}
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
    { k: "ar" as const, cor: "oklch(0.7 0.12 230)", icon: "💨" },
    { k: "comida" as const, cor: "oklch(0.8 0.12 85)", icon: "🥔" },
    { k: "saude" as const, cor: "oklch(0.65 0.2 25)", icon: "❤️" },
  ];
  return (
    <figure className="rounded-2xl bg-muted p-3">
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
            {l.icon} {t(`recurso.${l.k}`)}
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
  const { t } = useGT();
  const d = debrief(state);
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <h1 className="text-center font-display text-3xl font-bold text-[#ffd23f]">
          📋 {t("ui.relatorio.titulo")}
        </h1>
        <p className="text-center text-lg font-bold">
          {t(d.titleKey)} · {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })}
        </p>

        <Chart history={d.history} />

        {d.causaKey && (
          <section className="rounded-2xl border-4 border-destructive/50 bg-card p-3">
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
            <div key={`${m.sol}-${m.eventId}-${m.choiceId}`} className="rounded-2xl bg-muted p-3">
              <p className="text-sm font-bold text-muted-foreground">
                {t("ui.relatorio.sol", { sol: m.sol })}
              </p>
              {m.eventId && <p className="font-bold">{t(eventKey.title(m.eventId))}</p>}
              {m.eventId && m.choiceId && m.choiceId !== "inicio" && (
                <p>→ {t(eventKey.label(m.eventId, m.choiceId))}</p>
              )}
              {m.lessonKey && <p className="mt-1 rounded-xl bg-accent p-2">💡 {t(m.lessonKey)}</p>}
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-display text-xl font-bold text-[#ffd23f]">
            ☀️ {t("ui.relatorio.reais")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("ui.relatorio.reais_explica")}</p>
          {d.realEvents.length === 0 && <p>{t("ui.relatorio.nenhum")}</p>}
          {d.realEvents.map(({ sol, event }) => (
            <div
              key={`${sol}-${event.donkiId}`}
              className="flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-3"
            >
              <span className="font-bold">{t(`donki.${event.kind}`)}</span>
              <span>{"⭐".repeat(event.forca)}</span>
              <span className="text-sm">
                {event.date} · {event.label}
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

        <p className="rounded-2xl bg-accent p-3">💡 {t(d.fatoKey)}</p>

        <div className="flex flex-col gap-2 pb-4">
          {d.voltarAoSol !== undefined && state.status === "resgate" && (
            <Button
              variant="chunky"
              size="tap"
              className="w-full text-lg"
              onClick={() => onRewind(d.voltarAoSol!)}
            >
              ⏪ {t("botao.voltar_sol", { sol: d.voltarAoSol })}
            </Button>
          )}
          <Button variant="chunkySand" size="tap" className="w-full" onClick={onNew}>
            🔄 {t("botao.nova_missao")}
          </Button>
          <Button asChild variant="ghost" size="tap" className="w-full">
            <Link to="/">🏠 {t("ui.inicio")}</Link>
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
        <SpeakButton text={texto} />
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
