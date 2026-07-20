import { useState } from "react";
import { CheckInForm } from "./components/CheckInForm";
import { LedgerReview } from "./components/LedgerReview";
import { ReadinessResult } from "./components/ReadinessResult";
import { quickCheckInFromAnswers } from "./readiness/checkIn";
import { createLedgerEntry, localDateKey, readLedger, upsertEntry, writeLedger, type LedgerEntry } from "./readiness/ledger";
import type { SubjectiveAnswers } from "./readiness/model";

export function App() {
  const today = localDateKey();
  const [entries, setEntries] = useState<LedgerEntry[]>(() => readLedger(window.localStorage));
  const [editing, setEditing] = useState(() => !entries.some((entry) => entry.date === today));
  const todayEntry = entries.find((entry) => entry.date === today);

  function saveEntry(answers: SubjectiveAnswers, note: string) {
    const entry = createLedgerEntry(today, answers, note, undefined, todayEntry?.completedAt);
    const nextEntries = upsertEntry(entries, entry);
    writeLedger(window.localStorage, nextEntries);
    setEntries(nextEntries);
    setEditing(false);
  }

  return (
    <main className="app-shell">
      <header className="masthead">
        <p className="product-name">Morning Readiness Ledger</p>
        <p className="date-label">Subjective check-in first</p>
      </header>
      <section className="daily-ledger" aria-labelledby="ledger-heading">
        <p className="eyebrow">Today</p>
        <h1 id="ledger-heading">Set the capacity for the day.</h1>
        <p className="intro">Record how you feel before reviewing any wearable context. Your entries stay in this browser.</p>
        {todayEntry && !editing ? (
          <>
            <ReadinessResult entry={todayEntry} />
            <p className="saved-at">Saved locally at {new Date(todayEntry.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.</p>
            <button className="text-button" onClick={() => setEditing(true)} type="button">Edit today&apos;s check-in</button>
          </>
        ) : (
          <CheckInForm
            initialValues={todayEntry ? quickCheckInFromAnswers(todayEntry.answers, todayEntry.note) : undefined}
            onComplete={saveEntry}
            submitLabel={todayEntry ? "Update check-in" : "Complete check-in"}
          />
        )}
      </section>
      <LedgerReview entries={entries} />
    </main>
  );
}
