export function App() {
  return (
    <main className="app-shell">
      <header className="masthead">
        <p className="product-name">Morning Readiness Ledger</p>
        <p className="date-label">Subjective check-in first</p>
      </header>
      <section className="daily-ledger" aria-labelledby="ledger-heading">
        <p className="eyebrow">Today</p>
        <h1 id="ledger-heading">Set the capacity for the day.</h1>
        <p className="intro">
          Record how you feel before reviewing any wearable context. Your entries stay in this browser.
        </p>
      </section>
    </main>
  );
}
