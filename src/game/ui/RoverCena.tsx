// Cenas do rover (expedição), iguais para TODOS os alertas do rover:
//  IDA:   o rover sai da garagem, contorna a Casa e sai pela estrada de cima → viagem pelo chão de
//         Marte (crateras e pedras passando) → chega na estação de pesquisa, estaciona e o
//         astronauta desce. Aí abre o alerta para a criança escolher.
//  VOLTA: (depois da escolha) o astronauta entra na estação, o tempo passa (luz muda, relógio corre),
//         ele sai, entra no rover, viagem de volta → o rover desce a estrada de cima e estaciona.
// Arte: public/assets/rover (gerada por art-source/rover/*.py). Posições em % do palco (quadrado).
import { useEffect, useRef, useState } from "react";
import { ART, type Dir8, type Periodo } from "./art";
import { horaDoSol } from "./Hud";
import { PixelIcon } from "./PixelIcon";
import { usePlayer } from "./player";
import { tocarAmbiente, tocarEfeito } from "./audio";
import { useGT } from "./shared";

const DIRS: Dir8[] = ["e", "se", "s", "sw", "w", "nw", "n", "ne"]; // de 45 em 45 graus (0 = direita)
const roverSrc = (d: Dir8, f: number) => `/assets/rover/${d}_${f}.png?v=2`;
const portaSrc = (k: number) => `/assets/rover/e_porta_${k}.png?v=2`;
const dirDe = (ang: number): Dir8 => DIRS[Math.round((((ang % 360) + 360) % 360) / 45) % 8]!;
const easeOut = (k: number) => 1 - (1 - k) ** 3;
const easeIn = (k: number) => k * k;
const clamp01 = (k: number) => Math.max(0, Math.min(1, k));
const PASSOS = [0, 1, 2, 1]; // quadros da caminhada do astronauta

/** largura do quadro do rover (% do palco) e onde fica o chão dentro do quadro (112×112) */
const ROVER_W = 32;
const CHAO_X = 56 / 112;
const CHAO_Y = 74 / 112;
const PORTA_DY = (77 - 74) / 112; // porta lateral (rover virado para a direita), abaixo do chão do quadro
const ASTRO_W = 9; // igual ao mapa (BaseMap: SPRITE = 0.09)

/** recorte da garagem vazia por cima do mapa (art-source/rover/garagem_vazia.py: RECORTE) */
const GARAGEM = { x: (392 / 1024) * 100, y: (756 / 1024) * 100, w: (252 / 1024) * 100, h: (208 / 1024) * 100 };

/** rota na base: da plataforma, sobe, contorna a Casa pela esquerda e sai pela estrada de cima */
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
const ROTA_VOLTA = [...ROTA].reverse() as [number, number][];
const VEL = 24; // % do palco por segundo
const ESC = 420; // esmaecer (ms)

/** estação (art-source/rover/estacao.py): onde o rover para e onde fica a porta */
const EST = { roverX: 51, roverY: 62, portaX: 51, portaY: 50.5 };
/** luzes da estação [x, y, largura, altura, força] em % (estacao.py imprime as posições) */
const LUZES: [number, number, number, number, number][] = [
  [44.6, 41.8, 17.4, 4.0, 0.9], // janela do laboratório (acende com a própria arte, ver JanelaAcesa)
  [51, 44.9, 3, 0.9, 0.95], // luz em cima da porta
  [18.6, 51.1, 1.2, 0.6, 0.95], // postes
  [33, 51.1, 1.2, 0.6, 0.95],
  [65.2, 51.1, 1.2, 0.6, 0.95],
  [84.4, 51.1, 1.2, 0.6, 0.95],
];
const DESCE_Y = EST.roverY + 11; // onde o astronauta aterrissa (na frente do rover)
/** caminho a pé do rover até a porta, contornando o rover pela esquerda (pela calçada da estação) */
const A_PE: [number, number][] = [
  [EST.roverX - 1, DESCE_Y],
  [37, DESCE_Y],
  [37, 53],
  [EST.portaX, 53],
  [EST.portaX, EST.portaY],
];
const VEL_PE = 17;
const ZOOM = 1.6; // câmera de cinema na viagem e na estação

