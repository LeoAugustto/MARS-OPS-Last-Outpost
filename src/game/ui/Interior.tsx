// Interior de um lugar da base: a criança entra pela porta e anda livre lá dentro.
// O computador abre alertas e informações. A cama e o painel de energia têm ações próprias.
import { useEffect, useRef, useState } from "react";
import type { Alert, PlaceId } from "@/game/engine";
import { ART, dirFrom, type Dir8 } from "./art";
import { usePlayer } from "./player";
import { useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";

type Obj = "terminal" | "saida" | "cama" | "energia";
type Ponto = { x: number; y: number };

/** Onde fica cada objeto dentro da sala (% da sala). */
function objetos(place: PlaceId): Partial<Record<Obj, Ponto>> {
  const base: Partial<Record<Obj, Ponto>> = { terminal: { x: 72, y: 34 }, saida: { x: 50, y: 92 } };
  if (place === "habitat") return { ...base, cama: { x: 24, y: 36 } };
  if (place === "ar") return { ...base, energia: { x: 26, y: 34 } };
  return base;
}

const ICONE: Record<Obj, string> = { terminal: "computador", saida: "porta", cama: "cama", energia: "raio" };
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
  const usar = (o: Obj) => {
    if (o === "terminal") onTerminal();
    else if (o === "energia") onEnergy();
    else if (o === "cama") onSleep();
    else onExit();
  };
  const live = useRef({ paused, usar, objs, onWalk });
  live.current = { paused, usar, objs, onWalk };

  useEffect(() => {
    if (!andando) return;
    const id = setInterval(() => setQuadro((q) => (q + 1) % PASSOS.length), 140);
    return () => clearInterval(id);
  }, [andando]);

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
      const near = (Object.entries(L.objs) as [Obj, Ponto][]).find(
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
    <div className="relative flex h-full w-full items-start justify-center sm:items-center">
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
        <div className="pointer-events-none absolute left-2 top-2 border-2 border-[#a5461f] bg-[#fbe2c2] px-2 py-0.5 text-sm font-bold text-[#4a2615]">
          {t(`lugar.${place}`)}
        </div>

        {(Object.entries(objs) as [Obj, Ponto][]).map(([o, p]) => (
          <button
            key={o}
            type="button"
            onPointerDown={(e) => {
              e.stopPropagation();
              irPara(p, o);
            }}
            onClick={(e) => {
              // Enter, espaço e tecnologias assistivas ativam o botão sem pointerdown.
              if (e.detail === 0) irPara(p, o);
            }}
            className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#ffd23f] ${o === "saida" ? "flex-col-reverse" : "flex-col"}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={t(`ui.interior.${o}`) + (o === "terminal" && alerta ? ` · ${t("ui.alerta")}` : "")}
          >
            <span className="relative grid h-12 w-12 place-items-center border-2 border-[#4a2615] bg-[#efcda2]/95 shadow-[0_3px_0_#4a2615] sm:h-14 sm:w-14">
              <PixelIcon name={ICONE[o]} size={36} />
              {o === "terminal" && alerta && (
                <span className="absolute -right-3 -top-4 animate-bounce">
                  <PixelIcon name="alerta" size={28} />
                </span>
              )}
            </span>
            <span className="whitespace-nowrap border-2 border-[#a5461f] bg-[#fbe2c2] px-1.5 text-xs font-bold text-[#4a2615]">
              {t(`ui.interior.${o}`)}
            </span>
          </button>
        ))}

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
    </div>
  );
}
