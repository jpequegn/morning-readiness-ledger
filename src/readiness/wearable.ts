import type { LedgerEntry } from "./ledger";

export function canShowWearableContext(entry: LedgerEntry | undefined): boolean {
  return entry !== undefined;
}
