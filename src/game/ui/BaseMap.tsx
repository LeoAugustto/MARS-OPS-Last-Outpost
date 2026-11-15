// Mapa da base, visto de cima, com o astronauta andando SÓ pelas estradas (src/game/ui/walk.ts).
// - Celular: toque no chão → anda pela estrada até o ponto mais perto; toque numa construção → vai até a porta.
// - PC: clique, ou setas/WASD (desliza pelas bordas da estrada).
// - Chegar na porta de um lugar abre o lugar (alerta, se houver; senão, informações).
// Arte: src/game/ui/art.ts (mapa pixel art + astronauta em 8 direções). Sem arte pronta, usa formas + emoji.
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { Alert, PlaceId } from "@/game/engine";
import { AstronautSprite, PlaceIcon, PLACE_POS, useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";
import { ART, dirFrom, type Dir8, type Periodo } from "./art";
import { usePlayer } from "./player";
import {
  INICIO,
  PORTAS,
  RAIO_SAIDA,
  bateuNaPorta,
  caminho,
  maisPerto,
  podePisar,
  predioEm,
} from "./walk";

/** quadros da caminhada: 0, 1, 2, 1 */
const PASSOS = [0, 1, 2, 1];

const SPEED = 30; // % do mapa por segundo

/** Tamanho do astronauta: 9% do lado do mapa (quadrado). A posição é a dos PÉS. */
const SPRITE = 0.09;
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
  /** hora do sol: troca a arte do mapa (dia, entardecer, noite) */
  periodo?: Periodo;
  /** avisos desenhados por cima do mapa (posição em % do mapa) */
  children?: ReactNode;
  /** saiu deste lugar: começa na porta dele */
  saiuDe?: PlaceId | null;
  /** andou esta distância (% do mapa): o relógio do sol anda junto */
  onWalk?: (dist: number) => void;
}

