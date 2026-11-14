// O jogo inteiro: nível → perfil (nome + personagem) → abertura → [manhã → mapa → noite] × sóis → fim → relatório.
// Save automático no localStorage (slot 1). Eventos do Sol buscados ao vivo no DONKI.
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loadSave, writeSave } from "@/lib/saves";
import { loadDonkiPool, type DonkiPool } from "@/data/donki-live";
import {
  BALANCE,
  canSleep,
  choose,
  endSol,
  findEvent,
  newMission,
  openAlert,
  rewindTo,
  setAllocation,
  type GameState,
  type Level,
  type PlaceId,
} from "@/game/engine";
import { BaseMap } from "./BaseMap";
import { Interior } from "./Interior";
import { EventCard } from "./EventCard";
import { BottomBar, TopHud } from "./Hud";
import { EnergyPanel, GameMenu, Glossary, MorningModal, NightModal, PlaceInfo } from "./Panels";
import { EndScreen, Intro, LevelSelect, ProfileScreen, Report, TutorialBubble } from "./Screens";
import { PIXEL_FONT_URL, PIXEL_THEME, stopSpeaking, useGT } from "./shared";
import { PlayerProvider, loadPlayer, savePlayer, type Player } from "./player";
import type { Periodo } from "./art";

type Phase = "nivel" | "perfil" | "abertura" | "manha" | "mapa" | "noite" | "fim" | "relatorio";
type Overlay = null | "energia" | "glossario" | "menu";

interface SaveData {
  v: 2;
  game: GameState;
  phase: Phase;
  tut: number;
  seen: string[];
  player?: Player;
  /** relógio do sol (0 = manhã, 1 = hora de dormir) */
  relogio?: number;
}

const SLOT = 1;
const TUT_FIM = 7;

/** Em que parte do sol estamos (troca a arte do mapa). */
function periodoDe(relogio: number): Periodo {
  if (relogio >= BALANCE.NOITE_EM) return "noite";
  if (relogio >= BALANCE.ENTARDECER_EM) return "entardecer";
  return "dia";
}

function readSave(): SaveData | null {
  const row = loadSave<SaveData>(SLOT);
  const d = row?.state;
  return d && d.v === 2 && d.game?.version === 2 ? d : null;
}

/** Camada de fora: perfil da criança (nome + personagem) e tema pixel art do jogo. */
export function GameApp({ mode }: { mode?: "new" | "continue" | undefined }) {
  const [player, setPlayer] = useState<Player>({ name: "", gender: "f" });
  useEffect(() => {
    const p = loadPlayer();
    if (p) setPlayer(p);
  }, []);
  const onPlayer = useCallback((p: Player) => {
    setPlayer(p);
    savePlayer(p);
  }, []);
  return (
    <div
      style={PIXEL_THEME}
      className="[&_.font-display]:[font-family:'Pixelify_Sans',sans-serif] [&_img]:[image-rendering:pixelated]"
    >
      <link rel="stylesheet" href={PIXEL_FONT_URL} />
      <PlayerProvider player={player}>
        <GameInner mode={mode} player={player} onPlayer={onPlayer} />
      </PlayerProvider>
    </div>
  );
}

