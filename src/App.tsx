import { useState } from "react";
import { CheckInForm } from "./components/CheckInForm";
import type { SubjectiveAnswers } from "./readiness/model";

export function App() {
  const [completed, setCompleted] = useState<SubjectiveAnswers | null>(null);

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
        {completed ? (
          <section className="completion-notice" aria-live="polite">
            <p className="eyebrow">Recorded</p>
            <h2>Your subjective check-in is complete.</h2>
            <p>You can edit today&apos;s answers in the ledger once storage is connected.</p>
          </section>
        ) : (
          <CheckInForm onComplete={setCompleted} />
        )}
      </section>
    </main>
  );
}
