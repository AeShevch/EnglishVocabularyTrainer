import { getRandomLetters } from "view/utils/getRandomLetters";
import { TrainingQuestion } from "../types";

export const generateInitialTrainingData = (trainingWords: string[]): TrainingQuestion[] =>
  trainingWords.map((word) => {
    const letters = word.split("");

    return {
      letters,
      taskLetters: getRandomLetters(letters),
      currentLetterIdx: 0,
      mistakesCount: 0,
      completed: false,
    };
  });