export type Legenda = "indo" | "viagem" | "chegou" | "trabalhando" | "voltando" | "estrada" | "chegando";
type Cena = "base" | "viagem" | "estacao" | "preto";
type Astro = { x: number; y: number; sx: number; sy: number; o: number; dir: Dir8; passo: number };
type Quadro = {
  cena: Cena;
  x: number;
  y: number;
  dir: Dir8;
  roda: number;
  porta: number; // -1 fechada, 0..3 abrindo
  rover: boolean; // o rover aparece? (no fim da volta some: fica o rover pintado do mapa)
  garagem: boolean; // cobre o rover pintado do mapa
  rolagem: number; // chão da viagem (% do palco já percorrido)
  astro: Astro | null;
  poeira: { x: number; y: number; t: number }[];
  preto: number; // 0..1
  luz: number; // 0..1 o tempo passando na estação (luz mais quente/escura, janelas acesas)
  relogio: number; // 0..1 do relógio da cena (0 = hora da chegada, 1 = hora da volta)
  legenda: Legenda;
};
const Q0: Quadro = {
  cena: "base",
  x: 50,
  y: 85,
  dir: "sw",
  roda: 0,
  porta: -1,
  rover: true,
  garagem: true,
  rolagem: 0,
  astro: null,
  poeira: [],
  preto: 0,
  luz: 0,
  relogio: 0,
  legenda: "indo",
};

// ---------------------------------------------------------------- caminhos
function comprimento(pts: [number, number][]) {
  let c = 0;
  for (let i = 0; i < pts.length - 1; i++) c += Math.hypot(pts[i + 1]![0] - pts[i]![0], pts[i + 1]![1] - pts[i]![1]);
  return c;
}
function noCaminho(pts: [number, number][], dist: number) {
  let resto = Math.max(0, dist);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i]!;
    const [bx, by] = pts[i + 1]!;
    const seg = Math.hypot(bx - ax, by - ay);
    if (resto <= seg) {
      const k = seg ? resto / seg : 0;
      return { x: ax + (bx - ax) * k, y: ay + (by - ay) * k, ang: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI };
    }
    resto -= seg;
  }
  const [x, y] = pts[pts.length - 1]!;
  const [px, py] = pts[pts.length - 2]!;
  return { x, y, ang: (Math.atan2(y - py, x - px) * 180) / Math.PI };
}
/** o rover vira aos poucos: média da direção de agora com a de um pouco atrás */
function anguloSuave(pts: [number, number][], dist: number) {
  const a = noCaminho(pts, dist).ang;
  const b = noCaminho(pts, dist - 4).ang;
  let d = a - b;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return b + d / 2;
}

// ---------------------------------------------------------------- pedaços da cena
type Pedaco = { dur: number; q: (t: number) => Quadro };

function pedacosSaidaBase(): Pedaco[] {
  const comp = comprimento(ROTA);
  const dur = (comp / VEL) * 1000 + 300;
  return [
    {
      dur: 700,
      q: (t) => ({ ...Q0, dir: (["sw", "w", "nw", "n"] as Dir8[])[Math.min(3, Math.floor((t / 700) * 4))]!, roda: Math.floor(t / 175) % 4 }),
    },
    {
      dur,
      q: (t) => {
        const acel = 600;
        const dist = t < acel ? (VEL * t * t) / (2 * acel * 1000) : (VEL * (t - acel / 2)) / 1000;
        const p = noCaminho(ROTA, dist);
        return {
          ...Q0,
          x: p.x,
          y: p.y,
          dir: dirDe(anguloSuave(ROTA, dist)),
          roda: Math.floor(t / 70) % 4,
          poeira: [1, 2, 3].map((k) => ({ ...noCaminho(ROTA, dist - k * 3.2), t: k })),
          preto: clamp01((t - (dur - ESC)) / ESC),
        };
      },
    },
  ];
}

