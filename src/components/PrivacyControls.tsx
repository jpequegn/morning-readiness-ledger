import { useState } from "react";
import { serializeLedgerExport } from "../readiness/export";
import type { LedgerEntry } from "../readiness/ledger";

type PrivacyControlsProps = {
  entries: LedgerEntry[];
  onClear: () => void;
};

function downloadLedger(entries: LedgerEntry[]) {
  const blob = new Blob([serializeLedgerExport(entries)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "morning-readiness-ledger.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function PrivacyControls({ entries, onClear }: PrivacyControlsProps) {
  const [confirmingClear, setConfirmingClear] = useState(false);

  function clearLedger() {
    onClear();
    setConfirmingClear(false);
  }

  return (
    <section className="privacy-controls" aria-labelledby="privacy-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Data controls</p>
          <h2 id="privacy-heading">Private by default.</h2>
        </div>
        <p>Your ledger remains in this browser unless you export it.</p>
      </div>
      <div className="privacy-actions">
        <button className="secondary-button" disabled={entries.length === 0} onClick={() => downloadLedger(entries)} type="button">
          Download JSON
        </button>
        {confirmingClear ? (
          <div className="clear-confirmation" role="group" aria-label="Confirm clearing local ledger">
            <span>Clear {entries.length} local {entries.length === 1 ? "record" : "records"}?</span>
            <button className="danger-button" onClick={clearLedger} type="button">Clear all data</button>
            <button className="text-button" onClick={() => setConfirmingClear(false)} type="button">Cancel</button>
          </div>
        ) : (
          <button className="text-button danger-text" disabled={entries.length === 0} onClick={() => setConfirmingClear(true)} type="button">
            Clear local data
          </button>
        )}
      </div>
    </section>
  );
}
