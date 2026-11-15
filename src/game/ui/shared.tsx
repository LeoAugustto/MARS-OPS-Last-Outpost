// Peças compartilhadas das telas do jogo: tradução, voz, chips de efeito, modal.
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/i18n";
import { t as translate, LOCALES } from "@/content/i18n";
import type { Effect, Lang, PlaceId } from "@/game/engine";
import type { CSSProperties } from "react";
import { ART, type Gender, type Speaker } from "./art";
import { usePlayer } from "./player";
import { PixelIcon } from "./PixelIcon";

/**
 * Singular/plural: quando {n} é 1 e existe a chave "<chave>.um", usa ela
 * ("1 alerta" em vez de "1 alertas"). Se não existir, fica a chave normal.
 */
export function chavePlural(key: string, lang: Lang, vars?: Record<string, string | number>): string {
  if (vars?.["n"] !== 1) return key;
  const um = `${key}.um`;
  return LOCALES[lang]?.[um] !== undefined ? um : key;
}

/** Tradutor dos textos do jogo no idioma escolhido no site. Já preenche {nome} com o nome da criança. */
export function useGT() {
  const { lang } = useLang();
  const { name } = usePlayer();
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const nome = name || translate("ui.perfil.padrao", lang);
      const v: Record<string, string | number> = { nome, ...vars };
      // datas dos eventos reais (AAAA-MM-DD) aparecem no formato do idioma
      if (typeof v["data"] === "string") v["data"] = formatarData(v["data"], lang);
      // Saves mais antigos guardavam a força como uma sequência de estrelas.
      if (typeof v["estrelas"] === "string") {
        v["estrelas"] = v["estrelas"].replace(/⭐+/g, (stars) => `${stars.length}/3`);
      }
      return translate(chavePlural(key, lang, v), lang, v);
    },
    [lang, name],
  );
  return { t, lang };
}

const LOCALE: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
};

