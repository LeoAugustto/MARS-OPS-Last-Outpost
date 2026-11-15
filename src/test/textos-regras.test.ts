// Textos que falam de regras do jogo: o número vem sempre de BALANCE (variável), nunca escrito à mão.
import { describe, expect, it } from "vitest";
import { LOCALES, t } from "@/content/i18n";
import { LANGS } from "@/game/engine/types";
import { BALANCE } from "@/game/engine";

const COM_VARIAVEL: Record<string, string[]> = {
  "ui.energia.rende.ar": ["{ar}"],
  "ui.energia.rende.estufa": ["{comida}"],
  "ui.energia.rende.ciencia": ["{ciencia}"],
  "ui.energia.rende.escudo": ["{escudo}"],
  "ui.energia.consumo": ["{ar}", "{comida}"],
  "dica.ar": ["{ar}"],
  "dica.comida": ["{comida}"],
  "ui.noite.aviso": ["{cansaco}", "{dano}"],
  "ui.entardecer.aviso": ["{cansaco}"],
};

describe("números de regra nos textos", () => {
  it("a escolha do nível mostra quantos sóis cada nível tem (BALANCE)", () => {
    for (const lang of LANGS) expect(LOCALES[lang]["ui.nivel.comandante"]).toContain("{sois}");
    expect(t("ui.nivel.comandante", "pt", { sois: BALANCE.LEVELS.comandante.totalSols })).toMatch(/^10 sóis/);
  });

  for (const [key, vars] of Object.entries(COM_VARIAVEL)) {
    it(`${key} usa ${vars.join(" ")} e nenhum número escrito, nos 5 idiomas`, () => {
      for (const lang of LANGS) {
        const txt = LOCALES[lang][key] ?? "";
        for (const v of vars) expect(txt, `${lang}: ${key}`).toContain(v);
        // "cada 1 de energia" / "+1 camada" é a unidade, não uma regra
        const semVars = txt.replace(/\{\w+\}/g, "").replace(/(^|\D)1(?!\d)/g, "$1");
        expect(semVars, `${lang}: ${key}`).not.toMatch(/\d/);
      }
    });
  }

  it("o aviso da noite mostra o cansaço e o custo por alerta de BALANCE", () => {
    const txt = t("ui.noite.aviso", "pt", {
      cansaco: BALANCE.SAUDE_AO_ANOITECER,
      dano: BALANCE.SAUDE_POR_ALERTA_PERDIDO,
    });
    expect(txt).toContain(`−${BALANCE.SAUDE_AO_ANOITECER} de saúde`);
    expect(txt).toContain(`−${BALANCE.SAUDE_POR_ALERTA_PERDIDO} ao dormir`);
  });
});

describe("glossário", () => {
  const PALAVRAS = [
    "sol", "radiacao", "tempestade", "clarao", "nuvem", "chuva", "terra", "escudo", "estufa",
    "moxie", "rover", "atraso", "painel", "poeira", "bateria", "energia", "donki", "controle",
  ];
  it("tem as 18 palavras pedidas, cada uma no formato 'Termo = frase', nos 5 idiomas", () => {
    for (const lang of LANGS)
      for (const k of PALAVRAS) expect(LOCALES[lang][`glossario.${k}`], `${lang}: ${k}`).toMatch(/^.+ = .+/);
  });
});
