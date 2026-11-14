// Perfil da criança: nome (opcional) e personagem (menina/menino).
// Fica SÓ neste aparelho (localStorage). Nada é enviado para fora (LGPD / crianças).
import { createContext, useContext, type ReactNode } from "react";
import type { Gender } from "./art";

export interface Player {
  name: string;
  gender: Gender;
}

const KEY = "marsops:player";
export const NAME_MAX = 14;

export function cleanName(raw: string): string {
  return raw
    .replace(/[<>{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, NAME_MAX);
}

export function loadPlayer(): Player | null {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) ?? "null") as Player | null;
    if (p && (p.gender === "f" || p.gender === "m"))
      return { name: cleanName(p.name ?? ""), gender: p.gender };
  } catch {
    /* sem storage */
  }
  return null;
}

export function savePlayer(p: Player): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* sem storage */
  }
}

const Ctx = createContext<Player>({ name: "", gender: "f" });

export function PlayerProvider({ player, children }: { player: Player; children: ReactNode }) {
  return <Ctx.Provider value={player}>{children}</Ctx.Provider>;
}

export const usePlayer = () => useContext(Ctx);
