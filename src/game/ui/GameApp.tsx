// O jogo inteiro: nível → perfil (nome + personagem) → abertura → [manhã → mapa → noite] × sóis → fim → relatório.
// Save automático no localStorage (slot 1). Eventos do Sol buscados ao vivo no DONKI.
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { loadSave, writeSave } from "@/lib/saves";
import { loadDonkiPool, type DonkiPool, type Famosa, type ModoSol } from "@/data/donki-live";
import {
  BALANCE,
  anoitecer,
  canSleep,
  choose,
  endSol,
  findEvent,
  newMission,
  openAlert,
  recentesDepois,
  rewindTo,
  setAllocation,
  type GameState,
  type Level,
  type PlaceId,
} from "@/game/engine";
import { BaseMap } from "./BaseMap";
import { Interior } from "./Interior";
import { EventCard } from "./EventCard";
import { ExpedicaoFundo, RoverCena } from "./RoverCena";
import { BottomBar, TopHud } from "./Hud";
import { EnergyPanel, GameMenu, Glossary, MorningModal, NightModal, PlaceInfo } from "./Panels";
import { EndScreen, Intro, LevelSelect, ProfileScreen, Report } from "./Screens";
import {
  RoviAviso,
  TUT_FIM,
  TUT_PASSOS,
  TutorialGuia,
  tutIndice,
  type TutAgora,
  type TutPasso,
} from "./Tutorial";
import { PIXEL_FONT_URL, PIXEL_THEME, stopSpeaking, useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";
import { PlayerProvider, loadPlayer, savePlayer, type Player } from "./player";
import { collectStickers } from "./stickers";
import { ART, type Periodo } from "./art";
import { ComoJogar } from "./ComoJogar";
import { pararTudo, tocarEfeito, tocarMusica } from "./audio";
import { SomPanel } from "./SomPanel";
import { AvisoTelaCheia } from "./AvisoTelaCheia";

/** abaixo disto (e caindo desde a última noite) o Rovi avisa que o recurso está acabando (jogo; só a UI usa) */
const LIMITE_AVISO_ROVI = 40;

/** Este alerta é o custo que chegou depois de uma escolha com ampulheta (deferredCost)? */
function veioDeAmpulheta(g: GameState, eventId: string): boolean {
  return g.log.some((e) => {
    if (e.kind !== "evento" || !e.eventId || !e.choiceId) return false;
    const c = findEvent(e.eventId).choices?.find((x) => x.id === e.choiceId);
    return !!c?.deferredCost && !!c.schedule?.some((sc) => sc.eventId === eventId);
  });
}

/** horas de jogo gastas na viagem de ida e volta do rover até a estação (jogo, não é dado real) */
const HORAS_VIAGEM_ROVER = 1;

type Phase = "nivel" | "perfil" | "abertura" | "manha" | "mapa" | "noite" | "fim" | "relatorio";
type Overlay = null | "energia" | "glossario" | "menu" | "ajuda" | "som";

interface SaveData {
  v: 2;
  game: GameState;
  phase: Phase;
  tut: number;
  /** versão do tutorial (2 = passos com seta, ver Tutorial.tsx) */
  tutV?: 2;
  seen: string[];
  player?: Player;
  /** relógio do sol (0 = manhã, 1 = hora de dormir) */
  relogio?: number;
}

const SLOT = 1;

/** Em que parte do sol estamos (troca a arte do mapa). */
function periodoDe(relogio: number): Periodo {
  if (relogio >= BALANCE.NOITE_EM) return "noite";
  if (relogio >= BALANCE.ENTARDECER_EM) return "entardecer";
  return "dia";
}

function readSave(): SaveData | null {
  const row = loadSave<SaveData>(SLOT);
  const d = row?.state;
  const g = d?.game;
  // save quebrado ou incompleto: começa de novo em vez de cair na tela de erro
  const ok =
    !!g && d.v === 2 && g.version === 2 && Array.isArray(g.alerts) && Array.isArray(g.history) &&
    Array.isArray(g.checkpoints) && !!g.resources && !!g.allocation && typeof g.sol === "number" &&
    !!d.phase;
  return ok ? d : null;
}

// Eventos das últimas missões deste aparelho: a próxima missão prefere outros (mais variedade).
// Guarda só ids de eventos (nada sobre a criança), sempre com try/catch.
const RECENTES_KEY = "marsops:recentes";
function lerRecentes(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENTES_KEY) ?? "[]") as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function gravarRecentes(ids: string[]): void {
  try {
    localStorage.setItem(RECENTES_KEY, JSON.stringify(ids));
  } catch {
    /* sem storage: só perde a variedade entre missões */
  }
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
      className="[&_.font-display]:[font-family:var(--font-display)] [&_img]:[image-rendering:pixelated]"
    >
      <link rel="stylesheet" href={PIXEL_FONT_URL} />
      <PlayerProvider player={player}>
        <GameInner mode={mode} player={player} onPlayer={onPlayer} />
        <AvisoTelaCheia />
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
  /** expedição do rover: "ida" = cena indo; "la" = na estação (cartão aberto); "volta" = cena voltando */
  const [cena, setCena] = useState<null | "ida" | "la" | "volta">(null);
  /** relógio na chegada à estação e na volta à base (para o relógio da cena correr de um ao outro) */
  const relogioExp = useRef({ de: 0, ate: 0 });
  const [place, setPlace] = useState<PlaceId | null>(null);
  /** lugar em que a criança entrou (interior); null = está no mapa */
  const [inside, setInside] = useState<PlaceId | null>(null);
  const [saiuDe, setSaiuDe] = useState<PlaceId | null>(null);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [pool, setPool] = useState<DonkiPool | null>(null);
  const [loading, setLoading] = useState(true);
  /** figurinhas ganhas na missão que acabou (mostradas no fim) */
  const [novasFig, setNovasFig] = useState<string[]>([]);
  /** de onde vêm os eventos do Sol desta missão */
  const [modoSol, setModoSol] = useState<ModoSol>("surpresa");
  const [famosa, setFamosa] = useState<Famosa>("maio2024");
  const trocarModo = (m: ModoSol, f: Famosa = famosa) => {
    setModoSol(m);
    setFamosa(f);
    setLoading(true);
    loadDonkiPool(Math.random, m, f)
      .then(setPool)
      .finally(() => setLoading(false));
  };
  const [saved, setSaved] = useState<SaveData | null>(null);
  // relógio do sol: 0 = manhã … 1 = hora de dormir (só anda com o mapa livre)
  const [relogio, setRelogio] = useState(0);
  const [avisoFeito, setAvisoFeito] = useState("");
  const solDoRelogio = useRef<number | null>(null);
  /** tutorial: passa para o próximo passo só se a criança está neste passo */
  const tutFeito = useCallback(
    (p: TutPasso) => setTut((x) => (TUT_PASSOS[x] === p ? x + 1 : x)),
    [],
  );
  /** tutorial: pula direto para este passo (se ainda não passou dele) */
  const tutVaiPara = useCallback(
    (p: TutPasso) => setTut((x) => (x < tutIndice(p) ? tutIndice(p) : x)),
    [],
  );

  // ao abrir: lê o save e busca os eventos do Sol na NASA
  useEffect(() => {
    const s = readSave();
    setSaved(s);
    if (mode === "continue" && s) restore(s);
    let vivo = true;
    loadDonkiPool(Math.random, modoSol, famosa)
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
    // save antigo (tutorial de 7 balões): terminado continua terminado; senão recomeça
    setTut(s.tutV === 2 ? Math.min(s.tut, TUT_FIM) : s.tut >= 7 ? TUT_FIM : 0);
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
      { v: 2, game, phase, tut, tutV: 2, seen, player, relogio: relogioSalvo } satisfies SaveData,
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
    // a missão anterior (a desta tela ou a do save) entra na lista de "vistos há pouco"
    const anterior = game ?? readSave()?.game;
    const recentes = anterior ? recentesDepois(anterior, lerRecentes()) : lerRecentes();
    gravarRecentes(recentes);
    const g = newMission({
      level: nivel,
      recentes,
      ...(pool ? { donkiPool: pool.events } : {}),
    });
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
    loadDonkiPool(Math.random, modoSol, famosa)
      .then(setPool)
      .finally(() => setLoading(false));
  };

  // alerta urgente abre sozinho quando a criança chega no mapa
  useEffect(() => {
    // durante a expedição do rover (indo, na estação ou voltando) espera a volta à base
    if (phase !== "mapa" || !game || card || overlay || cena) return;
    const urgente = game.alerts.find((a) => a.urgent && !a.done);
    if (urgente) {
      setPlace(null);
      setGame((g) => (g ? openAlert(g, urgente.id) : g));
      setCard(urgente.id);
      tutVaiPara("custo");
    }
  }, [phase, game, card, overlay, cena, tutVaiPara]);

  const onPlace = useCallback(
    (pl: PlaceId) => {
      if (!game || card || overlay) return;
      // rover com alerta: em vez da garagem, o rover sai em expedição (cena) e o alerta abre lá
      if (pl === "rover" && game.alerts.some((a) => a.place === "rover" && !a.done)) {
        stopSpeaking();
        setCena("ida");
        return;
      }
      setInside(pl);
      tutFeito("porta");
    },
    [game, card, overlay, tutFeito],
  );

  /** fim da cena do rover: chegou no lugar da expedição e abre o alerta do rover */
  const chegouExpedicao = useCallback(() => {
    setCena("la");
    relogioExp.current.de = relogio;
    const a = game?.alerts.find((x) => x.place === "rover" && !x.done);
    if (!a) {
      setCena(null);
      return;
    }
    setGame((g) => (g ? openAlert(g, a.id) : g));
    setCard(a.id);
    tutVaiPara("custo");
  }, [game, relogio, tutVaiPara]);

  /** fim da volta: o rover estacionou na base; o relógio pula para a hora da volta */
  const voltouExpedicao = useCallback(() => {
    setRelogio(relogioExp.current.ate);
    setCena(null);
    setSaiuDe("rover");
  }, []);

  /** computador do interior: abre o alerta do lugar, se houver; senão, as informações */
  const abrirTerminal = useCallback(
    (pl: PlaceId) => {
      if (!game || card || overlay) return;
      const a = game.alerts.find((x) => x.place === pl && !x.done);
      if (a) {
        setGame((g) => (g ? openAlert(g, a.id) : g));
        setCard(a.id);
        tutVaiPara("custo"); // abriu a 1ª carta: tutorial pula para "toda escolha custa"
      } else setPlace(pl);
    },
    [game, card, overlay, tutVaiPara],
  );

  const closeCard = () => {
    stopSpeaking();
    const a = game?.alerts.find((x) => x.id === card);
    if (a?.real && !seen.includes(a.real.kind)) setSeen((s) => [...s, a.real!.kind]);
    setCard(null);
    // na estação: se escolheu, toca a volta (entra na estação, o tempo passa, volta para a base);
    // se fechou sem escolher, volta direto
    if (cena === "la") {
      if (a?.done && game?.status === "jogando") {
        relogioExp.current.ate = Math.min(1, relogio + HORAS_VIAGEM_ROVER / BALANCE.HORAS_DO_SOL);
        setCena("volta");
      } else {
        setCena(null);
        setSaiuDe("rover");
      }
    }
    // fechou sem escolher (alerta adiado): o tutorial continua esperando a 1ª escolha
    if (a?.done) tutFeito("custo");
    if (game && game.status !== "jogando") setPhase("fim");
  };

  const periodo = periodoDe(relogio);
  const noite = periodo === "noite";

  // música de fundo de acordo com a tela e a hora do dia (arquivos em public/audio/musica)
  const tempestadeHoje = !!game?.alerts.some((a) => {
    const ch = findEvent(a.eventId).chain;
    return !a.done && (ch === "sol-nuvem" || ch === "sol-chuva");
  });
  const fimStatus = game?.status;
  useEffect(() => {
    if (phase === "nivel" || phase === "perfil" || phase === "abertura") tocarMusica("tema_menu");
    else if (phase === "fim" || phase === "relatorio")
      tocarMusica(fimStatus === "resgate" ? "resgate" : "vitoria", { loop: false });
    else if (phase === "noite") tocarMusica("noite");
    else if (cena) tocarMusica("rover_viagem");
    else if (tempestadeHoje) tocarMusica("tempestade");
    else tocarMusica(periodo === "noite" ? "noite" : periodo === "entardecer" ? "mapa_entardecer" : "mapa_dia");
  }, [phase, periodo, cena, tempestadeHoje, fimStatus]);
  // saiu do jogo: silêncio
  useEffect(() => () => pararTudo(), []);

  // efeitos 8-bit nos momentos do jogo (public/audio/sfx)
  const cartaUrgente = !!card && !!game?.alerts.find((a) => a.id === card)?.urgent;
  useEffect(() => {
    if (card) tocarEfeito(cartaUrgente ? "urgente" : "abrir_carta");
  }, [card, cartaUrgente]);
  useEffect(() => {
    if (phase === "manha") tocarEfeito("bom_dia");
    else if (phase === "noite") tocarEfeito("dormir");
    else if (phase === "mapa" && game?.alerts.some((a) => !a.done)) tocarEfeito("alerta");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  useEffect(() => {
    if (overlay && overlay !== "energia") tocarEfeito("abrir_menu");
  }, [overlay]);

  // a noite chegou com a tripulação acordada: cansaço (SAUDE_AO_ANOITECER), uma vez por sol
  useEffect(() => {
    if (!noite || !game || game.status !== "jogando" || phase !== "mapa") return;
    if (game.flags["anoiteceu"] === game.sol) return;
    const depois = anoitecer(game);
    setGame(depois);
    if (depois.status !== "jogando") setPhase("fim");
  }, [noite, game, phase]);

  /** Dormir. De noite pode dormir com alerta aberto: cada um que ficou para trás custa saúde. */
  const sleep = () => {
    if (!game || game.status !== "jogando") return;
    const forcado = !canSleep(game);
    if (forcado && !noite) {
      setPlace("habitat");
      return;
    }
    stopSpeaking();
    setPlace(null);
    setGame(endSol(game, undefined, { forcado }));
    // acorda dentro da Casa (dormiu na cama): para ir ao mapa, sai pela porta da Casa
    setInside("habitat");
    setSaiuDe("habitat");
    setPhase("noite");
  };

  // tutorial: o que o Rovi mostra agora (calculado aqui para pausar o relógio)
  const algoAberto = !!card || !!place || !!overlay || !!cena || phase !== "mapa";
  const tutAgora = ((): TutAgora | null => {
    if (!game || phase !== "mapa" || tut >= TUT_FIM) return null;
    const passo = TUT_PASSOS[tut]!;
    const livre = !card && !place && !overlay && !cena;
    const pendentes = game.alerts.filter((a) => !a.done);
    const alertaAqui = !!inside && pendentes.some((a) => a.place === inside);
    // prédio para onde a seta aponta: o 1º com alerta (o rover sai em viagem, fica por último)
    const predio = (pendentes.find((a) => a.place !== "rover") ?? pendentes[0])?.place;
    const irAoPredio = (): TutAgora | null =>
      inside
        ? { passo, texto: "tut.vazio", alvo: "obj-saida" }
        : predio
          ? { passo, texto: "tut.porta", alvo: `lugar-${predio}` }
          : null;
    switch (passo) {
      case "andar":
        return livre && !inside ? { passo, texto: "tut.andar", alvo: "astronauta" } : null;
      case "porta":
        return livre ? irAoPredio() : null;
      case "computador":
        if (!livre) return null;
        return alertaAqui ? { passo, texto: "tut.computador", alvo: "obj-terminal" } : irAoPredio();
      case "custo": {
        const a = card ? game.alerts.find((x) => x.id === card) : undefined;
        const temEscolha = !!a && !a.done && !!findEvent(a.eventId).choices?.length;
        return temEscolha ? { passo, texto: "tut.custo", alvo: "chips" } : null;
      }
      case "barras":
        return livre ? { passo, texto: "tut.barras", alvo: "barras" } : null;
      case "antena":
        return livre && pendentes.some((a) => a.place === "antena")
          ? { passo, texto: "tut.antena", alvo: inside ? undefined : "lugar-antena" }
          : null;
      case "energia":
        return livre ? { passo, texto: "tut.energia", alvo: "energia" } : null;
      case "mais":
        return overlay === "energia" ? { passo, texto: "tut.mais", alvo: "mais" } : null;
      case "pronto":
        return overlay === "energia" ? { passo, texto: "tut.pronto", alvo: "pronto" } : null;
      case "relogio":
        return livre ? { passo, texto: "tut.relogio", alvo: "relogio" } : null;
      case "casa":
        // só manda dormir quando não falta nenhum alerta (antes disso, a criança resolve os outros)
        if (!livre || pendentes.length > 0) return null;
        if (inside === "habitat") return { passo, texto: "tut.cama", alvo: "obj-cama" };
        if (inside) return { passo, texto: "tut.casa_sair", alvo: "obj-saida" };
        return { passo, texto: "tut.casa", alvo: "lugar-habitat" };
    }
  })();
  const tutVisivel = !!tutAgora;

  // passo da antena só existe quando há alerta na antena: sem alerta, o tutorial segue
  const antenaPendente = !!game?.alerts.some((a) => a.place === "antena" && !a.done);
  useEffect(() => {
    if (TUT_PASSOS[tut] === "antena" && !antenaPendente) tutFeito("antena");
  }, [tut, antenaPendente, tutFeito]);

  /** abre a divisão de energia (botão Energia, painel da fábrica de ar ou informações) */
  const abrirEnergia = () => {
    setPlace(null);
    setOverlay("energia");
    tutFeito("energia");
  };
  /** fechou a energia: se ainda não apertou +, o tutorial volta a pedir "toque em Energia" */
  const fecharEnergia = () => {
    setOverlay(null);
    setTut((x) =>
      TUT_PASSOS[x] === "mais" ? tutIndice("energia") : TUT_PASSOS[x] === "pronto" ? x + 1 : x,
    );
  };

  // avisos do Rovi na hora certa, cada um uma vez por missão (guardados em `seen`)
  const roviAviso = ((): { k: string; alvo?: string } | null => {
    if (!game || phase !== "mapa" || game.status !== "jogando" || algoAberto || tutVisivel)
      return null;
    const r = game.resources;
    const pendentes = game.alerts.filter((a) => !a.done);
    const tempestade = game.alerts.some((a) => {
      const ch = findEvent(a.eventId).chain;
      return ch === "sol-nuvem" || ch === "sol-chuva";
    });
    // baixo E caindo: na manhã do sol 1 nada caiu ainda, então o Rovi não assusta à toa
    const caindo = (k: "ar" | "comida" | "saude") =>
      r[k] < LIMITE_AVISO_ROVI && (game.night?.delta[k] ?? 0) < 0;
    // manhã do sol 2: o que caiu ontem e como a energia resolve (ensina a dividir cedo)
    const caiuOntem = (["comida", "ar"] as const).find((k) => (game.night?.delta[k] ?? 0) < 0);
    const lista: [boolean, string, string?][] = [
      [game.sol === 2 && caiuOntem === "comida", "rovi.sol2.comida", "energia"],
      [game.sol === 2 && caiuOntem === "ar", "rovi.sol2.ar", "energia"],
      [caindo("ar"), "rovi.ar", "energia"],
      [caindo("comida"), "rovi.comida", "energia"],
      [caindo("saude"), "rovi.saude", "barras"],
      [tempestade, "rovi.tempestade", "energia"],
      [game.alerts.some((a) => veioDeAmpulheta(game, a.eventId)), "rovi.depois"],
      [(game.night?.bateria ?? 0) >= BALANCE.BATERIA_MAX, "rovi.bateria", "energia"],
      [periodoDe(relogio) === "entardecer" && pendentes.length > 0, "rovi.entardecer", "relogio"],
    ];
    const achou = lista.find(([ok, k]) => ok && !seen.includes(k));
    return achou ? { k: achou[1], ...(achou[2] ? { alvo: achou[2] } : {}) } : null;
  })();

  // relógio do sol: anda só com o mapa livre (carta, painel, menu, tutorial ou Rovi abertos pausam)
  // aviso do Rovi apareceu: bipe (ampulheta quando é o custo que chegou)
  const avisoK = roviAviso?.k;
  useEffect(() => {
    if (avisoK) tocarEfeito(avisoK === "rovi.depois" ? "ampulheta" : "aviso_rovi");
  }, [avisoK]);

  const relogioRodando =
    !!game && game.status === "jogando" && !algoAberto && !tutVisivel && !roviAviso;
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

  /** andar gasta tempo: atravessar o mapa inteiro = BALANCE.HORAS_POR_MAPA_ANDADO */
  const andou = useCallback((dist: number) => {
    setRelogio((r) =>
      Math.min(1, r + ((dist / 100) * BALANCE.HORAS_POR_MAPA_ANDADO) / BALANCE.HORAS_DO_SOL),
    );
  }, []);

  // ESC: fecha a janela aberta (menu, energia, glossário, informação); no mapa, abre o menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || phase !== "mapa" || card) return;
      e.preventDefault();
      if (overlay) setOverlay(null);
      else if (place) setPlace(null);
      else setOverlay("menu");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, card, overlay, place]);

  // fim da missão: guarda as figurinhas ganhas (uma vez)
  const coletou = useRef<number | null>(null);
  useEffect(() => {
    if (phase !== "fim" || !game || coletou.current === game.seed) return;
    coletou.current = game.seed;
    const novas = collectStickers(game);
    setNovasFig(novas);
    if (novas.length) setTimeout(() => tocarEfeito("figurinha"), 3500);
  }, [phase, game]);

  // 19:00: o relógio PARA e espera a criança ir dormir na casa (não vira o dia sozinho)

  // ---------------------------------------------------------------- telas sem mapa
  const tela = "h-dvh w-full overflow-hidden bg-mars text-foreground";

  if (phase === "nivel" || (!game && phase !== "perfil")) {
    const info = pool
      ? pool.calmo
        ? t("ui.fonte.calmo")
        : pool.famosa
          ? t("ui.nasa_famosa", { n: pool.events.length })
          : pool.fromNasa > 0
            ? t("ui.nasa_ok", { n: pool.fromNasa })
            : t("ui.nasa_reserva")
      : "";
    return (
      <main className={tela}>
        <LevelSelect
          modo={modoSol}
          famosa={famosa}
          onModo={trocarModo}
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
        <EndScreen
          state={game}
          novas={novasFig}
          onReport={() => setPhase("relatorio")}
          onNew={backToLevels}
        />
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
            setInside("habitat");
            setSaiuDe("habitat");
            setPhase("manha");
          }}
          onNew={backToLevels}
          onBack={() => setPhase("fim")}
        />
      </main>
    );

  // ---------------------------------------------------------------- mapa
  const faltam = game.alerts.filter((a) => !a.done).length;
  // cada aviso aparece uma vez por período de cada sol e depois some sozinho
  const avisoId = `${game.sol}-${periodo}`;
  // aviso do fim de tarde / da noite (não bloqueia o mapa)
  const aviso =
    phase !== "mapa" || card || tutVisivel || roviAviso
      ? ""
      : noite
        ? t("ui.noite.aviso", {
            dano: BALANCE.SAUDE_POR_ALERTA_PERDIDO,
            cansaco: BALANCE.SAUDE_AO_ANOITECER,
          })
        : periodo === "entardecer"
          ? faltam
            ? t("ui.entardecer.aviso", { cansaco: BALANCE.SAUDE_AO_ANOITECER })
            : t("ui.entardecer.dormir")
          : "";

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-mars text-foreground">
      <TopHud
        state={game}
        onMenu={() => setOverlay("menu")}
        onHelp={() => setOverlay("glossario")}
        onEnergy={abrirEnergia}
        relogio={relogio}
        periodo={periodo}
      />
      <div className="relative min-h-0 flex-1 overflow-hidden p-2">
        {/* fundo das laterais em tela larga/cheia: a própria cena, ampliada e escurecida (sem faixa vazia) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-40px] scale-110 bg-cover bg-center blur-xl brightness-[0.35]"
          style={{
            backgroundImage: `url(${inside ? ART.placeScene(inside) : ART.mapPeriodo[periodo]})`,
          }}
        />
        {cena === "la" ? (
          <ExpedicaoFundo periodo={periodo} />
        ) : inside ? (
          <Interior
            key={`${inside}-${game.sol}`}
            place={inside}
            alerts={game.alerts}
            paused={algoAberto}
            noite={noite}
            onTerminal={() => abrirTerminal(inside)}
            onEnergy={abrirEnergia}
            onSleep={sleep}
            onWalk={andou}
            onExit={() => {
              setSaiuDe(inside);
              setInside(null);
            }}
          />
        ) : (
          <BaseMap
            key={"mapa-" + game.sol}
            saiuDe={saiuDe}
            onWalk={andou}
            alerts={game.alerts}
            solar={game.solar}
            escudo={game.escudo}
            onPlace={onPlace}
            paused={algoAberto}
            onFirstMove={() => tutFeito("andar")}
            periodo={periodo}
          >
            {aviso && avisoFeito !== avisoId && (
              <AvisoHora
                key={avisoId}
                texto={aviso}
                noite={noite}
                onFim={() => setAvisoFeito(avisoId)}
              />
            )}
          </BaseMap>
        )}
      </div>
      <BottomBar state={game} noite={noite} />

      {phase === "manha" &&
        (() => {
          // dicas do Rovi, uma vez por missão: energia livre (faltou ontem) e escudo (ainda zero)
          const dica =
            game.night?.faltou.length && !seen.includes("dica_energia")
              ? "dica_energia"
              : game.sol >= 2 && game.escudo === 0 && !seen.includes("dica_escudo")
                ? "dica_escudo"
                : undefined;
          return (
            <MorningModal
              state={game}
              dica={dica && `ui.${dica.replace("_", ".")}`}
              onGo={() => {
                if (dica) setSeen((s) => [...s, dica]);
                setPhase("mapa");
              }}
            />
          );
        })()}
      {phase === "noite" && (
        <NightModal
          state={game}
          onNext={() => setPhase(game.status === "jogando" ? "manha" : "fim")}
        />
      )}
      {cena === "ida" && <RoverCena modo="ida" periodo={periodo} onFim={chegouExpedicao} />}
      {cena === "volta" && (
        <RoverCena
          modo="volta"
          periodo={periodo}
          periodoFim={periodoDe(relogioExp.current.ate)}
          relogio={relogioExp.current}
          onFim={voltouExpedicao}
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
            tocarEfeito("confirmar");
            setGame((g) => (g ? choose(g, card, choiceId) : g));
            // cada escolha gasta horas do sol (07:00–19:00); "perder o dia" gasta várias
            const a = game.alerts.find((x) => x.id === card);
            const c = a ? findEvent(a.eventId).choices?.find((x) => x.id === choiceId) : undefined;
            const horas = c ? (c.horas ?? 1) : 0;
            if (horas) setRelogio((r) => Math.min(1, r + horas / BALANCE.HORAS_DO_SOL));
          }}
          onClose={closeCard}
        />
      )}
      {place && !card && (
        <PlaceInfo
          state={game}
          place={place}
          onClose={() => setPlace(null)}
          onEnergy={abrirEnergia}
          noite={noite}
        />
      )}
      {overlay === "energia" && (
        <EnergyPanel
          state={game}
          onSave={(a) => setGame((g) => (g ? setAllocation(g, a) : g))}
          onMais={() => tutFeito("mais")}
          onClose={fecharEnergia}
          faltaVisto={seen.includes("rovi.falta")}
          onFaltaVisto={() => setSeen((s) => (s.includes("rovi.falta") ? s : [...s, "rovi.falta"]))}
        />
      )}
      {roviAviso && (
        <RoviAviso
          key={roviAviso.k}
          texto={roviAviso.k}
          alvo={roviAviso.alvo}
          onOk={() => {
            setSeen((s) => [...s, roviAviso.k]);
            // o Rovi já avisou do entardecer: o aviso que cai do topo não repete hoje
            if (roviAviso.k === "rovi.entardecer") setAvisoFeito(avisoId);
          }}
        />
      )}
      {tutAgora && (
        <TutorialGuia
          agora={tutAgora}
          onOk={() => tutFeito(tutAgora.passo)}
          onSkip={() => setTut(TUT_FIM)}
        />
      )}
      {overlay === "glossario" && <Glossary onClose={() => setOverlay(null)} />}
      {overlay === "ajuda" && <ComoJogar onClose={() => setOverlay(null)} />}
      {overlay === "som" && <SomPanel onClose={() => setOverlay(null)} />}
      {overlay === "menu" && (
        <GameMenu
          onClose={() => setOverlay(null)}
          onTutorial={() => {
            setTut(0);
            setOverlay(null);
          }}
          onHowTo={() => setOverlay("ajuda")}
          onSom={() => setOverlay("som")}
          onGlossary={() => setOverlay("glossario")}
          onRestart={backToLevels}
          onExit={() => navigate({ to: "/" })}
        />
      )}
    </main>
  );
}

// ---------------------------------------------------------------- aviso do fim de tarde / noite
/** Quanto tempo (ms) o aviso fica parado na tela antes de começar a sair. */
const AVISO_FICA_MS = 4500;
/** Duração da saída (tem que bater com a animação aviso-sai em styles.css). */
const AVISO_SAI_MS = 1100;

/**
 * Aviso que cai do topo do mapa, fica alguns segundos (a barrinha embaixo mostra o tempo
 * acabando) e depois sobe se apagando aos poucos. Não bloqueia o toque no mapa.
 */
function AvisoHora({ texto, noite, onFim }: { texto: string; noite: boolean; onFim: () => void }) {
  const [saindo, setSaindo] = useState(false);
  const fimRef = useRef(onFim);
  fimRef.current = onFim;
  useEffect(() => {
    const a = setTimeout(() => setSaindo(true), AVISO_FICA_MS);
    const b = setTimeout(() => fimRef.current(), AVISO_FICA_MS + AVISO_SAI_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  return (
    // no caminho de cima, entre os painéis e a antena: não cobre nenhum ❗
    <div className="pointer-events-none absolute left-1/2 top-[3%] z-10 w-[40%] -translate-x-1/2">
      <div
        role="status"
        className={`relative overflow-hidden border-4 px-2 pb-2.5 pt-1.5 text-center text-xs font-bold leading-snug shadow-[0_4px_0_#4a2615] sm:text-sm ${
          saindo ? "aviso-sai" : "aviso-entra"
        } ${
          noite
            ? "border-[#ffe9a8] bg-[#2b2350] text-[#ffe9a8]"
            : "border-[#4a2615] bg-[#ffd9a0] text-[#3a1f10]"
        }`}
      >
        <span className="aviso-icone inline-block">
          <PixelIcon name={noite ? "lua" : "entardecer"} size={18} />
        </span>{" "}
        {texto}
        {/* barrinha do tempo: vai encolhendo até o aviso sair */}
        <span
          aria-hidden
          className={`aviso-tempo absolute bottom-0 left-0 h-1 w-full origin-left ${
            noite ? "bg-[#ffe9a8]" : "bg-[#e2672b]"
          }`}
          style={{ animationDuration: `${AVISO_FICA_MS}ms` }}
        />
      </div>
    </div>
  );
}
