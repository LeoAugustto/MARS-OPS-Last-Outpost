import { describe, expect, it } from "vitest";
import { EVENTS } from "../../content/events";
import { RESERVE_EVENTS } from "../../data/donki";
import { validateCatalog } from "./validate";
import {
  canSleep,
  choicesFor,
  choose,
  debrief,
  endSol,
  isChoiceAvailable,
  newMission,
  openAlert,
  plannedAllocation,
  rewindTo,
  setAllocation,
  sleepPenalty,
  anoitecer,
  findEvent,
  estrelasDe,
  BALANCE,
} from "./index";
import type { Allocation, GameState, Level } from "./types";

function lcg(seed: number) {
  let x = seed;
  return () => (x = (x * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

/** jogador automático: abre os alertas na ordem e escolhe ao acaso */
function autoplay(
  seed: number,
  rnd: () => number,
  level: Level = "piloto",
  alloc?: Allocation,
): GameState {
  let s = newMission({ seed, level, donkiPool: RESERVE_EVENTS });
  if (alloc) s = setAllocation(s, alloc);
  let guard = 0;
  while (s.status === "jogando" && guard++ < 300) {
    for (const a of s.alerts) {
      if (a.done || s.status !== "jogando") continue;
      s = openAlert(s, a.id);
      const todas = choicesFor(s, a.id);
      const ops = todas.filter((c) => isChoiceAvailable(s, c, todas));
      s = choose(s, a.id, ops.length ? ops[Math.floor(rnd() * ops.length)]!.id : undefined);
    }
    if (s.status !== "jogando") break;
    s = endSol(s);
  }
  return s;
}

describe("catálogo", () => {
  it("passa no validador (sem escolha grátis, lugares, histórias coerentes, 5 idiomas)", () => {
    expect(validateCatalog(EVENTS)).toEqual([]);
  });
});

describe("motor v2", () => {
  it("mesma semente = mesma missão", () => {
    expect(autoplay(42, lcg(1))).toEqual(autoplay(42, lcg(1)));
  });

  it("sementes diferentes = eventos diferentes (rejogabilidade)", () => {
    const seqs = new Set<string>();
    for (let i = 0; i < 20; i++) {
      const s = autoplay(1000 + i, lcg(i));
      seqs.add(
        s.log
          .filter((l) => l.kind === "evento")
          .map((l) => l.eventId)
          .join(","),
      );
    }
    expect(seqs.size).toBeGreaterThan(15);
  });

  it("sol 1: chegada + um clarão real do Sol (tutorial)", () => {
    const s = newMission({ seed: 7, donkiPool: RESERVE_EVENTS });
    expect(s.alerts.map((a) => a.eventId).sort()).toEqual(["chegada", "sol_clarao"]);
    const clarao = s.alerts.find((a) => a.eventId === "sol_clarao")!;
    expect(clarao.real?.kind).toBe("FLR");
    expect(clarao.vars["data"]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("todo sol tem 2 a 4 alertas, em lugares diferentes, no máximo 1 urgente", () => {
    for (let i = 0; i < 150; i++) {
      let s = newMission({ seed: i, level: "comandante", donkiPool: RESERVE_EVENTS });
      const rnd = lcg(i);
      while (s.status === "jogando") {
        expect(s.alerts.length).toBeGreaterThanOrEqual(2);
        expect(s.alerts.length).toBeLessThanOrEqual(4);
        expect(new Set(s.alerts.map((a) => a.place)).size).toBe(s.alerts.length);
        expect(s.alerts.filter((a) => a.urgent).length).toBeLessThanOrEqual(1);
        for (const a of s.alerts) {
          const todas = choicesFor(s, a.id);
          const ops = todas.filter((c) => isChoiceAvailable(s, c, todas));
          if (todas.length) expect(ops.length).toBeGreaterThan(0); // nunca trava
          s = choose(s, a.id, ops.length ? ops[Math.floor(rnd() * ops.length)]!.id : undefined);
          if (s.status !== "jogando") break;
        }
        if (s.status === "jogando") s = endSol(s);
      }
    }
  });

  it("eventos reais do Sol aparecem com frequência (≈ 1 a cada 2 sóis)", () => {
    for (let i = 0; i < 100; i++) {
      const s = autoplay(i, lcg(i + 3), "comandante");
      const sois = s.history.length - 1;
      expect(s.realEvents.length).toBeGreaterThanOrEqual(Math.floor(sois / 2) - 1);
    }
  });

  it("recursos sempre entre 0 e 100 e a missão sempre termina (300 missões)", () => {
    for (let i = 0; i < 300; i++) {
      const s = autoplay(i, lcg(i));
      for (const v of Object.values(s.resources)) {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
      expect(s.status).not.toBe("jogando");
    }
  });

  it("continuações só aparecem depois da abertura da história", () => {
    for (let i = 0; i < 200; i++) {
      const s = autoplay(i, lcg(i + 5));
      const ordem = s.log.filter((l) => l.kind === "evento").map((l) => l.eventId);
      const chega = ordem.indexOf("sol_nuvem_chega");
      if (chega >= 0) expect(ordem.slice(0, chega)).toContain("sol_nuvem");
      const sujo = ordem.indexOf("painel_sujo");
      if (sujo >= 0) expect(ordem.slice(0, sujo)).toContain("poeira_vem");
    }
  });

  it("não deixa dormir com alerta aberto", () => {
    const s = newMission({ seed: 3, donkiPool: RESERVE_EVENTS });
    expect(canSleep(s)).toBe(false);
    expect(() => endSol(s)).toThrow();
  });

  it("a noite chegou: dormir à força custa saúde por alerta sem resposta", () => {
    const s = newMission({ seed: 3, donkiPool: RESERVE_EVENTS });
    const faltam = s.alerts.filter((a) => !a.done).length;
    const P = BALANCE.SAUDE_POR_ALERTA_PERDIDO;
    expect(sleepPenalty(s)).toBe(faltam * P);
    const depois = endSol(s, undefined, { forcado: true });
    expect(depois.sol).toBe(2);
    expect(depois.night?.perdidos).toBe(faltam);
    expect(depois.night?.danoPerdidos).toBe(faltam * P);
    // mesma noite com todos os alertas resolvidos não teria esse dano
    expect(depois.night?.delta.saude).toBeLessThanOrEqual(-(faltam * P));
  });

  it("ignorar um alerta nunca sai mais barato que a pior escolha", () => {
    for (let seed = 1; seed <= 30; seed++) {
      const s = newMission({ seed, level: "piloto", donkiPool: RESERVE_EVENTS });
      const depois = endSol(s, undefined, { forcado: true });
      const piora = depois.night?.piora ?? {};
      const temCusto = s.alerts.some((a) =>
        (findEvent(a.eventId).choices ?? []).some((c) =>
          Object.values(c.effects).some((v) => typeof v === "number" && v < 0),
        ),
      );
      if (temCusto) expect(Object.values(piora).some((v) => (v ?? 0) < 0)).toBe(true);
    }
  });

  it("anoitecer acordado cansa uma vez por sol", () => {
    const s = newMission({ seed: 3, donkiPool: RESERVE_EVENTS });
    const a = anoitecer(s);
    expect(a.resources.saude).toBe(s.resources.saude - BALANCE.SAUDE_AO_ANOITECER);
    expect(anoitecer(a).resources.saude).toBe(a.resources.saude);
  });

  it("sobreviver até o fim é vitória; a ciência vira estrelas", () => {
    let s = newMission({ seed: 5, level: "cadete", donkiPool: RESERVE_EVENTS });
    s = { ...s, status: "vitoria", ciencia: 0 };
    expect(estrelasDe(s)).toBe(1);
    expect(estrelasDe({ ...s, ciencia: s.metaCiencia })).toBe(3);
    expect(estrelasDe({ ...s, ciencia: Math.ceil(s.metaCiencia * BALANCE.ESTRELA_2_EM) })).toBe(2);
    expect(estrelasDe({ ...s, status: "resgate" })).toBe(0);
  });

  it("a divisão de energia continua de um sol para o outro", () => {
    let s = newMission({ seed: 9, donkiPool: RESERVE_EVENTS });
    s = setAllocation(s, { ar: 4, estufa: 3, ciencia: 1, escudo: 0 });
    for (const a of s.alerts)
      s = choose(
        s,
        a.id,
        choicesFor(s, a.id).find((c) => !c.effects.energia)?.id ?? choicesFor(s, a.id)[0]?.id,
      );
    s = endSol(s);
    expect(s.sol).toBe(2);
    expect(s.allocation).toEqual({ ar: 4, estufa: 3, ciencia: 1, escudo: 0 });
  });

  it("quando falta energia, o laboratório perde primeiro e o ar por último", () => {
    let s = newMission({ seed: 11, donkiPool: RESERVE_EVENTS });
    s = setAllocation(s, { ar: 6, estufa: 4, ciencia: 4, escudo: 0 });
    s = { ...s, energiaHoje: 8 };
    const { real, faltou } = plannedAllocation(s);
    expect(real.ar).toBe(6);
    expect(real.ciencia).toBe(0);
    expect(faltou[0]).toBe("ciencia");
  });

  it("estratégia 'só ciência' termina em resgate com explicação", () => {
    const s = autoplay(3, lcg(3), "piloto", { ar: 0, estufa: 0, ciencia: 10, escudo: 0 });
    expect(s.status).toBe("resgate");
    const d = debrief(s);
    expect(d.causaKey).toBeDefined();
    expect(d.voltarAoSol).toBeGreaterThanOrEqual(1);
    expect(d.history.length).toBeGreaterThan(1);
  });

  it("estratégia equilibrada costuma sobreviver (cadete)", () => {
    let ok = 0;
    for (let i = 0; i < 100; i++) if (autoplay(i, lcg(i), "cadete").status !== "resgate") ok++;
    expect(ok).toBeGreaterThan(70);
  });

  it("voltar ao sol restaura a manhã daquele sol", () => {
    let s = newMission({ seed: 11, donkiPool: RESERVE_EVENTS });
    const alertasSol1 = s.alerts.map((a) => a.eventId);
    for (const a of s.alerts) s = choose(s, a.id, choicesFor(s, a.id).at(-1)?.id);
    s = endSol(s);
    const volta = rewindTo(s, 1);
    expect(volta.sol).toBe(1);
    expect(volta.alerts.map((a) => a.eventId)).toEqual(alertasSol1);
    expect(volta.alerts.every((a) => !a.done)).toBe(true);
    expect(volta.vars["tentativas"]).toBe(1);
  });
});
