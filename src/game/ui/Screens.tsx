// Telas fora do mapa: escolher nível, abertura, fim da missão, relatório. O tutorial fica em Tutorial.tsx.
import { NUMEROS_ENERGIA } from "./Panels";
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
import { formatarData, FullscreenButton, PlaceIcon, useGT } from "./shared";
import { NAME_MAX, cleanName, type Player } from "./player";
import { FAMOSAS, type Famosa, type ModoSol } from "@/data/donki-live";
import { STICKERS, loadStickers } from "./stickers";
import { ART, type Gender } from "./art";
import { PixelIcon } from "./PixelIcon";
import { BOTAO_ESCURO, BotaoHub, CARTAO_ESCURO, DESTAQUE, FUNDO_HUB, MOLDURA_HUB, PAINEL_HUB, TituloHub } from "./hub";

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
  // insígnia de cada nível (public/assets/ui/nivel_<nivel>.png): listras, asas, asas com coroa
  const niveis: Level[] = ["cadete", "piloto", "comandante"];
  return (
    <div className="flex h-full flex-col items-center gap-3 overflow-y-auto p-4" style={FUNDO_HUB}>
      <div className="flex w-full max-w-xl 2xl:max-w-3xl items-center justify-between">
        <Link to="/" className={`${BOTAO_ESCURO} text-lg`}>
          ← {t("ui.inicio")}
        </Link>
        <div className="flex items-center gap-2">
          <FullscreenButton />
          <LangSelector />
        </div>
      </div>
      <TituloHub className="text-center text-[clamp(1.4rem,5vw,2.25rem)]">{t("ui.nivel.titulo")}</TituloHub>
      <div className="grid w-full max-w-xl 2xl:max-w-3xl gap-3" role="radiogroup" aria-label={t("ui.nivel.titulo")}>
        {niveis.map((l) => (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={nivel === l}
            disabled={loading}
            onClick={() => setNivel(l)}
            className={`relative flex min-h-16 items-stretch gap-2 border-4 p-1.5 text-left sm:min-h-20 text-[#fbe6c8] shadow-[0_6px_0_#1c0703] transition hover:brightness-110 active:translate-y-1 active:shadow-none disabled:opacity-50 ${
              nivel === l
                ? "border-[#f3c916] bg-[#5a1d07] ring-4 ring-[#f3c916]/35"
                : "border-[#5a1d07] bg-[#2a0508]/90"
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
                className={`absolute ${c} h-2 w-2 bg-[#a8400f]`}
                aria-hidden
              />
            ))}
            <span className="flex min-w-0 flex-1 flex-col justify-center px-2 py-1 sm:px-3">
              <span className={`flex items-center gap-2 font-display text-[clamp(1rem,4.4vw,1.5rem)] font-bold leading-tight ${nivel === l ? "text-[#f3c916]" : ""}`}>
                {t(`nivel.${l}`)}
                {nivel === l && <PixelIcon name="ok" size={22} />}
              </span>
              <span className="block text-[#e0c09a]">{t(`ui.nivel.${l}`, { sois: BALANCE.LEVELS[l].totalSols })}</span>
            </span>
            <span
              className="flex w-20 shrink-0 items-center justify-center border-4 border-[#5a1d07] bg-[#1c0703]/70 p-1 sm:w-32"
              aria-hidden
            >
              <img
                src={`/assets/ui/nivel_${l}.png`}
                alt=""
                className={`h-10 w-full object-contain transition sm:h-14 ${nivel === l ? "" : "opacity-80 saturate-[0.8]"}`}
                style={{ imageRendering: "pixelated" }}
              />
            </span>
          </button>
        ))}
      </div>
      <fieldset className={`${PAINEL_HUB} w-full max-w-xl 2xl:max-w-3xl p-3 text-[#fbe6c8]`}>
        <legend className="border-4 border-[#a8400f] bg-[#2a0508] px-2 font-display text-base font-bold text-[#f3c916] sm:text-lg">
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
                  ? "border-[#f3c916] bg-[#5a1d07]"
                  : "border-[#5a1d07] bg-[#3b1206]/85 opacity-85 hover:opacity-100"
              }`}
            >
              <span className={`block font-bold ${modo === m ? "text-[#f3c916]" : ""}`}>{t(`ui.fonte.${m}`)}</span>
              <span className="block text-xs text-[#e0c09a]">{t(`ui.fonte.${m}.desc`)}</span>
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
                  famosa === f ? "border-[#f3c916] bg-[#5a1d07] text-[#f3c916]" : "border-[#5a1d07] bg-[#3b1206]/85"
                }`}
              >
                {t(`ui.famosa.${f}`)}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      {/* embaixo da fonte dos dados: continuar a missão salva ou começar uma nova */}
      <div className="sticky bottom-0 z-10 -mb-4 grid w-full max-w-xl gap-3 bg-gradient-to-t from-[#1c0408] from-60% to-transparent pb-4 pt-4 sm:static sm:mb-0 sm:grid-cols-2 sm:bg-none sm:p-0 2xl:max-w-3xl">
        {saveSol !== null && (
          <BotaoHub onClick={onContinue}>
            <PixelIcon name="play" /> {t("ui.continuar", { sol: saveSol })}
          </BotaoHub>
        )}
        <BotaoHub
          principal
          className={saveSol === null ? "sm:col-span-2 sm:mx-auto sm:max-w-md" : ""}
          disabled={loading}
          onClick={() => onStart(nivel)}
        >
          <PixelIcon name="foguete" /> {t("ui.iniciar")}
        </BotaoHub>
      </div>
      <p className="text-center text-sm text-[#fbe6c8]/85 [text-shadow:2px_2px_0_#1c0703]" aria-live="polite">
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
  // mesmo estilo do menu inicial e do menu do jogo (ver hub.tsx)
  return (
    <form
      className="sem-barra flex h-full flex-col items-center overflow-y-auto p-[clamp(0.4rem,1.6dvh,1rem)]"
      style={FUNDO_HUB}
      onSubmit={(e) => {
        e.preventDefault();
        onDone({ gender, name: cleanName(name) });
      }}
    >
      <div className={`${MOLDURA_HUB} my-auto flex w-full max-w-xl 2xl:max-w-2xl flex-col gap-[clamp(0.4rem,1.8dvh,1rem)] bg-[#2a0508]/80 p-[clamp(0.6rem,2.4dvh,1.5rem)]`}>
        <div className="flex items-center justify-between gap-2">
          <button type="button" onClick={onBack} className={`${BOTAO_ESCURO} min-w-0 text-[clamp(0.7rem,3.2vw,0.95rem)]`}>
            ← <span className="truncate">{t("ui.nivel.titulo")}</span>
          </button>
          <div className="flex shrink-0 items-center gap-2">
            <FullscreenButton />
            <LangSelector />
          </div>
        </div>
        <TituloHub className="text-center text-[clamp(0.95rem,min(3.7vw,4.6dvh),2rem)]">
          {t("ui.perfil.titulo")}
        </TituloHub>
        <p className="-mt-1 text-center font-display text-[clamp(0.85rem,2.8dvh,1.125rem)] font-bold text-[#fbe6c8] [text-shadow:2px_2px_0_#1c0703]">
          {t("ui.perfil.escolha")}
        </p>
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t("ui.perfil.escolha")}>
          {opcoes.map((g) => {
            const sel = gender === g;
            return (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => setGender(g)}
                className={`relative flex flex-col items-center gap-1 border-4 p-[clamp(0.35rem,1.4dvh,0.75rem)] text-[#3a2015] transition active:translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight ${
                  sel
                    ? "border-[#f3c916] bg-[#f8dfba] shadow-[0_6px_0_#a8400f]"
                    : "border-[#5a1d07] bg-[#c9a27c] opacity-80 shadow-[0_6px_0_#1c0703] hover:opacity-100"
                }`}
              >
                {sel && (
                  <span className="absolute right-1 top-1" aria-hidden>
                    <PixelIcon name="ok" size={24} />
                  </span>
                )}
                {/* o desenho encolhe em telas baixas para tudo caber sem rolagem */}
                <img
                  src={ART.astronaut.frame(g, "s", 1)}
                  alt=""
                  className="pixelated h-[clamp(56px,15dvh,112px)] w-auto"
                />
                <span className="whitespace-nowrap font-display text-[clamp(0.62rem,min(2.6vw,2.6dvh),1.1rem)] font-bold">
                  {t(`ui.perfil.${g === "f" ? "menina" : "menino"}`)}
                </span>
              </button>
            );
          })}
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-display text-[clamp(0.85rem,2.8dvh,1.125rem)] font-bold text-[#fbe6c8] [text-shadow:2px_2px_0_#1c0703]">
            {t("ui.perfil.nome")}
          </span>
          <input
            value={name}
            maxLength={NAME_MAX}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder={t("ui.perfil.padrao")}
            className="min-h-12 border-4 border-[#5a1d07] bg-[#f8dfba] px-3 text-xl font-bold text-[#3a2015] shadow-[inset_0_3px_0_#c9a27c] outline-none placeholder:text-[#3a2015]/45 focus:border-[#f3c916]"
          />
          <span className="text-sm text-[#fbe6c8]/80">{t("ui.perfil.dica")}</span>
        </label>
        <BotaoHub principal type="submit" className="mx-auto max-w-[max(240px,70dvh)]">
          {t("ui.proximo")}
        </BotaoHub>
      </div>
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
    <div className="sem-barra flex h-full flex-col items-center overflow-y-auto p-[clamp(0.4rem,1.6dvh,1rem)] text-center" style={FUNDO_HUB}>
      <div className={`${MOLDURA_HUB} relative my-auto flex w-full max-w-xl 2xl:max-w-2xl flex-col items-center gap-[clamp(0.4rem,1.8dvh,1rem)] bg-[#2a0508]/80 p-[clamp(0.6rem,2.4dvh,1.5rem)]`}>
        <FullscreenButton className="absolute right-2 top-2" />
        <img
          src={ART.portraits.rovi.src}
          alt=""
          width={150}
          height={150}
          className="pixelated h-[clamp(56px,min(22vw,17dvh),150px)] w-auto object-contain drop-shadow-[0_5px_0_#1c0703]"
        />
        {/* balão de fala do Rovi (a pontinha aponta para ele) */}
        <div className={`${MOLDURA_HUB} relative w-full bg-[#f8dfba] p-[clamp(0.6rem,2.6dvh,1.5rem)] text-[#3a2015]`}>
          <span
            className="absolute -top-[20px] left-1/2 -translate-x-1/2 border-x-[14px] border-b-[16px] border-x-transparent border-b-[#f8dfba]"
            aria-hidden
          />
          <div className="mb-[clamp(0.25rem,1.4dvh,0.75rem)] flex justify-center gap-2">
            {q.icons.map((name) => (
              <img
                key={name}
                src={`/assets/ui/${name}.png`}
                alt=""
                className="pixelated h-[clamp(28px,7dvh,48px)] w-auto"
              />
            ))}
          </div>
          <p className="text-[clamp(1rem,min(4.5vw,3.6dvh),1.6rem)] font-bold leading-snug">{q.text}</p>
          {ultimo && (
            <p className="mt-[clamp(0.35rem,1.6dvh,0.75rem)] border-4 border-[#5a1d07] bg-[#2a0508] p-[clamp(0.4rem,1.6dvh,0.75rem)] font-display text-[clamp(0.85rem,2.8dvh,1.125rem)] font-bold text-[#f6e38c] shadow-[0_4px_0_#1c0703]">
              {t("ui.abertura.meta", { sois: cfg.totalSols, meta: cfg.metaCiencia })}
            </p>
          )}
        </div>
        <div className="flex gap-2" aria-hidden>
          {quadros.map((_, k) => (
            <span
              key={k}
              className={`h-4 w-4 border-2 border-[#1c0703] ${k === i ? "bg-[#f3c916]" : "bg-[#fbe6c8]/35"}`}
            />
          ))}
        </div>
        <BotaoHub
          principal
          className="max-w-[max(240px,70dvh)]"
          onClick={() => (ultimo ? onDone() : setI(i + 1))}
        >
          {ultimo ? (
            <>
              <PixelIcon name="foguete" /> {t("ui.comecar")}
            </>
          ) : (
            <>
              {t("ui.proximo")}
            </>
          )}
        </BotaoHub>
        <button type="button" onClick={onDone} className={`${BOTAO_ESCURO} text-base`}>
          {t("ui.pular")}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- fim da missão
/** Figurinhas: as que tem ficam coloridas (cartão claro com borda amarela); as que faltam, escuras. */
export function StickerGrid({ ids, so }: { ids: string[]; so?: string[] }) {
  const { t } = useGT();
  const lista = so ? STICKERS.filter((k) => so.includes(k.id)) : STICKERS;
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,8.5rem),1fr))] gap-3">
      {lista.map((k) => {
        const tem = ids.includes(k.id);
        return (
          <div
            key={k.id}
            className={`flex min-w-0 flex-col items-center gap-1 border-4 p-2 text-center ${
              tem
                ? "border-[#f3c916] bg-[#f8dfba] text-[#3a2015] shadow-[0_5px_0_#a8400f]"
                : "border-[#5a1d07] bg-[#3b1206]/85 text-[#c9a27c] shadow-[0_5px_0_#1c0703]"
            }`}
            title={t(`fig.${k.id}.desc`, { max: BALANCE.ESCUDO_MAX })}
          >
            <img
              src={k.icone}
              alt=""
              className={`h-12 w-12 ${tem ? "" : "opacity-50 grayscale"}`}
              style={{ imageRendering: "pixelated" }}
            />
            <span className="w-full font-display text-[0.7rem] font-bold leading-snug [overflow-wrap:anywhere] [hyphens:auto] sm:text-xs">
              {t(`fig.${k.id}`)}
            </span>
            <span className="w-full text-sm leading-tight [overflow-wrap:anywhere]">{t(`fig.${k.id}.desc`, { max: BALANCE.ESCUDO_MAX })}</span>
          </div>
        );
      })}
    </div>
  );
}

