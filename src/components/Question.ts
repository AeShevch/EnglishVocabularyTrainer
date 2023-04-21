import { getRandomArrayElements } from "../utils";
import { EnglishVocabularyTrainer } from "../utils/EnglishVocabularyTrainer";

import AbstractComponent from "./AbstractComponent";

const getQuestionHTML = ({ questions, currentQuestionIdx }: EnglishVocabularyTrainer): string => {
  const questionsCount = questions.length + 1;
  const currentQuestionNumber = currentQuestionIdx + 1;

  const { letters, currentLetterIdx } = questions[currentQuestionIdx];
  const answeredLetters = letters.slice(0, currentLetterIdx);
  const notAnsweredLetters = letters.slice(currentLetterIdx, questionsCount);
  const randomlyShuffledLetters = getRandomArrayElements(notAnsweredLetters, letters.length);

  return `
    <div>
      <p class="mb-5">
        Question 
        <span id="current_question">${currentQuestionNumber}</span> 
          of 
        <span id="total_questions">${questionsCount}</span>
      </p>
      <div>
        <div id="answer" class="bg-light mx-1 mb-3 row gx-2" style="height: 46px; border-radius: 6px">
         ${answeredLetters
           .map(
             (letter) =>
               `<div class="col">
                    <button type="button" class="btn btn-primary">
                       ${letter}
                    </button>
                 </div>
                `,
           )
           .join(``)}
          </div>
          <div id="letters">
            <div class="container px-4">
              <div class="js-answer-buttons row gx-2">
                ${randomlyShuffledLetters
                  .map(
                    (letter) =>
                      `<div class="col">
                          <button type="button" class="btn btn-primary">
                             ${letter}
                          </button>
                       </div>
                      `,
                  )
                  .join(``)}
              </div>
          </div>
      </div>
    </div>
`;
};

export default class QuestionComponent extends AbstractComponent {
  private readonly trainer: EnglishVocabularyTrainer;

  constructor(trainer: EnglishVocabularyTrainer) {
    super();

    this.trainer = trainer;
  }

  getTemplate(): string {
    return getQuestionHTML(this.trainer);
  }
}
