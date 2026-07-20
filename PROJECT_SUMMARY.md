# Morning Readiness Ledger

## What it does

Morning Readiness Ledger is a private, local-first daily check-in for making endurance-training and work-capacity decisions from subjective signals. A normal entry takes six choices plus one submit action:

- sleep quality, body load, mental load, and headspace on five-point scales;
- illness and injury concern as explicit safety flags; and
- an optional short note.

The grouped choices are stored as all nine source dimensions: sleep quality, fatigue, soreness, stress, mood, motivation, illness, injury, and work pressure. The app calculates an explainable `Build`, `Maintain`, `Protect`, or `Recover` capacity band. Illness and injury can override the general score to prioritize recovery.

No wearable score is shown before the subjective check-in is completed. The current prototype has no wearable integration; its absence never changes the subjective result.

Entries persist only in browser local storage. The weekly review exposes the raw ratings and notes behind each capacity band. A versioned JSON export supports portability, and local data can be explicitly cleared.

## Run it

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. Use `npm test`, `npm run lint`, and `npm run build` to verify the project.

## Typical use

1. In the morning, choose the four scales and answer the two safety questions before checking any wearable application.
2. Use the resulting band as a neutral planning constraint: progress a planned stimulus for `Build`, keep volume steady for `Maintain`, reduce discretionary load for `Protect`, or prioritize recovery for `Recover`.
3. Add a brief note when a contextual event matters, such as travel, a deadline, or an unusually good session.
4. At the end of a week, inspect recent records and their raw answers instead of treating a score as a black box.
5. Download JSON before moving browsers or beginning a longer-term analysis.

## Potential extensions

- Add post-check-in wearable integrations whose values are displayed as optional context only.
- Offer a detailed editor for independently adjusting every one of the nine raw dimensions after the quick check-in.
- Import calendar, training-load, or travel events as annotations rather than scoring inputs.
- Add local visualizations that correlate subjective signals with training outcomes over time.
- Make the band rules configurable per sport, season, or rehabilitation protocol while retaining an audit trail of rule changes.

## Innovative uses

- Run a personal n-of-1 experiment by exporting data and comparing sleep, work pressure, and training choices against a later performance journal.
- Use `Protect` or `Recover` as an automatic permission structure for high-demand days: cancel a marginal workout, shorten a meeting-heavy schedule, or favor deep work over reactive work.
- Pair the ledger with a coach review that receives only exported, consented summaries, preserving the daily subjective-first habit.
- Treat the notes as qualitative event markers to identify combinations such as travel plus deadlines that repeatedly precede capacity reductions.

## Privacy boundary

The app does not send ledger data to a service. Browser storage can be cleared by the browser or device owner, so export data that needs to be retained.
