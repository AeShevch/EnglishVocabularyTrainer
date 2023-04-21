export type Nullable<T> = T | null;

export type TrainingQuestion = {
  letters: string[];
  currentLetterIdx: number;
  mistakesCount: number;
  completed: boolean;
};
