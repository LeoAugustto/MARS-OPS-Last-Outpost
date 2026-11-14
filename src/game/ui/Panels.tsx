// Janelas do jogo: energia, manhã, noite, lugar, glossário e menu.
import { useState } from "react";
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
import { Modal, PlaceScene, SpeakButton, useGT } from "./shared";

// ---------------------------------------------------------------- energia
const MODULOS: { k: ModuleKey; icon: string }[] = [
  { k: "ar", icon: "💨" },
  { k: "estufa", icon: "🌱" },
  { k: "ciencia", icon: "🔬" },
  { k: "escudo", icon: "🛡️" },
];

export function EnergyPanel({
  state,
  onSave,
  onClose,
}: {
  state: GameState;
  onSave: (a: Allocation) => void;
  onClose: () => void;
}) {
  const { t } = useGT();
  const [a, setA] = useState<Allocation>(state.allocation);
  const total = allocationTotal(a);
  const hoje = state.energiaHoje;
  const muda = (k: ModuleKey, d: number) =>
    setA((cur) => ({ ...cur, [k]: Math.max(0, Math.min(BALANCE.ALOCACAO_MAX, cur[k] + d)) }));

  return (
    <Modal label={t("ui.energia.titulo")} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-bold text-secondary">{t("ui.energia.titulo")}</h2>
        <p className="text-sm text-muted-foreground">{t("ui.energia.explica")}</p>
        <p className="text-lg font-extrabold">{t("ui.energia.hoje", { n: hoje })}</p>
        {MODULOS.map(({ k, icon }) => (
          <div key={k} className="flex items-center gap-2 rounded-2xl bg-muted p-2">
            <span className="text-3xl" aria-hidden>
              {icon}
            </span>
            <div className="flex-1">
              <div className="font-bold">{t(`modulo.${k}`)}</div>
              <div className="text-xs text-muted-foreground">{t(`ui.energia.rende.${k}`)}</div>
            </div>
            <Button
              variant="chunkySand"
              size="tap"
              className="w-12 text-xl"
              onClick={() => muda(k, -1)}
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
              onClick={() => muda(k, 1)}
              aria-label={`+ ${t(`modulo.${k}`)}`}
            >
              +
            </Button>
          </div>
        ))}
        <p className="font-bold">{t("ui.energia.pede", { n: total })}</p>
        {total <= hoje ? (
          <p className="rounded-xl bg-success/15 p-2 font-bold text-success">
            {t("ui.energia.sobra", { n: hoje - total })}
          </p>
        ) : (
          <p className="rounded-xl bg-destructive/15 p-2 font-bold text-destructive">
            {t("ui.energia.falta", { n: total - hoje })}
          </p>
        )}
        <p className="text-sm text-muted-foreground">{t("ui.energia.consumo")}</p>
        <Button
          variant="chunky"
          size="tap"
          className="w-full text-lg"
          onClick={() => {
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
export function MorningModal({ state, onGo }: { state: GameState; onGo: () => void }) {
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
          🌅
        </div>
        <h2 className="font-display text-3xl font-bold text-secondary">{titulo}</h2>
        {linhas.map((l) => (
          <p key={l} className="text-lg">
            {l}
          </p>
        ))}
        <div className="flex justify-center">
          <SpeakButton text={`${titulo}. ${linhas.join(" ")}`} />
        </div>
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
    t("ui.noite.ar", { feito: n.arFeito, usado: n.arUsado }),
    t("ui.noite.comida", { feito: n.comidaFeita, usado: n.comidaUsada }),
    t("ui.noite.radiacao", { dose: n.dose, pct: n.escudoPct }),
    n.ciencia ? t("ui.noite.ciencia", { n: n.ciencia }) : "",
    n.escudoNovo ? t("ui.noite.escudo", { n: n.escudoNovo }) : "",
    n.faltou.length
      ? t("ui.noite.falta", { lista: n.faltou.map((k) => t(`modulo.${k}`)).join(", ") })
      : "",
    n.critico ? t("ui.noite.critico") : "",
    t("ui.noite.bateria", { n: n.bateria }),
  ].filter(Boolean);
  const titulo = t("ui.noite.titulo", { sol: n.sol });
  const acabou = state.status !== "jogando";
  return (
    <Modal label={titulo}>
      <div className="flex flex-col gap-2">
        <div className="text-center text-6xl" aria-hidden>
          🌙
        </div>
        <h2 className="text-center font-display text-2xl font-bold text-secondary">{titulo}</h2>
        <ul className="flex flex-col gap-1.5">
          {linhas.map((l) => (
            <li key={l} className="rounded-xl bg-muted px-3 py-2 text-base">
              {l}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <SpeakButton text={`${titulo}. ${linhas.join(" ")}`} />
        </div>
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
  onSleep,
}: {
  state: GameState;
  place: PlaceId;
  onClose: () => void;
  onEnergy: () => void;
  onSleep: () => void;
}) {
  const { t } = useGT();
  const faltam = state.alerts.filter((a) => !a.done).length;
  return (
    <Modal label={t(`lugar.${place}`)} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <PlaceScene place={place} />
        <h2 className="font-display text-2xl font-bold text-secondary">{t(`lugar.${place}`)}</h2>
        <p className="text-lg">{t(`lugar.${place}.info`, { n: state.escudo })}</p>
        {place === "ar" && (
          <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onEnergy}>
            ⚡ {t("ui.energia.titulo")}
          </Button>
        )}
        {place === "habitat" &&
          (faltam === 0 ? (
            <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onSleep}>
              {t("ui.dormir")}
            </Button>
          ) : (
            <p className="rounded-xl bg-accent p-3 font-bold">
              {t("ui.dormir_bloqueado", { n: faltam })}
            </p>
          ))}
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onClose}>
          {t("ui.fechar")}
        </Button>
      </div>
    </Modal>
  );
}

// ---------------------------------------------------------------- glossário
const GLOSSARIO = [
  "sol",
  "radiacao",
  "tempestade",
  "escudo",
  "abrigo",
  "clarao",
  "nuvem",
  "chuva",
  "terra",
];

export function Glossary({ onClose }: { onClose: () => void }) {
  const { t } = useGT();
  return (
    <Modal label={t("ui.glossario.titulo")} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-secondary">
          📖 {t("ui.glossario.titulo")}
        </h2>
        {GLOSSARIO.map((k) => (
          <p key={k} className="rounded-xl bg-muted p-3">
            {t(`glossario.${k}`)}
          </p>
        ))}
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
  onGlossary,
  onRestart,
  onExit,
}: {
  onClose: () => void;
  onTutorial: () => void;
  onGlossary: () => void;
  onRestart: () => void;
  onExit: () => void;
}) {
  const { t } = useGT();
  return (
    <Modal label={t("ui.menu.titulo")} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-secondary">{t("ui.menu.titulo")}</h2>
          <LangSelector />
        </div>
        <Button variant="chunky" size="tap" className="w-full" onClick={onClose}>
          ▶ {t("ui.menu.voltar")}
        </Button>
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onTutorial}>
          🤖 {t("ui.menu.tutorial")}
        </Button>
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onGlossary}>
          📖 {t("ui.menu.glossario")}
        </Button>
        <Button variant="chunkySand" size="tap" className="w-full" onClick={onRestart}>
          🔄 {t("ui.menu.reiniciar")}
        </Button>
        <Button variant="ghost" size="tap" className="w-full" onClick={onExit}>
          🏠 {t("ui.menu.sair")}
        </Button>
      </div>
    </Modal>
  );
}
