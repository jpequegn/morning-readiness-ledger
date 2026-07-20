import type { LedgerEntry } from "./ledger";

export function recentEntries(entries: LedgerEntry[], limit = 7): LedgerEntry[] {
  return [...entries].sort((left, right) => right.date.localeCompare(left.date)).slice(0, limit);
}
