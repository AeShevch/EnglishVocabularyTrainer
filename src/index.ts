import { ALL_TRAINING_WORDS } from "./mock/allTrainingWords";
import { EnglishVocabularyTraining } from "./utils/EnglishVocabularyTraining";

const training = new EnglishVocabularyTraining(ALL_TRAINING_WORDS);

const inputHandler = (letter: string): void => {
  training.inputLetter(letter);
  // updateUI
};

const goNextPageHandler = (): void => {
  training.nextQuestion();
  // updateUI
};

const goPrevPageHandler = (): void => {
  training.prevQuestion();
  // updateUI
};