function pedacoViagem(dur: number, legenda: Legenda, relogio: number): Pedaco {
  return {
    dur,
    q: (t) => {
      const x = 42;
      const y = 55;
      // o rover fica no meio e o chão passa (rolagem); balança 1 px nas pedrinhas
      return {
        ...Q0,
        cena: "viagem",
        garagem: false,
        x,
        y: y + (Math.floor(t / 140) % 2 ? 0.25 : 0),
        dir: "e",
        roda: Math.floor(t / 60) % 4,
        rolagem: (t / 1000) * 34,
        legenda,
        relogio,
        poeira: [1, 2, 3].map((k) => ({ x: x - 7 - k * 3.2 + ((t / 90) % 1.5), y: y + 1, t: k })),
        preto: Math.max(1 - t / ESC, clamp01((t - (dur - ESC)) / ESC)),
      };
    },
  };
}

const preto = (dur: number, legenda: Legenda, relogio = 0): Pedaco => ({
  dur,
  q: () => ({ ...Q0, cena: "preto", preto: 1, legenda, relogio }),
});

const estParado: Quadro = {
  ...Q0,
  cena: "estacao",
  garagem: false,
  x: EST.roverX,
  y: EST.roverY,
  dir: "e",
  porta: 3,
  legenda: "chegou",
};

/** chegada na estação: entra pela esquerda, freia, abre a porta e o astronauta desce */
function pedacosChegadaEstacao(): Pedaco[] {
  const est: Quadro = { ...estParado, porta: -1, legenda: "viagem" };
  const de = -22;
  const ax = EST.roverX - 1;
  const portaY = EST.roverY + PORTA_DY * ROVER_W;
  return [
    {
      dur: 2600,
      q: (t) => {
        const k = easeOut(t / 2600);
        const x = de + (EST.roverX - de) * k;
        const gira = 1 - k;
        return {
          ...est,
          x,
          roda: Math.floor((t / 70) * Math.max(0.3, gira)) % 4,
          preto: Math.max(0, 1 - t / ESC),
          poeira: gira > 0.08 ? [1, 2, 3].map((n) => ({ x: x - 7 - n * 3.5, y: EST.roverY + 1, t: n })) : [],
        };
      },
    },
    { dur: 360, q: (t) => ({ ...est, x: EST.roverX, porta: Math.min(3, Math.floor((t / 360) * 4)), legenda: "chegou" }) },
    {
      dur: 650,
      q: (t) => {
        const k = t / 650;
        const pulo = clamp01((k - 0.25) / 0.75);
        const y = portaY + (DESCE_Y - portaY) * pulo - Math.sin(pulo * Math.PI) * 4;
        const esm = pulo > 0.9 ? 1 - (pulo - 0.9) * 1.5 : 1;
        return { ...estParado, astro: { x: ax, y, sx: 2 - esm, sy: esm, o: clamp01(k / 0.2), dir: "s", passo: 1 } };
      },
    },
    {
      dur: 700,
      q: (t) => {
        const s = t < 160 ? 0.85 + (t / 160) * 0.15 : 1;
        return {
          ...estParado,
          astro: { x: ax, y: DESCE_Y, sx: 2 - s, sy: s, o: 1, dir: "s", passo: 1 },
          poeira: t < 380 ? [0, 1].map((n) => ({ x: ax + (n ? 2.5 : -2.5), y: DESCE_Y, t: 4 + t / 95 })) : [],
        };
      },
    },
  ];
}

/** astronauta andando por um caminho a pé */
function andando(pts: [number, number][], base: Quadro): Pedaco {
  return {
    dur: (comprimento(pts) / VEL_PE) * 1000,
    q: (t) => {
      const p = noCaminho(pts, (VEL_PE * t) / 1000);
      return { ...base, astro: { x: p.x, y: p.y, sx: 1, sy: 1, o: 1, dir: dirDe(p.ang), passo: PASSOS[Math.floor(t / 130) % 4]! } };
    },
  };
}

