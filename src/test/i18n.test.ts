import { describe, expect, it } from "vitest";
import { dictionaries, LANGS, translate } from "@/i18n";

describe("i18n", () => {
  it("supports exactly the 5 languages", () => expect(LANGS).toEqual(["pt", "en", "es", "fr", "it"]));
  it("every language has the same keys as Portuguese", () => {
    const keys = Object.keys(dictionaries.pt).sort();
    for (const l of LANGS) expect(Object.keys(dictionaries[l]).sort()).toEqual(keys);
  });
  it("interpolates {variables}", () => expect(translate("en", "solCount", { n: 3 })).toBe("Sol 3"));
});
