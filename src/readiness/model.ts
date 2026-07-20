export type Rating = 1 | 2 | 3 | 4 | 5;

export type CapacityBand = "Build" | "Maintain" | "Protect" | "Recover";

export interface SubjectiveAnswers {
  sleepQuality: Rating;
  fatigue: Rating;
  soreness: Rating;
  stress: Rating;
  mood: Rating;
  motivation: Rating;
  illness: Rating;
  injury: Rating;
  workPressure: Rating;
}

export interface ReadinessResult {
  band: CapacityBand;
  score: number;
  drivers: string[];
  guidance: string;
}

type Signal = {
  label: string;
  value: Rating;
  direction: "positive" | "strain";
};

const guidanceByBand: Record<CapacityBand, string> = {
  Build: "Conditions support a planned training stimulus and focused work blocks.",
  Maintain: "Keep the planned day, but favor steady volume over a major progression.",
  Protect: "Reduce discretionary load and prioritize recovery-preserving work.",
  Recover: "Treat recovery as the primary work; avoid adding training or capacity demands.",
};

function normalizedSignal(signal: Signal): number {
  return signal.direction === "positive" ? signal.value : 6 - signal.value;
}

function isSafetyFlagged(answers: SubjectiveAnswers): boolean {
  return answers.illness >= 3 || answers.injury >= 3;
}

export function scoreReadiness(answers: SubjectiveAnswers): ReadinessResult {
  const signals: Signal[] = [
    { label: "sleep quality", value: answers.sleepQuality, direction: "positive" },
    { label: "fatigue", value: answers.fatigue, direction: "strain" },
    { label: "soreness", value: answers.soreness, direction: "strain" },
    { label: "stress", value: answers.stress, direction: "strain" },
    { label: "mood", value: answers.mood, direction: "positive" },
    { label: "motivation", value: answers.motivation, direction: "positive" },
    { label: "work pressure", value: answers.workPressure, direction: "strain" },
  ];
  const average = signals.reduce((total, signal) => total + normalizedSignal(signal), 0) / signals.length;
  const score = Math.round((average / 5) * 100);
  const drivers = signals
    .filter((signal) => normalizedSignal(signal) <= 2)
    .map((signal) => signal.label);

  let band: CapacityBand;
  if (isSafetyFlagged(answers)) {
    band = "Recover";
    drivers.unshift(answers.injury >= 3 ? "injury" : "illness");
  } else if (average < 2.5) {
    band = "Protect";
  } else if (average < 3.8) {
    band = "Maintain";
  } else {
    band = "Build";
  }

  return {
    band,
    score,
    drivers,
    guidance: guidanceByBand[band],
  };
}
