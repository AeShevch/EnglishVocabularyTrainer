import { NEXT_QUESTION_DELAY_MS, STORAGE_LS_KEY } from "../const";
import { EnglishVocabularyTrainer } from "../model";
import { Router } from "../router";
import { StorageService } from "../services";
import { Nullable, TrainingQuestion } from "../types";
import { render, isLatinChar, getFirstButtonWithLetter, getTrainingSummary } from "../utils";
import {
  SummaryComponent,
  StartScreenComponent,
  TrainingComponent,
  ResumeRequestModalComponent,
} from "../view";

const storage = new StorageService(STORAGE_LS_KEY);

export class Controller {
  private readonly model: EnglishVocabularyTrainer;

  private readonly rootNode: Element;

  private readonly startScreenComponent: StartScreenComponent;

  private readonly trainingComponent: TrainingComponent;

  private readonly summaryComponent: SummaryComponent;

  private readonly resumeRequestModalComponent: ResumeRequestModalComponent;

  private readonly router: Router;

  private nextQuestionTimeoutID: Nullable<number>;

  constructor(model: EnglishVocabularyTrainer, router: Router) {
    this.model = model;
    this.router = router;

    this.startScreenComponent = new StartScreenComponent();
    this.trainingComponent = new TrainingComponent();
    this.summaryComponent = new SummaryComponent();
    this.resumeRequestModalComponent = new ResumeRequestModalComponent();

    this.router.onBeforePageChange = () => {
      this.startScreenComponent.unmount();
      this.trainingComponent.unmount();
      this.summaryComponent.unmount();
    };

    const rootNode = document.querySelector(`.js-app-root`);

    if (!rootNode) {
      throw new Error(`Root node not found!`);
    }

    this.rootNode = rootNode;

    this.renderStartPage = this.renderStartPage.bind(this);
    this.renderTraining = this.renderTraining.bind(this);
    this.renderSummaryPage = this.renderSummaryPage.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.trainingComponent.setProps(this.model);
  }

  public run(): void {
    this.router.navigateTo(`/`);

    const initialData = storage.get();

    if (initialData) {
      this.showResumeTrainingModal(initialData);
    }

    this.router
      .addRoute(`/`, this.renderStartPage)
      .addRoute<{ slug: string }>(`/training/:slug`, ({ slug }) => this.renderTraining(slug), true)
      .addRoute(`/results`, this.renderSummaryPage)
      .start();

    this.router.navigateTo(`/`);
  }

  private setGlobalHandlers(): void {
    window.addEventListener(`keypress`, this.keyPressHandler);
  }

  private clearGlobalHandlers(): void {
    window.removeEventListener(`keypress`, this.keyPressHandler);
  }

  private letterClickHandler(target: HTMLButtonElement): void {
    const input = target.outerText;

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

  public renderStartPage(): void {
    render(this.rootNode, this.startScreenComponent);

    this.startScreenComponent.setHandler({
      type: `click`,
      handler: () => {
        this.startScreenComponent.unmount();
        this.router.navigateTo(`/training/1`);
      },
      elementSelector: `.js-start-training`,
    });
  }

  private renderTraining(slug: string): void {
    this.model.currentQuestionIdx = +slug - 1;

    this.trainingComponent.unmount();
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

  private renderSummaryPage(): void {
    storage.clear();

    this.summaryComponent.setProps(getTrainingSummary(this.model.questions));

    render(this.rootNode, this.summaryComponent);

    this.summaryComponent.setHandler({
      type: `click`,
      handler: this.startAgain,
      elementSelector: `.js-start-again`,
    });
  }

  private showResumeTrainingModal(initialData: TrainingQuestion[]): void {
    render(this.rootNode, this.resumeRequestModalComponent);

    this.resumeRequestModalComponent.setHandler({
      type: `click`,
      handler: () => {
        this.startScreenComponent.unmount();
        this.resumeRequestModalComponent.unmount();

        this.model.newTraining(initialData);
        this.router.navigateTo(`/training/${this.model.currentQuestionIdx + 1}`);
      },
      elementSelector: `.js-resume-training`,
    });

    this.resumeRequestModalComponent.setHandler({
      type: `click`,
      handler: () => {
        this.resumeRequestModalComponent.unmount();
        storage.clear();
      },
      elementSelector: `.js-close-modal`,
    });
  }

  private startAgain(): void {
    this.summaryComponent.unmount();
    this.model.newTraining();

    this.router.navigateTo(`/`);
  }

  private highlightWrongLetter(targetButton: Element | undefined): void {
    if (targetButton) {
      targetButton?.classList.add(`btn-danger`);

      window.setTimeout(() => {
        targetButton?.classList.remove(`btn-danger`);
        this.trainingComponent.rerender();
      }, 200);
    } else {
      this.trainingComponent.rerender();
    }
  }

  private goToNextQuestionWithDelay(): void {
    if (this.nextQuestionTimeoutID) return;

    this.nextQuestionTimeoutID = window.setTimeout(() => {
      this.trainingComponent.unmount();
      this.nextQuestionTimeoutID = null;

      if (!this.model.isLastQuestion()) {
        this.model.nextQuestion();
        this.router.navigateTo(`/training/${this.model.currentQuestionIdx + 1}`);

        return;
      }

      this.clearGlobalHandlers();
      this.router.navigateTo(`/results`);
    }, NEXT_QUESTION_DELAY_MS);
  }

  private checkLetter(letter: string, targetButton: Element | undefined): void {
    const { isCorrect, isCompeted } = this.model.inputLetter(letter);

    if (!isCorrect) {
      this.highlightWrongLetter(targetButton);
    } else {
      this.trainingComponent.rerender();
    }

    if (isCompeted) {
      this.goToNextQuestionWithDelay();
    }

    storage.set(this.model.questions);
  }
}
