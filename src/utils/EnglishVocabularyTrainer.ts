import { MAX_MISTAKES_COUNT, TRAINING_LENGTH } from "../const";
import { TrainingQuestion } from "../types";

import { generateInitialTrainingData } from "./generateInitialTrainingData";
import { getRandomArrayElements } from "./getRandomArrayElements";

export class EnglishVocabularyTrainer {
  public questions: TrainingQuestion[];

  public currentQuestionIdx: number;

  public static readonly maxMistakesCount: number = MAX_MISTAKES_COUNT;

  constructor(words: string[], initialData?: TrainingQuestion[]) {
    if (!words || !words.length) {
      throw new Error(`No words for training given!`);
    }

    const randomTrainingWords = getRandomArrayElements(words, TRAINING_LENGTH);

    this.questions = initialData || generateInitialTrainingData(randomTrainingWords);
    this.currentQuestionIdx = 0;

    this.inputLetter = this.inputLetter.bind(this);
  }

  public inputLetter(enteredLetter: string): {
    isCorrect: boolean;
    isCompeted: boolean;
  } {
    let isCorrect = false;
    let isCompeted = false;

    if (this.isCorrectLetter(enteredLetter)) {
      this.nextLetter();
      isCorrect = true;
    } else {
      this.increaseMistakesCount();
    }

    if (this.isLastMistake() || this.isLastLetter()) {
      this.setCurrentQuestionCompleted();
      isCompeted = true;
    }

    return { isCorrect, isCompeted };
  }

  public nextQuestion(): void {
    this.changeQuestion(this.currentQuestionIdx + 1);
  }

  public prevQuestion(): void {
    this.changeQuestion(this.currentQuestionIdx - 1);
  }

  private changeQuestion(stepIdx: number): void {
    if (stepIdx < 0 || stepIdx > this.questions.length) {
      console.warn(`Wrong step index!`);

      return;
    }

    this.currentQuestionIdx = stepIdx;
  }

  private isCorrectLetter(letter: string): boolean {
    const { letters, currentLetterIdx } = this.questions[this.currentQuestionIdx];

    return letter === letters[currentLetterIdx];
  }

  private isLastLetter(): boolean {
    const currentTrainingStep = this.questions[this.currentQuestionIdx];

    return currentTrainingStep.currentLetterIdx === currentTrainingStep.letters.length;
  }

  private isLastMistake(): boolean {
    return (
      this.questions[this.currentQuestionIdx].mistakesCount ===
      EnglishVocabularyTrainer.maxMistakesCount
    );
  }

  private nextLetter(): void {
    this.questions[this.currentQuestionIdx].currentLetterIdx += 1;
  }

  private increaseMistakesCount(): void {
    this.questions[this.currentQuestionIdx].mistakesCount += 1;
  }

  private setCurrentQuestionCompleted(): void {
    this.questions[this.currentQuestionIdx].completed = true;
  }
}
