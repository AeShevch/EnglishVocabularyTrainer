import { TrainingQuestion, TrainingSummary } from "model";

export const getTrainingSummary = (
  questions: TrainingQuestion[]
): TrainingSummary => {
  const maxNumberOfMistakes = questions.reduce(
    (prev, { mistakesCount }) => (prev > mistakesCount ? prev : mistakesCount),
    0
  );

  return questions.reduce<TrainingSummary>(
    (result, question) => ({
      withoutMistakesCount: !question.mistakesCount
        ? result.withoutMistakesCount + 1
        : result.withoutMistakesCount,
      mistakesCount: result.mistakesCount + question.mistakesCount,
      maxMistakes:
        question.mistakesCount === maxNumberOfMistakes &&
        maxNumberOfMistakes !== 0
          ? [
              ...result.maxMistakes,
              {
                word: question.letters.join(""),
                count: maxNumberOfMistakes,
              },
            ]
          : result.maxMistakes,
    }),
    { withoutMistakesCount: 0, mistakesCount: 0, maxMistakes: [] }
  );
};
