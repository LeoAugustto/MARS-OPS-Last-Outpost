import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export interface SaveRow<T = Json> {
  slot: number;
  state: T;
  sol: number;
  updated_at: string;
}

async function currentUserId(): Promise<string> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not signed in");
  return data.user.id;
}

/** Loads the save in `slot` for the signed-in (or anonymous) player, or null if none. */
export async function loadSave<T = Json>(slot: number): Promise<SaveRow<T> | null> {
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from("saves")
    .select("slot, state, sol, updated_at")
    .eq("user_id", userId)
    .eq("slot", slot)
    .maybeSingle();
  if (error) throw error;
  return (data as SaveRow<T> | null) ?? null;
}

/** Creates or replaces the save in `slot`. `sol` defaults to state.sol when present. */
export async function writeSave(slot: number, state: Json, sol?: number): Promise<void> {
  const userId = await currentUserId();
  const solValue =
    sol ??
    (state && typeof state === "object" && !Array.isArray(state) && typeof state["sol"] === "number"
      ? (state["sol"] as number)
      : 1);
  const { error } = await supabase.from("saves").upsert(
    { user_id: userId, slot, state, sol: solValue, updated_at: new Date().toISOString() },
    { onConflict: "user_id,slot" },
  );
  if (error) throw error;
}
