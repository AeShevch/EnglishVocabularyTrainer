import { TrainingStep } from "../types";

export const generateInitialTrainingData = (trainingWords: string[]): TrainingStep[] =>
  trainingWords.map((word) => ({
    letters: word.split(``),
    currentLetterIdx: 0,
    mistakesCount: 0,
    finished: false,
  }));
