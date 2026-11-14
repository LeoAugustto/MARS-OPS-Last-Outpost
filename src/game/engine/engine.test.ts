import { describe, expect, it } from "vitest";
import { EVENTS } from "../../content/events";
import { validateCatalog } from "./validate";
import {
  availableChoices,
  choose,
  currentEvent,
  debrief,
  emptyAllocation,
  endSol,
  newMission,
  rewindTo,
} from "./index";
import type { Allocation, GameState } from "./types";

/** jogador automático: responde cartas ao acaso e divide energia de forma razoável */
function autoplay(seed: number, rnd: () => number, estrategia: "boa" | "ruim" = "boa"): GameState {
  let s = newMission({ seed, level: "piloto" });
  let guard = 0;
  while (s.status === "jogando" && guard++ < 200) {
    while (currentEvent(s)) {
      const ops = availableChoices(s);
      s = choose(s, ops.length ? ops[Math.floor(rnd() * ops.length)]!.id : undefined);
    }
    if (s.status !== "jogando") break;
    const e = s.energiaHoje;
    const a: Allocation = emptyAllocation();
    if (estrategia === "boa") {
      a.ar = Math.min(e, 3);
      a.estufa = Math.min(e - a.ar, 3);
      a.ciencia = e - a.ar - a.estufa;
    } else {
      a.ciencia = e; // só ciência: deve acabar o ar
    }
    s = endSol(s, a);
  }
  return s;
}

function lcg(seed: number) {
  let x = seed;
  return () => (x = (x * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

describe("catálogo", () => {
  it("passa no validador (sem escolha grátis, histórias coerentes, 5 idiomas)", () => {
    expect(validateCatalog(EVENTS)).toEqual([]);
  });
});

describe("motor", () => {
  it("mesma semente = mesma missão", () => {
    const a = autoplay(42, lcg(1));
    const b = autoplay(42, lcg(1));
    expect(a).toEqual(b);
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
    expect(seqs.size).toBeGreaterThan(10);
  });

  it("sol 1 é sempre a chegada", () => {
    expect(currentEvent(newMission({ seed: 7 }))?.id).toBe("chegada");
  });

  it("recursos ficam sempre entre 0 e 100 em 300 missões", () => {
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
      const vistos = s.log
        .filter((l) => l.kind === "evento" && l.choiceId !== "inicio")
        .map((l) => l.eventId);
      const idxChega = vistos.indexOf("tempestade_chega");
      if (idxChega >= 0) expect(vistos.slice(0, idxChega)).toContain("sol_agitado");
      const idxSujo = vistos.indexOf("painel_sujo");
      if (idxSujo >= 0) expect(vistos.slice(0, idxSujo)).toContain("poeira_vem");
    }
  });

  it('estratégia "só ciência" termina em resgate com explicação', () => {
    const s = autoplay(3, lcg(3), "ruim");
    expect(s.status).toBe("resgate");
    const d = debrief(s);
    expect(d.causaKey).toBeDefined();
    expect(d.voltarAoSol).toBeGreaterThanOrEqual(1);
  });

  it("estratégia equilibrada costuma sobreviver", () => {
    let ok = 0;
    for (let i = 0; i < 100; i++) if (autoplay(i, lcg(i)).status !== "resgate") ok++;
    expect(ok).toBeGreaterThan(60);
  });

  it("voltar ao sol restaura o estado daquele começo de sol", () => {
    let s = newMission({ seed: 11 });
    s = choose(s, availableChoices(s)[0]!.id);
    s = endSol(s, { ...emptyAllocation(), ar: 3, estufa: 3 });
    const volta = rewindTo(s, 1);
    expect(volta.sol).toBe(1);
    expect(currentEvent(volta)?.id).toBe("chegada");
    expect(volta.vars["tentativas"]).toBe(1);
  });

  it("não deixa gastar mais energia do que tem", () => {
    let s = newMission({ seed: 5 });
    s = choose(s, availableChoices(s)[0]!.id);
    expect(() => endSol(s, { ...emptyAllocation(), ciencia: s.energiaHoje + 1 })).toThrow();
  });
});
