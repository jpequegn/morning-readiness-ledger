import { describe, expect, it } from "vitest";
import { createLedgerEntry, ledgerStorageKey, readLedger, upsertEntry, writeLedger, type StorageLike } from "./ledger";
import type { SubjectiveAnswers } from "./model";

const answers: SubjectiveAnswers = {
  sleepQuality: 3,
  fatigue: 3,
  soreness: 3,
  stress: 3,
  mood: 3,
  motivation: 3,
  illness: 1,
  injury: 1,
  workPressure: 3,
};

function memoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
}

describe("ledger storage", () => {
  it("persists and reloads completed entries", () => {
    const storage = memoryStorage();
    const entry = createLedgerEntry("2026-07-20", answers, "A steady Monday", "2026-07-20T10:00:00.000Z");

    writeLedger(storage, [entry]);

    expect(readLedger(storage)).toEqual([entry]);
  });

  it("replaces an existing date while preserving its original completion timestamp", () => {
    const original = createLedgerEntry("2026-07-20", answers, "first", "2026-07-20T10:00:00.000Z");
    const revision = createLedgerEntry(
      "2026-07-20",
      { ...answers, fatigue: 4 },
      "revised",
      "2026-07-20T11:00:00.000Z",
      original.completedAt,
    );

    expect(upsertEntry([original], revision)).toEqual([revision]);
    expect(revision.result.band).toBe("Maintain");
  });

  it("ignores malformed local data", () => {
    const storage = memoryStorage();
    storage.setItem(ledgerStorageKey, "not-json");

    expect(readLedger(storage)).toEqual([]);
  });
});
