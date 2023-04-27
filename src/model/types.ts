export type TrainingQuestion = {
  letters: string[];
  taskLetters: string[];
  currentLetterIdx: number;
  mistakesCount: number;
  completed: boolean;
};

export type TrainingSummary = {
  withoutMistakesCount: number;
  mistakesCount: number;
  maxMistakes: { word: string; count: number }[];
};
