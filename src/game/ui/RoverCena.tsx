// Cena do rover (expedição): o rover sai da garagem, contorna a Casa e vai embora pela estrada de
// cima; a tela escurece, ele chega no lugar da expedição, para, abre a porta e o astronauta desce.
// Arte: public/assets/rover (gerada por art-source/rover/*.py). Posições em % do mapa (quadrado).
import { useEffect, useRef, useState } from "react";
import { ART, type Dir8, type Periodo } from "./art";
import { usePlayer } from "./player";
import { useGT } from "./shared";

const DIRS: Dir8[] = ["e", "se", "s", "sw", "w", "nw", "n", "ne"]; // de 45 em 45 graus (0 = direita)
const roverSrc = (d: Dir8, f: number) => `/assets/rover/${d}_${f}.png`;
const portaSrc = (k: number) => `/assets/rover/e_porta_${k}.png`;

/** largura do quadro do rover (% do mapa) e onde fica o chão dentro do quadro (112×112) */
const ROVER_W = 32;
const CHAO_X = 56 / 112;
const CHAO_Y = 74 / 112;
/** a porta (lado direito do rover virado para a direita), em % do quadro a partir do chão */
const PORTA_DY = (77 - 74) / 112;
const ASTRO_W = 9; // igual ao mapa (BaseMap: SPRITE = 0.09)

/** recorte da garagem vazia por cima do mapa (art-source/rover/garagem_vazia.py: RECORTE) */
const GARAGEM = { x: (392 / 1024) * 100, y: (756 / 1024) * 100, w: (252 / 1024) * 100, h: (208 / 1024) * 100 };

/** caminho na base: da plataforma, sobe, contorna a Casa pela esquerda e sai pela estrada de cima */
const ROTA: [number, number][] = [
  [50, 85],
  [50, 61],
  [38, 61],
  [34.6, 57],
  [34.6, 37],
  [38.5, 32.5],
  [47, 31],
  [50, 28],
  [50, 3],
  [50, -14],
];
const VELOCIDADE = 24; // % do mapa por segundo
const GIRO = 420; // graus por segundo (o rover vira aos poucos)

// linha do tempo (ms)
const T_MANOBRA = 700; // vira na garagem antes de sair
const CHEGADA = { de: -24, ate: 44, y: 59.5, dur: 2400 };
/** zoom de cinema no lugar da expedição (centrado onde o rover para) */
const ZOOM_EXP = 1.7;
const T_PORTA = 360;
const T_DESCE = 650;
const T_FICA = 900;
const ESCURECER = 450;

type Quadro = {
  fase: "base" | "escuro" | "expedicao";
  x: number;
  y: number;
  dir: Dir8;
  roda: number;
  porta: number; // -1 fechada, 0..3 abrindo
  astro: null | { x: number; y: number; sy: number; sx: number; o: number };
  preto: number; // 0..1 (esmaecer entre as cenas)
  poeira: { x: number; y: number; t: number }[];
};

/** comprimento acumulado da rota (para andar com velocidade constante) */
function pontoNaRota(dist: number): { x: number; y: number; ang: number; fim: boolean } {
  let resto = dist;
  for (let i = 0; i < ROTA.length - 1; i++) {
    const [ax, ay] = ROTA[i]!;
    const [bx, by] = ROTA[i + 1]!;
    const seg = Math.hypot(bx - ax, by - ay);
    if (resto <= seg) {
      const k = resto / seg;
      return { x: ax + (bx - ax) * k, y: ay + (by - ay) * k, ang: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI, fim: false };
    }
    resto -= seg;
  }
  const [x, y] = ROTA[ROTA.length - 1]!;
  return { x, y, ang: -90, fim: true };
}

const dirDe = (ang: number): Dir8 => DIRS[Math.round((((ang % 360) + 360) % 360) / 45) % 8]!;
const easeOut = (k: number) => 1 - (1 - k) ** 3;

/**
 * Calcula o quadro da cena no tempo t (ms). Tudo determinístico: o mesmo t dá o mesmo quadro,
 * o que deixa pular, testar e tirar foto fácil.
 */
