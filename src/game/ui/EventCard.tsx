// Carta de evento: título, texto, selo da fonte, escolhas com custo, resultado e "Por quê?".
import { tocarEfeito } from "./audio";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BALANCE,
  choiceEffect,
  choicesFor,
  energiaFaltando,
  eventKey,
  findEvent,
  getAlert,
  isChoiceAvailable,
  type GameState,
} from "@/game/engine";
import { atrasoRadioMin } from "@/data/marte";
import { DialogBox, EffectChips, Modal, PlaceIcon, PlaceScene, useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";

const DICA_DONKI: Record<string, string> = {
  FLR: "glossario.clarao",
  CME: "glossario.nuvem",
  SEP: "glossario.chuva",
  GST: "glossario.terra",
};

interface Props {
  state: GameState;
  alertId: string;
  /** primeira vez que este tipo de evento do Sol aparece? mostra a dica */
  showTip: boolean;
  onChoose: (choiceId?: string) => void;
  onClose: () => void;
}

export function EventCard({ state, alertId, showTip, onChoose, onClose }: Props) {
  const { t, lang } = useGT();
  // reação do astronauta com voz só onde todas as cartas foram gravadas (PT e EN)
  const [porque, setPorque] = useState(false);
  const alert = getAlert(state, alertId);
  if (!alert) return null;
  const ev = findEvent(alert.eventId);
  const vars = alert.vars;
  const title = t(eventKey.title(ev.id), vars);
  const body = t(eventKey.body(ev.id), vars);
  const todas = choicesFor(state, alertId);
  const escolhida = alert.choiceId ? todas.find((c) => c.id === alert.choiceId) : undefined;
  /** alertas da antena e eventos do Sol chegam como mensagem de rádio do Controle de Missão */
  const radio = alert.place === "antena" || !!ev.donki;
  /** dá para fechar sem escolher e ver outro alerta; o urgente precisa ser resolvido agora */
  const podeAdiar = !alert.done && !alert.urgent && todas.length > 0;

  const selo = alert.real ? (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="inline-flex items-center gap-1 border-2 border-border bg-accent px-2 py-1 font-bold text-secondary">
        <PixelIcon name={alert.real.live ? "ao_vivo" : "arquivo"} size={20} />
        {alert.real.live ? t("selo.ao_vivo") : t("selo.real", { data: alert.real.date })}
      </span>
      <a
        href={alert.real.link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center font-semibold text-secondary underline underline-offset-4"
      >
        {t("ui.relatorio.ver_nasa")}
      </a>
    </div>
  ) : ev.source || ev.mission ? (
    // selos de "carimbo" pixel: missão real da NASA e fonte do fato
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {ev.mission && (
        <span className="inline-flex items-center gap-1 border-2 border-[#22806f] bg-[#d8f0e6] px-2 py-0.5 font-bold text-[#14524a] shadow-[0_2px_0_#14524a]">
          <PlaceIcon place="rover" size={20} />
          {t("selo.missao", { missao: ev.mission })}
        </span>
      )}
      {ev.source && (
        <span className="inline-flex items-center gap-1 border-2 border-border bg-accent px-2 py-0.5 font-bold text-secondary shadow-[0_2px_0_#6e2a10]">
          <PixelIcon name="livro" size={18} />
          {t(`fonte.${ev.source}`)}
        </span>
      )}
    </div>
  ) : null;

  return (
    <Modal label={title} onClose={alert.done || podeAdiar ? onClose : undefined}>
      <div className="flex flex-col gap-3">
        <PlaceScene place={alert.place} radio={radio} />
        <div className="flex items-start gap-3">
          {ev.id === "chegada" ? (
            <PixelIcon name="foguete" size={48} />
          ) : (
            <PlaceIcon place={alert.place} size={48} />
          )}
          <div className="flex-1">
            {alert.urgent && (
              <span className="mb-1 inline-flex items-center gap-1 border-2 border-destructive px-2 text-xs font-black text-destructive">
                <PixelIcon name="urgente" size={18} />
                {t("ui.urgente")}
              </span>
            )}
            <h2 className="font-display text-2xl font-bold leading-tight text-secondary">
              {title}
            </h2>
          </div>
        </div>

        {selo}
        {radio ? (
          <>
            <DialogBox speaker="controle" text={body} />
            <p className="text-sm font-semibold text-muted-foreground">
              {t("ui.radio_atraso", { min: atrasoRadioMin() })}
            </p>
          </>
        ) : (
          <p className="text-lg leading-snug">{body}</p>
        )}
        <EffectChips effect={alert.openDelta} />

        {showTip && alert.real && DICA_DONKI[alert.real.kind] && (
          <p className="border-2 border-border bg-accent p-3 text-sm">
            <PixelIcon name="lampada" size={20} /> <b>{t("ui.novidade")}</b> {t(DICA_DONKI[alert.real.kind]!)}
          </p>
        )}

        {/* ---- antes de escolher ---- */}
        {!alert.done && todas.length > 0 && (
          <div className="flex flex-col gap-2">
            {todas.map((c, i) => {
              const ok = isChoiceAvailable(state, c, todas);
              const falta = energiaFaltando(state, c);
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-disabled={!ok}
                  // bloqueada: não escolhe, só faz o "bzzt" de sem energia
                  onClick={() => (ok ? onChoose(c.id) : tocarEfeito("sem_energia"))}
                  className={`flex min-h-14 flex-col items-start gap-1 border-4 border-border bg-muted p-3 text-left transition ${ok ? "hover:border-primary active:translate-y-0.5" : "opacity-45"}`}
                >
                  <span className="text-lg font-extrabold">
                    {t(eventKey.label(ev.id, c.id), vars)}
                  </span>
                  <span
                    className="flex flex-wrap items-center gap-1"
                    data-tut={i === 0 ? "chips" : undefined}
                  >
                    <EffectChips effect={choiceEffect(state, alert, c)} />
                    {c.deferredCost && (
                      <span className="inline-flex items-center gap-1 border border-border bg-primary/15 px-2 py-0.5 text-sm font-extrabold text-secondary">
                        <PixelIcon name="ampulheta" size={18} /> {t("ui.custo_depois")}
                      </span>
                    )}
                  </span>
                  {!ok && (
                    <span className="text-sm font-bold text-destructive">
                      <PixelIcon name="aviso" size={18} /> {t("ui.sem_energia")}
                    </span>
                  )}
                  {ok && falta > 0 && (
                    <span className="text-sm font-bold text-destructive">
                      {t("ui.no_braco", { n: falta * BALANCE.SAUDE_POR_ENERGIA_FALTANDO })}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {podeAdiar && (
          <Button variant="chunkySand" size="tap" className="w-full text-lg" onClick={onClose}>
            {t("ui.fechar")}
          </Button>
        )}

        {!alert.done && todas.length === 0 && (
          <Button
            variant="chunky"
            size="tap"
            className="w-full text-lg"
            onClick={() => onChoose(undefined)}
          >
            {t("botao.ok")}
          </Button>
        )}

        {/* ---- depois de escolher ---- */}
        {alert.done && escolhida && (
          <div className="flex flex-col gap-2 border-2 border-border bg-muted p-3">
            <DialogBox speaker="astronauta" text={t(eventKey.outcome(ev.id, escolhida.id), vars)} voz={lang === "pt" || lang === "en" ? eventKey.outcome(ev.id, escolhida.id) : undefined} />
            <EffectChips effect={alert.delta} />
            {porque ? (
              <p className="border border-border bg-accent p-3">
                <PixelIcon name="lampada" size={20} /> {t(eventKey.lesson(ev.id, escolhida.id), vars)}
              </p>
            ) : (
              <Button variant="chunkySand" size="tap" onClick={() => setPorque(true)}>
                {t("botao.porque")}
              </Button>
            )}
          </div>
        )}
        {alert.done && (
          <Button variant="chunky" size="tap" className="w-full text-lg" onClick={onClose}>
            {t("botao.ok")}
          </Button>
        )}
      </div>
    </Modal>
  );
}
