import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteSave, listSaves, loadSave, writeSave } from "@/lib/saves";

describe("local saves", () => {
  beforeEach(() => localStorage.clear());
  it("writes and loads a slot, reading sol from state", () => {
    writeSave(1, { sol: 3 });
    expect(loadSave(1)?.sol).toBe(3);
  });
  it("lists and deletes saves", () => {
    writeSave(1, {});
    writeSave(2, {});
    expect(listSaves()).toHaveLength(2);
    deleteSave(1);
    expect(loadSave(1)).toBeNull();
  });
  it("does not crash when storage is blocked", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(writeSave(1, {})).toBe(false);
    spy.mockRestore();
  });
});
