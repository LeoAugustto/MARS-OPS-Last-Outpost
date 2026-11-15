import { beforeEach, describe, expect, it, vi } from "vitest";
import { animacaoPausada, guardarAnimacaoPausada } from "@/lib/animacao";

describe("animação da tela inicial", () => {
  beforeEach(() => localStorage.clear());
  it("toca quando não há escolha guardada", () => {
    expect(animacaoPausada()).toBe(false);
  });
  it("lembra que a criança pausou e depois continuou", () => {
    guardarAnimacaoPausada(true);
    expect(animacaoPausada()).toBe(true);
    guardarAnimacaoPausada(false);
    expect(animacaoPausada()).toBe(false);
  });
  it("não quebra com o armazenamento bloqueado", () => {
    const spy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(animacaoPausada()).toBe(false);
    spy.mockRestore();
  });
});
