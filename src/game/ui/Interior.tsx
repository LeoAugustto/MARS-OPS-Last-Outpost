// Interior de um lugar da base: a criança entra pela porta e anda livre lá dentro.
// O computador abre alertas e informações. A cama e o painel de energia têm ações próprias.
import { tocarEfeito } from "./audio";
import { useEffect, useRef, useState } from "react";
import type { Alert, PlaceId } from "@/game/engine";
import { ART, dirFrom, type Dir8 } from "./art";
import { usePlayer } from "./player";
import { BALANCE } from "@/game/engine";
import { BotaoHub, BOTAO_ESCURO } from "./hub";
import { Modal, useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";

type Obj = "terminal" | "saida" | "cama" | "energia";
type Ponto = { x: number; y: number };
/** Contorno do móvel desenhado na cena (pontos em % da sala, medidos nas artes 900×900). */
type Contorno = [number, number][];
type Caixa = Ponto & { w: number; h: number; pontos: Contorno };

const SALAS: Record<PlaceId, Partial<Record<Obj, Contorno>>> = {
  habitat: {
    cama: [[12.8,26.8],[25.5,24.5],[26.5,22.5],[31.3,22.5],[31.3,41.5],[30.3,45.2],[17.5,45.8],[16.5,43.5],[13,42]],
    terminal: [[77,27.5],[83.6,27.5],[83.8,24.8],[85.8,24.8],[86,27.5],[88,27.5],[88,41],[86.8,44],[81,44],[80.5,42.5],[79.5,44.5],[77.5,44.5],[76.3,41.5],[76.8,38.5],[77.2,36]],
    saida: [[41.2,86],[42.5,84.6],[57.5,84.6],[58.8,86],[58.8,97.5],[41.2,97.5]],
  },
  ar: {
    energia: [[8.8,14.5],[17,14.5],[17,13.8],[29.5,13.8],[30,15],[36,15.5],[37,16.8],[42.3,17.5],[42.3,30],[41,32.5],[10,32.5],[8.8,30]],
    terminal: [[88.5,17.6],[90.6,17.6],[90.6,20.6],[92.3,20.8],[92.3,25.2],[93.3,25.6],[93.3,28.5],[92.3,31.5],[86,31.5],[85,28.5],[85,25.5],[86.6,25.2],[86.8,20.8],[88.5,20.6]],
    saida: [[41.3,84.5],[43,82.8],[57,82.8],[58.9,84.5],[58.9,99],[41.3,99]],
  },
  lab: {
    terminal: [[71,22],[73.5,19],[82.5,19],[83,22],[86.5,23.5],[86.5,36.5],[85,37.5],[71,37.5],[70.8,35]],
    saida: [[39.5,85],[41.5,83],[58.5,83],[60.5,85],[60.5,99],[39.5,99]],
  },
  estufa: {
    terminal: [[76.5,23],[80,20.5],[87,20.5],[87.2,18],[88.5,17.5],[89.5,19],[89.5,30],[87,34],[76.5,34],[76,30]],
    saida: [[39,86],[41,84.5],[59,84.5],[61,86],[61,99],[39,99]],
  },
  abrigo: {
    terminal: [[72,28],[74.2,19],[83.5,19],[83.3,15],[86.5,14],[87,22],[88.3,25.5],[88.3,33],[72,33.5]],
    saida: [[40,77.5],[42,75.5],[58,75.5],[60,77.5],[60,94.5],[40,94.5]],
  },
  antena: {
    terminal: [[77.5,19.2],[86.7,19.2],[86.7,26.5],[88.5,27.5],[88.5,37],[77.5,37],[76.5,36],[70,36],[70,30],[75.5,29.5],[77.2,27]],
    saida: [[41,87.5],[59,87.5],[59,97],[41,97]],
  },
  paineis: {
    terminal: [[84.5,18],[92.5,18],[92.8,25],[93.2,27],[93.2,33.3],[83.5,33.3],[83.5,27],[84.2,25]],
    saida: [[41.3,85],[43,83.8],[57,83.8],[58.7,85],[58.7,97.5],[41.3,97.5]],
  },
  rover: {
    terminal: [[79.5,17],[90.5,17],[91.5,24],[91.5,29.5],[87,30],[86,35.5],[81.5,35.5],[81,30],[77,29.5],[76.7,24],[79.5,23]],
    saida: [[44,90.5],[55.2,90.5],[55.2,98],[44,98]],
  },
};

/** Centro e tamanho do contorno: onde fica o botão (toque/teclado) e o nome do móvel. */
function caixa(pontos: Contorno): Caixa {
  const xs = pontos.map((p) => p[0]);
  const ys = pontos.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  return { x: (x0 + x1) / 2, y: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0, pontos };
}
function objetos(place: PlaceId): Partial<Record<Obj, Caixa>> {
  const sala = SALAS[place] ?? {};
  return Object.fromEntries(
    (Object.entries(sala) as [Obj, Contorno][]).map(([o, c]) => [o, caixa(c)]),
  ) as Partial<Record<Obj, Caixa>>;
}

const SPEED = 34;
const RAIO = 9;
const PASSOS = [0, 1, 2, 1];
// área onde dá para andar (chão): abaixo da parede
const LIM = { x0: 8, x1: 92, y0: 40, y1: 90 };
const prender = (p: Ponto): Ponto => ({
  x: Math.max(LIM.x0, Math.min(LIM.x1, p.x)),
  y: Math.max(LIM.y0, Math.min(LIM.y1, p.y)),
});

interface Props {
  place: PlaceId;
  alerts: Alert[];
  paused: boolean;
  noite: boolean;
  onTerminal: () => void;
  onEnergy: () => void;
  onSleep: () => void;
  onExit: () => void;
  /** andou (% da sala): o relógio do sol anda junto */
  onWalk?: (dist: number) => void;
}

export function Interior({
  place,
  alerts,
  paused,
  noite,
  onTerminal,
  onEnergy,
  onSleep,
  onExit,
  onWalk,
}: Props) {
  const { t } = useGT();
  const { gender } = usePlayer();
  const objs = objetos(place);
  const alerta = alerts.some((a) => a.place === place && !a.done);
  const [pos, setPos] = useState<Ponto>({ x: 50, y: 86 });
  const [dir, setDir] = useState<Dir8>("n");
  const [andando, setAndando] = useState(false);
  const [quadro, setQuadro] = useState(0);
  const posRef = useRef(pos);
  const alvo = useRef<{ p: Ponto; obj?: Obj } | null>(null);
  const keys = useRef(new Set<string>());
  const perto = useRef<Obj | null>("saida"); // entrou pela porta: não sai na hora
  // cama: pergunta antes de dormir (dormir acaba o sol). De dia, com alerta aberto, não dá para
  // dormir mesmo: aí segue direto (o jogo mostra o porquê).
  const [confirmaDormir, setConfirmaDormir] = useState(false);
  const pendentes = alerts.filter((a) => !a.done).length;
  const usar = (o: Obj) => {
    if (o === "terminal") onTerminal();
    else if (o === "energia") onEnergy();
    else if (o === "cama") {
      if (pendentes > 0 && !noite) onSleep();
      else setConfirmaDormir(true);
    } else onExit();
  };
  const parado = paused || confirmaDormir;
  const live = useRef({ paused: parado, usar, objs, onWalk });
  live.current = { paused: parado, usar, objs, onWalk };

  useEffect(() => {
    if (!andando) return;
    const id = setInterval(() => setQuadro((q) => (q + 1) % PASSOS.length), 140);
    return () => clearInterval(id);
  }, [andando]);
  // passos no piso da base: um a cada passada
  useEffect(() => {
    if (andando && quadro % 2 === 0) tocarEfeito(quadro === 0 ? "passo_piso_1" : "passo_piso_2");
  }, [andando, quadro]);

  // laço de movimento (mesma ideia do mapa: requestAnimationFrame + reserva por relógio)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.12, (now - last) / 1000);
      last = now;
      const L = live.current;
      if (L.paused) return;
      const p = posRef.current;
      const k = keys.current;
      let dx = 0;
      let dy = 0;
      let chegou: Obj | undefined;
      if (k.size) {
        if (k.has("ArrowLeft") || k.has("a")) dx -= 1;
        if (k.has("ArrowRight") || k.has("d")) dx += 1;
        if (k.has("ArrowUp") || k.has("w")) dy -= 1;
        if (k.has("ArrowDown") || k.has("s")) dy += 1;
        alvo.current = null;
      } else if (alvo.current) {
        dx = alvo.current.p.x - p.x;
        dy = alvo.current.p.y - p.y;
      }
      const d = Math.hypot(dx, dy);
      if (d < 0.3) {
        if (alvo.current) {
          chegou = alvo.current.obj;
          alvo.current = null;
        }
        setAndando(false);
      } else {
        const passo = k.size ? SPEED * dt : Math.min(SPEED * dt, d);
        const n = prender({ x: p.x + (dx / d) * passo, y: p.y + (dy / d) * passo });
        if (n.x !== p.x || n.y !== p.y) {
          setDir(dirFrom(dx, dy));
          L.onWalk?.(Math.hypot(n.x - p.x, n.y - p.y) / 3); // sala é menor: conta 1/3
          posRef.current = n;
          setPos(n);
          setAndando(true);
        } else {
          setAndando(false);
          if (alvo.current) {
            chegou = alvo.current.obj;
            alvo.current = null;
          }
        }
      }
      // perto de um objeto: usa (uma vez por aproximação)
      const q = posRef.current;
      const near = (Object.entries(L.objs) as [Obj, Caixa][]).find(
        ([, o]) => Math.hypot(o.x - q.x, prender(o).y - q.y) < RAIO,
      )?.[0];
      if (perto.current && perto.current !== near) perto.current = null;
      const usarAgora = chegou ?? (k.size && near && near !== perto.current ? near : undefined);
      if (usarAgora) {
        perto.current = usarAgora;
        L.usar(usarAgora);
      }
    };
    const loop = (now: number) => {
      step(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const reserva = setInterval(() => {
      const now = performance.now();
      if (now - last > 250) step(now);
    }, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(reserva);
    };
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(k)) {
        if (paused) return;
        e.preventDefault();
        keys.current.add(k);
      }
    };
    const up = (e: KeyboardEvent) => {
      keys.current.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [paused, onExit]);

  const irPara = (p: Ponto, obj?: Obj) => {
    if (paused) return;
    alvo.current = obj ? { p: prender(p), obj } : { p: prender(p) };
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="relative aspect-square w-full max-w-[min(100%,calc(100dvh-180px))] touch-none select-none overflow-hidden border-4 border-[#a5461f] shadow-[0_6px_0_#6e2a10]"
        style={{
          background: `center / cover no-repeat url(${ART.placeScene(place)})`,
          imageRendering: "pixelated",
          filter: noite ? "brightness(0.75) saturate(0.9)" : undefined,
        }}
        onPointerDown={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          irPara({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
          });
        }}
        aria-label={t(`lugar.${place}`)}
      >
        <div className="pointer-events-none absolute left-2 top-2 border-2 border-[#a5461f] bg-[#fbe2c2] px-2 py-0.5 text-base font-bold text-[#4a2615] 2xl:text-xl">
          {t(`lugar.${place}`)}
        </div>

        {/* brilho retrô no contorno de cada móvel que dá para usar */}
        <svg
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
          aria-hidden
        >
          {(Object.entries(objs) as [Obj, Caixa][]).map(([o, p]) => {
            const pts = p.pontos.map((q) => q.join(",")).join(" ");
            const cls = o === "terminal" && alerta ? "contorno-alerta" : "contorno";
            return (
              <g key={o} className={cls}>
                <polygon points={pts} className="c-fora" vectorEffect="non-scaling-stroke" />
                <polygon points={pts} className="c-meio" vectorEffect="non-scaling-stroke" />
                <polygon points={pts} className="c-dentro" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>

        {(Object.entries(objs) as [Obj, Caixa][]).map(([o, p]) => {
          const aviso = o === "terminal" && alerta;
          return (
            <button
              key={o}
              type="button"
              data-tut={`obj-${o}`}
              onPointerDown={(e) => {
                e.stopPropagation();
                irPara(p, o);
              }}
              onClick={(e) => {
                // Enter, espaço e tecnologias assistivas ativam o botão sem pointerdown.
                if (e.detail === 0) irPara(p, o);
              }}
              className={`group absolute z-10 min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 rounded-md focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#ffd23f] `}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, height: `${p.h}%` }}
              aria-label={t(`ui.interior.${o}`) + (aviso ? ` · ${t("ui.alerta")}` : "")}
            >
              {aviso && (
                <span className="absolute -right-2 -top-3 animate-bounce">
                  <PixelIcon name="alerta" size={24} />
                </span>
              )}
              <span
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-[#a5461f] bg-[#fbe2c2] px-1.5 text-base leading-tight text-[#4a2615] 2xl:text-lg ${o === "saida" ? "bottom-full mb-1" : "top-full mt-1"}`}
              >
                {t(`ui.interior.${o}`)}
              </span>
            </button>
          );
        })}

        {/* astronauta (posição = pés) */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: "16%" }}
          aria-hidden
        >
          <img
            src={ART.astronaut.frame(gender, dir, andando ? (PASSOS[quadro] ?? 1) : 1)}
            alt=""
            className="block w-full max-w-none"
            style={{ imageRendering: "pixelated" }}
            draggable={false}
          />
          <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-1/2 -translate-x-1/2 rounded-full bg-black/30" />
        </div>
      </div>

      {confirmaDormir && (
        <Modal label={t("ui.dormir.pergunta")} onClose={() => setConfirmaDormir(false)}>
          <div className="flex flex-col items-center gap-3 text-center">
            <PixelIcon name="cama" size={48} />
            <h2 className="font-display text-2xl font-bold text-secondary">{t("ui.dormir.pergunta")}</h2>
            <p className="text-lg">{t("ui.dormir.explica")}</p>
            <div className="grid w-full gap-2">
              <BotaoHub
                principal
                onClick={() => {
                  setConfirmaDormir(false);
                  onSleep();
                }}
              >
                {pendentes > 0
                  ? t("ui.dormir_custo", { dano: pendentes * BALANCE.SAUDE_POR_ALERTA_PERDIDO })
                  : t("ui.dormir.sim")}
              </BotaoHub>
              <button type="button" className={`${BOTAO_ESCURO} text-lg`} onClick={() => setConfirmaDormir(false)}>
                {t("ui.dormir.nao")}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
