import type { LedgerEntry } from "../readiness/ledger";

type ReadinessResultProps = {
  entry: LedgerEntry;
};

export function ReadinessResult({ entry }: ReadinessResultProps) {
  const { result } = entry;
  const driverText = result.drivers.length > 0 ? result.drivers.join(", ") : "No dominant limiting signals";

  return (
    <section className={`result-panel result-${result.band.toLowerCase()}`} aria-labelledby="capacity-heading">
      <div className="result-summary">
        <p className="eyebrow">Capacity band</p>
        <div className="band-line">
          <h2 id="capacity-heading">{result.band}</h2>
          <span>{result.score}/100 subjective</span>
        </div>
        <p className="guidance">{result.guidance}</p>
      </div>
      <dl className="result-details">
        <div>
          <dt>Key drivers</dt>
          <dd>{driverText}</dd>
        </div>
        {entry.note && (
          <div>
            <dt>Today&apos;s note</dt>
            <dd>{entry.note}</dd>
          </div>
        )}
      </dl>
      <section className="wearable-context" aria-labelledby="wearable-heading">
        <div>
          <p className="eyebrow">Wearable context</p>
          <h3 id="wearable-heading">Not connected</h3>
        </div>
        <p>
          Wearable values are intentionally withheld until your subjective check-in is complete. No wearable data is needed for this capacity band.
        </p>
      </section>
    </section>
  );
}
