import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LangSelector } from "@/components/AppHeader";
import { useDocumentTitle, useT } from "@/i18n";
import { listSaves } from "@/lib/saves";

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

// ---------------------------------------------------------------- tela inicial = a arte do hub
// A arte inteira (public/assets/hub/cena.webp, 1672×941) é a MESMA imagem do menu, só sem os
// textos: o título e os botões são escritos por cima, nas mesmas posições do desenho, para
// funcionar nos 5 idiomas. Posições e tamanhos abaixo estão em % da arte (medidos no desenho).
const ARTE_W = 1672;
const ARTE_H = 941;
const pctX = (px: number) => (px / ARTE_W) * 100;
const pctY = (px: number) => (px / ARTE_H) * 100;

/** Em PT, cada texto ocupa exatamente a largura do desenho; outros idiomas encolhem para caber. */
const TITULO = { linha1: { y0: 32, y1: 112 }, linha2: { y0: 124, y1: 193 }, largura: 1227 - 459 };
const TITULO_MAX = 62; // % da arte: título traduzido mais comprido não passa disso
const BOTAO = { x0: 527, x1: 1142, alturaPx: 109, y1: 710, y2: 816 };
const BOTAO_TEXTO = 1060 - 615; // largura de "Continuar missão" no desenho
const BOTAO_MAX = 31; // % da arte: cabe dentro do botão

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

