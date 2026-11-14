// Mapa da base, visto de cima, com o astronauta andando.
// - Celular: toque no chão → anda; toque num lugar → anda até ele e abre.
// - PC: clique, ou setas/WASD (ao chegar perto de um ❗ ele abre sozinho).
// Arte: src/game/ui/art.ts (mapa pixel art + astronauta em 8 direções). Sem arte pronta, usa formas + emoji.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Alert, PlaceId } from "@/game/engine";
import { PLACE_POS, useGT } from "./shared";
import { ART, dirFrom, type Dir8 } from "./art";
import { usePlayer } from "./player";

/** quadros da caminhada: 0, 1, 2, 1 */
const PASSOS = [0, 1, 2, 1];

const SPEED = 38; // % do mapa por segundo
const RAIO = 8; // distância (%) para "chegar" num lugar

/** Tamanho do astronauta: 12% do lado do mapa (quadrado). A posição é a dos PÉS. */
const SPRITE = 0.12;
// Limites da posição dos pés para o desenho inteiro caber no mapa (que corta o que sai, overflow-hidden):
// na horizontal sobra meio sprite de cada lado; em cima cabe o sprite inteiro + a sombra.
const X_MIN = (SPRITE * 100) / 2 + 1;
const X_MAX = 100 - X_MIN;
const Y_MIN = SPRITE * 100 + 3;
const Y_MAX = 96;
const limitar = (x: number, y: number) => ({
  x: Math.max(X_MIN, Math.min(X_MAX, x)),
  y: Math.max(Y_MIN, Math.min(Y_MAX, y)),
});

const aperta = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

interface Props {
  alerts: Alert[];
  solar: number;
  escudo: number;
  onPlace: (place: PlaceId) => void;
  paused: boolean;
  onFirstMove?: () => void;
}

