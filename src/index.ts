import { Controller } from "./Controller";
import { EnglishVocabularyTrainer, ALL_TRAINING_WORDS } from "./Model";

const model = new EnglishVocabularyTrainer(ALL_TRAINING_WORDS);
const app = new Controller(model);

app.run();

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
export { Result } from "./types";
