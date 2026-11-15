// "Como jogar": páginas curtas com arte pixel, navegação Anterior/Próximo.
// Abre no menu do jogo e na tela inicial do site. Números de regra vêm de BALANCE (nunca escritos no texto).
import { useEffect, useState } from "react";
import { BALANCE } from "@/game/engine";
import { atrasoRadioMin } from "@/data/marte";
import { ART } from "./art";
import { PixelIcon } from "./PixelIcon";
import { BOTAO_ESCURO, BotaoHub, MOLDURA_HUB, TituloHub } from "./hub";
import { usePlayer } from "./player";
import { useGT } from "./shared";

type Arte = { icone: string } | { img: string };

interface Pagina {
  id: string;
  arte: Arte[];
  linhas: number;
}

const PAGINAS: Pagina[] = [
  { id: "objetivo", arte: [{ icone: "estrela" }, { icone: "estrela" }, { icone: "estrela" }], linhas: 3 },
  { id: "andar", arte: [{ img: "astronauta" }, { icone: "porta" }, { icone: "computador" }], linhas: 3 },
  { id: "alertas", arte: [{ icone: "alerta" }, { icone: "ampulheta" }, { icone: "urgente" }], linhas: 4 },
  {
    id: "energia",
    arte: [{ icone: "raio" }, { icone: "o2" }, { icone: "batata" }, { icone: "microscopio" }, { icone: "escudo" }],
    linhas: 4,
  },
  { id: "dia", arte: [{ icone: "sol" }, { icone: "entardecer" }, { icone: "lua" }, { icone: "cama" }], linhas: 4 },
  { id: "sol", arte: [{ icone: "sol" }, { icone: "radiacao" }, { icone: "escudo" }, { img: "abrigo" }], linhas: 3 },
  { id: "real", arte: [{ icone: "ao_vivo" }, { icone: "radio" }, { icone: "livro" }, { img: "rover" }], linhas: 4 },
];

/** números das regras usados nos textos das páginas */
function numeros() {
  return {
    pct: Math.round(BALANCE.ESTRELA_2_EM * 100),
    ar: BALANCE.AR_POR_ENERGIA,
    comida: BALANCE.COMIDA_POR_ENERGIA,
    ciencia: BALANCE.CIENCIA_POR_ENERGIA,
    escudo: BALANCE.ENERGIA_POR_ESCUDO,
    cansaco: BALANCE.SAUDE_AO_ANOITECER,
    dano: BALANCE.SAUDE_POR_ALERTA_PERDIDO,
    reducao: Math.round(BALANCE.ESCUDO_REDUCAO * 100),
    max: BALANCE.ESCUDO_MAX,
  };
}

export function ComoJogar({ onClose }: { onClose: () => void }) {
  const { t } = useGT();
  const { gender } = usePlayer();
  const [i, setI] = useState(0);
  // atraso do rádio de hoje: calculado só no navegador (a data muda)
  const [min, setMin] = useState<number | null>(null);
  useEffect(() => setMin(atrasoRadioMin()), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => Math.min(PAGINAS.length - 1, x + 1));
      if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const p = PAGINAS[i]!;
  const vars = { ...numeros(), min: min ?? "…" };
  const ultima = i === PAGINAS.length - 1;
  const titulo = t("ajuda.titulo");
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      className="fixed inset-0 z-[45] flex items-center justify-center bg-[#1c0703]/60 p-2 backdrop-blur-[2px] sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${MOLDURA_HUB} relative flex max-h-[96dvh] w-full max-w-lg flex-col overflow-y-auto lg:max-w-2xl`}
        style={{ backgroundImage: "linear-gradient(to bottom, #4a1a08, #2a0508)" }}
      >
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <TituloHub as="h2" className="text-[clamp(1.1rem,5vw,1.9rem)] leading-none">
              {titulo}
            </TituloHub>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("ui.fechar")}
              className="grid h-12 w-12 shrink-0 place-items-center active:translate-y-0.5"
            >
              <PixelIcon name="btn_fechar" size={42} />
            </button>
          </div>

          {/* arte da página */}
          <div className="flex min-h-20 items-center justify-center gap-3 border-4 border-[#5a1d07] bg-[#f8dfba] p-3 shadow-[inset_0_3px_0_#c9a27c]" aria-hidden>
            {p.arte.map((a, k) =>
              "icone" in a ? (
                <PixelIcon key={k} name={a.icone} size={48} />
              ) : (
                <img
                  key={k}
                  src={a.img === "astronauta" ? ART.astronaut.frame(gender, "s", 1) : ART.icons[a.img as "abrigo" | "rover"]}
                  alt=""
                  className="pixelated h-12 w-12 object-contain"
                />
              ),
            )}
          </div>

          <h3 className="font-display text-[clamp(0.95rem,4vw,1.35rem)] font-bold text-[#f6e38c] [text-shadow:2px_2px_0_#1c0703]">
            {t(`ajuda.${p.id}.titulo`)}
          </h3>
          <ul className="flex flex-col gap-2" aria-live="polite">
            {Array.from({ length: p.linhas }, (_, k) => (
              <li
                key={`${p.id}-${k}`}
                className="flex gap-2 border-4 border-[#5a1d07] bg-[#3b1206]/85 p-2 text-lg leading-snug [@media(max-height:800px)]:py-1 text-[#fbe6c8] shadow-[0_3px_0_#1c0703] sm:text-xl"
              >
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 bg-[#f3c916]" aria-hidden />
                <span>{t(`ajuda.${p.id}.${k + 1}`, vars)}</span>
              </li>
            ))}
          </ul>

          {/* páginas: quadradinhos (o atual em amarelo) */}
          <div className="flex flex-wrap justify-center" aria-label={t("ajuda.pagina", { n: i + 1, total: PAGINAS.length })}>
            {PAGINAS.map((pg, k) => (
              <button
                key={pg.id}
                type="button"
                onClick={() => setI(k)}
                aria-label={t(`ajuda.${pg.id}.titulo`)}
                aria-current={k === i ? "step" : undefined}
                className="grid size-12 shrink-0 place-items-center"
              >
                <span className={`block h-4 w-4 border-2 border-[#1c0703] ${k === i ? "bg-[#f3c916]" : "bg-[#fbe6c8]/35"}`} />
              </button>
            ))}
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
            <BotaoHub principal onClick={() => (ultima ? onClose() : setI((x) => x + 1))}>
              {ultima ? t("ui.fechar") : `${t("ui.proximo")} →`}
            </BotaoHub>
            <button
              type="button"
              disabled={i === 0}
              onClick={() => setI((x) => Math.max(0, x - 1))}
              className={`${BOTAO_ESCURO} text-sm disabled:opacity-40 sm:text-base`}
            >
              ← {t("ajuda.anterior")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
