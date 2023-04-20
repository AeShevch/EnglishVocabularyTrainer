import { TRAINING_LENGTH } from "../const";
import { TrainingStep } from "../types";

import { generateInitialTrainingData } from "./generateInitialTrainingData";
import { getRandomArrayElements } from "./getRandomArrayElements";

export class EnglishVocabularyTraining {
  public training: TrainingStep[];

  private currentStep: number;

  constructor(words: [string, ...string[]]) {
    const randomTrainingWords = getRandomArrayElements(words, TRAINING_LENGTH);

    this.training = generateInitialTrainingData(randomTrainingWords);
    this.currentStep = 0;
  }

  public inputLetter(enteredLetter: string): void {
    const currentTrainingStep = this.training[this.currentStep];

    if (this.checkLetter(enteredLetter)) {
      currentTrainingStep.currentLetterIdx += 1;
    } else {
      currentTrainingStep.mistakesCount += 1;
    }
  }

  public nextStep(): void {
    this.changeStep(this.currentStep + 1);
  }

  public prevStep(): void {
    this.changeStep(this.currentStep - 1);
  }

  private changeStep(stepIdx: number): void {
    if (stepIdx < 0 || stepIdx > this.training.length) {
      console.warn(`Wrong step index!`);

      return;
    }

    this.currentStep = stepIdx;
  }

  private checkLetter(letter: string): boolean {
    const { letters, currentLetterIdx } = this.training[this.currentStep];

    return letter === letters[currentLetterIdx];
  }
}
