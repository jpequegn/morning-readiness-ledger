import { describe, expect, it } from "vitest";
import { createLedgerEntry } from "./ledger";
import { recentEntries } from "./review";

const answers = { sleepQuality: 3, fatigue: 3, soreness: 3, stress: 3, mood: 3, motivation: 3, illness: 1, injury: 1, workPressure: 3 } as const;

describe("recentEntries", () => {
  it("sorts entries newest first and limits the review set", () => {
    const entries = [
      createLedgerEntry("2026-07-18", answers, ""),
      createLedgerEntry("2026-07-20", answers, ""),
      createLedgerEntry("2026-07-19", answers, ""),
    ];

    expect(recentEntries(entries, 2).map((entry) => entry.date)).toEqual(["2026-07-20", "2026-07-19"]);
  });
});
