export type TrainingQuestion = {
  letters: string[];
  currentLetterIdx: number;
  mistakesCount: number;
  completed: boolean;
};

export type TrainingSummary = {
  withoutMistakesCount: number;
  mistakesCount: number;
  maxMistakes: { word: string; count: number }[];
};
