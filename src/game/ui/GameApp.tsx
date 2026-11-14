// O jogo inteiro: nível → abertura → [manhã → mapa → noite] × sóis → fim → relatório.
// Save automático no localStorage (slot 1). Eventos do Sol buscados ao vivo no DONKI.
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loadSave, writeSave } from "@/lib/saves";
import { loadDonkiPool, type DonkiPool } from "@/data/donki-live";
import {
  canSleep,
  choose,
  endSol,
  newMission,
  openAlert,
  rewindTo,
  setAllocation,
  type GameState,
  type Level,
  type PlaceId,
} from "@/game/engine";
import { BaseMap } from "./BaseMap";
import { EventCard } from "./EventCard";
import { BottomBar, TopHud } from "./Hud";
import { EnergyPanel, GameMenu, Glossary, MorningModal, NightModal, PlaceInfo } from "./Panels";
import { EndScreen, Intro, LevelSelect, Report, TutorialBubble } from "./Screens";
import { stopSpeaking, useGT } from "./shared";

type Phase = "nivel" | "abertura" | "manha" | "mapa" | "noite" | "fim" | "relatorio";
type Overlay = null | "energia" | "glossario" | "menu";

interface SaveData {
  v: 2;
  game: GameState;
  phase: Phase;
  tut: number;
  seen: string[];
}

const SLOT = 1;
const TUT_FIM = 7;

function readSave(): SaveData | null {
  const row = loadSave<SaveData>(SLOT);
  const d = row?.state;
  return d && d.v === 2 && d.game?.version === 2 ? d : null;
}

export function GameApp({ mode }: { mode?: "new" | "continue" | undefined }) {
  const { t } = useGT();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameState | null>(null);
  const [phase, setPhase] = useState<Phase>("nivel");
  const [tut, setTut] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);
  const [card, setCard] = useState<string | null>(null);
  const [place, setPlace] = useState<PlaceId | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [pool, setPool] = useState<DonkiPool | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<SaveData | null>(null);

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
    setGame(s.game);
    setTut(s.tut);
    setSeen(s.seen);
    const p = s.phase === "nivel" || s.phase === "abertura" ? "manha" : s.phase;
    setPhase(p);
  }

  // save automático
  useEffect(() => {
    if (!game || phase === "nivel") return;
    writeSave(SLOT, { v: 2, game, phase, tut, seen } satisfies SaveData, game.sol);
  }, [game, phase, tut, seen]);

  const start = (level: Level) => {
    const g = newMission({ level, ...(pool ? { donkiPool: pool.events } : {}) });
    setGame(g);
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
    setTut((x) => (x === 2 ? 3 : x));
    if (game && game.status !== "jogando") setPhase("fim");
  };

  const sleep = () => {
    if (!game || !canSleep(game)) return;
    stopSpeaking();
    setPlace(null);
    setGame(endSol(game));
    setPhase("noite");
  };

  // ---------------------------------------------------------------- telas sem mapa
  const tela = "h-dvh w-full overflow-hidden bg-mars text-foreground";

  if (phase === "nivel" || !game) {
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
          onStart={start}
          onContinue={() => saved && restore(saved)}
        />
      </main>
    );
  }
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
            setPhase("manha");
          }}
          onNew={backToLevels}
        />
      </main>
    );

  // ---------------------------------------------------------------- mapa
  const algoAberto = !!card || !!place || !!overlay || phase !== "mapa";
  const algumFeito = game.alerts.some((a) => a.done) || game.sol > 1;
  const tutCond =
    tut === 0 || tut === 1
      ? !algoAberto
      : tut === 2
        ? !!card
        : tut <= 5
          ? !algoAberto && algumFeito
          : !algoAberto && canSleep(game);
  const showTut = phase === "mapa" && tut < TUT_FIM && !overlay && tutCond;

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-mars text-foreground">
      <TopHud
        state={game}
        onMenu={() => setOverlay("menu")}
        onHelp={() => setOverlay("glossario")}
      />
      <div className="relative min-h-0 flex-1 p-2">
        <BaseMap
          alerts={game.alerts}
          solar={game.solar}
          escudo={game.escudo}
          onPlace={onPlace}
          paused={algoAberto}
          onFirstMove={() => setTut((x) => (x === 0 ? 1 : x))}
        />
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
      <BottomBar state={game} onEnergy={() => setOverlay("energia")} onSleep={sleep} />

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
          onChoose={(choiceId) => setGame((g) => (g ? choose(g, card, choiceId) : g))}
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
