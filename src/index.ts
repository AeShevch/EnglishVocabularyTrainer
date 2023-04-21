import QuestionComponent from "./components/Question";
import { ALL_TRAINING_WORDS } from "./mock/allTrainingWords";
import { Nullable } from "./types";
import { EnglishVocabularyTrainer } from "./utils/EnglishVocabularyTrainer";
import { render } from "./utils/render";

const trainer = new EnglishVocabularyTrainer(ALL_TRAINING_WORDS);
const questionComponent = new QuestionComponent(trainer);

const rootElement = document.querySelector(`.js-question-root`);

const onLetterClick = (input: Nullable<string>): void => {
  if (input) {
    trainer.inputLetter(input.trim());
    questionComponent.rerender();
  }
};

if (rootElement) {
  render(rootElement, questionComponent);

  questionComponent.setHandler({
    type: `click`,
    handler: (evt) => {
      if (evt.target instanceof HTMLButtonElement) {
        onLetterClick(evt.target.textContent);
      }
    },
    elementSelector: `.js-answer-buttons`,
  });
}
//
// const inputHandler = (letter: string): void => {
//   trainer.inputLetter(letter);
//   // updateUI
// };
//
// const goNextPageHandler = (): void => {
//   trainer.nextQuestion();
//   // updateUI
// };
//
// const goPrevPageHandler = (): void => {
//   trainer.prevQuestion();
//   // updateUI
// };
