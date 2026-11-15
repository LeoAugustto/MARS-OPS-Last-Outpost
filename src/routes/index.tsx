import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { LangSelector } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { useDocumentTitle, useT } from "@/i18n";
import { animacaoPausada, guardarAnimacaoPausada } from "@/lib/animacao";
import { listSaves } from "@/lib/saves";
import { ComoJogar } from "@/game/ui/ComoJogar";
import { FullscreenButton } from "@/game/ui/shared";
import { tocarMusica } from "@/game/ui/audio";

// vídeo da cena e o primeiro quadro, servidos como arquivos estáticos de public/:
// funcionam no Lovable e em qualquer build Vite normal (sem depender de rota interna).
// Telas grandes recebem o 4K original; celular e telas menores, a cópia 1080p (mais leve).
const VIDEO_CENA_4K = "/assets/hub/cena_loop_4k.mp4?v=2";
const VIDEO_CENA_1080 = "/assets/hub/cena_loop_1080.mp4?v=2";
const POSTER_CENA = "/assets/hub/cena_poster_1080.webp?v=2";
/** A partir desta largura de tela o navegador escolhe o vídeo 4K. */
const TELA_4K = "(min-width: 1440px)";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operação Marte: Última Base — Jogo de Marte para crianças" },
      {
        name: "description",
        content: "Mantenha sua base em Marte viva! Um jogo educativo com dados reais da NASA.",
      },
      { property: "og:title", content: "Operação Marte: Última Base" },
      {
        property: "og:description",
        content: "Mantenha sua base em Marte viva! Jogo educativo com dados reais da NASA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

// ============================================================ tela inicial
/** Espaço entre as 2 linhas do título (em "em"): os acentos de Ú/É ficam acima da letra. */
const ESPACO_LINHAS = 0.32;
// A cena é um vídeo em loop que cobre a tela INTEIRA (object-cover): não sobra borda em
// nenhum tamanho de tela. Em telas muito deitadas ele corta em cima/embaixo, e em telas
// muito em pé ele corta nas laterais — por isso o texto fica preso em cima e embaixo da
// TELA (não do vídeo), sempre sobre o céu escuro ou sobre o chão.

// Fontes pixel do site (as duas só têm peso 400): título em Press Start 2P, botões em VT323.
const FONTE_TITULO = '400 100px "Press Start 2P"';
const FONTE_BOTAO = "400 100px VT323";
// letras com acento dos 5 idiomas: garante que a parte da fonte com elas também carregou
const ACENTOS = "ÃÇÉÈŒÀÑÌÚãçéèœàñìúõâêôí";
/** Contorno + sombra do texto passam um pouco da letra (em "em"): entram na conta da largura. */
const EXTRA_TITULO = 0.03 + 0.045;
const EXTRA_BOTAO = 0.022 + 0.035;
/** Folga de cada lado do texto dentro da arte do botão (8% + a borda da arte). */
const FOLGA_BOTAO = 0.09;

/**
 * Largura do texto em "em" (1 = tamanho da fonte), medida NO DOCUMENTO com a mesma classe
 * da tela. Medir no canvas dava errado: ele ignora o `font-size-adjust` do styles.css, que
 * aumenta a VT323 e diminui a Press Start 2P na tela.
 */
function larguraEm(texto: string, classe: string, porLetra: number): number {
  if (typeof document === "undefined" || !document.body) return texto.length * porLetra;
  const s = document.createElement("span");
  s.className = classe;
  s.style.cssText =
    "position:absolute;left:-99999px;top:0;visibility:hidden;white-space:nowrap;font-size:100px;line-height:1;font-weight:400;letter-spacing:normal";
  s.textContent = texto;
  document.body.appendChild(s);
  const largura = s.getBoundingClientRect().width / 100;
  s.remove();
  return largura || texto.length * porLetra;
}

/** Recalcula quando as fontes pixel terminam de carregar (antes disso a medida sai errada). */
function useFonteCarregada(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    let vivo = true;
    const recalcular = () => vivo && setN((x) => x + 1);
    const fontes = document.fonts;
    if (!fontes) return;
    void Promise.all([fontes.load(FONTE_TITULO, ACENTOS), fontes.load(FONTE_BOTAO, ACENTOS)])
      .then(recalcular)
      .catch(() => {});
    void fontes.ready.then(recalcular);
    fontes.addEventListener?.("loadingdone", recalcular);
    return () => {
      vivo = false;
      fontes.removeEventListener?.("loadingdone", recalcular);
    };
  }, []);
  return n;
}

