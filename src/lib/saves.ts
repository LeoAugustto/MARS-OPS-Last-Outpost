/**
 * Local-only game saves (localStorage). Every call is wrapped in try/catch so the
 * game keeps working when storage is blocked (private mode, school devices...).
 */
export interface SaveRow<T = unknown> {
  slot: number;
  state: T;
  sol: number;
  updated_at: string;
}

const PREFIX = "marsops:save:";

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function solOf(state: unknown): number {
  if (state && typeof state === "object" && "sol" in state) {
    const s = (state as { sol: unknown }).sol;
    if (typeof s === "number") return s;
  }
  return 1;
}

export function loadSave<T = unknown>(slot: number): SaveRow<T> | null {
  try {
    const raw = storage()?.getItem(PREFIX + slot);
    return raw ? (JSON.parse(raw) as SaveRow<T>) : null;
  } catch {
    return null;
  }
}

/** Returns true when the save was stored. `sol` defaults to state.sol when present. */
export function writeSave(slot: number, state: unknown, sol?: number): boolean {
  try {
    const row: SaveRow = { slot, state, sol: sol ?? solOf(state), updated_at: new Date().toISOString() };
    const s = storage();
    if (!s) return false;
    s.setItem(PREFIX + slot, JSON.stringify(row));
    return true;
  } catch {
    return false;
  }
}

/** All saves, newest first. */
export function listSaves(): SaveRow[] {
  try {
    const s = storage();
    if (!s) return [];
    const rows: SaveRow[] = [];
    for (let i = 0; i < s.length; i++) {
      const key = s.key(i);
      if (!key?.startsWith(PREFIX)) continue;
      try {
        rows.push(JSON.parse(s.getItem(key) ?? "") as SaveRow);
      } catch {
        /* skip broken entry */
      }
    }
    return rows.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
  } catch {
    return [];
  }
}

export function deleteSave(slot: number): void {
  try {
    storage()?.removeItem(PREFIX + slot);
  } catch {
    /* ignore */
  }
}