function GameInner({
  mode,
  player,
  onPlayer,
}: {
  mode?: "new" | "continue" | undefined;
  player: Player;
  onPlayer: (p: Player) => void;
}) {
  const { t } = useGT();
  const [nivel, setNivel] = useState<Level>("cadete");
  const navigate = useNavigate();
  const [game, setGame] = useState<GameState | null>(null);
  const [phase, setPhase] = useState<Phase>("nivel");
  const [tut, setTut] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);
  const [card, setCard] = useState<string | null>(null);
  const [place, setPlace] = useState<PlaceId | null>(null);
  /** lugar em que a criança entrou (interior); null = está no mapa */
  const [inside, setInside] = useState<PlaceId | null>(null);
  const [saiuDe, setSaiuDe] = useState<PlaceId | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [pool, setPool] = useState<DonkiPool | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<SaveData | null>(null);
  // relógio do sol: 0 = manhã … 1 = hora de dormir (só anda com o mapa livre)
  const [relogio, setRelogio] = useState(0);
  const solDoRelogio = useRef<number | null>(null);

  // ao abrir: lê o save e busca os eventos do Sol na NASA
  useEffect(() => {
    const s = readSave();
    setSaved(s);
    if (mode === "continue" && s) restore(s);
    let vivo = true;
    loadDonkiPool()
      .then((p) => vivo && setPool(p))
      .finally(() => vivo && setLoading(false));
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function restore(s: SaveData) {
    if (s.player) onPlayer(s.player);
    solDoRelogio.current = s.game.sol;
    setRelogio(s.relogio ?? 0);
    setGame(s.game);
    setTut(s.tut);
    setSeen(s.seen);
    const p =
      s.phase === "nivel" || s.phase === "abertura" || s.phase === "perfil" ? "manha" : s.phase;
    setPhase(p);
  }

  // save automático (o relógio vai salvo em passos de 2,5% para não gravar a cada quadro)
  const relogioSalvo = Math.floor(relogio * 40) / 40;
  useEffect(() => {
    if (!game || phase === "nivel" || phase === "perfil") return;
    writeSave(
      SLOT,
      { v: 2, game, phase, tut, seen, player, relogio: relogioSalvo } satisfies SaveData,
      game.sol,
    );
  }, [game, phase, tut, seen, player, relogioSalvo]);

  // sol novo (dormiu, voltou a um sol, missão nova): o relógio volta para a manhã
  useEffect(() => {
    if (!game) return;
    if (solDoRelogio.current !== game.sol) {
      solDoRelogio.current = game.sol;
      setRelogio(0);
    }
  }, [game]);

  /** escolheu o nível → tela "quem vai comandar a base?" */
  const pickLevel = (level: Level) => {
    setNivel(level);
    setPhase("perfil");
  };

  const start = (p: Player) => {
    onPlayer(p);
    const g = newMission({ level: nivel, ...(pool ? { donkiPool: pool.events } : {}) });
    setGame(g);
    setRelogio(0);
    setTut(0);
    setSeen([]);
    setCard(null);
    setPlace(null);
    setOverlay(null);
    setPhase("abertura");
  };

  const backToLevels = () => {
    stopSpeaking();
    setCard(null);
    setPlace(null);
    setOverlay(null);
    setSaved(readSave());
    setPhase("nivel");
    // nova semana histórica do DONKI para a próxima missão
    setLoading(true);
    loadDonkiPool()
      .then(setPool)
      .finally(() => setLoading(false));
  };

  // alerta urgente abre sozinho quando a criança chega no mapa
  useEffect(() => {
    if (phase !== "mapa" || !game || card || overlay) return;
    const urgente = game.alerts.find((a) => a.urgent && !a.done);
    if (urgente) {
      setPlace(null);
      setGame((g) => (g ? openAlert(g, urgente.id) : g));
      setCard(urgente.id);
    }
  }, [phase, game, card, overlay]);

  const onPlace = useCallback(
    (pl: PlaceId) => {
      if (!game || card || overlay) return;
      setInside(pl);
    },
    [game, card, overlay],
  );

  /** computador do interior: abre o alerta do lugar, se houver; senão, as informações */
  const abrirTerminal = useCallback(
    (pl: PlaceId) => {
      if (!game || card || overlay) return;
      const a = game.alerts.find((x) => x.place === pl && !x.done);
      if (a) {
        setGame((g) => (g ? openAlert(g, a.id) : g));
        setCard(a.id);
        setTut((x) => (x < 2 ? 2 : x)); // abriu a 1ª carta: tutorial pula para "toda escolha custa"
      } else setPlace(pl);
    },
    [game, card, overlay],
  );

  const closeCard = () => {
    stopSpeaking();
    const a = game?.alerts.find((x) => x.id === card);
    if (a?.real && !seen.includes(a.real.kind)) setSeen((s) => [...s, a.real!.kind]);
    setCard(null);
    // fechou sem escolher (alerta adiado): o tutorial continua esperando a 1ª escolha
    if (a?.done) setTut((x) => (x === 2 ? 3 : x));
    if (game && game.status !== "jogando") setPhase("fim");
  };

  const periodo = periodoDe(relogio);
  const noite = periodo === "noite";

  /** Dormir. De noite pode dormir com alerta aberto: cada um que ficou para trás custa saúde. */
  const sleep = () => {
    if (!game || game.status !== "jogando") return;
    const forcado = !canSleep(game);
    if (forcado && !noite) return;
    stopSpeaking();
    setPlace(null);
    setGame(endSol(game, undefined, { forcado }));
    setInside(null);
    setPhase("noite");
  };

  // o tutorial (balão do robô) está na tela? (calculado aqui para pausar o relógio)
  const algoAberto = !!card || !!place || !!overlay || phase !== "mapa";
  const tutVisivel = (() => {
    if (!game || phase !== "mapa" || tut >= TUT_FIM || overlay) return false;
    const algumFeito = game.alerts.some((a) => a.done) || game.sol > 1;
    if (tut === 0 || tut === 1) return !algoAberto;
    if (tut === 2) return !!card;
    if (tut <= 5) return !algoAberto && algumFeito;
    return !algoAberto && canSleep(game);
  })();

  // relógio do sol: anda só com o mapa livre (carta, painel, menu ou tutorial abertos pausam)
  const relogioRodando = !!game && game.status === "jogando" && !algoAberto && !tutVisivel;
  const segundosPorSol = game ? BALANCE.SEGUNDOS_POR_SOL[game.level] : 120;
  useEffect(() => {
    if (!relogioRodando) return;
    let antes = performance.now();
    const id = setInterval(() => {
      const agora = performance.now();
      const dt = Math.min(1, (agora - antes) / 1000); // aba escondida não "pula" o dia inteiro
      antes = agora;
      setRelogio((r) => Math.min(1, r + dt / segundosPorSol));
    }, 250);
    return () => clearInterval(id);
  }, [relogioRodando, segundosPorSol]);

  // 21:00: o relógio PARA e espera a criança ir dormir na casa (não vira o dia sozinho)

  // ---------------------------------------------------------------- telas sem mapa
  const tela = "h-dvh w-full overflow-hidden bg-mars text-foreground";

  if (phase === "nivel" || (!game && phase !== "perfil")) {
    const info = pool
      ? pool.fromNasa > 0
        ? t("ui.nasa_ok", { n: pool.fromNasa })
        : t("ui.nasa_reserva")
      : "";
    return (
      <main className={tela}>
        <LevelSelect
          loading={loading}
          nasaInfo={info}
          saveSol={saved && saved.game.status === "jogando" ? saved.game.sol : null}
          onStart={pickLevel}
          onContinue={() => saved && restore(saved)}
        />
      </main>
    );
  }
  if (phase === "perfil")
    return (
      <main className={tela}>
        <ProfileScreen initial={player} onBack={() => setPhase("nivel")} onDone={start} />
      </main>
    );
  if (!game) return null;
  if (phase === "abertura")
    return (
      <main className={tela}>
        <Intro level={game.level} onDone={() => setPhase("manha")} />
      </main>
    );
  if (phase === "fim")
    return (
      <main className={tela}>
        <EndScreen state={game} onReport={() => setPhase("relatorio")} onNew={backToLevels} />
      </main>
    );
  if (phase === "relatorio")
    return (
      <main className={tela}>
        <Report
          state={game}
          onRewind={(sol) => {
            setGame(rewindTo(game, sol));
            setRelogio(0);
            setPhase("manha");
          }}
          onNew={backToLevels}
        />
      </main>
    );

  // ---------------------------------------------------------------- mapa
  const showTut = tutVisivel;
  const faltam = game.alerts.filter((a) => !a.done).length;
  // aviso do fim de tarde / da noite (não bloqueia o mapa)
  const aviso =
    phase !== "mapa" || card || showTut
      ? ""
      : noite
        ? faltam
          ? t("ui.noite.aviso", { dano: BALANCE.SAUDE_POR_ALERTA_PERDIDO })
          : ""
        : periodo === "entardecer" && faltam
          ? t("ui.entardecer.aviso")
          : "";

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-mars text-foreground">
      <TopHud
        state={game}
        onMenu={() => setOverlay("menu")}
        onHelp={() => setOverlay("glossario")}
        relogio={relogio}
        periodo={periodo}
      />
      <div className="relative min-h-0 flex-1 p-2">
        {inside ? (
          <Interior
            key={inside}
            place={inside}
            alerts={game.alerts}
            paused={algoAberto}
            noite={noite}
            onTerminal={() => abrirTerminal(inside)}
            onEnergy={() => setOverlay("energia")}
            onSleep={sleep}
            onExit={() => {
              setSaiuDe(inside);
              setInside(null);
            }}
          />
        ) : (
          <BaseMap
            key={"mapa-" + game.sol}
            saiuDe={saiuDe}
            alerts={game.alerts}
            solar={game.solar}
            escudo={game.escudo}
            onPlace={onPlace}
            paused={algoAberto}
            onFirstMove={() => setTut((x) => (x === 0 ? 1 : x))}
            periodo={periodo}
          >
            {/* no caminho de cima, entre os painéis e a antena: não cobre nenhum ❗ */}
            {aviso && (
              <div
                role="status"
                className={`pointer-events-none absolute left-1/2 top-[3%] z-10 w-[40%] -translate-x-1/2 border-4 px-2 py-1.5 text-center text-xs font-bold leading-snug shadow-[0_4px_0_#4a2615] sm:text-sm ${
                  noite
                    ? "border-[#ffe9a8] bg-[#2b2350] text-[#ffe9a8]"
                    : "border-[#4a2615] bg-[#ffd9a0] text-[#3a1f10]"
                }`}
              >
                {aviso}
              </div>
            )}
          </BaseMap>
        )}
        {showTut && (
          <div className={card ? "fixed inset-x-0 top-2 z-50" : ""}>
            <TutorialBubble
              step={tut}
              onOk={() => setTut((x) => x + 1)}
              onSkip={() => setTut(TUT_FIM)}
            />
          </div>
        )}
      </div>
      <BottomBar
        state={game}
        onEnergy={() => setOverlay("energia")}
        onSleep={sleep}
        noite={noite}
      />

      {phase === "manha" && <MorningModal state={game} onGo={() => setPhase("mapa")} />}
      {phase === "noite" && (
        <NightModal
          state={game}
          onNext={() => setPhase(game.status === "jogando" ? "manha" : "fim")}
        />
      )}
      {card && (
        <EventCard
          state={game}
          alertId={card}
          showTip={(() => {
            const k = game.alerts.find((a) => a.id === card)?.real?.kind;
            return !!k && !seen.includes(k);
          })()}
          onChoose={(choiceId) => {
            setGame((g) => (g ? choose(g, card, choiceId) : g));
            // cada escolha gasta horas do sol (07:00–21:00 = 14 h); "perder o dia" gasta várias
            const a = game.alerts.find((x) => x.id === card);
            const c = a ? findEvent(a.eventId).choices?.find((x) => x.id === choiceId) : undefined;
            const horas = c ? (c.horas ?? 1) : 0;
            if (horas) setRelogio((r) => Math.min(1, r + horas / 14));
          }}
          onClose={closeCard}
        />
      )}
      {place && !card && (
        <PlaceInfo
          state={game}
          place={place}
          onClose={() => setPlace(null)}
          onEnergy={() => {
            setPlace(null);
            setOverlay("energia");
          }}
          onSleep={sleep}
          noite={noite}
        />
      )}
      {overlay === "energia" && (
        <EnergyPanel
          state={game}
          onSave={(a) => setGame((g) => (g ? setAllocation(g, a) : g))}
          onClose={() => setOverlay(null)}
        />
      )}
      {overlay === "glossario" && <Glossary onClose={() => setOverlay(null)} />}
      {overlay === "menu" && (
        <GameMenu
          onClose={() => setOverlay(null)}
          onTutorial={() => {
            setTut(0);
            setOverlay(null);
          }}
          onGlossary={() => setOverlay("glossario")}
          onRestart={backToLevels}
          onExit={() => navigate({ to: "/" })}
        />
      )}
    </main>
  );
}
