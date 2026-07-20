import { scoreReadiness, type ReadinessResult, type SubjectiveAnswers } from "./model";

export const ledgerStorageKey = "morning-readiness-ledger.entries.v1";

export interface LedgerEntry {
  date: string;
  completedAt: string;
  updatedAt: string;
  answers: SubjectiveAnswers;
  note: string;
  result: ReadinessResult;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export function localDateKey(date = new Date()): string {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function createLedgerEntry(
  date: string,
  answers: SubjectiveAnswers,
  note: string,
  now = new Date().toISOString(),
  completedAt = now,
): LedgerEntry {
  return { date, completedAt, updatedAt: now, answers, note, result: scoreReadiness(answers) };
}

export function upsertEntry(entries: LedgerEntry[], entry: LedgerEntry): LedgerEntry[] {
  const withoutDate = entries.filter((current) => current.date !== entry.date);
  return [...withoutDate, entry].sort((left, right) => right.date.localeCompare(left.date));
}

export function readLedger(storage: StorageLike): LedgerEntry[] {
  const raw = storage.getItem(ledgerStorageKey);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLedgerEntry).sort((left, right) => right.date.localeCompare(left.date));
  } catch {
    return [];
  }
}

export function writeLedger(storage: StorageLike, entries: LedgerEntry[]): void {
  storage.setItem(ledgerStorageKey, JSON.stringify(entries));
}

function isLedgerEntry(value: unknown): value is LedgerEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<LedgerEntry>;
  return (
    typeof entry.date === "string" &&
    typeof entry.completedAt === "string" &&
    typeof entry.updatedAt === "string" &&
    typeof entry.note === "string" &&
    Boolean(entry.answers) &&
    Boolean(entry.result)
  );
}