/** 1 a 3 estrelas pixel (as que faltam ficam apagadas) e uma frase por estrela ganha. */
function Estrelas({ n }: { n: number }) {
  const { t } = useGT();
  return (
    <section className="flex w-full max-w-md flex-col items-center gap-2">
      <div className="flex items-end justify-center gap-2" role="img" aria-label={t("fim.estrelas", { n })}>
        {[1, 2, 3].map((k) => (
          <img
            key={k}
            src="/assets/ui/estrela.png"
            alt=""
            className={`pixelated ${k === 2 ? "h-20 w-20 sm:h-24 sm:w-24" : "h-16 w-16 sm:h-20 sm:w-20"} ${
              k <= n ? "estrela-ganha drop-shadow-[0_4px_0_#1c0703]" : "opacity-30 grayscale"
            }`}
            style={k <= n ? { animationDelay: `${(k - 1) * 250}ms` } : undefined}
          />
        ))}
      </div>
      <ul className="flex flex-col items-center gap-0.5 font-display text-sm font-bold text-[#f6e38c] [text-shadow:2px_2px_0_#1c0703] sm:text-base">
        {Array.from({ length: n }, (_, k) => (
          <li key={k}>{t(`fim.estrela.${k + 1}`)}</li>
        ))}
      </ul>
      {n < 3 && <p className="text-base text-[#fbe6c8]/85">{t("fim.estrela.falta")}</p>}
    </section>
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
  const icon = state.status === "resgate" ? "foguete" : "vitoria";
  // mesmo estilo do menu inicial: arte da base ao fundo e painel com moldura (ver hub.tsx)
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto p-3 text-center sm:p-4" style={FUNDO_HUB}>
      <div className={`${PAINEL_HUB} relative my-auto flex w-full max-w-2xl 2xl:max-w-3xl flex-col items-center gap-[clamp(0.5rem,2dvh,1rem)] p-[clamp(0.75rem,2.6dvh,1.5rem)]`}>
        <FullscreenButton className="absolute right-2 top-2" />
        <PixelIcon name={icon} size={88} />
        <p className={`${DESTAQUE} px-3 py-1 font-display text-sm font-bold`}>{t("ui.fim.quem")}</p>
        <TituloHub className="text-[clamp(1.5rem,5.5vw,2.5rem)]">{t(d.titleKey)}</TituloHub>
        <p className="max-w-lg text-lg leading-snug text-[#fbe6c8] sm:text-xl">{t(d.bodyKey)}</p>
        {d.estrelas > 0 && <Estrelas n={d.estrelas} />}
        {/* números da missão em duas caixinhas */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <p className={`${DESTAQUE} flex items-center justify-center gap-2 px-2 py-2 font-display text-sm font-bold sm:text-base`}>
            <PixelIcon name="microscopio" size={22} /> {d.ciencia}/{d.metaCiencia}
          </p>
          <p className={`${DESTAQUE} flex items-center justify-center gap-2 px-2 py-2 font-display text-sm font-bold sm:text-base`}>
            <PixelIcon name="sol" size={22} /> {Math.max(0, d.soisCompletos)}/{d.totalSols}
          </p>
        </div>
        <p className="sr-only">
          {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })} ·{" "}
          {t("ui.relatorio.sois", { n: Math.max(0, d.soisCompletos), total: d.totalSols })}
        </p>
        {novas.length > 0 && (
          <section className="w-full">
            <TituloHub as="h2" className="mb-3 text-[clamp(1.1rem,3.6vw,1.6rem)]">
              {t("ui.fig.novas")}
            </TituloHub>
            <StickerGrid ids={novas} so={novas} />
          </section>
        )}
        <div className="flex w-full max-w-md flex-col gap-2 pt-1">
          <BotaoHub principal onClick={onReport}>
            <PixelIcon name="relatorio" /> {t("ui.relatorio.ver")}
          </BotaoHub>
          <BotaoHub onClick={onNew}>
            <PixelIcon name="recomecar" /> {t("botao.nova_missao")}
          </BotaoHub>
        </div>
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
  const xy = (i: number, v: number) => `${(i / n) * (W - 20) + 10},${H - 10 - (v / 100) * (H - 20)}`;
  const linhas = [
    { k: "ar" as const, cor: "#6cc6ff", icon: "o2" },
    { k: "comida" as const, cor: "#ffd23f", icon: "batata" },
    { k: "saude" as const, cor: "#ff6b5e", icon: "coracao" },
  ];
  return (
    <figure className={`${CARTAO_ESCURO} p-3`}>
      <figcaption className="mb-2 font-display font-bold text-[#f6e38c]">{t("ui.relatorio.grafico")}</figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={t("ui.relatorio.grafico")}>
        {/* grade em "pixels" */}
        {[0, 25, 50, 75, 100].map((v) => (
          <line
            key={v}
            x1="10"
            x2={W - 10}
            y1={H - 10 - (v / 100) * (H - 20)}
            y2={H - 10 - (v / 100) * (H - 20)}
            stroke="#fbe6c8"
            strokeOpacity={v === 0 ? 0.45 : 0.12}
            strokeDasharray={v === 0 ? undefined : "3 3"}
          />
        ))}
        {linhas.map((l) => (
          <polyline
            key={l.k}
            fill="none"
            stroke={l.cor}
            strokeWidth="3"
            strokeLinejoin="miter"
            points={history.map((h, i) => xy(i, h[l.k])).join(" ")}
          />
        ))}
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
        {linhas.map((l) => (
          <span key={l.k} className="flex items-center gap-1">
            <span className="inline-block h-2 w-4" style={{ background: l.cor }} />
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
  onBack,
}: {
  state: GameState;
  onRewind: (sol: number) => void;
  onNew: () => void;
  /** volta para a tela final (estrelas e figurinhas novas) */
  onBack: () => void;
}) {
  const { t, lang } = useGT();
  const d = debrief(state);
  const subtitulo = "font-display text-[clamp(0.95rem,2.6vw,1.25rem)]";
  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4" style={FUNDO_HUB}>
      {/* telas grandes (1920+): 3 colunas, tudo na tela sem rolar */}
      <div className="mx-auto flex max-w-2xl flex-col gap-4 2xl:grid 2xl:h-full 2xl:max-w-[1760px] 2xl:grid-cols-3 2xl:grid-rows-[auto_1fr] 2xl:gap-x-6 2xl:gap-y-3">
        <header className={`${PAINEL_HUB} flex flex-col items-center gap-2 p-3 text-center sm:p-4 2xl:col-span-3`}>
          <div className="flex w-full items-center justify-between gap-2">
            <button type="button" onClick={onBack} className={`${BOTAO_ESCURO} text-base`}>
              ← {t("ui.relatorio.voltar_fim")}
            </button>
            <FullscreenButton />
          </div>
          <TituloHub className="text-[clamp(1.25rem,4.5vw,2.25rem)]">
            <PixelIcon name="relatorio" size={32} /> {t("ui.relatorio.titulo")}
          </TituloHub>
          <p className="font-display text-sm font-bold text-[#fbe6c8] sm:text-base">
            {t(d.titleKey)} · {t("ui.relatorio.ciencia", { n: d.ciencia, meta: d.metaCiencia })}
          </p>
        </header>

        <div className={`${PAINEL_HUB} flex min-h-0 flex-col gap-4 p-4 2xl:overflow-y-auto`}>
          <Chart history={d.history} />

          {d.causaKey && (
            <section className="border-4 border-[#ff6b5e] bg-[#3b1206]/90 p-3 text-[#fbe6c8] shadow-[0_4px_0_#1c0703]">
              <p className="text-lg font-bold">{t(d.causaKey)}</p>
              {d.dicaKey && <p className="mt-1">{t(d.dicaKey, NUMEROS_ENERGIA)}</p>}
            </section>
          )}

          <p className={`${DESTAQUE} flex gap-2 p-3 text-left`}>
            <PixelIcon name="lampada" size={22} />
            <span>{t(d.fatoKey)}</span>
          </p>
          <div className="flex flex-col gap-2 pb-1">
            {d.voltarAoSol !== undefined && state.status === "resgate" && (
              <BotaoHub principal onClick={() => onRewind(d.voltarAoSol!)}>
                <PixelIcon name="voltar" /> {t("botao.voltar_sol", { sol: d.voltarAoSol })}
              </BotaoHub>
            )}
            <BotaoHub principal={!(d.voltarAoSol !== undefined && state.status === "resgate")} onClick={onNew}>
              <PixelIcon name="recomecar" /> {t("botao.nova_missao")}
            </BotaoHub>
            <Link to="/" className={`${BOTAO_ESCURO} w-full shrink-0 text-base`}>
              <PlaceIcon place="habitat" size={24} /> {t("ui.inicio")}
            </Link>
          </div>
        </div>

        <div className={`${PAINEL_HUB} flex min-h-0 flex-col gap-4 p-4 2xl:overflow-y-auto`}>
          <section className="flex flex-col gap-2">
            <TituloHub as="h2" className={subtitulo}>
              {t("ui.relatorio.decisoes")}
            </TituloHub>
            {d.momentos.length === 0 && <p className="text-[#fbe6c8]">{t("ui.relatorio.sem_decisoes")}</p>}
            {d.momentos.map((m) => (
              <div key={`${m.sol}-${m.eventId}-${m.choiceId}`} className={`${CARTAO_ESCURO} p-3 text-left`}>
                <p className="font-display text-xs font-bold text-[#f3c916]">{t("ui.relatorio.sol", { sol: m.sol })}</p>
                {m.eventId && <p className="font-bold">{t(eventKey.title(m.eventId))}</p>}
                {m.eventId && m.choiceId && m.choiceId !== "inicio" && (
                  <p>→ {t(eventKey.label(m.eventId, m.choiceId))}</p>
                )}
                {m.lessonKey && (
                  <p className={`${DESTAQUE} mt-2 flex gap-2 p-2 text-sm`}>
                    <PixelIcon name="lampada" size={20} />
                    <span>{t(m.lessonKey)}</span>
                  </p>
                )}
              </div>
            ))}
          </section>
          <section className="flex flex-col gap-2">
            <TituloHub as="h2" className={subtitulo}>
              {t("ui.fig.album")}
            </TituloHub>
            <StickerGrid ids={loadStickers()} />
          </section>
        </div>

        <div className={`${PAINEL_HUB} flex min-h-0 flex-col gap-4 p-4 2xl:overflow-y-auto`}>
          <section className="flex flex-col gap-2">
            <TituloHub as="h2" className={subtitulo}>
              <PixelIcon name="sol" /> {t("ui.relatorio.reais")}
            </TituloHub>
            <p className="text-sm text-[#fbe6c8]/85">{t("ui.relatorio.reais_explica")}</p>
            {d.realEvents.length === 0 && <p className="text-[#fbe6c8]">{t("ui.relatorio.nenhum")}</p>}
            {d.realEvents.map(({ sol, event }) => (
              <div key={`${sol}-${event.donkiId}`} className={`${CARTAO_ESCURO} flex flex-wrap items-center gap-2 p-3 text-left`}>
                <span className="font-bold">{t(`donki.${event.kind}`)}</span>
                <span className="inline-flex" role="img" aria-label={t("ui.forca", { n: event.forca })}>
                  {Array.from({ length: event.forca }, (_, i) => <PixelIcon key={i} name="estrela" size={18} />)}
                </span>
                <span className="text-sm">
                  {formatarData(event.date, lang)} · {event.label}
                </span>
                <span className="text-xs text-[#fbe6c8]/70">{event.live ? t("selo.ao_vivo") : ""}</span>
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-auto text-sm font-semibold text-[#f3c916] underline underline-offset-4"
                >
                  {t("ui.relatorio.ver_nasa")}
                </a>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