function Home() {
  const t = useT();
  useDocumentTitle();
  const [hasSave, setHasSave] = useState(false);
  useEffect(() => setHasSave(listSaves().length > 0), []);
  const fonte = useFonteCarregada();

  // título em duas linhas, quebrando depois do ":" (como no desenho)
  const full = t("app.title");
  const colon = full.indexOf(":");
  const [l1, l2] =
    colon === -1 ? [full, ""] : [full.slice(0, colon + 1), full.slice(colon + 1).trim()];

  // tamanhos em cqw (% da largura da arte), calculados uma vez por idioma/fonte
  const [tamTitulo, tamBotao] = (() => {
    void fonte;
    const ref = pctX(TITULO.largura) / larguraEm("Operação Marte:");
    const tit = Math.min(ref, ...[l1, l2].filter(Boolean).map((l) => TITULO_MAX / larguraEm(l)));
    const refB = pctX(BOTAO_TEXTO) / larguraEm("Continuar missão");
    const bot = Math.min(
      refB,
      BOTAO_MAX / larguraEm(t("playNow")),
      BOTAO_MAX / larguraEm(t("continueMission")),
    );
    return [tit, bot];
  })();

  const linhaTitulo = (texto: string, y0: number, y1: number) => (
    <span
      className="absolute inset-x-0 flex items-center justify-center whitespace-nowrap"
      style={{ top: `${pctY(y0)}%`, height: `${pctY(y1 - y0)}%` }}
    >
      {texto}
    </span>
  );

  // estilo dos botões: o próprio desenho do botão (sem texto) + texto grosso como no desenho
  const estiloBotao = {
    background: "center / 100% 100% no-repeat url(/assets/hub/botao.png)",
    WebkitTextStroke: "0.16cqw #f6e38c",
    paintOrder: "stroke fill",
    textShadow: "0.2cqw 0.25cqw 0 #5a1d07",
  } as const;
  const classeBotao =
    "pixelated flex items-center justify-center whitespace-nowrap font-bold text-[#f6e38c] transition hover:brightness-110 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight";

  /** botão por cima da arte, na mesma posição do desenho (telas deitadas) */
  const botaoNaArte = (to: "new" | "continue", texto: string, y: number) => (
    <Link
      to="/play"
      search={{ mode: to }}
      className={`${classeBotao} absolute pb-[0.6cqw] portrait:hidden`}
      style={{
        ...estiloBotao,
        left: `${pctX(BOTAO.x0)}%`,
        width: `${pctX(BOTAO.x1 - BOTAO.x0)}%`,
        top: `${pctY(y)}%`,
        height: `${pctY(BOTAO.alturaPx)}%`,
        fontSize: `${tamBotao}cqw`,
      }}
    >
      {texto}
    </Link>
  );

  /** "De onde vêm os dados?" · "Sobre o projeto" + crédito do Space Apps */
  const rodape = (className: string, style?: React.CSSProperties) => (
    <div
      className={`flex flex-col items-center gap-0.5 text-center [text-shadow:1px_1px_0_#1c0703] ${className}`}
      style={style}
    >
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
    <main className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[linear-gradient(to_bottom,#2a060c,#3a0d10_55%,#4a1512)] portrait:justify-center">
      {/* idioma: canto de cima, à direita */}
      <div className="absolute right-2 top-2 z-20">
        <LangSelector />
      </div>

      {/* área da arte: a imagem aparece INTEIRA (sem cortar), do maior tamanho que couber */}
      <div
        className={`flex w-full justify-center landscape:min-h-0 landscape:flex-1 landscape:[container-type:size] ${
          hasSave ? "landscape:items-end" : "landscape:items-center"
        }`}
      >
        <div
          className="relative w-full [container-type:size] landscape:w-[min(100cqw,calc(100cqh*1672/941))]"
          style={{ aspectRatio: `${ARTE_W} / ${ARTE_H}` }}
        >
          <img
            src="/assets/hub/cena.webp"
            alt=""
            aria-hidden
            width={ARTE_W}
            height={ARTE_H}
            fetchPriority="high"
            className="pixelated pointer-events-none absolute inset-0 h-full w-full select-none"
          />

          <h1
            className="absolute inset-0 font-display font-bold leading-none text-[#f3c916]"
            style={{
              fontSize: `${tamTitulo}cqw`,
              // letra grossa como no desenho (contorno da mesma cor) + sombra
              WebkitTextStroke: "0.3cqw #f3c916",
              paintOrder: "stroke fill",
              textShadow: "0 0.3cqw 0 #a86a00, 0.25cqw 0.5cqw 0 #2a0508",
            }}
          >
            {linhaTitulo(l1, TITULO.linha1.y0, TITULO.linha1.y1)}
            {l2 && linhaTitulo(l2, TITULO.linha2.y0, TITULO.linha2.y1)}
          </h1>

          {/* tela deitada: os botões ficam em cima da arte, onde estão no desenho */}
          {botaoNaArte("new", t("playNow"), BOTAO.y1)}
          {hasSave
            ? botaoNaArte("continue", t("continueMission"), BOTAO.y2)
            : // sem missão salva não tem "Continuar": os links ficam logo abaixo do "Jogar"
              rodape("absolute inset-x-0 portrait:hidden", {
                top: `${pctY(BOTAO.y2 + 6)}%`,
                fontSize: "max(12px, 1.3cqw)",
              })}
        </div>
      </div>

      {/* tela deitada com missão salva: os links ficam logo abaixo do "Continuar" (fora da arte) */}
      {hasSave && rodape("shrink-0 py-1 text-sm portrait:hidden")}

      {/* celular em pé: a arte inteira fica pequena, então os botões vêm logo embaixo dela,
          grandes para o dedo, e os links logo abaixo do último botão */}
      <div className="flex w-full flex-col items-center gap-3 px-4 pt-4 landscape:hidden">
        <Link
          to="/play"
          search={{ mode: "new" }}
          className={`${classeBotao} aspect-[615/109] w-[min(22rem,90vw)] pb-1 text-[clamp(1.1rem,6vw,1.6rem)]`}
          style={estiloBotao}
        >
          {t("playNow")}
        </Link>
        {hasSave && (
          <Link
            to="/play"
            search={{ mode: "continue" }}
            className={`${classeBotao} aspect-[615/109] w-[min(22rem,90vw)] pb-1 text-[clamp(1.1rem,6vw,1.6rem)]`}
            style={estiloBotao}
          >
            {t("continueMission")}
          </Link>
        )}
        {rodape("text-sm")}
      </div>
    </main>
  );
}
