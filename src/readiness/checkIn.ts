import type { Rating, SubjectiveAnswers } from "./model";

export interface QuickCheckInValues {
  sleepQuality: Rating;
  bodyLoad: Rating;
  mentalLoad: Rating;
  headspace: Rating;
  illnessPresent: boolean;
  injuryPresent: boolean;
  note: string;
}

export const initialQuickCheckIn: QuickCheckInValues = {
  sleepQuality: 3,
  bodyLoad: 3,
  mentalLoad: 3,
  headspace: 3,
  illnessPresent: false,
  injuryPresent: false,
  note: "",
};

export function answersFromQuickCheckIn(values: QuickCheckInValues): SubjectiveAnswers {
  return {
    sleepQuality: values.sleepQuality,
    fatigue: values.bodyLoad,
    soreness: values.bodyLoad,
    stress: values.mentalLoad,
    mood: values.headspace,
    motivation: values.headspace,
    illness: values.illnessPresent ? 3 : 1,
    injury: values.injuryPresent ? 3 : 1,
    workPressure: values.mentalLoad,
  };
}

export function quickCheckInFromAnswers(answers: SubjectiveAnswers, note: string): QuickCheckInValues {
  return {
    sleepQuality: answers.sleepQuality,
    bodyLoad: answers.fatigue,
    mentalLoad: answers.stress,
    headspace: answers.mood,
    illnessPresent: answers.illness >= 3,
    injuryPresent: answers.injury >= 3,
    note,
  };
}