function quadroEm(t: number, tempos: { saida: number }): Quadro {
  const vazio: Quadro = { fase: "base", x: 50, y: 85, dir: "sw", roda: 0, porta: -1, astro: null, preto: 0, poeira: [] };
  // 1) manobra na garagem: sw → w → nw → n
  if (t < T_MANOBRA) {
    const passo = Math.min(3, Math.floor((t / T_MANOBRA) * 4));
    return { ...vazio, dir: (["sw", "w", "nw", "n"] as Dir8[])[passo]!, roda: passo % 4 };
  }
  // 2) andando na base (aceleração no começo)
  const tb = t - T_MANOBRA;
  if (tb < tempos.saida) {
    const acel = 600;
    const dist = tb < acel ? (VELOCIDADE * tb * tb) / (2 * acel * 1000) : (VELOCIDADE * (tb - acel / 2)) / 1000;
    const p = pontoNaRota(dist);
    // o rover vira aos poucos: segue a direção de um pouco atrás na rota
    const atras = pontoNaRota(Math.max(0, dist - (VELOCIDADE * 90) / GIRO / 2));
    const ang = (p.ang + atras.ang) / 2 + (Math.abs(p.ang - atras.ang) > 180 ? 180 : 0);
    const poeira = [1, 2, 3].map((k) => {
      const q = pontoNaRota(Math.max(0, dist - k * 3.2));
      return { x: q.x, y: q.y, t: k };
    });
    const preto = Math.max(0, Math.min(1, (tb - (tempos.saida - ESCURECER)) / ESCURECER));
    return { ...vazio, x: p.x, y: p.y, dir: dirDe(ang), roda: Math.floor(tb / 70) % 4, preto, poeira };
  }
  // 3) tela preta e troca de lugar
  const te = tb - tempos.saida;
  if (te < ESCURECER) return { ...vazio, fase: "escuro", preto: 1, x: CHEGADA.de, y: CHEGADA.y, dir: "e" };
  // 4) chegada no lugar da expedição: entra pela esquerda e freia
  const tc = te - ESCURECER;
  const base: Quadro = { ...vazio, fase: "expedicao", y: CHEGADA.y, dir: "e", preto: Math.max(0, 1 - tc / ESCURECER) };
  if (tc < CHEGADA.dur) {
    const k = easeOut(tc / CHEGADA.dur);
    const x = CHEGADA.de + (CHEGADA.ate - CHEGADA.de) * k;
    const girando = 1 - k; // as rodas giram mais devagar na freada
    const poeira = girando > 0.08 ? [1, 2, 3].map((n) => ({ x: x - 7 - n * 3.5, y: CHEGADA.y + 1, t: n })) : [];
    return { ...base, x, roda: Math.floor((tc / 70) * Math.max(0.3, girando)) % 4, poeira };
  }
  const parado = { ...base, x: CHEGADA.ate };
  // 5) porta abrindo
  const tp = tc - CHEGADA.dur;
  if (tp < T_PORTA) return { ...parado, porta: Math.min(3, Math.floor((tp / T_PORTA) * 4)) };
  // 6) astronauta desce: aparece na porta, dá um pulinho para a frente e aterrissa
  const td = tp - T_PORTA;
  const portaY = CHEGADA.y + PORTA_DY * ROVER_W;
  const chaoY = CHEGADA.y + 13;
  const ax = CHEGADA.ate - 1;
  if (td < T_DESCE) {
    const k = td / T_DESCE;
    const aparecer = Math.min(1, k / 0.2);
    const pulo = Math.max(0, (k - 0.25) / 0.75); // 0..1 do pulo
    const y = portaY + (chaoY - portaY) * pulo - Math.sin(pulo * Math.PI) * 4;
    const esmaga = pulo > 0.9 ? 1 - (pulo - 0.9) * 1.5 : 1;
    return { ...parado, porta: 3, astro: { x: ax, y, sy: esmaga, sx: 2 - esmaga, o: aparecer } };
  }
  const tf = td - T_DESCE;
  const assenta = tf < 160 ? 0.85 + (tf / 160) * 0.15 : 1;
  const poeira = tf < 380 ? [0, 1].map((n) => ({ x: ax + (n ? 2.5 : -2.5), y: chaoY, t: 4 + tf / 95 })) : [];
  return {
    ...parado,
    porta: 3,
    astro: { x: ax, y: chaoY, sy: assenta, sx: 2 - assenta, o: 1 },
    poeira,
  };
}