/** volta: entra na estação, o tempo passa, sai, entra no rover e vai embora */
function pedacosVoltaEstacao(): Pedaco[] {
  const ax = EST.roverX - 1;
  const portaY = EST.roverY + PORTA_DY * ROVER_W;
  const trab: Quadro = { ...estParado, legenda: "trabalhando" };
  const pronto: Quadro = { ...estParado, legenda: "voltando", relogio: 1 };
  return [
    andando(A_PE, trab),
    {
      dur: 450,
      q: (t) => ({
        ...trab,
        astro: { x: EST.portaX, y: EST.portaY, sx: 1 - t / 2500, sy: 1 - t / 2500, o: 1 - t / 450, dir: "n", passo: 1 },
      }),
    },
    // o tempo passa: luz muda, janelas acendem, relógio corre
    { dur: 3000, q: (t) => ({ ...trab, luz: Math.sin(clamp01(t / 3000) * Math.PI), relogio: easeIn(clamp01(t / 3000)) }) },
    { dur: 400, q: (t) => ({ ...pronto, astro: { x: EST.portaX, y: EST.portaY, sx: 1, sy: 1, o: t / 400, dir: "s", passo: 1 } }) },
    andando([...A_PE].reverse() as [number, number][], pronto),
    {
      // pulinho de volta para dentro do rover
      dur: 550,
      q: (t) => {
        const k = clamp01(t / 550);
        const y = DESCE_Y + (portaY - DESCE_Y) * k - Math.sin(k * Math.PI) * 4;
        return { ...pronto, astro: { x: ax, y, sx: 1, sy: 1, o: 1 - clamp01((k - 0.7) / 0.3), dir: "n", passo: 1 } };
      },
    },
    { dur: 360, q: (t) => ({ ...pronto, porta: 3 - Math.min(3, Math.floor((t / 360) * 4)) }) },
    {
      dur: 1700,
      q: (t) => {
        const k = easeIn(t / 1700);
        const x = EST.roverX + (130 - EST.roverX) * k;
        return {
          ...pronto,
          porta: -1,
          x,
          roda: Math.floor(t / 70) % 4,
          poeira: k > 0.02 ? [1, 2, 3].map((n) => ({ x: x - 7 - n * 3.5, y: EST.roverY + 1, t: n })) : [],
          preto: clamp01((t - (1700 - ESC)) / ESC),
        };
      },
    },
  ];
}

/** chegada na base: desce a estrada de cima, contorna a Casa e estaciona na garagem */
function pedacosChegadaBase(): Pedaco[] {
  const comp = comprimento(ROTA_VOLTA);
  const dur = (comp / VEL) * 1000;
  const base: Quadro = { ...Q0, relogio: 1, legenda: "chegando" };
  return [
    {
      dur,
      q: (t) => {
        const freia = 700;
        const resto = Math.max(0, dur - t);
        const dist = resto < freia ? comp - (VEL * resto * resto) / (2 * freia * 1000) : (VEL * t) / 1000;
        const p = noCaminho(ROTA_VOLTA, dist);
        return {
          ...base,
          x: p.x,
          y: p.y,
          dir: dirDe(anguloSuave(ROTA_VOLTA, dist)),
          roda: Math.floor(t / 70) % 4,
          preto: Math.max(0, 1 - t / ESC),
          poeira: [1, 2, 3].map((k) => ({ ...noCaminho(ROTA_VOLTA, dist - k * 3.2), t: k })),
        };
      },
    },
    {
      // manobra para ficar como o rover pintado no mapa
      dur: 700,
      q: (t) => ({ ...base, dir: (["s", "sw", "sw", "sw"] as Dir8[])[Math.min(3, Math.floor((t / 700) * 4))]!, roda: Math.floor(t / 175) % 4 }),
    },
    // estacionou: volta o rover pintado do mapa
    { dur: 500, q: () => ({ ...base, rover: false, garagem: false }) },
  ];
}

export type ModoCena = "ida" | "volta";
function roteiro(modo: ModoCena): Pedaco[] {
  if (modo === "ida")
    return [...pedacosSaidaBase(), preto(250, "viagem"), pedacoViagem(3400, "viagem", 0), preto(250, "viagem"), ...pedacosChegadaEstacao()];
  return [...pedacosVoltaEstacao(), preto(250, "estrada", 1), pedacoViagem(3000, "estrada", 1), preto(250, "estrada", 1), ...pedacosChegadaBase()];
}
const total = (r: Pedaco[]) => r.reduce((s, p) => s + p.dur, 0);
function quadroEm(r: Pedaco[], t: number): Quadro {
  let resto = t;
  for (const p of r) {
    if (resto < p.dur) return p.q(resto);
    resto -= p.dur;
  }
  const ult = r[r.length - 1]!;
  return ult.q(ult.dur);
}

