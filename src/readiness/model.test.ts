import { describe, expect, it } from "vitest";
import { scoreReadiness, type SubjectiveAnswers } from "./model";

const balanced: SubjectiveAnswers = {
  sleepQuality: 3,
  fatigue: 3,
  soreness: 3,
  stress: 3,
  mood: 3,
  motivation: 3,
  illness: 1,
  injury: 1,
  workPressure: 3,
};

describe("scoreReadiness", () => {
  it("selects Build when subjective signals are strongly supportive", () => {
    const result = scoreReadiness({
      ...balanced,
      sleepQuality: 5,
      fatigue: 1,
      soreness: 1,
      stress: 1,
      mood: 5,
      motivation: 5,
      workPressure: 1,
    });

    expect(result.band).toBe("Build");
    expect(result.score).toBe(100);
  });

  it("selects Maintain for balanced subjective inputs", () => {
    const result = scoreReadiness(balanced);

    expect(result.band).toBe("Maintain");
    expect(result.drivers).toEqual([]);
  });

  it("selects Protect and names low-capacity drivers", () => {
    const result = scoreReadiness({
      ...balanced,
      sleepQuality: 1,
      fatigue: 5,
      soreness: 4,
      stress: 5,
      mood: 1,
      motivation: 1,
      workPressure: 4,
    });

    expect(result.band).toBe("Protect");
    expect(result.drivers).toEqual(expect.arrayContaining(["sleep quality", "fatigue", "stress"]));
  });

  it("uses an illness signal as a recover override", () => {
    const result = scoreReadiness({ ...balanced, illness: 3 });

    expect(result.band).toBe("Recover");
    expect(result.drivers[0]).toBe("illness");
  });

  it("uses an injury signal as a recover override", () => {
    const result = scoreReadiness({ ...balanced, injury: 4 });

    expect(result.band).toBe("Recover");
    expect(result.drivers[0]).toBe("injury");
  });
});
