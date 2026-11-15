// Janelas do jogo: energia, manhã, noite, lugar, glossário e menu.
import { tocarEfeito } from "./audio";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/AppHeader";
import {
  BALANCE,
  allocationTotal,
  type Allocation,
  type GameState,
  type ModuleKey,
  type PlaceId,
} from "@/game/engine";
import { ART } from "./art";
import { PixelIcon } from "./PixelIcon";
import { BOTAO_CONTAINER, BOTAO_ESCURO, BotaoHub, LETRA_BOTAO, MOLDURA_HUB, TituloHub } from "./hub";
import { DialogBox, Modal, PlaceIcon, PlaceScene, useGT } from "./shared";

// ---------------------------------------------------------------- energia
const MODULOS: { k: ModuleKey; icon: string }[] = [
  { k: "ar", icon: "o2" },
  { k: "estufa", icon: "batata" },
  { k: "ciencia", icon: "microscopio" },
  { k: "escudo", icon: "escudo" },
];

/** números do jogo para os textos de energia (nunca escritos à mão no texto) */
export const NUMEROS_ENERGIA = {
  ar: BALANCE.AR_POR_ENERGIA,
  comida: BALANCE.COMIDA_POR_ENERGIA,
  ciencia: BALANCE.CIENCIA_POR_ENERGIA,
  escudo: BALANCE.ENERGIA_POR_ESCUDO,
};