export function duracaoCena(): { saida: number; total: number } {
  // tempo até sair pela borda de cima (rota inteira na velocidade, mais a aceleração)
  let comp = 0;
  for (let i = 0; i < ROTA.length - 1; i++) {
    const [ax, ay] = ROTA[i]!;
    const [bx, by] = ROTA[i + 1]!;
    comp += Math.hypot(bx - ax, by - ay);
  }
  const saida = (comp / VELOCIDADE) * 1000 + 300;
  const total = T_MANOBRA + saida + ESCURECER + ESCURECER + CHEGADA.dur + T_PORTA + T_DESCE + T_FICA;
  return { saida, total };
}

/** Palco quadrado: desenha um quadro da cena. Usado pela animação e pelo fundo parado. */
function Palco({ q, periodo }: { q: Quadro; periodo: Periodo }) {
  const { gender } = usePlayer();
  const src = q.porta >= 0 ? portaSrc(q.porta) : roverSrc(q.dir, q.roda);
  return (
    <div
      className="relative aspect-square w-full overflow-hidden border-4 border-[#a5461f] bg-black shadow-[0_6px_0_#6e2a10]"
      style={{ imageRendering: "pixelated" }}
    >
      <div
        className="absolute inset-0"
        style={
          q.fase === "expedicao"
            ? { transform: `scale(${ZOOM_EXP})`, transformOrigin: `${CHEGADA.ate}% ${CHEGADA.y + 4}%` }
            : undefined
        }
      >
      {q.fase === "base" ? (
        <>
          <img src={ART.mapPeriodo[periodo]} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
          {/* garagem vazia por cima do rover pintado no mapa */}
          <img
            src={`/assets/rover/garagem_${periodo}.png`}
            alt=""
            className="absolute"
            style={{ left: `${GARAGEM.x}%`, top: `${GARAGEM.y}%`, width: `${GARAGEM.w}%`, height: `${GARAGEM.h}%` }}
            draggable={false}
          />
        </>
      ) : q.fase === "expedicao" ? (
        <img src="/assets/rover/expedicao.webp" alt="" className="absolute inset-0 h-full w-full" draggable={false} />
      ) : null}

      {q.fase !== "escuro" &&
        q.poeira.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#f3c9a0]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${1.4 + p.t * 0.7}%`,
              height: `${1 + p.t * 0.5}%`,
              opacity: Math.max(0, 0.55 - p.t * 0.13),
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        ))}

      {q.fase !== "escuro" && (
        <img
          src={src}
          alt=""
          className="absolute max-w-none"
          style={{
            left: `${q.x - CHAO_X * ROVER_W}%`,
            top: `${q.y - CHAO_Y * ROVER_W}%`,
            width: `${ROVER_W}%`,
            height: `${ROVER_W}%`,
          }}
          draggable={false}
        />
      )}

      {q.astro && (
        <img
          src={ART.astronaut.frame(gender, "s", 1)}
          alt=""
          className="absolute max-w-none"
          style={{
            left: `${q.astro.x - ASTRO_W / 2}%`,
            top: `${q.astro.y - ASTRO_W}%`,
            width: `${ASTRO_W}%`,
            height: `${ASTRO_W}%`,
            opacity: q.astro.o,
            transform: `scale(${q.astro.sx}, ${q.astro.sy})`,
            transformOrigin: "50% 100%",
          }}
          draggable={false}
        />
      )}

      </div>
      {/* esmaecer entre as cenas */}
      <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: q.preto }} aria-hidden />
    </div>
  );
}

