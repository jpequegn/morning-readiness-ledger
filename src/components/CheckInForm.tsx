import { useState, type FormEvent } from "react";
import {
  answersFromQuickCheckIn,
  initialQuickCheckIn,
  type QuickCheckInValues,
} from "../readiness/checkIn";
import type { Rating, SubjectiveAnswers } from "../readiness/model";

type CheckInFormProps = {
  onComplete: (answers: SubjectiveAnswers, note: string) => void;
  initialValues?: QuickCheckInValues;
  submitLabel?: string;
};

type ScalePrompt = {
  key: "sleepQuality" | "bodyLoad" | "mentalLoad" | "headspace";
  label: string;
  leftLabel: string;
  rightLabel: string;
};

const scalePrompts: ScalePrompt[] = [
  { key: "sleepQuality", label: "Sleep quality", leftLabel: "Poor", rightLabel: "Restorative" },
  { key: "bodyLoad", label: "Body load", leftLabel: "Fresh", rightLabel: "Heavy" },
  { key: "mentalLoad", label: "Mental load", leftLabel: "Clear", rightLabel: "Pressured" },
  { key: "headspace", label: "Headspace", leftLabel: "Low", rightLabel: "Positive" },
];

function ScaleControl({
  prompt,
  value,
  onChange,
}: {
  prompt: ScalePrompt;
  value: Rating;
  onChange: (value: Rating) => void;
}) {
  return (
    <fieldset className="checkin-row">
      <legend>{prompt.label}</legend>
      <div className="scale-options" aria-label={prompt.label}>
        {([1, 2, 3, 4, 5] as Rating[]).map((rating) => (
          <button
            aria-label={`${prompt.label}: ${rating} of 5`}
            aria-pressed={value === rating}
            className={value === rating ? "selected" : undefined}
            key={rating}
            onClick={() => onChange(rating)}
            type="button"
          >
            {rating}
          </button>
        ))}
      </div>
      <div className="scale-endpoints" aria-hidden="true">
        <span>{prompt.leftLabel}</span>
        <span>{prompt.rightLabel}</span>
      </div>
    </fieldset>
  );
}

function FlagControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <fieldset className="checkin-row flag-row">
      <legend>{label}</legend>
      <div className="binary-options" aria-label={label}>
        <button aria-pressed={!value} className={!value ? "selected" : undefined} onClick={() => onChange(false)} type="button">
          No
        </button>
        <button aria-pressed={value} className={value ? "selected warning" : undefined} onClick={() => onChange(true)} type="button">
          Yes
        </button>
      </div>
    </fieldset>
  );
}

export function CheckInForm({ onComplete, initialValues = initialQuickCheckIn, submitLabel = "Complete check-in" }: CheckInFormProps) {
  const [values, setValues] = useState<QuickCheckInValues>(initialValues);

  function updateValue<Key extends keyof QuickCheckInValues>(key: Key, value: QuickCheckInValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onComplete(answersFromQuickCheckIn(values), values.note.trim());
  }

  return (
    <form className="checkin-form" onSubmit={submit}>
      <div className="checkin-questions">
        {scalePrompts.map((prompt) => (
          <ScaleControl
            key={prompt.key}
            onChange={(rating) => updateValue(prompt.key, rating)}
            prompt={prompt}
            value={values[prompt.key]}
          />
        ))}
        <FlagControl label="Illness symptoms today?" onChange={(present) => updateValue("illnessPresent", present)} value={values.illnessPresent} />
        <FlagControl label="Pain or injury concern today?" onChange={(present) => updateValue("injuryPresent", present)} value={values.injuryPresent} />
      </div>
      <label className="note-field">
        <span>Optional note</span>
        <textarea
          onChange={(event) => updateValue("note", event.target.value)}
          placeholder="Anything worth remembering?"
          rows={3}
          value={values.note}
        />
      </label>
      <button className="complete-button" type="submit">{submitLabel}</button>
    </form>
  );
}
