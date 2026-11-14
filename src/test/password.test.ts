import { describe, expect, it } from "vitest";
import { passwordScore } from "@/lib/password";
describe("passwordScore", () => {
  it("short passwords are very weak", () => expect(passwordScore("Ab1!")).toBe(0));
  it("long mixed passwords are strongest", () => expect(passwordScore("Marte#2026x")).toBe(4));
});