/** Lado do palco: o maior quadrado que cabe na tela, com espaço para o botão "Pular". */
const LADO = "min(94vw, calc(100dvh - 7rem))";

/** A cena inteira, em tela cheia. Chama onFim quando acaba (ou quando a criança pula). */
export function RoverCena({ periodo, onFim }: { periodo: Periodo; onFim: () => void }) {
  const { t } = useGT();
  const tempos = useRef(duracaoCena()).current;
  const [agora, setAgora] = useState(0);
  const avisar = useRef(onFim);
  avisar.current = onFim;
  const acabou = useRef(false);
  const fim = useRef(() => {
    if (acabou.current) return; // pular no último instante não abre o alerta duas vezes
    acabou.current = true;
    avisar.current();
  });

  const { gender } = usePlayer();
  const [pronto, setPronto] = useState(false);
  useEffect(() => {
    // carrega todos os quadros antes de começar (senão o rover "pisca" na primeira vez)
    const urls = [
      ...DIRS.flatMap((d) => [0, 1, 2, 3].map((f) => roverSrc(d, f))),
      ...[0, 1, 2, 3].map(portaSrc),
      `/assets/rover/garagem_${periodo}.png`,
      "/assets/rover/expedicao.webp",
      ART.mapPeriodo[periodo],
      ART.astronaut.frame(gender, "s", 1),
    ];
    let vivo = true;
    const espera = urls.map(
      (u) =>
        new Promise<void>((ok) => {
          const im = new Image();
          im.onload = im.onerror = () => ok();
          im.src = u;
        }),
    );
    const limite = new Promise<void>((ok) => setTimeout(ok, 2500));
    Promise.race([Promise.all(espera), limite]).then(() => vivo && setPronto(true));
    return () => {
      vivo = false;
    };
  }, [periodo, gender]);

  useEffect(() => {
    if (!pronto) return;
    // quem pediu menos movimento no sistema vê só o final, parado
    const calmo = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (calmo) {
      setAgora(tempos.total);
      const id = setTimeout(() => fim.current(), 900);
      return () => clearTimeout(id);
    }
    let raf = 0;
    const ini = performance.now();
    const passo = (now: number) => {
      const dt = now - ini;
      setAgora(dt);
      if (dt >= tempos.total) fim.current();
      else raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [tempos, pronto]);

  const q = quadroEm(Math.min(agora, tempos.total), tempos);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ui.rover.cena")}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#120403] p-3"
    >
      <div style={{ width: LADO }}>
        <Palco q={q} periodo={periodo} />
      </div>
      <div className="flex w-full items-center justify-between gap-3" style={{ maxWidth: LADO }}>
        <p className="font-display text-sm font-bold text-[#f6e38c] [text-shadow:2px_2px_0_#1c0703] sm:text-base" aria-live="polite">
          {q.fase === "base" ? t("ui.rover.indo") : q.astro ? t("ui.rover.chegou") : t("ui.rover.viagem")}
        </p>
        <button
          type="button"
          onClick={() => fim.current()}
          className="min-h-12 shrink-0 border-4 border-[#5a1d07] bg-[#2a0508] px-4 font-display font-bold text-[#fbe6c8] shadow-[0_4px_0_#1c0703] [text-shadow:2px_2px_0_#1c0703] hover:bg-[#3b1206] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight"
        >
          {t("ui.pular")}
        </button>
      </div>
    </div>
  );
}

/** Fundo parado do lugar da expedição (rover estacionado e astronauta ao lado), atrás do cartão. */
export function ExpedicaoFundo() {
  const { total } = duracaoCena();
  const q = quadroEm(total, duracaoCena());
  return (
    <div className="flex h-full w-full items-start justify-center sm:items-center">
      <div style={{ width: "min(100%, calc(100dvh - 12rem))" }}>
        <Palco q={{ ...q, preto: 0 }} periodo="dia" />
      </div>
    </div>
  );
}