// ---------------------------------------------------------------- desenho
/** os desenhos do rover, do astronauta, da viagem e da estação são de dia: escurecem com o horário */
const FILTRO: Record<Periodo, string | undefined> = {
  dia: undefined,
  entardecer: "sepia(0.25) saturate(1.15) brightness(0.9)",
  noite: "brightness(0.6) saturate(0.75) hue-rotate(-12deg)",
};
const VEU: Record<Periodo, string | undefined> = {
  dia: undefined,
  entardecer: "rgba(255, 110, 45, 0.32)",
  noite: "rgba(40, 18, 70, 0.55)",
};

/**
 * `periodo`: horário do começo da cena. `periodoFim` (só na volta): horário depois do tempo
 * passado na estação. Enquanto o relógio da cena corre (q.relogio 0→1), a cor vai de um ao outro;
 * depois disso (viagem de volta e chegada na base) já vale o horário final.
 */
function Palco({ q, periodo, periodoFim }: { q: Quadro; periodo: Periodo; periodoFim?: Periodo | undefined }) {
  const { gender } = usePlayer();
  const fim = periodoFim ?? periodo;
  const mistura = periodoFim && periodoFim !== periodo ? clamp01(q.relogio) : 0; // 0 = começo, 1 = fim
  const agora = mistura >= 0.5 ? fim : periodo;
  const aceso = Math.max(q.luz, agora === "noite" ? 0.85 : 0);
  const roverImg = q.rover && q.cena !== "preto" && (
    <img
      key="rover"
      src={q.porta >= 0 ? portaSrc(q.porta) : roverSrc(q.dir, q.roda)}
      alt=""
      className="absolute max-w-none"
      style={{
        left: `${q.x - CHAO_X * ROVER_W}%`,
        top: `${q.y - CHAO_Y * ROVER_W}%`,
        width: `${ROVER_W}%`,
        height: `${ROVER_W}%`,
        filter: q.cena === "base" ? FILTRO[agora] : undefined,
      }}
      draggable={false}
    />
  );
  const astroImg = q.astro && q.cena !== "preto" && (
    <img
      key="astro"
      src={ART.astronaut.frame(gender, q.astro.dir, q.astro.passo)}
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
        filter: q.cena === "base" ? FILTRO[agora] : undefined,
      }}
      draggable={false}
    />
  );
  // quem está mais "embaixo" na tela fica na frente
  const astroAtras = !!q.astro && q.astro.y < q.y - 1;
  const zoom =
    q.cena === "viagem"
      ? { transform: `scale(${ZOOM})`, transformOrigin: `${q.x}% ${q.y}%` }
      : q.cena === "estacao"
        ? { transform: `scale(${ZOOM * 0.85})`, transformOrigin: `${EST.roverX}% ${EST.roverY - 4}%` }
        : undefined;
  return (
    <div
      className="relative aspect-square w-full overflow-hidden border-4 border-[#a5461f] bg-black shadow-[0_6px_0_#6e2a10]"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="absolute inset-0" style={zoom}>
        {q.cena === "base" && (
          <>
            <img src={ART.mapPeriodo[agora]} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
            {q.garagem && (
              <img
                src={`/assets/rover/garagem_${agora}.png?v=2`}
                alt=""
                className="absolute"
                style={{ left: `${GARAGEM.x}%`, top: `${GARAGEM.y}%`, width: `${GARAGEM.w}%`, height: `${GARAGEM.h}%` }}
                draggable={false}
              />
            )}
          </>
        )}
        {q.cena === "viagem" && (
          // duas cópias do chão lado a lado, andando para a esquerda (o chão se repete sem emenda)
          <div className="absolute inset-y-0 left-0 flex w-[200%]" style={{ transform: `translateX(-${(q.rolagem % 100) / 2}%)` }}>
            <img src="/assets/rover/viagem_chao.webp?v=2" alt="" className="h-full w-1/2" draggable={false} />
            <img src="/assets/rover/viagem_chao.webp?v=2" alt="" className="h-full w-1/2" draggable={false} />
          </div>
        )}
        {q.cena === "estacao" && (
          <>
            <img src="/assets/rover/estacao.webp?v=2" alt="" className="absolute inset-0 h-full w-full" draggable={false} />
          </>
        )}
        {q.cena !== "preto" &&
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
        {astroAtras ? [astroImg, roverImg] : [roverImg, astroImg]}
      </div>
      {/* fora da base (viagem e estação), a cor do horário vem por cima de tudo */}
      {q.cena !== "base" &&
        ([
          [periodo, 1 - mistura],
          [fim, mistura],
        ] as [Periodo, number][]).map(([p, o], i) =>
          VEU[p] && o > 0 ? (
            <div
              key={i}
              className="pointer-events-none absolute inset-0"
              style={{ background: VEU[p], mixBlendMode: "multiply", opacity: o }}
              aria-hidden
            />
          ) : null,
        )}
      {/* o tempo passando: o céu de Marte esquenta e escurece um pouco */}
      {q.luz > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(60,20,70,0.55), rgba(255,140,60,0.25))", opacity: q.luz * 0.8 }}
          aria-hidden
        />
      )}
      {/* luzes da estação por cima do véu do horário (com o mesmo zoom do palco) */}
      <div className="pointer-events-none absolute inset-0" style={zoom}>
        {/* janela do laboratório, luz da porta e postes: acendem enquanto o astronauta trabalha
            lá dentro e ficam acesos à noite */}
        {q.cena === "estacao" && aceso > 0 &&
          LUZES.map(([x, y, w, h, forca], i) =>
            i === 0 ? (
              // janela: a arte da própria janela por cima do véu da noite, mais clara e quente.
              // Antes era um retângulo amarelo chapado que cobria os frascos (issue #10).
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${x - w / 2}%`,
                  top: `${y - h / 2}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                  backgroundImage: "url(/assets/rover/estacao.webp?v=2)",
                  backgroundSize: `${10000 / w}% ${10000 / h}%`,
                  backgroundPosition: `${((x - w / 2) / (100 - w)) * 100}% ${((y - h / 2) / (100 - h)) * 100}%`,
                  filter: "brightness(1.15) sepia(0.25)",
                  opacity: aceso * forca,
                }}
                aria-hidden
              />
            ) : (
            <span
              key={i}
              className="absolute bg-[#ffe27a]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${w}%`,
                height: `${h}%`,
                transform: "translate(-50%, -50%)",
                opacity: aceso * forca,
                boxShadow: `0 0 ${10 * aceso}px ${4 * aceso}px rgba(255, 210, 90, ${0.5 * aceso})`,
              }}
              aria-hidden
            />
            ),
          )}
    </div>
      <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: q.preto }} aria-hidden />
    </div>
  );
}

