import { describe, expect, it } from "vitest";
import { answersFromQuickCheckIn, initialQuickCheckIn } from "./checkIn";

describe("answersFromQuickCheckIn", () => {
  it("maps the quick grouped choices to all nine raw dimensions", () => {
    expect(
      answersFromQuickCheckIn({
        ...initialQuickCheckIn,
        sleepQuality: 4,
        bodyLoad: 5,
        mentalLoad: 2,
        headspace: 4,
      }),
    ).toEqual({
      sleepQuality: 4,
      fatigue: 5,
      soreness: 5,
      stress: 2,
      mood: 4,
      motivation: 4,
      illness: 1,
      injury: 1,
      workPressure: 2,
    });
  });

  it("records illness and injury as safety signals", () => {
    expect(
      answersFromQuickCheckIn({ ...initialQuickCheckIn, illnessPresent: true, injuryPresent: true }),
    ).toMatchObject({ illness: 3, injury: 3 });
  });
});