export function BaseMap({ alerts, solar, escudo, onPlace, paused, onFirstMove }: Props) {
  const background = ART.map.ready ? ART.map.src : undefined;
  const { t } = useGT();
  const { gender } = usePlayer();
  const [quadro, setQuadro] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(320);
  const [pos, setPos] = useState({ x: 50, y: 58 });
  const [flip, setFlip] = useState(false);
  const [dir, setDir] = useState<Dir8>("s");
  const [walking, setWalking] = useState(false);
  const target = useRef<{ x: number; y: number; place?: PlaceId } | null>(null);
  const keys = useRef(new Set<string>());
  const perto = useRef<PlaceId | null>(null);
  const posRef = useRef(pos);
  const movedOnce = useRef(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef(new Map<PlaceId, HTMLSpanElement | null>());
  const [badgeAt, setBadgeAt] = useState<Record<string, { left: number; top: number }>>({});

  // troca o quadro da caminhada enquanto anda
  useEffect(() => {
    if (!walking) return;
    const id = setInterval(() => setQuadro((q) => (q + 1) % PASSOS.length), 140);
    return () => clearInterval(id);
  }, [walking]);

  // quadrado que cabe na área disponível
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      if (!e) return;
      setSize(Math.max(200, Math.floor(Math.min(e.contentRect.width, e.contentRect.height))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pendentes = new Set(alerts.filter((a) => !a.done).map((a) => a.place));
  const urgentes = new Set(alerts.filter((a) => !a.done && a.urgent).map((a) => a.place));

  // O mapa corta o que sai (overflow-hidden). Mede o canto de cada aviso e o
  // empurra para dentro da moldura: o "!" nunca some atrás da borda nem da barra de cima.
  const pendKey = [...pendentes].sort().join(",");
  useLayoutEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const mr = map.getBoundingClientRect();
    const B = size * 0.08; // lado do aviso
    const FOLGA = 3; // respiro da moldura
    const SALTO = B * 0.3; // o aviso pula para cima (animate-bounce)
    const borda = parseFloat(getComputedStyle(map).borderLeftWidth) || 0;
    const next: Record<string, { left: number; top: number }> = {};
    for (const pl of Object.keys(PLACE_POS) as PlaceId[]) {
      const sp = spanRefs.current.get(pl);
      if (!sp || !pendentes.has(pl)) continue;
      const sr = sp.getBoundingClientRect();
      const dentro = parseFloat(getComputedStyle(sp).borderLeftWidth) || 0;
      const l = aperta(sr.right + 8 - B, mr.left + borda + FOLGA, mr.right - borda - B - FOLGA);
      const topo = aperta(
        sr.top - 12,
        mr.top + borda + FOLGA + SALTO,
        mr.bottom - borda - B - FOLGA,
      );
      next[pl] = { left: l - (sr.left + dentro), top: topo - (sr.top + dentro) };
    }
    setBadgeAt(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, pendKey, background]);

  const moved = useCallback(() => {
    if (!movedOnce.current) {
      movedOnce.current = true;
      onFirstMove?.();
    }
  }, [onFirstMove]);

  // valores mais recentes para o laço (sem recriar o laço a cada quadro)
  const live = useRef({ paused, onPlace, pendentes, moved });
  live.current = { paused, onPlace, pendentes, moved };

  // laço de animação: requestAnimationFrame + reserva por relógio (celular lento / aba sem animação)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let andando = false;
    const step = (now: number) => {
      const dt = Math.min(0.12, (now - last) / 1000); // tolera celular lento
      last = now;
      const { paused: pausado, onPlace: abrir, pendentes: pend, moved: mexeu } = live.current;
      if (pausado) return;
      const p = posRef.current;
      let dx = 0;
      let dy = 0;
      const k = keys.current;
      if (k.size) {
        if (k.has("ArrowLeft") || k.has("a")) dx -= 1;
        if (k.has("ArrowRight") || k.has("d")) dx += 1;
        if (k.has("ArrowUp") || k.has("w")) dy -= 1;
        if (k.has("ArrowDown") || k.has("s")) dy += 1;
        if (dx || dy) target.current = null;
      } else if (target.current) {
        dx = target.current.x - p.x;
        dy = target.current.y - p.y;
      }
      const dist = Math.hypot(dx, dy);
      if (dist <= 0.01) {
        if (andando) {
          andando = false;
          setWalking(false);
        }
        return;
      }
      const passo = Math.min(SPEED * dt, k.size ? SPEED * dt : dist);
      const { x: nx, y: ny } = limitar(p.x + (dx / dist) * passo, p.y + (dy / dist) * passo);
      // alvo fora dos limites (toque bem na borda): para onde der, em vez de andar sem parar
      if (!k.size && target.current && nx === p.x && ny === p.y) {
        const place = target.current.place;
        target.current = null;
        andando = false;
        setWalking(false);
        if (place) abrir(place);
        return;
      }
      if (Math.abs(dx) > 0.2) setFlip(dx < 0);
      setDir(dirFrom(dx, dy));
      posRef.current = { x: nx, y: ny };
      setPos(posRef.current);
      if (!andando) {
        andando = true;
        setWalking(true);
      }
      mexeu();
      // chegou no alvo
      if (
        !k.size &&
        target.current &&
        Math.hypot(target.current.x - nx, target.current.y - ny) < 0.6
      ) {
        const place = target.current.place;
        target.current = null;
        andando = false;
        setWalking(false);
        if (place) abrir(place);
      }
      // teclado: chegar perto de um ❗ abre sozinho
      if (k.size) {
        const near = (Object.keys(PLACE_POS) as PlaceId[]).find(
          (pl) => Math.hypot(PLACE_POS[pl].x - nx, PLACE_POS[pl].y + 6 - ny) < RAIO,
        );
        if (near && near !== perto.current && pend.has(near)) abrir(near);
        perto.current = near ?? null;
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

  // teclado
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(k)) {
        if (paused) return;
        e.preventDefault();
        keys.current.add(k);
      }
      if ((k === "Enter" || k === " ") && !paused && perto.current) onPlace(perto.current);
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys.current.delete(k);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [paused, onPlace]);

  const goTo = (x: number, y: number, place?: PlaceId) => {
    if (paused) return;
    const alvo = limitar(x, y);
    target.current = place ? { ...alvo, place } : alvo;
  };

  const onGround = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    goTo(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex h-full w-full items-start justify-center sm:items-center"
    >
      <div
        ref={mapRef}
        className="relative touch-none select-none overflow-hidden border-4 border-[#a5461f] shadow-[0_6px_0_#6e2a10]"
        style={{
          width: size,
          height: size,
          imageRendering: "pixelated",
          background: background
            ? `center / cover no-repeat url(${background})`
            : "radial-gradient(circle at 50% 45%, oklch(0.72 0.14 50) 0%, oklch(0.62 0.15 42) 45%, oklch(0.5 0.13 38) 100%)",
        }}
        onPointerDown={onGround}
        aria-label={t("ui.mover")}
      >
        {!background && <ProvisionalGround />}

        {(Object.keys(PLACE_POS) as PlaceId[]).map((pl) => {
          const p = PLACE_POS[pl];
          const alerta = pendentes.has(pl);
          const urgente = urgentes.has(pl);
          return (
            <button
              key={pl}
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                goTo(p.x, Math.min(94, p.y + 6), pl);
              }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline-none"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: size * (background ? 0.24 : 0.2) }}
              aria-label={t(`lugar.${pl}`) + (alerta ? " ❗" : "")}
            >
              <span
                ref={(el) => {
                  spanRefs.current.set(pl, el);
                }}
                // com a arte pronta o alerta é só o "!" (sem moldura tracejada); a borda invisível
                // mantém o tamanho do botão. Na arte provisória (emoji) a moldura continua.
                className={`relative grid aspect-square w-full place-items-center border-4 ${
                  background
                    ? `border-transparent ${urgente ? "animate-pulse" : ""}`
                    : `bg-secondary/90 shadow-lg ${
                        urgente
                          ? "animate-pulse border-destructive"
                          : alerta
                            ? "border-[#fff1dc]/90"
                            : "border-border"
                      }`
                }`}
                style={{ fontSize: size * 0.085 }}
              >
                {!background && p.icon}
                {pl === "paineis" && solar < 1 && (
                  <span
                    className="absolute inset-0 bg-[#8a5a3a]"
                    style={{ opacity: (1 - solar) * 0.9 }}
                    aria-hidden
                  />
                )}
                {pl === "abrigo" && escudo > 0 && (
                  <span className="absolute -bottom-2 border-2 border-border bg-card px-1.5 text-xs font-bold text-secondary">
                    {"▰".repeat(escudo)}
                  </span>
                )}
                {alerta &&
                  (() => {
                    const B = size * 0.08;
                    const lado = size * (background ? 0.24 : 0.2);
                    const at = badgeAt[pl] ?? { left: lado - B + 8, top: -12 };
                    return (
                      <span
                        className={`absolute grid animate-bounce place-items-center border-2 border-[#4a2615] font-black shadow-[0_3px_0_#4a2615] ${
                          urgente ? "bg-destructive text-white" : "bg-[#ffd23f] text-[#4a2615]"
                        }`}
                        style={{
                          left: at.left,
                          top: at.top,
                          width: B,
                          height: B,
                          fontSize: size * 0.05,
                        }}
                        aria-hidden
                      >
                        {urgente ? "🚨" : "!"}
                      </span>
                    );
                  })()}
              </span>
              <span
                className="mt-0.5 max-w-[130%] truncate border-2 border-[#a5461f] bg-[#fbe2c2]/95 px-1.5 font-bold text-[#4a2615]"
                style={{ fontSize: Math.max(10, size * 0.03) }}
              >
                {t(`lugar.${pl}`)}
              </span>
            </button>
          );
        })}

        {/* astronauta */}
        {/* largura fixa: perto da borda direita a caixa "encolhia" e espremia a imagem */}
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: ART.astronaut.ready ? size * SPRITE : undefined,
            fontSize: size * 0.085,
          }}
          aria-hidden
        >
          {ART.astronaut.ready ? (
            <img
              src={ART.astronaut.frame(gender, dir, walking ? (PASSOS[quadro] ?? 1) : 1)}
              alt=""
              className="block max-w-none"
              style={{
                width: size * SPRITE,
                height: size * SPRITE,
                imageRendering: "pixelated",
              }}
              draggable={false}
            />
          ) : (
            <span
              className={`block ${walking ? "animate-bounce" : ""}`}
              style={{ transform: flip ? "scaleX(-1)" : undefined, animationDuration: "0.5s" }}
            >
              🧑‍🚀
            </span>
          )}
          <span className="mx-auto block h-1.5 w-2/3 rounded-full bg-black/25" />
        </div>
      </div>
    </div>
  );
}

