import QuestionComponent from "./components/Question";
import { ALL_TRAINING_WORDS } from "./mock/allTrainingWords";
import { EnglishVocabularyTrainer } from "./utils/EnglishVocabularyTrainer";
import { render } from "./utils/render";

const trainer = new EnglishVocabularyTrainer(ALL_TRAINING_WORDS);
const questionComponent = new QuestionComponent(trainer);

const rootElement = document.querySelector(`.js-question-root`);

const onLetterClick = (target: HTMLButtonElement): void => {
  const input = target.textContent;

  if (input) {
    const { isCorrect, isCompeted } = trainer.inputLetter(input.trim());

    if (!isCorrect) {
      target.classList.add(`btn-danger`);

      setTimeout(() => {
        target.classList.remove(`btn-danger`);
        questionComponent.rerender();
      }, 200);
    } else {
      questionComponent.rerender();
    }

    if (isCompeted) {
      setTimeout(() => {
        trainer.nextQuestion();
        questionComponent.rerender();
      }, 1000);
    }
  }
};

if (rootElement) {
  render(rootElement, questionComponent);

  questionComponent.setHandler({
    type: `click`,
    handler: (evt) => {
      if (evt.target instanceof HTMLButtonElement) {
        onLetterClick(evt.target);
      }
    },
    elementSelector: `.js-answer-buttons`,
  });
}

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
