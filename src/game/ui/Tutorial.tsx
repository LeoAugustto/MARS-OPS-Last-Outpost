// Tutorial do sol 1: o Rovi explica um passo de cada vez e espera a criança fazer a ação.
// Cada passo aponta (seta pixel + moldura piscando) para um elemento marcado com data-tut="...".
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BOTAO_ESCURO } from "./hub";
import { DialogBox, useGT } from "./shared";

/** Ordem dos passos. O progresso é salvo como índice nesta lista (SaveData.tut). */
export const TUT_PASSOS = [
  "andar", // este é você: toque no chão para andar
  "porta", // um prédio tem alerta: ande até a porta para entrar
  "computador", // dentro: toque no computador
  "custo", // na carta: toda escolha custa, olhe os números
  "barras", // ar, comida e saúde
  "antena", // só se houver alerta na antena
  "energia", // toque em Energia
  "mais", // aperte + em algum módulo
  "pronto", // toque em Pronto
  "relogio", // o relógio anda: durma antes da noite
  "casa", // a cama fica na Casa
] as const;
export type TutPasso = (typeof TUT_PASSOS)[number];
export const TUT_FIM = TUT_PASSOS.length;
export const tutIndice = (p: TutPasso) => TUT_PASSOS.indexOf(p);

/** Passos que esperam a criança fazer algo (não têm botão "Entendi!"). */
const ESPERA_ACAO = new Set<TutPasso>([
  "andar",
  "porta",
  "computador",
  "custo",
  "energia",
  "mais",
  "pronto",
]);

/** O que mostrar agora: o texto e o elemento apontado (data-tut). */
export interface TutAgora {
  passo: TutPasso;
  texto: string;
  alvo?: string | undefined;
}

/** Aviso do Rovi na hora certa (uma vez por missão): mesmo balão, com botão OK e seta opcional. */
export function RoviAviso({
  texto,
  alvo,
  onOk,
}: {
  texto: string;
  alvo?: string | undefined;
  onOk: () => void;
}) {
  return <Balao texto={texto} alvo={alvo} onOk={onOk} okKey="botao.ok" />;
}

/** Mede o elemento apontado a cada quadro (o astronauta anda, a carta rola). */
function useAlvo(alvo: string | undefined) {
  const [r, setR] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  useEffect(() => {
    setR(null);
    if (!alvo) return;
    let raf = 0;
    let ultimo = "";
    let rolou = false;
    const medir = () => {
      const el = document.querySelector<HTMLElement>(`[data-tut="${alvo}"]`);
      const b = el?.getBoundingClientRect();
      const ok = !!b && b.width > 0 && b.height > 0;
      if (el && ok && !rolou) {
        rolou = true;
        el.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
      const chave = ok ? `${Math.round(b!.left)},${Math.round(b!.top)},${Math.round(b!.width)},${Math.round(b!.height)}` : "";
      if (chave !== ultimo) {
        ultimo = chave;
        setR(ok ? { x: b!.left, y: b!.top, w: b!.width, h: b!.height } : null);
      }
      raf = requestAnimationFrame(medir);
    };
    medir();
    return () => cancelAnimationFrame(raf);
  }, [alvo]);
  return r;
}

/** Seta pixel (desenhada em quadradinhos) com contorno escuro. Aponta para baixo. */
function SetaPixel() {
  return (
    <svg
      viewBox="0 0 10 10"
      width={40}
      height={40}
      shapeRendering="crispEdges"
      aria-hidden
      style={{
        filter:
          "drop-shadow(2px 0 0 #3a1206) drop-shadow(-2px 0 0 #3a1206) drop-shadow(0 2px 0 #3a1206) drop-shadow(0 -2px 0 #3a1206)",
      }}
    >
      <path d="M3 0h4v4h3v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1v-1h-1v-1h-1v-1h-1v-1h3z" fill="#ffd23f" />
      <path d="M4 1h1v3h-1z" fill="#fff6c8" />
    </svg>
  );
}

/** Seta + moldura no alvo e o balão do Rovi do lado oposto da tela. */
export function TutorialGuia({
  agora,
  onOk,
  onSkip,
}: {
  agora: TutAgora;
  onOk: () => void;
  onSkip: () => void;
}) {
  return (
    <Balao
      texto={agora.texto}
      alvo={agora.alvo}
      onOk={ESPERA_ACAO.has(agora.passo) ? undefined : onOk}
      onSkip={onSkip}
    />
  );
}

function Balao({
  texto,
  alvo,
  onOk,
  onSkip,
  okKey = "tut.ok",
}: {
  texto: string;
  alvo?: string | undefined;
  /** sem onOk: o passo espera a criança fazer a ação */
  onOk?: (() => void) | undefined;
  onSkip?: () => void;
  okKey?: string;
}) {
  const { t } = useGT();
  const r = useAlvo(alvo);
  const espera = !onOk;
  const altura = typeof window === "undefined" ? 800 : window.innerHeight;
  // alvo na metade de baixo: balão em cima (e vice-versa), para não cobrir o que ele aponta
  const balaoEmCima = !!r && r.y + r.h / 2 > altura / 2;
  const setaEmCima = !!r && r.y > 60;
  return (
    <>
      {r && (
        <>
          <span
            aria-hidden
            className="pointer-events-none fixed z-[60] animate-pulse border-4 border-dashed border-[#ffd23f] shadow-[0_0_0_3px_#3a1206]"
            style={{ left: r.x - 6, top: r.y - 6, width: r.w + 12, height: r.h + 12 }}
          />
          <span
            aria-hidden
            className="pointer-events-none fixed z-[61]"
            style={{
              left: r.x + r.w / 2 - 20,
              top: setaEmCima ? r.y - 54 : r.y + r.h + 14,
              transform: setaEmCima ? undefined : "rotate(180deg)",
            }}
          >
            <span className="block animate-bounce">
              <SetaPixel />
            </span>
          </span>
        </>
      )}
      <div
        className={`pointer-events-auto fixed inset-x-2 z-[62] mx-auto flex max-w-md flex-col gap-1 sm:max-w-xl 2xl:max-w-3xl ${
          balaoEmCima ? "top-2" : "bottom-2"
        }`}
        role="status"
      >
        <DialogBox speaker="rovi" text={t(texto)} compact />
        <div className="flex items-center gap-2">
          {!espera && (
            <Button variant="chunky" size="tap" className="h-12 min-w-0 flex-1 text-lg" onClick={onOk}>
              {t(okKey)}
            </Button>
          )}
          {onSkip && (
            <button
              type="button"
              className={`${BOTAO_ESCURO} h-12 shrink-0 text-lg ${espera ? "ml-auto" : ""}`}
              onClick={onSkip}
            >
              {t("tut.pular")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
