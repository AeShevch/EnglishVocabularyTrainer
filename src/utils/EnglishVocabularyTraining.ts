import { MAX_MISTAKES_COUNT, TRAINING_LENGTH } from "../const";
import { TrainingStep } from "../types";

import { generateInitialTrainingData } from "./generateInitialTrainingData";
import { getRandomArrayElements } from "./getRandomArrayElements";

export class EnglishVocabularyTraining {
  public training: TrainingStep[];

  private currentStep: number;

  constructor(words: string[], initialData?: TrainingStep[]) {
    if (!words || !words.length) {
      throw new Error(`No words for training given!`);
    }

    const randomTrainingWords = getRandomArrayElements(words, TRAINING_LENGTH);

    this.training = initialData || generateInitialTrainingData(randomTrainingWords);
    this.currentStep = 0;
  }

  public static readonly maxMistakesCount: number = MAX_MISTAKES_COUNT;

  public inputLetter(enteredLetter: string): void {
    if (this.isCorrectLetter(enteredLetter)) {
      this.nextLetter();
    } else {
      this.increaseMistakesCount();
    }

    if (this.isLastMistake() || this.isLastLetter()) {
      this.setCurrentQuestionCompleted();
    }
  }

  public nextQuestion(): void {
    this.changeStep(this.currentStep + 1);
  }

  public prevQuestion(): void {
    this.changeStep(this.currentStep - 1);
  }

  private changeStep(stepIdx: number): void {
    if (stepIdx < 0 || stepIdx > this.training.length) {
      console.warn(`Wrong step index!`);

      return;
    }

    this.currentStep = stepIdx;
  }

  private isCorrectLetter(letter: string): boolean {
    const { letters, currentLetterIdx } = this.training[this.currentStep];

    return letter === letters[currentLetterIdx];
  }

  private isLastLetter(): boolean {
    const currentTrainingStep = this.training[this.currentStep];

    return currentTrainingStep.currentLetterIdx === currentTrainingStep.letters.length;
  }

  private isLastMistake(): boolean {
    return (
      this.training[this.currentStep].mistakesCount === EnglishVocabularyTraining.maxMistakesCount
    );
  }

  private nextLetter(): void {
    this.training[this.currentStep].currentLetterIdx += 1;
  }

  private increaseMistakesCount(): void {
    this.training[this.currentStep].mistakesCount += 1;
  }

  private setCurrentQuestionCompleted(): void {
    this.training[this.currentStep].completed = true;
  }
}
