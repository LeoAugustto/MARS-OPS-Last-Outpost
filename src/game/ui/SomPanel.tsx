// Menu de som: liga/desliga tudo e volume de música, efeitos, ambiente e vozes.
import { useEffect, useState } from "react";
import { getPrefs, ouvirPrefs, setPrefs, tocarEfeito, type Canal } from "./audio";
import { BotaoHub, MOLDURA_HUB, TituloHub } from "./hub";
import { PixelIcon } from "./PixelIcon";
import { useGT } from "./shared";

const CANAIS: { c: Canal; icone: string }[] = [
  { c: "musica", icone: "radio" },
  { c: "efeitos", icone: "raio" },
  { c: "ambiente", icone: "sol" },
  { c: "voz", icone: "som" },
];
const PASSOS = 10;

export function useSom() {
  const [p, setP] = useState(getPrefs);
  useEffect(() => ouvirPrefs(() => setP(getPrefs())), []);
  return p;
}

export function SomPanel({ onClose }: { onClose: () => void }) {
  const { t } = useGT();
  const p = useSom();
  const muda = (c: Canal, d: number) => {
    const n = Math.round(Math.min(1, Math.max(0, p[c] + d / PASSOS)) * PASSOS) / PASSOS;
    setPrefs({ [c]: n });
    if (c === "efeitos") setTimeout(() => tocarEfeito("clique"), 0);
  };
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ui.som.titulo")}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c0703]/55 p-3 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${MOLDURA_HUB} relative max-h-[94dvh] w-full max-w-md overflow-y-auto bg-[#3a1206]`}
        style={{ backgroundImage: "linear-gradient(to bottom, #4a1a08, #2a0508)" }}
      >
        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <TituloHub as="h2" className="text-3xl leading-none">
              {t("ui.som.titulo")}
            </TituloHub>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("ui.fechar")}
              className="grid h-12 w-12 place-items-center active:translate-y-0.5"
            >
              <PixelIcon name="btn_fechar" size={42} />
            </button>
          </div>

          <BotaoHub principal onClick={() => setPrefs({ ligado: !p.ligado })}>
            <PixelIcon name="som" /> {p.ligado ? t("ui.som.ligado") : t("ui.som.desligado")}
          </BotaoHub>

          <ul className={`flex flex-col gap-2 ${p.ligado ? "" : "opacity-50"}`}>
            {CANAIS.map(({ c, icone }) => {
              const nivel = Math.round(p[c] * PASSOS);
              return (
                <li
                  key={c}
                  className="flex items-center gap-2 border-4 border-[#5a1d07] bg-[#3b1206]/85 p-2 text-[#fbe6c8] shadow-[0_3px_0_#1c0703]"
                >
                  <PixelIcon name={icone} size={28} />
                  <span className="w-20 shrink-0 font-display text-sm font-bold sm:w-24 sm:text-base">
                    {t(`ui.som.${c}`)}
                  </span>
                  <button
                    type="button"
                    disabled={!p.ligado || nivel <= 0}
                    onClick={() => muda(c, -1)}
                    aria-label={`− ${t(`ui.som.${c}`)}`}
                    className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#a8400f] bg-[#5a1d07] text-2xl font-black text-[#f6e38c] active:translate-y-0.5 disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="flex min-w-0 flex-1 gap-[2px]" aria-label={`${nivel * 10}%`} role="img">
                    {Array.from({ length: PASSOS }, (_, i) => (
                      <span key={i} className={`h-5 flex-1 ${i < nivel ? "bg-[#f3c916]" : "bg-[#1c0703]/70"}`} />
                    ))}
                  </span>
                  <button
                    type="button"
                    disabled={!p.ligado || nivel >= PASSOS}
                    onClick={() => muda(c, 1)}
                    aria-label={`+ ${t(`ui.som.${c}`)}`}
                    className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#a8400f] bg-[#5a1d07] text-2xl font-black text-[#f6e38c] active:translate-y-0.5 disabled:opacity-40"
                  >
                    +
                  </button>
                </li>
              );
            })}
          </ul>

          <BotaoHub onClick={onClose}>
            <PixelIcon name="play" /> {t("ui.menu.voltar")}
          </BotaoHub>
        </div>
      </div>
    </div>
  );
}
