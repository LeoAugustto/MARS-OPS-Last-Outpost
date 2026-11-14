import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LangSelector } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";
import { listSaves } from "@/lib/saves";
import cenaLoop from "@/assets/cena_loop.mp4.asset.json";
import cenaPoster from "@/assets/cena_poster.webp.asset.json";

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
// A cena é um vídeo em loop que cobre a tela INTEIRA (object-cover): não sobra borda em
// nenhum tamanho de tela. Em telas muito deitadas ele corta em cima/embaixo, e em telas
// muito em pé ele corta nas laterais — por isso o texto fica preso em cima e embaixo da
// TELA (não do vídeo), sempre sobre o céu escuro ou sobre o chão.

/** Largura do texto em "em" (1 = tamanho da fonte), medida com a fonte do jogo. */
function larguraEm(texto: string): number {
  if (typeof document === "undefined") return texto.length * 0.6;
  const c = document.createElement("canvas").getContext("2d");
  if (!c) return texto.length * 0.6;
  c.font = '700 100px "Pixelify Sans"';
  return c.measureText(texto).width / 100;
}

/** Recalcula quando a fonte pixel art termina de carregar (antes disso a medida sai errada). */
function useFonteCarregada(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    let vivo = true;
    document.fonts?.load('700 100px "Pixelify Sans"').then(() => vivo && setN((x) => x + 1));
    return () => {
      vivo = false;
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

/** Quem pediu "menos movimento" vê a cena parada (o primeiro quadro), sem o vídeo rodando. */
function useSemMovimento(): boolean {
  const [parado, setParado] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setParado(mq.matches);
    const mudar = () => setParado(mq.matches);
    mq.addEventListener?.("change", mudar);
    return () => mq.removeEventListener?.("change", mudar);
  }, []);
  return parado;
}

function Home() {
  const t = useT();
  useDocumentTitle();
  const [hasSave, setHasSave] = useState(false);
  useEffect(() => setHasSave(listSaves().length > 0), []);
  const fonte = useFonteCarregada();
  const [telaRef, { w, h }] = useTela();
  const semMovimento = useSemMovimento();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // vídeo em loop: se o navegador bloquear o início automático, tenta de novo uma vez
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (semMovimento) v.pause();
    else void v.play().catch(() => {});
  }, [semMovimento]);

  // título em duas linhas, quebrando depois do ":" (como no desenho)
  const full = t("app.title");
  const colon = full.indexOf(":");
  const [l1, l2] =
    colon === -1 ? [full, ""] : [full.slice(0, colon + 1), full.slice(colon + 1).trim()];

  // ---- tamanhos em px, calculados para a tela atual (nada sai da tela) ----
  const retrato = h > w;
  const tamTitulo = (() => {
    void fonte;
    if (!w || !h) return 0;
    const linhas = [l1, l2].filter(Boolean);
    // as duas linhas juntas não podem passar de 30% da altura da tela
    const porAltura = (h * 0.3) / (linhas.length + 0.25);
    // cada linha precisa caber em 88% da largura, em qualquer idioma
    const porLargura = Math.min(...linhas.map((l) => (w * 0.88) / larguraEm(l)));
    // no desenho original a 1ª linha tem ~46% da largura: não passa muito disso
    const comoNoDesenho = (w * 0.52) / Math.max(larguraEm(l1), 0.01);
    return Math.max(14, Math.min(porAltura, porLargura, comoNoDesenho));
  })();

  const larguraBotao = (() => {
    if (!w || !h) return 0;
    // deitado: os dois botões ficam lado a lado, para não tapar os astronautas do desenho
    const base = retrato
      ? Math.min(w * 0.86, 352)
      : hasSave
        ? Math.min(w * 0.3, 420)
        : Math.min(w * 0.42, 560);
    return Math.max(base, Math.min(271, w * 0.9)); // altura mínima para o dedo (48px)
  })();
  const alturaBotao = Math.max(48, larguraBotao * (109 / 615));
  const tamBotao = (() => {
    void fonte;
    if (!larguraBotao) return 0;
    const textos = [t("playNow"), t("continueMission")];
    const porLargura = Math.min(...textos.map((x) => (larguraBotao * 0.86) / larguraEm(x)));
    return Math.max(14, Math.min(porLargura, alturaBotao * 0.58));
  })();

  // enquanto a tela não é medida (primeiro paint), os tamanhos vêm do CSS com clamp()
  const medido = w > 0 && h > 0;

  // estilo dos botões: o próprio desenho do botão (sem texto) + texto grosso como no desenho
  const estiloBotao = {
    background: "center / 100% 100% no-repeat url(/assets/hub/botao.png)",
    WebkitTextStroke: "0.022em #f6e38c",
    paintOrder: "stroke fill",
    textShadow: "0.035em 0.045em 0 #5a1d07",
  } as const;
  const classeBotao =
    "pixelated flex items-center justify-center whitespace-nowrap font-bold text-[#f6e38c] transition hover:brightness-110 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight";
  const botaoSemMedida =
    "aspect-[615/109] w-[min(86vw,352px)] text-[clamp(1rem,4.2vw,1.6rem)] sm:w-[min(30vw,440px)] sm:text-[clamp(1.1rem,2.2vw,1.8rem)]";

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
    <div className="flex flex-col items-center gap-0.5 text-center [text-shadow:1px_1px_0_#1c0703]">
      <nav className="flex flex-wrap items-center justify-center gap-x-3 font-semibold">
        <Link
          to="/fontes"
          className="flex min-h-8 items-center text-highlight underline underline-offset-4"
        >
          {t("dataSources")}
        </Link>
        <span aria-hidden className="text-[#fbe6c8]/70">
          ·
        </span>
        <Link
          to="/sobre"
          className="flex min-h-8 items-center text-[#fbe6c8] underline underline-offset-4"
        >
          {t("about")}
        </Link>
      </nav>
      <p className="text-[0.8em] text-[#fbe6c8]/75">{t("footer")}</p>
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
        className="pixelated pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        src={cenaLoop.url}
        poster={cenaPoster.url}
        autoPlay={!semMovimento}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        disablePictureInPicture
      />

      {/* sombra forte no alto (onde fica o título) e leve no pé: o texto sempre lê bem */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,7,3,0.9)_0%,rgba(28,7,3,0.62)_16%,rgba(28,7,3,0.18)_30%,rgba(28,7,3,0)_52%,rgba(28,7,3,0.8))]"
      />

      {/* idioma: canto de cima, à direita */}
      <div className="absolute right-2 top-2 z-20">
        <LangSelector />
      </div>

      {/* texto por cima da cena: título no alto (sobre o céu), botões embaixo (sobre o chão).
          o topo respeita o seletor de idioma para o título não encostar nele */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-[3vh] pt-[max(3vh,54px)]">
        <h1
          className={`flex flex-col items-center gap-[0.08em] text-center font-display font-bold leading-none text-[#f3c916] ${
            medido ? "" : "text-[clamp(1.1rem,7.2vw,3.4rem)]"
          }`}
          style={{
            ...(medido ? { fontSize: tamTitulo } : {}),
            // letra grossa como no desenho (contorno da mesma cor) + sombra
            WebkitTextStroke: "0.05em #f3c916",
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