/** Lado do palco: o maior quadrado que cabe na tela, com espaço para a legenda e o "Pular". */
const LADO = "min(94vw, calc(100dvh - 7rem))";

/**
 * A cena em tela cheia. `modo`: "ida" (até o astronauta descer na estação) ou "volta" (da estação
 * até estacionar na base). `relogio`: horas do relógio da volta (de → até, 0..1 do sol).
 */
export function RoverCena({
  modo,
  periodo,
  periodoFim,
  relogio,
  onFim,
}: {
  modo: ModoCena;
  periodo: Periodo;
  /** só na volta: o horário depois do tempo passado na estação (a chegada na base já usa ele) */
  periodoFim?: Periodo | undefined;
  relogio?: { de: number; ate: number };
  onFim: () => void;
}) {
  const { t } = useGT();
  const { gender } = usePlayer();
  const r = useRef(roteiro(modo)).current;
  const dur = useRef(total(r)).current;
  const [agora, setAgora] = useState(0);
  const [pronto, setPronto] = useState(false);
  const avisar = useRef(onFim);
  avisar.current = onFim;
  const acabou = useRef(false);
  const fim = useRef(() => {
    if (acabou.current) return; // pular no último instante não termina duas vezes
    acabou.current = true;
    avisar.current();
  });

  useEffect(() => {
    // carrega todos os quadros antes de começar (senão o rover "pisca" na primeira vez)
    const urls = [
      ...DIRS.flatMap((d) => [0, 1, 2, 3].map((f) => roverSrc(d, f))),
      ...[0, 1, 2, 3].map(portaSrc),
      ...DIRS.flatMap((d) => [0, 1, 2].map((f) => ART.astronaut.frame(gender, d, f))),
      ...[periodo, periodoFim ?? periodo].flatMap((p) => [`/assets/rover/garagem_${p}.png?v=2`, ART.mapPeriodo[p]]),
      "/assets/rover/viagem_chao.webp?v=2",
      "/assets/rover/estacao.webp?v=2",
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
    Promise.race([Promise.all(espera), new Promise<void>((ok) => setTimeout(ok, 2500))]).then(() => vivo && setPronto(true));
    return () => {
      vivo = false;
    };
  }, [periodo, periodoFim, gender]);

  useEffect(() => {
    if (!pronto) return;
    // toca sempre, mesmo com "menos movimento" no sistema (no Windows esse ajuste vem desligado
    // em muitos PCs e a cena sumia); quem não quiser ver usa o botão Pular
    let raf = 0;
    const ini = performance.now();
    const passo = (now: number) => {
      // O timestamp do primeiro quadro pode anteceder a montagem da animação.
      const dt = Math.max(0, now - ini);
      setAgora(dt);
      if (dt >= dur) fim.current();
      else raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [pronto, dur]);

  const q = quadroEm(r, Math.min(agora, dur));

  // sons da cena, quadro a quadro: motor só quando o rover anda; porta, passos e bipe da estação
  const ant = useRef({ roda: q.roda, porta: q.porta, passo: -1, legenda: q.legenda, mexeu: 0 });
  const a0 = ant.current;
  if (q.roda !== a0.roda) a0.mexeu = performance.now();
  const motor = q.rover && performance.now() - a0.mexeu < 250;
  useEffect(() => {
    tocarAmbiente(motor ? "rover" : "vento_marte");
  }, [motor]);
  useEffect(() => {
    const a = ant.current;
    if (a.porta < 0 && q.porta >= 0) tocarEfeito("porta_abre");
    if (a.porta >= 0 && q.porta < 0) tocarEfeito("porta_fecha");
    const p = q.astro ? Math.floor(q.astro.passo) : -1;
    if (p >= 0 && p !== a.passo && p % 2 === 0) tocarEfeito(q.cena === "estacao" ? "passo_terra_1" : "passo_terra_2");
    if (q.legenda === "trabalhando" && a.legenda !== "trabalhando") tocarEfeito("estacao_bipe");
    a.roda = q.roda;
    a.porta = q.porta;
    a.passo = p;
    a.legenda = q.legenda;
  });
  const hora = relogio ? horaDoSol(relogio.de + (relogio.ate - relogio.de) * q.relogio) : null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ui.rover.cena")}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-[#120403] p-3"
    >
      <div className="relative" style={{ width: LADO }}>
        <Palco q={q} periodo={periodo} periodoFim={periodoFim} />
        {hora && (
          // relógio da cena: as horas passam enquanto o astronauta trabalha na estação
          <div
            className="absolute right-3 top-3 flex items-center gap-2 border-4 border-[#5a1d07] bg-[#2a0508]/90 px-3 py-1 font-display text-lg font-bold text-[#f6e38c] shadow-[0_4px_0_#1c0703] [text-shadow:2px_2px_0_#1c0703]"
            aria-hidden
          >
            <span className="inline-block" style={{ transform: `rotate(${q.relogio * 720}deg)` }}>
              <PixelIcon name="ampulheta" size={22} />
            </span>
            {hora}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-3" style={{ maxWidth: LADO }}>
        <p
          className="font-display text-sm font-bold text-[#f6e38c] [text-shadow:2px_2px_0_#1c0703] sm:text-base"
          aria-live="polite"
        >
          {t(`ui.rover.${q.legenda}`)}
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

/** Fundo parado da estação (rover estacionado e astronauta ao lado), atrás do cartão do alerta. */
export function ExpedicaoFundo({ periodo }: { periodo: Periodo }) {
  const r = roteiro("ida");
  const q = quadroEm(r, total(r));
  return (
    <div className="flex h-full w-full items-start justify-center sm:items-center">
      <div style={{ width: "min(100%, calc(100dvh - 12rem))" }}>
        <Palco q={{ ...q, preto: 0 }} periodo={periodo} />
      </div>
    </div>
  );
}
