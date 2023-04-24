import { EnglishVocabularyTrainer } from "../Model";
import { Result } from "../types";
import { render, isLatinChar, getFirstButtonWithLetter } from "../utils";
import { ResultsComponent, StartScreenComponent, TrainingComponent } from "../View";

export class Controller {
  private readonly model: EnglishVocabularyTrainer;

  private readonly rootNode: Element;

  private readonly startScreenComponent: StartScreenComponent;

  private readonly trainingComponent: TrainingComponent;

  private readonly resultsComponent: ResultsComponent;

  constructor(model: EnglishVocabularyTrainer) {
    this.model = model;

    this.startScreenComponent = new StartScreenComponent();
    this.trainingComponent = new TrainingComponent();
    this.resultsComponent = new ResultsComponent();

    const rootNode = document.querySelector(`.js-app-root`);

    if (!rootNode) {
      throw new Error(`Root node not found!`);
    }

    this.rootNode = rootNode;

    this.startTraining = this.startTraining.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.trainingComponent.bindData(this.model);
  }

  public run(): void {
    render(this.rootNode, this.startScreenComponent);

    this.startScreenComponent.setHandler({
      type: `click`,
      handler: this.startTraining,
      elementSelector: `.js-start-training`,
    });
  }

  private startTraining(): void {
    this.startScreenComponent.unmount();

    render(this.rootNode, this.trainingComponent);

    this.trainingComponent.setHandler({
      type: `click`,
      handler: (evt) => {
        if (evt.target instanceof HTMLButtonElement) {
          this.letterClickHandler(evt.target);
        }
      },
      elementSelector: `.js-answer-buttons`,
    });

    this.setGlobalHandlers();
  }

  private showResults(): void {
    this.clearGlobalHandlers();
    this.trainingComponent.unmount();

    this.resultsComponent.bindData(this.getResults());

    render(this.rootNode, this.resultsComponent);

    this.resultsComponent.setHandler({
      type: `click`,
      handler: this.startAgain,
      elementSelector: `.js-start-again`,
    });
  }

  private startAgain(): void {
    this.resultsComponent.unmount();
    this.model.newTraining();

    this.run();
  }

  private setGlobalHandlers(): void {
    window.addEventListener(`keypress`, this.keyPressHandler);
  }

  private clearGlobalHandlers(): void {
    window.removeEventListener(`keypress`, this.keyPressHandler);
  }

  private letterClickHandler(target: HTMLButtonElement): void {
    const input = target.textContent;

    if (input) {
      this.checkLetter(input.trim(), target);
    }
  }

  private keyPressHandler({ key: letter }: KeyboardEvent): void {
    if (isLatinChar(letter)) {
      const targetButton = getFirstButtonWithLetter(this.rootNode, letter);

      this.checkLetter(letter, targetButton);
    }
  }

  private checkLetter(letter: string, targetButton: Element | undefined): void {
    const { isCorrect, isCompeted } = this.model.inputLetter(letter);

    if (!isCorrect) {
      targetButton?.classList.add(`btn-danger`);

      setTimeout(() => {
        targetButton?.classList.remove(`btn-danger`);
        this.trainingComponent.rerender();
      }, 200);
    } else {
      this.trainingComponent.rerender();
    }

    if (isCompeted) {
      setTimeout(() => {
        if (!this.model.isLastQuestion()) {
          this.model.nextQuestion();
          this.trainingComponent.rerender();

          return;
        }

        this.showResults();
      }, 1500);
    }
  }

  private getResults(): Result {
    const maxNumberOfMistakes = this.model.questions.reduce(
      (prev, { mistakesCount }) => (prev > mistakesCount ? prev : mistakesCount),
      0,
    );

    return this.model.questions.reduce<Result>(
      (result, question) => ({
        withoutMistakesCount: !question.mistakesCount
          ? result.withoutMistakesCount + 1
          : result.withoutMistakesCount,
        mistakesCount: result.mistakesCount + question.mistakesCount,
        maxMistakes:
          question.mistakesCount === maxNumberOfMistakes
            ? [
                ...result.maxMistakes,
                {
                  word: question.letters.join(``),
                  count: maxNumberOfMistakes,
                },
              ]
            : result.maxMistakes,
      }),
      { withoutMistakesCount: 0, mistakesCount: 0, maxMistakes: [] },
    );
  }
}