/** Mede a tela da home (para os textos caberem em qualquer tamanho, sem rolagem). */
function useTela() {
  const ref = useRef<HTMLElement | null>(null);
  const [tamanho, setTamanho] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      setTamanho((atual) => (atual.w === w && atual.h === h ? atual : { w, h }));
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);
  return [ref, tamanho] as const;
}

/**
 * Mantém a cena tocando sozinha, sem som e em loop — SEMPRE, mesmo com "reduzir movimento"
 * no aparelho (decisão do dono do projeto). Quem quiser parar usa o botão de pausar, e a
 * escolha fica guardada no aparelho.
 * O navegador só deixa o vídeo começar sozinho se ele estiver MUDO na hora do play(): por isso
 * o mudo é forçado antes de cada tentativa, e tenta de novo quando o vídeo carrega, quando a
 * aba volta a aparecer e no primeiro toque (ex.: iPhone em modo de pouca energia).
 */
function useCenaTocando(ref: RefObject<HTMLVideoElement | null>, pausada: boolean) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tocar = () => {
      if (pausada) {
        v.pause();
        return;
      }
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("muted", "");
      v.playsInline = true;
      v.loop = true;
      if (v.paused || v.ended) void v.play().catch(() => {});
    };
    // pausas que não pedimos (aba escondida, economia de energia): volta a tocar
    let espera: ReturnType<typeof setTimeout> | undefined;
    const pausou = () => {
      if (pausada || document.hidden) return;
      clearTimeout(espera);
      espera = setTimeout(tocar, 300);
    };
    // garantia do loop: alguns navegadores param no fim mesmo com `loop`
    const acabou = () => {
      v.currentTime = 0;
      tocar();
    };
    const visivel = () => !document.hidden && tocar();
    const eventosVideo = ["loadedmetadata", "loadeddata", "canplay"] as const;
    const eventosToque = ["pointerdown", "touchstart", "keydown"] as const;
    tocar();
    eventosVideo.forEach((e) => v.addEventListener(e, tocar));
    v.addEventListener("pause", pausou);
    v.addEventListener("ended", acabou);
    document.addEventListener("visibilitychange", visivel);
    eventosToque.forEach((e) => window.addEventListener(e, tocar, { passive: true }));
    return () => {
      clearTimeout(espera);
      eventosVideo.forEach((e) => v.removeEventListener(e, tocar));
      v.removeEventListener("pause", pausou);
      v.removeEventListener("ended", acabou);
      document.removeEventListener("visibilitychange", visivel);
      eventosToque.forEach((e) => window.removeEventListener(e, tocar));
    };
  }, [ref, pausada]);
}