export function BaseMap({
  alerts,
  solar,
  escudo,
  onPlace,
  paused,
  onFirstMove,
  periodo = "dia",
  children,
  saiuDe,
  onWalk,
}: Props) {
  const background = ART.map.ready ? ART.map.src : undefined;
  const { t } = useGT();
  const { gender } = usePlayer();
  const [quadro, setQuadro] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(320);
  const [pos, setPos] = useState(() =>
    saiuDe ? { x: PORTAS[saiuDe][0], y: PORTAS[saiuDe][1] } : { x: INICIO[0], y: INICIO[1] },
  );
  const [flip, setFlip] = useState(false);
  const [dir, setDir] = useState<Dir8>("s");
  const [walking, setWalking] = useState(false);
  /** caminho em andamento: pontos de passagem pela estrada e, se for o caso, o lugar no fim */
  const target = useRef<{ pts: [number, number][]; place?: PlaceId } | null>(null);
  const keys = useRef(new Set<string>());
  const perto = useRef<PlaceId | null>(saiuDe ?? null); // saiu pela porta: não entra de novo na hora
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
  const live = useRef({ paused, onPlace, pendentes, moved, onWalk });
  live.current = { paused, onPlace, pendentes, moved, onWalk };

  // laço de animação: requestAnimationFrame + reserva por relógio (celular lento / aba sem animação)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let andando = false;
    const step = (now: number) => {
      const dt = Math.min(0.12, (now - last) / 1000); // tolera celular lento
      last = now;
      const { paused: pausado, onPlace: abrir, moved: mexeu } = live.current;
      if (pausado) return;
      const p = posRef.current;
      const k = keys.current;
      let nx = p.x;
      let ny = p.y;
      let dx = 0;
      let dy = 0;
      let chegou: PlaceId | undefined;
      let bateu: PlaceId | null = null;
      if (k.size) {
        // teclado: anda em qualquer chão; prédio é parede (desliza no outro eixo).
        // Andar contra o prédio bem na frente da porta = entrar.
        if (k.has("ArrowLeft") || k.has("a")) dx -= 1;
        if (k.has("ArrowRight") || k.has("d")) dx += 1;
        if (k.has("ArrowUp") || k.has("w")) dy -= 1;
        if (k.has("ArrowDown") || k.has("s")) dy += 1;
        target.current = null;
        const len = Math.hypot(dx, dy) || 1;
        const passo = SPEED * dt;
        const tx = p.x + (dx / len) * passo;
        const ty = p.y + (dy / len) * passo;
        if (podePisar(tx, ty)) [nx, ny] = [tx, ty];
        else {
          bateu = bateuNaPorta(p.x, p.y, tx, ty);
          if (dx && podePisar(p.x + Math.sign(dx) * passo, p.y)) nx = p.x + Math.sign(dx) * passo;
          else if (dy && podePisar(p.x, p.y + Math.sign(dy) * passo))
            ny = p.y + Math.sign(dy) * passo;
        }
      } else if (target.current) {
        // segue os pontos de passagem do caminho pela estrada
        let resta = SPEED * dt;
        const t0 = target.current;
        while (resta > 0 && t0.pts.length) {
          const [wx, wy] = t0.pts[0]!;
          const d = Math.hypot(wx - nx, wy - ny);
          dx = wx - nx;
          dy = wy - ny;
          if (d <= resta) {
            nx = wx;
            ny = wy;
            resta -= d;
            t0.pts.shift();
          } else {
            nx += (dx / d) * resta;
            ny += (dy / d) * resta;
            resta = 0;
          }
        }
        if (!t0.pts.length) {
          chegou = t0.place;
          target.current = null;
        }
      }
      const mexeuAgora = nx !== p.x || ny !== p.y;
      if (mexeuAgora) {
        if (Math.abs(dx) > 0.2) setFlip(dx < 0);
        if (dx || dy) setDir(dirFrom(dx, dy));
        live.current.onWalk?.(Math.hypot(nx - p.x, ny - p.y));
        posRef.current = { x: nx, y: ny };
        setPos(posRef.current);
        if (!andando) {
          andando = true;
          setWalking(true);
        }
        mexeu();
      } else if (andando) {
        andando = false;
        setWalking(false);
      }
      // portas: chegou no destino do toque → abre; no teclado, passar pela porta já abre
      if (perto.current) {
        const [px, py] = PORTAS[perto.current];
        if (Math.hypot(px - nx, py - ny) > RAIO_SAIDA) perto.current = null;
      }
      if (chegou) {
        perto.current = chegou;
        andando = false;
        setWalking(false);
        abrir(chegou);
      } else if (k.size && bateu && bateu !== perto.current) {
        // empurrou a porta: entra
        perto.current = bateu;
        andando = false;
        setWalking(false);
        abrir(bateu);
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
    const de: [number, number] = [posRef.current.x, posRef.current.y];
    if (place) {
      const porta = PORTAS[place];
      // já está na porta: abre direto
      if (Math.hypot(porta[0] - de[0], porta[1] - de[1]) < 1.5) {
        perto.current = place;
        onPlace(place);
        return;
      }
      target.current = { pts: caminho(de, porta), place };
    } else {
      target.current = { pts: caminho(de, maisPerto(x, y)) };
    }
  };

  const onGround = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    goTo(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex h-full w-full items-center justify-center"
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
        {/* hora do sol: as 3 artes do mapa ficam empilhadas e trocam com um esmaecer suave */}
        {background &&
          (Object.keys(ART.mapPeriodo) as Periodo[]).map((p) => (
            <div
              key={p}
              className="pointer-events-none absolute inset-0 transition-opacity duration-[2000ms]"
              style={{
                background: `center / cover no-repeat url(${ART.mapPeriodo[p]})`,
                opacity: p === periodo ? 1 : 0,
              }}
              aria-hidden
            />
          ))}

        {(Object.keys(PLACE_POS) as PlaceId[]).map((pl) => {
          const p = PLACE_POS[pl];
          const alerta = pendentes.has(pl);
          const urgente = urgentes.has(pl);
          return (
            <button
              key={pl}
              type="button"
              data-tut={`lugar-${pl}`}
              onPointerDown={(e) => {
                e.stopPropagation();
                // o botão é maior que o prédio: tocar no chão em volta (onde fica o "!") só anda até
                // ali; tocar no prédio ou no "!" vai até a porta e entra
                const r = mapRef.current?.getBoundingClientRect();
                const x = r ? ((e.clientX - r.left) / r.width) * 100 : p.x;
                const y = r ? ((e.clientY - r.top) / r.height) * 100 : p.y;
                const noAviso = (e.target as HTMLElement).closest("[data-aviso]");
                if (noAviso || predioEm(x, y) === pl) goTo(p.x, p.y, pl);
                else goTo(x, y);
              }}
              onClick={(e) => {
                if (e.detail === 0) goTo(p.x, p.y, pl);
              }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#ffd23f]"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: size * (background ? 0.24 : 0.2) }}
              aria-label={t(`lugar.${pl}`) + (alerta ? ` · ${urgente ? t("ui.urgente") : t("ui.alerta")}` : "")}
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
                {!background && <PlaceIcon place={pl} size={Math.round(size * 0.11)} />}
                {pl === "paineis" && solar < 1 && (
                  <span
                    className="absolute inset-0 bg-[#8a5a3a]"
                    style={{ opacity: (1 - solar) * 0.9 }}
                    aria-hidden
                  />
                )}
                {pl === "abrigo" && escudo > 0 && (
                  <span className="absolute -bottom-2 inline-flex items-center gap-0.5 border-2 border-border bg-card px-1 text-xs font-bold text-secondary" title={t("recurso.escudo")}>
                    <PixelIcon name="nivel" size={20} /> {escudo}
                  </span>
                )}
                {alerta &&
                  (() => {
                    const B = size * 0.08;
                    const lado = size * (background ? 0.24 : 0.2);
                    const at = badgeAt[pl] ?? { left: lado - B + 8, top: -12 };
                    return (
                      <span
                        data-aviso
                        className="absolute grid animate-bounce place-items-center"
                        style={{
                          left: at.left,
                          top: at.top,
                          width: B,
                          height: B,
                        }}
                        aria-hidden
                      >
                        <PixelIcon name={urgente ? "urgente" : "alerta"} size={Math.round(B)} />
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
          data-tut="astronauta"
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
              <AstronautSprite gender={gender} size={Math.round(size * SPRITE)} />
            </span>
          )}
          <span
            className="absolute -bottom-0.5 left-1/2 h-1.5 w-1/2 -translate-x-1/2 rounded-full bg-black/30"
            aria-hidden
          />
        </div>
        {children}
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