/** Chão provisório: trilhas ligando a casa a cada lugar + pedrinhas. */
function ProvisionalGround() {
  const pedras = [
    [8, 33],
    [34, 30],
    [64, 30],
    [92, 34],
    [36, 64],
    [64, 66],
    [8, 70],
    [92, 70],
    [30, 95],
    [70, 95],
    [50, 22],
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      aria-hidden
    >
      {(Object.keys(PLACE_POS) as PlaceId[])
        .filter((p) => p !== "habitat")
        .map((p) => (
          <line
            key={p}
            x1={PLACE_POS.habitat.x}
            y1={PLACE_POS.habitat.y + 4}
            x2={PLACE_POS[p].x}
            y2={PLACE_POS[p].y + 4}
            stroke="oklch(0.82 0.08 70)"
            strokeOpacity="0.55"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        ))}
      {pedras.map(([x, y], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={1.6 + (i % 3) * 0.5}
          ry={1.1 + (i % 2) * 0.4}
          fill="oklch(0.42 0.1 35)"
          opacity="0.6"
        />
      ))}
      <circle
        cx="12"
        cy="92"
        r="5"
        fill="none"
        stroke="oklch(0.45 0.1 35)"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
      <circle
        cx="90"
        cy="6"
        r="3.5"
        fill="none"
        stroke="oklch(0.45 0.1 35)"
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />
    </svg>
  );
}