/** "2024-05-10" → "10 de mai. de 2024" (pt), "May 10, 2024" (en), "10 may 2024" (es)… */
export function formatarData(iso: string, lang: Lang): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  try {
    return new Intl.DateTimeFormat(LOCALE[lang], {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  } catch {
    return iso;
  }
}

// ---------------------------------------------------------------- tema pixel art (só dentro do jogo)
/** Cores no estilo da arte: painéis creme, borda laranja-ferrugem, detalhes verde-azulados. */
export const PIXEL_THEME = {
  "--radius": "0.15rem",
  "--background": "#2a1611",
  "--foreground": "#fbe6c8",
  "--card": "#f7dfbd",
  "--card-foreground": "#4a2615",
  "--popover": "#f7dfbd",
  "--popover-foreground": "#4a2615",
  "--muted": "#efcda2",
  "--muted-foreground": "#7b4a2c",
  "--accent": "#fbecd6",
  "--accent-foreground": "#4a2615",
  "--primary": "#e2672b",
  "--primary-foreground": "#fff6ea",
  "--primary-deep": "#9a3a14",
  "--secondary": "#b8471b",
  "--secondary-foreground": "#fff3e2",
  "--secondary-deep": "#6e2a10",
  "--border": "#a5461f",
  "--input": "#a5461f",
  "--ring": "#2c9c8f",
  "--success": "#22806f",
  "--destructive": "#c2312b",
  fontFamily: 'var(--font-sans, "VT323", monospace)',
  fontVariantLigatures: "none",
  fontFeatureSettings: '"liga" 0, "clig" 0',
} as CSSProperties;

export const PIXEL_FONT_URL =
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap";

/** Ícone do lugar em pixel art. */
export function PlaceIcon({ place, size = 48 }: { place: PlaceId; size?: number }) {
  return (
    <img
      src={ART.icons[place]}
      alt=""
      width={size}
      height={size}
      className="shrink-0"
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
}

/** Astronauta parado (pixel art) virado para baixo. */
export function AstronautSprite({ gender, size = 64 }: { gender: Gender; size?: number }) {
  return (
    <img
      src={ART.astronaut.frame(gender, "s", 1)}
      alt=""
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
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

/**
 * Leitura em voz alta DESLIGADA por enquanto (decisão do time, 14/11). Para religar no futuro:
 * VOZ_ATIVA = true e recolocar <SpeakButton /> nas telas (ver docs/PENDENCIAS-PIXEL.md).
 */
export const VOZ_ATIVA = false;

export function SpeakButton({ text }: { text: string }) {
  const { t, lang } = useGT();
  if (!VOZ_ATIVA) return null;
  return (
    <button
      type="button"
      onClick={() => speak(text, lang)}
      className="min-h-10 rounded-full bg-muted px-3 text-sm font-bold text-secondary hover:brightness-110"
    >
      <PixelIcon name="som" size={20} /> {t("ui.ouvir")}
    </button>
  );
}

// ---------------------------------------------------------------- efeitos como "chips" (−3 ⚡, +2 🔬)
const ICON: Record<keyof Effect, string> = {
  energia: "raio",
  ar: "o2",
  comida: "batata",
  saude: "coracao",
  ciencia: "microscopio",
  escudo: "escudo",
  bateria: "bateria",
  solar: "sol",
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
  const { t } = useGT();
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
            className={`inline-flex items-center gap-1 border border-current px-2 py-0.5 text-sm font-extrabold ${
              good ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
            }`}
          >
            {v > 0 ? "+" : "−"}
            {Math.abs(v)}
            {k === "solar" ? "%" : ""}
            <PixelIcon name={ICON[k]} size={18} />
            <span className="sr-only">{t(k === "solar" ? "lugar.paineis" : `recurso.${k}`)}</span>
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
        className={`max-h-[92dvh] w-full overflow-y-auto border-[6px] border-border bg-card p-4 text-card-foreground shadow-[0_6px_0_#6e2a10,inset_0_0_0_2px_#f3bd83] sm:p-6 ${
          wide ? "max-w-2xl 2xl:max-w-4xl" : "max-w-lg 2xl:max-w-2xl"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- mapa: posição de cada lugar (% do quadrado)
// Ajustado ao mapa pixel art (public/assets/map/base.png). Se a arte mudar, ajuste aqui.
export const PLACE_POS: Record<PlaceId, { x: number; y: number }> = {
  habitat: { x: 50, y: 46 },
  paineis: { x: 21, y: 16 },
  antena: { x: 77, y: 16 },
  ar: { x: 16, y: 45 },
  estufa: { x: 84, y: 45 },
  lab: { x: 18, y: 77 },
  abrigo: { x: 83, y: 75 },
  rover: { x: 49, y: 83 },
};

/** Faixa de cena da carta. O interior jogável usa a imagem quadrada completa. */
export function PlaceScene({ place, radio = false }: { place: PlaceId; radio?: boolean }) {
  const { t } = useGT();
  return (
    <div className="relative -mx-4 -mt-4 mb-1 overflow-hidden border-b-4 border-border sm:-mx-6 sm:-mt-6">
      <img
        src={ART.placeScene(place)}
        alt={t(`lugar.${place}`)}
        className="aspect-[16/6] w-full object-cover object-[center_24%]"
        style={{ imageRendering: "pixelated" }}
      />
      {radio && <RadioTag />}
    </div>
  );
}

function RadioTag() {
  const { t } = useGT();
  return (
    <span className="absolute left-2 top-2 inline-flex items-center gap-1 border-2 border-border bg-card px-2 py-0.5 text-xs font-black text-secondary">
      <PixelIcon name="radio" size={18} /> {t("ui.radio")}
    </span>
  );
}

// ---------------------------------------------------------------- caixa de diálogo com retrato (estilo jogo)

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
  const { gender, name } = usePlayer();
  const { shown, done, skip } = useTypewriter(text);
  const retrato =
    speaker === "astronauta"
      ? ART.portraits.astronauta.src(gender)
      : ART.portraits[speaker].src;
  const quem = speaker === "astronauta" && name ? name : t(`ui.falante.${speaker}`);
  const rebites = [
    "left-0.5 top-0.5",
    "right-0.5 top-0.5",
    "left-0.5 bottom-0.5",
    "right-0.5 bottom-0.5",
  ];
  return (
    <div
      className="relative flex items-stretch gap-2 border-4 border-[#a5461f] bg-[#fbe2c2] p-2 text-[#4a2615] shadow-[0_4px_0_#6e2a10]"
      onClick={skip}
    >
      {rebites.map((c) => (
        <span key={c} className={`absolute ${c} h-1.5 w-1.5 bg-[#e2672b]`} aria-hidden />
      ))}
      <p
        className={`flex-1 p-1 font-semibold leading-snug ${compact ? "text-base sm:text-lg 2xl:text-xl" : "min-h-20 text-lg 2xl:text-2xl"}`}
        aria-live="polite"
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {shown}
          {!done && <span className="animate-pulse">▌</span>}
        </span>
      </p>
      <div
        className={`flex shrink-0 flex-col items-center gap-1 ${compact ? "w-16 sm:w-20 2xl:w-24" : "w-24 sm:w-28 2xl:w-32"}`}
      >
        <div className="grid aspect-square w-full place-items-center overflow-hidden border-4 border-[#a5461f] bg-[#d9b089] text-3xl sm:text-5xl">
          <img
            src={retrato}
            alt=""
            className="h-full w-full object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <span className="w-full border-2 border-[#a5461f] bg-[#fff1dc] px-0.5 text-center text-xs font-bold leading-tight sm:text-sm">
          {quem}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- tela cheia
/** Botão de tela cheia. Some onde o navegador não deixa (ex.: Safari do iPhone). */
export function FullscreenButton({ className = "" }: { className?: string }) {
  const { t } = useGT();
  const [pode, setPode] = useState(false);
  const [cheia, setCheia] = useState(false);
  useEffect(() => {
    setPode(!!document.fullscreenEnabled);
    const mudou = () => setCheia(!!document.fullscreenElement);
    mudou();
    document.addEventListener("fullscreenchange", mudou);
    return () => document.removeEventListener("fullscreenchange", mudou);
  }, []);
  if (!pode) return null;
  const label = t(cheia ? "ui.telacheia.sair" : "ui.telacheia");
  const alternar = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen().catch(() => {});
  };
  // cantos em pixel: para fora = entrar, para dentro = sair
  const d = cheia
    ? "M6 1h2v7H1V6h5zM16 1h2v5h5v2h-7zM1 16h7v7H6v-5H1zM16 16h7v2h-5v5h-2z"
    : "M1 1h7v2H3v5H1zM16 1h7v7h-2V3h-5zM1 16h2v5h5v2H1zM21 16h2v7h-7v-2h5z";
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={label}
      title={label}
      className={`grid h-12 w-12 shrink-0 place-items-center border-4 border-[#a5461f] bg-[#fbe2c2] text-[#4a2615] shadow-[0_3px_0_#6e2a10] hover:brightness-105 active:translate-y-0.5 focus-visible:outline-4 focus-visible:outline-[#ffd23f] ${className}`}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden shapeRendering="crispEdges">
        <path d={d} fill="currentColor" />
      </svg>
    </button>
  );
}
