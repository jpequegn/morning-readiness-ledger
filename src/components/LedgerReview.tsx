import { useEffect, useState } from "react";
import type { LedgerEntry } from "../readiness/ledger";
import { recentEntries } from "../readiness/review";

const answerLabels = [
  ["Sleep quality", "sleepQuality"],
  ["Fatigue", "fatigue"],
  ["Soreness", "soreness"],
  ["Stress", "stress"],
  ["Mood", "mood"],
  ["Motivation", "motivation"],
  ["Illness", "illness"],
  ["Injury", "injury"],
  ["Work pressure", "workPressure"],
] as const;

type LedgerReviewProps = {
  entries: LedgerEntry[];
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

export function LedgerReview({ entries }: LedgerReviewProps) {
  const visibleEntries = recentEntries(entries);
  const [selectedDate, setSelectedDate] = useState<string | null>(visibleEntries[0]?.date ?? null);
  const selectedEntry = visibleEntries.find((entry) => entry.date === selectedDate);

  useEffect(() => {
    if (!selectedEntry && visibleEntries[0]) setSelectedDate(visibleEntries[0].date);
  }, [selectedEntry, visibleEntries]);

  if (visibleEntries.length === 0) {
    return (
      <section className="ledger-review" aria-labelledby="review-heading">
        <p className="eyebrow">Weekly review</p>
        <h2 id="review-heading">No entries yet.</h2>
        <p className="review-empty">Complete a morning check-in to begin a local history.</p>
      </section>
    );
  }

  return (
    <section className="ledger-review" aria-labelledby="review-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Weekly review</p>
          <h2 id="review-heading">Recent readiness records</h2>
        </div>
        <p>Last {visibleEntries.length} {visibleEntries.length === 1 ? "record" : "records"}</p>
      </div>
      <div className="table-wrap">
        <table className="ledger-table">
          <thead>
            <tr><th>Date</th><th>Band</th><th>Score</th><th aria-label="Inspect raw answers" /></tr>
          </thead>
          <tbody>
            {visibleEntries.map((entry) => (
              <tr className={entry.date === selectedDate ? "selected-row" : undefined} key={entry.date}>
                <td>{formatDate(entry.date)}</td>
                <td><span className={`band-pill band-${entry.result.band.toLowerCase()}`}>{entry.result.band}</span></td>
                <td>{entry.result.score}</td>
                <td><button className="text-button" onClick={() => setSelectedDate(entry.date)} type="button">View raw</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEntry && (
        <section className="raw-answers" aria-labelledby="raw-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Raw answers</p>
              <h3 id="raw-heading">{formatDate(selectedEntry.date)}</h3>
            </div>
            <p>{selectedEntry.note || "No note recorded."}</p>
          </div>
          <dl className="answers-grid">
            {answerLabels.map(([label, key]) => (
              <div key={key}><dt>{label}</dt><dd>{selectedEntry.answers[key]} / 5</dd></div>
            ))}
          </dl>
        </section>
      )}
    </section>
  );
}
