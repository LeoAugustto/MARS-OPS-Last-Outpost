import { describe, expect, it } from "vitest";
import { atrasoRadioMin, distanciaTerraMarte } from "./marte";

describe("distância Terra–Marte", () => {
  it("bate com datas conhecidas", () => {
    // maior aproximação de 2018 (31/07): ~0,385 UA
    expect(distanciaTerraMarte(new Date(Date.UTC(2018, 6, 31)))).toBeCloseTo(0.385, 1);
    // conjunção solar de janeiro de 2026: Marte do outro lado do Sol, ~2,4 UA
    expect(distanciaTerraMarte(new Date(Date.UTC(2026, 0, 9)))).toBeGreaterThan(2.3);
    // atraso do rádio sempre entre ~3 e ~22 minutos
    for (let ano = 2020; ano < 2030; ano++)
      for (let mes = 0; mes < 12; mes++) {
        const m = atrasoRadioMin(new Date(Date.UTC(ano, mes, 1)));
        expect(m).toBeGreaterThanOrEqual(3);
        expect(m).toBeLessThanOrEqual(23);
      }
  });
});
