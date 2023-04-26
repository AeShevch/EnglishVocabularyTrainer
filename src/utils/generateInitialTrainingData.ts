import { TrainingQuestion } from "../model/types";

export const generateInitialTrainingData = (trainingWords: string[]): TrainingQuestion[] =>
  trainingWords.map((word) => ({
    letters: word.split(""),
    currentLetterIdx: 0,
    mistakesCount: 0,
    completed: false,
  }));