function Home() {
  const t = useT();
  // música do menu (só toca depois do primeiro toque, regra dos navegadores)
  useEffect(() => tocarMusica("tema_menu"), []);
  useDocumentTitle();
  const [hasSave, setHasSave] = useState(false);
  useEffect(() => setHasSave(listSaves().length > 0), []);
  const fonte = useFonteCarregada();
  const [telaRef, { w, h }] = useTela();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // a criança pode pausar a animação; a escolha fica guardada neste aparelho
  const [pausada, setPausada] = useState(false);
  /** páginas "Como jogar" abertas por cima da tela inicial */
  const [ajuda, setAjuda] = useState(false);
  useEffect(() => setPausada(animacaoPausada()), []);
  useCenaTocando(videoRef, pausada);
  const alternarAnimacao = () => {
    const nova = !pausada;
    setPausada(nova);
    guardarAnimacaoPausada(nova);
  };

  // título em duas linhas, quebrando depois do ":" (como no desenho)
  const full = t("app.title");
  const colon = full.indexOf(":");
  const [l1, l2] =
    colon === -1 ? [full, ""] : [full.slice(0, colon + 1), full.slice(colon + 1).trim()];

  // larguras (em "em") medidas com a fonte já carregada: refaz quando a fonte ou o idioma muda
  const textosBotao = [t("playNow"), t("continueMission")];
  const medido = w > 0 && h > 0;
  const medidas = useMemo(() => {
    void fonte;
    // só mede depois que a tela aparece (nunca durante o primeiro desenho/hidratação)
    if (!medido) return { l1: 1, l2: 0, botao: 1 };
    const titulo = (x: string) => larguraEm(x, "font-display", 1) + EXTRA_TITULO;
    const botao = (x: string) => larguraEm(x, "font-sans", 0.5) + EXTRA_BOTAO;
    return {
      l1: titulo(l1),
      l2: l2 ? titulo(l2) : 0,
      // o MAIS LONGO dos dois botões decide o tamanho (os dois usam a mesma letra)
      botao: Math.max(...textosBotao.map(botao)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fonte, l1, l2, textosBotao[0], textosBotao[1], medido]);

  // ---- tamanhos em px, calculados para a tela atual (nada sai da tela) ----
  const retrato = h > w;
  const tamTitulo = (() => {
    if (!w || !h) return 0;
    const linhas = [medidas.l1, medidas.l2].filter(Boolean);
    // as duas linhas juntas (com o espaço entre elas) não podem passar de 30% da altura da tela
    const porAltura = (h * 0.3) / (linhas.length + ESPACO_LINHAS * (linhas.length - 1) + 0.25);
    // cada linha precisa caber em 88% da largura, em qualquer idioma
    const porLargura = Math.min(...linhas.map((l) => (w * 0.88) / l));
    // no desenho original a 1ª linha tem ~46% da largura: não passa muito disso
    const comoNoDesenho = (w * 0.52) / Math.max(medidas.l1, 0.01);
    return Math.max(14, Math.min(porAltura, porLargura, comoNoDesenho));
  })();

  const larguraBotao = (() => {
    if (!w || !h) return 0;
    // deitado: os dois botões ficam lado a lado, para não tapar os astronautas do desenho
    const base = retrato
      ? Math.min(w * 0.86, 352)
      : hasSave
        ? Math.min(w * 0.3, 480)
        : Math.min(w * 0.42, 560);
    return Math.max(base, Math.min(271, w * 0.9)); // altura mínima para o dedo (48px)
  })();
  const alturaBotao = Math.max(48, larguraBotao * (102 / 605));
  const tamBotao = (() => {
    if (!larguraBotao) return 0;
    // o texto (com contorno e sombra) fica dentro da arte, com folga dos dois lados
    const porLargura = (larguraBotao * (1 - 2 * FOLGA_BOTAO)) / medidas.botao;
    // a VT323 tem letra baixinha para o tamanho: deixa ocupar mais da altura do botão
    return Math.max(16, Math.min(porLargura, alturaBotao * 0.72));
  })();

  // enquanto a tela não é medida (primeiro paint), os tamanhos vêm do CSS com clamp()

  // estilo dos botões: o próprio desenho do botão (sem texto) + texto grosso como no desenho
  const estiloBotao = {
    background: "center / 100% 100% no-repeat url(/assets/hub/botao.png?v=2)",
    WebkitTextStroke: "0.022em #f6e38c",
    paintOrder: "stroke fill",
    textShadow: "0.035em 0.045em 0 #5a1d07",
  } as const;
  const classeBotao =
    "pixelated flex items-center justify-center whitespace-nowrap font-sans font-normal leading-none text-[#f6e38c] transition hover:brightness-110 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight";
  const botaoSemMedida =
    "aspect-[605/102] w-[min(86vw,352px)] text-[clamp(1.25rem,6vw,2.1rem)] sm:w-[min(30vw,440px)] sm:text-[clamp(1.4rem,2.8vw,2.3rem)]";

  const botao = (to: "new" | "continue", texto: string) => (
    <Link
      to="/play"
      search={{ mode: to }}
      className={`${classeBotao} pb-[0.08em] ${medido ? "" : botaoSemMedida}`}
      style={
        medido
          ? { ...estiloBotao, width: larguraBotao, height: alturaBotao, fontSize: tamBotao }
          : estiloBotao
      }
    >
      {texto}
    </Link>
  );

  /** "De onde vêm os dados?" · "Sobre o projeto" + crédito do Space Apps */
  const rodape = (
    <div className="flex flex-col items-center gap-0.5 text-center text-xl leading-tight [text-shadow:1px_1px_0_#1c0703]">
      <nav className="flex flex-wrap items-center justify-center gap-x-3">
        <Link
          to="/fontes"
          className="flex min-h-11 items-center text-highlight underline underline-offset-4"
        >
          {t("dataSources")}
        </Link>
        <span aria-hidden className="hidden text-[#fbe6c8]/70 sm:inline">
          ·
        </span>
        <Link
          to="/sobre"
          className="flex min-h-11 items-center text-[#fbe6c8] underline underline-offset-4"
        >
          {t("about")}
        </Link>
      </nav>
      {/* folga dos lados: o botão de pausar a animação fica no canto de baixo */}
      <p className="px-14 text-[0.85em] text-[#fbe6c8]/80">{t("footer")}</p>
    </div>
  );

  return (
    <main
      ref={telaRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#2a060c] text-[#fbe6c8]"
    >
      {/* a cena em loop cobrindo a tela toda, sem deixar borda */}
      <video
        ref={videoRef}
        className="pixelated pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[50%_100%]"
        poster={POSTER_CENA}
        autoPlay
        muted
        loop
        playsInline
        {...{ "webkit-playsinline": "" }}
        preload="auto"
        aria-hidden
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
      >
        {/* o navegador fica com o primeiro <source> que serve para a tela */}
        <source src={VIDEO_CENA_4K} type="video/mp4" media={TELA_4K} />
        <source src={VIDEO_CENA_1080} type="video/mp4" />
      </video>

      {/* sombra forte no alto (onde fica o título) e leve no pé: o texto sempre lê bem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,7,3,0.9)_0%,rgba(28,7,3,0.62)_16%,rgba(28,7,3,0.18)_30%,rgba(28,7,3,0)_52%,rgba(28,7,3,0.8))]"
      />

      {/* como jogar: canto de cima, à esquerda (abre as páginas de ajuda do jogo) */}
      <div className="absolute left-2 top-2 z-20">
        <Button
          type="button"
          variant="chunkySand"
          size="tap"
          className="h-12 gap-1.5 px-3 text-xl"
          onClick={() => setAjuda(true)}
        >
          <img src="/assets/ui/ajuda.png?v=2" alt="" aria-hidden className="pixelated h-7 w-7" />
          {t("howToPlay")}
        </Button>
      </div>
      {ajuda && <ComoJogar onClose={() => setAjuda(false)} />}

      {/* idioma: canto de cima, à direita */}
      <div className="absolute right-2 top-2 z-20 flex items-center gap-2">
        <FullscreenButton />
        <LangSelector />
      </div>

      {/* pausar/continuar a animação: canto de baixo, à direita */}
      <div className="absolute bottom-2 right-2 z-20">
        <Button
          type="button"
          variant="chunkySand"
          size="tap"
          className="h-12 w-12 p-0"
          onClick={alternarAnimacao}
          aria-label={pausada ? t("playAnimation") : t("pauseAnimation")}
          aria-pressed={pausada}
          title={pausada ? t("playAnimation") : t("pauseAnimation")}
        >
          <IconeAnimacao pausada={pausada} />
        </Button>
      </div>

      {/* texto por cima da cena: título no alto (sobre o céu), botões embaixo (sobre o chão).
          o topo respeita o seletor de idioma para o título não encostar nele */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-[3vh] pt-[max(3vh,80px)]">
        <h1
          className={`flex flex-col items-center text-center font-display font-normal leading-none text-[#f3c916] ${
            medido ? "" : "text-[clamp(0.9rem,5.2vw,2.6rem)]"
          }`}
          style={{
            ...(medido ? { fontSize: tamTitulo } : {}),
            gap: `${ESPACO_LINHAS}em`,
            // contorno fino da mesma cor (a Press Start 2P já é grossa) + sombra
            WebkitTextStroke: "0.03em #f3c916",
            paintOrder: "stroke fill",
            textShadow: "0 0.05em 0 #a86a00, 0.045em 0.09em 0 #2a0508",
          }}
        >
          <span className="whitespace-nowrap">{l1}</span>
          {l2 && <span className="whitespace-nowrap">{l2}</span>}
        </h1>

        <div className="flex w-full flex-col items-center gap-3">
          <div
            className={`flex w-full items-center justify-center gap-3 ${
              retrato ? "flex-col" : "flex-row flex-wrap"
            }`}
          >
            {botao("new", t("playNow"))}
            {hasSave && botao("continue", t("continueMission"))}
          </div>
          {rodape}
        </div>
      </div>
    </main>
  );
}

/** Ícone pixel do botão da animação: "play" (triângulo em degraus) ou "pausa" (2 barras). */
function IconeAnimacao({ pausada }: { pausada: boolean }) {
  return (
    <svg
      viewBox="0 0 10 10"
      width={24}
      height={24}
      aria-hidden
      shapeRendering="crispEdges"
      className="h-6 w-6 fill-current"
    >
      {pausada ? (
        <>
          <rect x="2" y="1" width="2" height="8" />
          <rect x="4" y="2" width="2" height="6" />
          <rect x="6" y="3" width="1" height="4" />
          <rect x="7" y="4" width="1" height="2" />
        </>
      ) : (
        <>
          <rect x="2" y="1" width="2" height="8" />
          <rect x="6" y="1" width="2" height="8" />
        </>
      )}
    </svg>
  );
}
