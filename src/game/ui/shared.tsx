// Peças compartilhadas das telas do jogo: tradução, voz, chips de efeito, modal.
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/i18n";
import { t as translate } from "@/content/i18n";
import type { Effect, Lang, PlaceId } from "@/game/engine";
import { ART, type Speaker } from "./art";

/** Tradutor dos textos do jogo no idioma escolhido no site. */
export function useGT() {
  const { lang } = useLang();
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(key, lang, vars),
    [lang],
  );
  return { t, lang };
}

// ---------------------------------------------------------------- voz (Web Speech API, grátis)
const VOICE_LANG: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
};

export function speak(text: string, lang: Lang): void {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[^\p{L}\p{N}\s.,!?:;'’()%-]/gu, " "));
    u.lang = VOICE_LANG[lang];
    u.rate = 0.95;
    const voice = synth
      .getVoices()
      .find((v) => v.lang.toLowerCase().startsWith(VOICE_LANG[lang].slice(0, 2)));
    if (voice) u.voice = voice;
    synth.speak(u);
  } catch {
    /* sem voz neste navegador */
  }
}

export function stopSpeaking(): void {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}

export function SpeakButton({ text }: { text: string }) {
  const { t, lang } = useGT();
  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      className="min-h-10 rounded-full bg-muted px-3 text-sm font-bold text-secondary hover:brightness-110"
    >
      {t("ui.ouvir")}
    </button>
  );
}

// ---------------------------------------------------------------- efeitos como "chips" (−3 ⚡, +2 🔬)
const ICON: Record<keyof Effect, string> = {
  energia: "⚡",
  ar: "💨",
  comida: "🥔",
  saude: "❤️",
  ciencia: "🔬",
  escudo: "🛡️",
  bateria: "🔋",
  solar: "☀️",
};
const ORDER: (keyof Effect)[] = [
  "energia",
  "ar",
  "comida",
  "saude",
  "ciencia",
  "escudo",
  "bateria",
  "solar",
];

export function EffectChips({
  effect,
  className = "",
}: {
  effect: Effect | undefined;
  className?: string;
}) {
  if (!effect) return null;
  const items = ORDER.filter((k) => effect[k] !== undefined && effect[k] !== 0);
  if (!items.length) return null;
  return (
    <span className={`flex flex-wrap gap-1 ${className}`}>
      {items.map((k) => {
        const raw = effect[k] ?? 0;
        const v = k === "solar" ? Math.round(raw * 100) : raw;
        const good = v > 0;
        return (
          <span
            key={k}
            className={`rounded-full px-2 py-0.5 text-sm font-extrabold ${
              good ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            }`}
          >
            {v > 0 ? "+" : "−"}
            {Math.abs(v)}
            {k === "solar" ? "%" : ""} {ICON[k]}
          </span>
        );
      })}
    </span>
  );
}

// ---------------------------------------------------------------- modal simples (folha de baixo no celular)
export function Modal({
  children,
  onClose,
  label,
  wide = false,
}: {
  children: ReactNode;
  onClose?: (() => void) | undefined;
  label: string;
  wide?: boolean;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/55 p-2 sm:items-center sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className={`max-h-[92dvh] w-full overflow-y-auto rounded-3xl border-4 border-border bg-card p-4 text-card-foreground shadow-2xl sm:p-6 ${
          wide ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- mapa: posição de cada lugar (% do quadrado)
export const PLACE_POS: Record<PlaceId, { x: number; y: number; icon: string }> = {
  habitat: { x: 50, y: 47, icon: "🏠" },
  paineis: { x: 20, y: 17, icon: "🔆" },
  antena: { x: 80, y: 17, icon: "📡" },
  ar: { x: 15, y: 50, icon: "💨" },
  estufa: { x: 85, y: 50, icon: "🌱" },
  lab: { x: 22, y: 82, icon: "🔬" },
  abrigo: { x: 78, y: 82, icon: "🛡️" },
  rover: { x: 50, y: 85, icon: "🚙" },
};

/** Cena de DENTRO do lugar (ilustração com o astronauta). Sem arte pronta: fundo provisório com ícones. */
export function PlaceScene({ place, radio = false }: { place: PlaceId; radio?: boolean }) {
  const { t } = useGT();
  if (ART.places.ready)
    return (
      <div className="relative -mx-4 -mt-4 mb-1 overflow-hidden rounded-t-3xl sm:-mx-6 sm:-mt-6">
        <img
          src={ART.places.src[place]}
          alt={t(`lugar.${place}`)}
          className="aspect-[16/7] w-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
        {radio && <RadioTag />}
      </div>
    );
  return (
    <div
      className="relative -mx-4 -mt-4 mb-1 flex aspect-[16/6] items-end justify-center gap-4 overflow-hidden rounded-t-3xl pb-2 sm:-mx-6 sm:-mt-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.3 0.08 265) 0%, oklch(0.55 0.15 40) 70%, oklch(0.5 0.13 38) 100%)",
      }}
      aria-hidden
    >
      <span className="text-6xl">{PLACE_POS[place].icon}</span>
      <span className="text-5xl">🧑‍🚀</span>
      {radio && <RadioTag />}
    </div>
  );
}

function RadioTag() {
  const { t } = useGT();
  return (
    <span className="absolute left-2 top-2 rounded-full bg-background/85 px-3 py-1 text-xs font-black text-secondary">
      {t("ui.radio")}
    </span>
  );
}

// ---------------------------------------------------------------- caixa de diálogo com retrato (estilo jogo)
const FALLBACK: Record<Speaker, string> = { astronauta: "🧑‍🚀", controle: "🛰️", rovi: "🤖" };

/** Texto que aparece letra por letra (toque para mostrar tudo). */
function useTypewriter(text: string, speed = 22) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => setN((x) => (x >= text.length ? x : x + 2)), speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { shown: text.slice(0, n), done: n >= text.length, skip: () => setN(text.length) };
}

export function DialogBox({
  speaker,
  text,
  compact = false,
}: {
  speaker: Speaker;
  text: string;
  compact?: boolean;
}) {
  const { t } = useGT();
  const { shown, done, skip } = useTypewriter(text);
  return (
    <div
      className="flex items-stretch gap-2 rounded-2xl border-4 border-secondary-foreground/40 bg-secondary p-2 text-secondary-foreground shadow-chunky-sand"
      onClick={skip}
    >
      <p
        className={`flex-1 p-1 font-bold leading-snug ${compact ? "text-sm sm:text-base" : "min-h-20 text-lg"}`}
        aria-live="polite"
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {shown}
          {!done && <span className="animate-pulse">▌</span>}
        </span>
      </p>
      <div
        className={`flex shrink-0 flex-col items-center gap-1 ${compact ? "w-14 sm:w-20" : "w-24 sm:w-28"}`}
      >
        <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-xl border-4 border-secondary-foreground/40 bg-card text-3xl sm:text-5xl">
          {ART.portraits.ready ? (
            <img
              src={ART.portraits.src[speaker]}
              alt=""
              className="h-full w-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <span aria-hidden>{FALLBACK[speaker]}</span>
          )}
        </div>
        <span className="w-full truncate rounded-lg bg-card px-1 text-center text-xs font-black text-secondary">
          {t(`ui.falante.${speaker}`)}
        </span>
      </div>
    </div>
  );
}
