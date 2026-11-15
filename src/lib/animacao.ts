/**
 * Escolha da criança de pausar ou continuar a animação da tela inicial, guardada só neste
 * aparelho (localStorage). Sem escolha guardada, a animação toca.
 */
const CHAVE = "marsops:animacao";

export function animacaoPausada(): boolean {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem(CHAVE) === "pausada";
  } catch {
    return false;
  }
}

export function guardarAnimacaoPausada(pausada: boolean): boolean {
  try {
    window.localStorage.setItem(CHAVE, pausada ? "pausada" : "tocando");
    return true;
  } catch {
    return false;
  }
}
