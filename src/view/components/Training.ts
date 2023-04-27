import { EnglishVocabularyTrainer } from "model";

import { Component } from "../Component";

const getTrainingHTML = ({
  questions,
  currentQuestionIdx,
  maxMistakesCount,
}: EnglishVocabularyTrainer): string => {
  const currentQuestionNumber = currentQuestionIdx + 1;

  const { letters, taskLetters, currentLetterIdx, mistakesCount, completed } =
    questions[currentQuestionIdx];
  const answeredLetters = completed ? letters : letters.slice(0, currentLetterIdx);

  return `
    <div>
      <p class="mb-1">
        Question 
        <span id="current_question">${currentQuestionNumber}</span> 
          of 
        <span id="total_questions">${questions.length}</span>
      </p>
      <p class="mb-5">
        Mistakes 
        <span>${mistakesCount}</span> 
          of 
        <span>${maxMistakesCount}</span>
      </p>
      <div class="d-inline-flex flex-column">
        <div id="answer" class="d-inline-flex justify-content-center bg-light mx-1 mb-3 row gx-2" style="height: 46px; border-radius: 6px">
         ${answeredLetters
           .map(
             (letter) =>
               `<div class="col-auto">
                    <div class="btn btn-primary ${
                      mistakesCount === maxMistakesCount ? "btn-danger" : "btn-success"
                    }">
                       ${letter}
                    </div>
                 </div>
                `,
           )
           .join("")}
          </div>
          <div id="letters">
            <div class="container px-4">
              <div class="js-answer-buttons row gx-2">
                ${taskLetters
                  .map(
                    (letter, index) =>
                      `<div class="col-auto">
                          <button data-index="${index}" type="button" class="js-letter-button btn btn-primary">
                             ${letter}
                          </button>
                       </div>
                      `,
                  )
                  .join("")}
              </div>
          </div>
      </div>
    </div>
`;
};

/**
 * Training question page
 */
export class TrainingComponent extends Component {
  public props: EnglishVocabularyTrainer;

  public getTemplate(): string {
    return getTrainingHTML(this.props);
  }

  public setProps(props: EnglishVocabularyTrainer): void {
    this.props = props;
  }
}
