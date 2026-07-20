import { describe, expect, it } from "vitest";
import { serializeLedgerExport } from "./export";
import { createLedgerEntry } from "./ledger";

describe("serializeLedgerExport", () => {
  it("exports raw answers and computed result metadata", () => {
    const entry = createLedgerEntry(
      "2026-07-20",
      { sleepQuality: 4, fatigue: 2, soreness: 2, stress: 2, mood: 4, motivation: 4, illness: 1, injury: 1, workPressure: 2 },
      "ready for intervals",
    );
    const exported = JSON.parse(serializeLedgerExport([entry], "2026-07-20T12:00:00.000Z"));

    expect(exported).toMatchObject({
      format: "morning-readiness-ledger/v1",
      exportedAt: "2026-07-20T12:00:00.000Z",
      entries: [{ answers: { sleepQuality: 4, workPressure: 2 }, result: { band: "Build" } }],
    });
  });
});