export function EnergyPanel({
  state,
  onSave,
  onClose,
  onMais,
  faltaVisto = true,
  onFaltaVisto,
}: {
  state: GameState;
  onSave: (a: Allocation) => void;
  onClose: () => void;
  /** apertou + em algum módulo (o tutorial espera por isso) */
  onMais?: () => void;
  /** o Rovi já explicou nesta missão o que acontece quando falta energia? */
  faltaVisto?: boolean;
  onFaltaVisto?: () => void;
}) {
  const { t } = useGT();
  const [a, setA] = useState<Allocation>(state.allocation);
  const total = allocationTotal(a);
  const hoje = state.energiaHoje;
  // + só enquanto houver energia do dia; o escudo para no que falta para as camadas máximas
  const escudoUtil = Math.max(0, BALANCE.ESCUDO_MAX - state.escudo) * BALANCE.ENERGIA_POR_ESCUDO;
  const podeMais = (k: keyof Allocation) => total < hoje && (k !== "escudo" || a.escudo < escudoUtil);
  // a divisão pede mais energia do que há: o Rovi explica (uma vez por missão) o que desliga primeiro
  const [roviFalta, setRoviFalta] = useState(false);
  useEffect(() => {
    if (total > hoje && !faltaVisto && !roviFalta) {
      setRoviFalta(true);
      onFaltaVisto?.();
    }
  }, [total, hoje, faltaVisto, roviFalta, onFaltaVisto]);
  const muda = (k: ModuleKey, d: number) =>
    setA((cur) => ({ ...cur, [k]: Math.max(0, Math.min(BALANCE.ALOCACAO_MAX, cur[k] + d)) }));

  return (
    <Modal label={t("ui.energia.titulo")} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-bold text-secondary">
          <PixelIcon name="raio" size={32} /> {t("ui.energia.titulo")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("ui.energia.explica")}</p>
        <p className="text-lg font-extrabold">{t("ui.energia.hoje", { n: hoje })}</p>
        {MODULOS.map(({ k, icon }) => (
          <div key={k} className="flex items-center gap-2 border-2 border-border bg-muted p-2">
            <PixelIcon name={icon} size={32} />
            <div className="flex-1">
              <div className="font-bold">{t(`modulo.${k}`)}</div>
              <div className="text-xs text-muted-foreground">{t(`ui.energia.rende.${k}`, NUMEROS_ENERGIA)}</div>
            </div>
            <Button
              variant="chunkySand"
              size="tap"
              className="w-12 text-xl"
              onClick={() => {
                muda(k, -1);
                tocarEfeito("clique_grave");
                onMais?.();
              }}
              aria-label={`− ${t(`modulo.${k}`)}`}
            >
              −
            </Button>
            <span className="w-10 text-center text-2xl font-black" aria-live="polite">
              {a[k]}
            </span>
            <Button
              variant="chunky"
              size="tap"
              className="w-12 text-xl"
              data-tut={k === "ar" ? "mais" : undefined}
              disabled={!podeMais(k)}
              onClick={() => {
                muda(k, 1);
                tocarEfeito("clique_agudo");
                onMais?.();
              }}
              aria-label={`+ ${t(`modulo.${k}`)}`}
            >
              +
            </Button>
          </div>
        ))}
        <p className="font-bold">{t("ui.energia.pede", { n: total })}</p>
        {total <= hoje ? (
          <p className="border border-border bg-success/15 p-2 font-bold text-success">
            {t("ui.energia.sobra", { n: hoje - total })}
          </p>
        ) : (
          <p className="border border-border bg-destructive/15 p-2 font-bold text-destructive">
            {t("ui.energia.falta", { n: total - hoje })}
          </p>
        )}
        {roviFalta && total > hoje && <DialogBox speaker="rovi" text={t("rovi.falta")} compact />}
        <p className="text-sm text-muted-foreground">{t("ui.energia.consumo", { ar: BALANCE.LEVELS[state.level].consumoAr, comida: BALANCE.LEVELS[state.level].consumoComida })}</p>
        <Button
          variant="chunky"
          size="tap"
          className="w-full text-lg"
          data-tut="pronto"
          onClick={() => {
            tocarEfeito("pronto");
            onSave(a);
            onClose();
          }}
        >
          {t("ui.energia.ok")}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- manhã
export function MorningModal({
  state,
  onGo,
  dica,
}: {
  state: GameState;
  onGo: () => void;
  /** chave de uma dica do Rovi para mostrar hoje (uma vez por missão) */
  dica?: string | undefined;
}) {
  const { t } = useGT();
  const linhas = [
    t("ui.manha.energia", {
      prod: state.producaoHoje,
      bat: state.bateriaManha,
      total: state.energiaHoje,
    }),
    state.solar < 1 ? t("ui.manha.poeira") : "",
    t("ui.manha.alertas", { n: state.alerts.length }),
  ].filter(Boolean);
  const titulo = t("ui.manha.titulo", { sol: state.sol });
  return (
    <Modal label={titulo}>
      <div className="flex flex-col gap-3 text-center">
        <div className="text-6xl" aria-hidden>
          <PixelIcon name="amanhecer" size={64} />
        </div>
        <h2 className="font-display text-3xl font-bold text-secondary">{titulo}</h2>
        {linhas.map((l) => (
          <p key={l} className="text-lg">
            {l}
          </p>
        ))}
        {dica && <DialogBox speaker="rovi" text={t(dica, NUMEROS_ENERGIA)} compact />}
        <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onGo}>
          {t("ui.vamos")}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- noite
export function NightModal({ state, onNext }: { state: GameState; onNext: () => void }) {
  const { t } = useGT();
  const n = state.night;
  if (!n) return null;
  const linhas = [
    { icon: "o2", texto: t("ui.noite.ar", { feito: n.arFeito, usado: n.arUsado }) },
    { icon: "batata", texto: t("ui.noite.comida", { feito: n.comidaFeita, usado: n.comidaUsada }) },
    { icon: "radiacao", texto: t("ui.noite.radiacao", { dose: n.dose, pct: n.escudoPct }) },
    n.ciencia > 0 && { icon: "microscopio", texto: t("ui.noite.ciencia", { n: n.ciencia }) },
    n.escudoNovo > 0 && { icon: "escudo", texto: t("ui.noite.escudo", { n: n.escudoNovo }) },
    n.faltou.length > 0 && {
      icon: "aviso",
      texto: t("ui.noite.falta", { lista: n.faltou.map((k) => t(`modulo.${k}`)).join(", ") }),
    },
    n.critico && { icon: "cansado", texto: t("ui.noite.critico") },
    state.flags["anoiteceu"] === n.sol && {
      icon: "cansado",
      texto: t("ui.noite.cansaco", { n: BALANCE.SAUDE_AO_ANOITECER }),
    },
    !!n.perdidos && {
      icon: "cansado",
      texto: t("ui.noite.perdidos", { n: n.perdidos, dano: n.danoPerdidos ?? 0 }),
    },
    !!n.piora && Object.keys(n.piora).length > 0 && {
      icon: "ampulheta",
      texto: t("ui.noite.piora", {
        lista: Object.entries(n.piora)
          .map(([k, v]) => `−${Math.abs(v ?? 0)} ${t(`recurso.${k}`).toLowerCase()}`)
          .join(", "),
      }),
    },
    (!!n.perdidos || state.flags["anoiteceu"] === n.sol) && { icon: "cama", texto: t("ui.noite.sono") },
    { icon: "bateria", texto: t("ui.noite.bateria", { n: n.bateria }) },
  ].filter((linha) => linha !== false);
  const titulo = t("ui.noite.titulo", { sol: n.sol });
  const acabou = state.status !== "jogando";
  return (
    <Modal label={titulo}>
      <div className="flex flex-col gap-2">
        <div className="text-center text-6xl" aria-hidden>
          <PixelIcon name="lua" size={64} />
        </div>
        <h2 className="text-center font-display text-2xl font-bold text-secondary">{titulo}</h2>
        <ul className="flex flex-col gap-1.5">
          {linhas.map(({ icon, texto }) => (
            <li
              key={texto}
              className="flex items-center gap-2 border border-border bg-muted px-3 py-2 text-base"
            >
              <PixelIcon name={icon} />
              <span>{texto}</span>
            </li>
          ))}
        </ul>
        <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onNext}>
          {acabou ? t("ui.noite.fim") : t("ui.noite.acordar", { sol: state.sol })}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- lugar sem alerta
export function PlaceInfo({
  state,
  place,
  onClose,
  onEnergy,
  noite = false,
}: {
  state: GameState;
  place: PlaceId;
  onClose: () => void;
  onEnergy: () => void;
  /** já é noite: pode dormir mesmo com alerta aberto (perde saúde) */
  noite?: boolean;
}) {
  const { t } = useGT();
  const faltam = state.alerts.filter((a) => !a.done).length;
  return (
    <Modal label={t(`lugar.${place}`)} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <PlaceScene place={place} />
        <h2 className="font-display text-2xl font-bold text-secondary">{t(`lugar.${place}`)}</h2>
        <p className="text-lg">{t(`lugar.${place}.info`, { n: state.escudo, max: BALANCE.ESCUDO_MAX, ...NUMEROS_ENERGIA })}</p>
        {place === "ar" && (
          <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onEnergy}>
            <PixelIcon name="raio" /> {t("ui.energia.titulo")}
          </Button>
        )}
        {place === "habitat" && faltam > 0 && !noite && (
          <p className="border border-border bg-accent p-3 font-bold">
            {t("ui.dormir_bloqueado", {
              n: faltam,
              cada: BALANCE.SAUDE_POR_ALERTA_PERDIDO,
            })}
          </p>
        )}
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onClose}>
          {t("ui.fechar")}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- glossário
/** Palavras do espaço, na ordem em que aparecem no jogo. Texto: "Termo = frase simples." */
const GLOSSARIO = [
  "sol",
  "radiacao",
  "tempestade",
  "clarao",
  "nuvem",
  "chuva",
  "terra",
  "escudo",
  "abrigo",
  "estufa",
  "moxie",
  "rover",
  "atraso",
  "painel",
  "poeira",
  "bateria",
  "energia",
  "donki",
  "controle",
];

export function Glossary({ onClose }: { onClose: () => void }) {
  const { t } = useGT();
  return (
    <Modal label={t("ui.glossario.titulo")} onClose={onClose} wide>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-secondary">
          <PixelIcon name="livro" /> {t("ui.glossario.titulo")}
        </h2>
        <dl className="grid gap-2 lg:grid-cols-2">
          {GLOSSARIO.map((k) => {
            const texto = t(`glossario.${k}`);
            const i = texto.indexOf(" = ");
            const termo = i > 0 ? texto.slice(0, i) : "";
            const frase = i > 0 ? texto.slice(i + 3) : texto;
            return (
              <div key={k} className="border border-border bg-muted p-3 leading-snug">
                {termo && <dt className="font-extrabold text-secondary">{termo}</dt>}
                <dd>{frase}</dd>
              </div>
            );
          })}
        </dl>
        <Button variant="chunky" size="tap" className="w-full" onClick={onClose}>
          {t("ui.fechar")}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- menu
export function GameMenu({
  onClose,
  onTutorial,
  onHowTo,
  onSom,
  onGlossary,
  onRestart,
  onExit,
}: {
  onClose: () => void;
  onTutorial: () => void;
  onHowTo: () => void;
  onSom?: () => void;
  onGlossary: () => void;
  onRestart: () => void;
  onExit: () => void;
}) {
  const { t } = useGT();
  // mesmo estilo do menu inicial (hub): peças em hub.tsx
  const opcoes: { icone: ReactNode; texto: string; onClick: () => void }[] = [
    { icone: <PixelIcon name="ajuda" />, texto: t("ui.menu.ajuda"), onClick: onHowTo },
    {
      icone: <img src={ART.portraits.rovi.src} alt="" className="h-6 w-6 object-contain" />,
      texto: t("ui.menu.tutorial"),
      onClick: onTutorial,
    },
    { icone: <PixelIcon name="livro" />, texto: t("ui.menu.glossario"), onClick: onGlossary },
    ...(onSom ? [{ icone: <PixelIcon name="som" />, texto: t("ui.menu.som"), onClick: onSom }] : []),
    { icone: <PixelIcon name="recomecar" />, texto: t("ui.menu.reiniciar"), onClick: onRestart },
  ];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("ui.menu.titulo")}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#1c0703]/55 p-3 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`${MOLDURA_HUB} relative max-h-[94dvh] w-full max-w-md overflow-y-auto bg-[#3a1206]`}
        style={{ backgroundImage: "linear-gradient(to bottom, #4a1a08, #2a0508)" }}
      >
        <div className="relative flex flex-col gap-3 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <TituloHub as="h2" className="text-4xl leading-none">
              {t("ui.menu.titulo")}
            </TituloHub>
            <div className="flex items-center gap-2">
              <LangSelector />
              <button
                type="button"
                onClick={onClose}
                aria-label={t("ui.fechar")}
                className="grid h-12 w-12 place-items-center active:translate-y-0.5"
              >
                <PixelIcon name="btn_fechar" size={42} />
              </button>
            </div>
          </div>

          {/* principal: voltar a jogar (o maior, igual ao "Jogar agora" do início) */}
          <BotaoHub principal onClick={onClose}>
            <PixelIcon name="play" /> {t("ui.menu.voltar")}
          </BotaoHub>

          {opcoes.map((o) => (
            <BotaoHub key={o.texto} onClick={o.onClick}>
              {o.icone} {o.texto}
            </BotaoHub>
          ))}

          {/* sair: separado e mais discreto, para ninguém sair sem querer */}
          <div className="mt-1 border-t-2 border-dashed border-[#f6e38c]/30 pt-3">
            <button
              type="button"
              onClick={onExit}
              className={`${BOTAO_ESCURO} w-full ${BOTAO_CONTAINER}`}
            >
              <span className={LETRA_BOTAO}>
                <PlaceIcon place="habitat" size={24} /> {t("ui.menu.sair")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
