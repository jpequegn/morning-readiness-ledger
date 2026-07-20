import type { LedgerEntry } from "./ledger";

export interface LedgerExport {
  format: "morning-readiness-ledger/v1";
  exportedAt: string;
  entries: LedgerEntry[];
}

export function buildLedgerExport(entries: LedgerEntry[], exportedAt = new Date().toISOString()): LedgerExport {
  return { format: "morning-readiness-ledger/v1", exportedAt, entries };
}

export function serializeLedgerExport(entries: LedgerEntry[], exportedAt?: string): string {
  return `${JSON.stringify(buildLedgerExport(entries, exportedAt), null, 2)}\n`;
}
