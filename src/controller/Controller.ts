import { EnglishVocabularyTrainer, TrainingQuestion } from "model";
import { Router } from "router";
import { StorageService } from "services";
import { Nullable } from "types";
import {
  SummaryComponent,
  StartScreenComponent,
  TrainingComponent,
  ResumeRequestModalComponent,
  ELEMENT_SELECTORS,
  ERROR_STATE_LETTER_CLASSNAME,
  render,
} from "view";

import { ERROR_LETTER_STATE_DURATION_MS, NEXT_QUESTION_DELAY_MS } from "./const";
import { getFirstButtonWithLetter, getTrainingSummary, isLatinChar } from "./utils";

/**
 * Controller implements the handling of user actions,
 * changing the state of Model and redrawing View.
 */
export class Controller {
  private rootNode: Element;

  private readonly model: EnglishVocabularyTrainer;

  private readonly startScreenComponent: StartScreenComponent;

  private readonly trainingComponent: TrainingComponent;

  private readonly summaryComponent: SummaryComponent;

  private readonly resumeRequestModalComponent: ResumeRequestModalComponent;

  private readonly router: Router;

  private readonly storage: StorageService;

  private nextQuestionTimeoutID: Nullable<number>;

  constructor(model: EnglishVocabularyTrainer, router: Router, storage: StorageService) {
    this.setRootNode();

    this.model = model;
    this.storage = storage;
    this.router = router;

    this.startScreenComponent = new StartScreenComponent();
    this.trainingComponent = new TrainingComponent();
    this.summaryComponent = new SummaryComponent();
    this.resumeRequestModalComponent = new ResumeRequestModalComponent();

    this.trainingComponent.setProps(this.model);

    this.renderStartPage = this.renderStartPage.bind(this);
    this.renderTrainingPage = this.renderTrainingPage.bind(this);
    this.renderSummaryPage = this.renderSummaryPage.bind(this);
    this.startAgain = this.startAgain.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
    this.resumeTrainingClickHandler = this.resumeTrainingClickHandler.bind(this);
    this.closeModalClickHandler = this.closeModalClickHandler.bind(this);
    this.unmountAllPages = this.unmountAllPages.bind(this);

    this.router.onBeforePageChange = this.unmountAllPages;
  }

  public run(): void {
    const initialData = this.storage.get();

    if (initialData) {
      this.showResumeTrainingModal(initialData);
    }

    this.router
      .addRoute("/", this.renderStartPage)
      .addRoute<{ slug: string }>(
        "/training/:slug",
        ({ slug }) => this.renderTrainingPage(slug),
        true,
      )
      .addRoute("/results", this.renderSummaryPage)
      .start();

    this.router.navigateTo("/");
  }

  private setRootNode(): void {
    const rootNode = document.querySelector(ELEMENT_SELECTORS.ROOT_NODE);

    if (!rootNode) {
      throw new Error(`Root node (${ELEMENT_SELECTORS.ROOT_NODE}) not found!`);
    }

    this.rootNode = rootNode;
  }

  private setGlobalHandlers(): void {
    window.addEventListener("keypress", this.keyPressHandler);
  }

  private clearGlobalHandlers(): void {
    window.removeEventListener("keypress", this.keyPressHandler);
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

  private resumeTrainingClickHandler(initialData: TrainingQuestion[]): void {
    this.resumeRequestModalComponent.unmount();

    this.model.newTraining(initialData);
    this.router.navigateTo(`/training/${this.model.currentQuestionIdx + 1}`);
  }

  private closeModalClickHandler(): void {
    this.resumeRequestModalComponent.unmount();
    this.storage.clear();
  }

  public renderStartPage(): void {
    render(this.rootNode, this.startScreenComponent);

    this.startScreenComponent.setHandler({
      type: "click",
      handler: () => {
        this.model.newTraining();
        this.router.navigateTo("/training/1");
      },
      elementSelector: ELEMENT_SELECTORS.START_TRAINING_BUTTON,
    });
  }

  private renderTrainingPage(slug: string): void {
    this.model.currentQuestionIdx = Number(slug) - 1;

    render(this.rootNode, this.trainingComponent);

    this.trainingComponent.setHandler({
      type: "click",
      handler: (evt) => {
        if (evt.target instanceof HTMLButtonElement) {
          this.letterClickHandler(evt.target);
        }
      },
      elementSelector: ELEMENT_SELECTORS.ANSWER_BUTTONS_WRAP,
    });

    this.setGlobalHandlers();
  }

  private renderSummaryPage(): void {
    this.storage.clear();

    this.summaryComponent.setProps(getTrainingSummary(this.model.questions));

    render(this.rootNode, this.summaryComponent);

    this.summaryComponent.setHandler({
      type: "click",
      handler: () => this.router.navigateTo("/"),
      elementSelector: ELEMENT_SELECTORS.START_AGAIN_BUTTON,
    });
  }

  private showResumeTrainingModal(initialData: TrainingQuestion[]): void {
    render(this.rootNode, this.resumeRequestModalComponent);

    this.resumeRequestModalComponent.setHandler({
      type: "click",
      handler: () => this.resumeTrainingClickHandler(initialData),
      elementSelector: ELEMENT_SELECTORS.RESUME_TRAINING_BUTTON,
    });

    this.resumeRequestModalComponent.setHandler({
      type: "click",
      handler: this.closeModalClickHandler,
      elementSelector: ELEMENT_SELECTORS.CLOSE_MODAL_BUTTON,
    });
  }

  private startAgain(): void {
    this.model.newTraining();

    this.router.navigateTo("/");
  }

  private highlightWrongLetter(targetButton: Element | undefined): void {
    if (targetButton) {
      targetButton.classList.add(ERROR_STATE_LETTER_CLASSNAME);

      window.setTimeout(() => {
        targetButton.classList.remove(ERROR_STATE_LETTER_CLASSNAME);
        this.trainingComponent.rerender();
      }, ERROR_LETTER_STATE_DURATION_MS);
    } else {
      this.trainingComponent.rerender();
    }
  }

  private goToNextQuestionWithDelay(): void {
    if (this.nextQuestionTimeoutID) return;

    this.nextQuestionTimeoutID = window.setTimeout(() => {
      this.nextQuestionTimeoutID = null;

      if (!this.model.isLastQuestion()) {
        this.model.nextQuestion();
        this.router.navigateTo(`/training/${this.model.currentQuestionIdx + 1}`);

        return;
      }

      this.clearGlobalHandlers();
      this.router.navigateTo("/results");
    }, NEXT_QUESTION_DELAY_MS);
  }

  private checkLetter(letter: string, targetButton: HTMLButtonElement | undefined): void {
    const { isCorrect, isCompleted } = this.model.inputLetter(
      letter,
      targetButton ? Number(targetButton.dataset.index) : undefined,
    );

    if (!isCorrect) {
      this.highlightWrongLetter(targetButton);
    } else {
      this.trainingComponent.rerender();
    }

    if (isCompleted) {
      this.goToNextQuestionWithDelay();
    }

    this.storage.set(this.model.questions);
  }

  private unmountAllPages(): void {
    this.startScreenComponent.unmount();
    this.trainingComponent.unmount();
    this.summaryComponent.unmount();
  }
}
