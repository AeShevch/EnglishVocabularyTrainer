export type Nullable<T> = T | null;

export type TrainingQuestion = {
  letters: string[];
  currentLetterIdx: number;
  mistakesCount: number;
  completed: boolean;
};

export type Result = {
  withoutMistakesCount: number;
  mistakesCount: number;
  maxMistakes: { word: string; count: number }[];
};
