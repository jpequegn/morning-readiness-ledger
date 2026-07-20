import { describe, expect, it } from "vitest";
import { createLedgerEntry } from "./ledger";
import { canShowWearableContext } from "./wearable";

describe("wearable context gate", () => {
  it("keeps wearable context unavailable before a subjective entry exists", () => {
    expect(canShowWearableContext(undefined)).toBe(false);
  });

  it("makes wearable context available only after a subjective entry is saved", () => {
    const entry = createLedgerEntry(
      "2026-07-20",
      { sleepQuality: 3, fatigue: 3, soreness: 3, stress: 3, mood: 3, motivation: 3, illness: 1, injury: 1, workPressure: 3 },
      "",
    );

    expect(canShowWearableContext(entry)).toBe(true);
  });
});
