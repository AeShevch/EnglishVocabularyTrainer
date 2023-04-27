import { getRandomArrayElements } from "utils";

import { MAX_MISTAKES_COUNT, TRAINING_LENGTH } from "./const";
import { TrainingQuestion } from "./types";
import { generateInitialTrainingData } from "./utils";

/**
 The model class for training English vocabulary.
 It generates a random set of words
 and provides an interface for training on those words
 */
export class EnglishVocabularyTrainer {
  public questions: TrainingQuestion[];

  public currentQuestionIdx: number;

  public readonly maxMistakesCount: number = MAX_MISTAKES_COUNT;

  private readonly words: string[];

  constructor(words: string[]) {
    if (!words || !words.length) {
      throw new Error("No words for training given!");
    }

    this.words = words;

    this.newTraining();

    this.inputLetter = this.inputLetter.bind(this);
  }

  public newTraining(initialData?: TrainingQuestion[]): void {
    if (initialData) {
      this.questions = initialData;

      this.currentQuestionIdx = initialData.findIndex(
        ({ completed }) => !completed
      );

      return;
    }

    this.currentQuestionIdx = 0;

    const randomTrainingWords = getRandomArrayElements(
      this.words,
      TRAINING_LENGTH
    );

    this.questions = generateInitialTrainingData(randomTrainingWords);
  }

  public inputLetter(
    enteredLetter: string,
    letterIdx?: number
  ): {
    isCorrect: boolean;
    isCompleted: boolean;
  } {
    let isCorrect = false;
    let isCompleted = false;

    if (this.isCorrectLetter(enteredLetter)) {
      this.nextLetter(letterIdx);
      isCorrect = true;
    } else {
      this.increaseMistakesCount();
    }

    if (this.isLastMistake() || this.isLastLetter()) {
      this.setCurrentQuestionCompleted();
      isCompleted = true;
    }

    return { isCorrect, isCompleted };
  }

  public nextQuestion(): void {
    this.changeQuestion(this.currentQuestionIdx + 1);
  }

  private changeQuestion(questionIdx: number): void {
    if (questionIdx < 0 || questionIdx >= this.questions.length) {
      console.warn("Wrong step index!");

      return;
    }

    this.currentQuestionIdx = questionIdx;
  }

  private isCorrectLetter(letter: string): boolean {
    const { letters, currentLetterIdx } =
      this.questions[this.currentQuestionIdx];

    return letter === letters[currentLetterIdx];
  }

  private isLastLetter(): boolean {
    const currentTrainingStep = this.questions[this.currentQuestionIdx];

    return (
      currentTrainingStep.currentLetterIdx ===
      currentTrainingStep.letters.length
    );
  }

  private isLastMistake(): boolean {
    return (
      this.questions[this.currentQuestionIdx].mistakesCount ===
      this.maxMistakesCount
    );
  }

  public isLastQuestion(): boolean {
    return this.currentQuestionIdx === this.questions.length - 1;
  }

  private nextLetter(prevLetterIdx?: number): void {
    if (this.isQuestionCompleted()) return;

    const question = this.questions[this.currentQuestionIdx];

    question.currentLetterIdx += 1;

    const firstSameLetterIdx = question.letters[question.currentLetterIdx];

    question.taskLetters = question.taskLetters.filter(
      (_, idx) => idx !== (prevLetterIdx ?? firstSameLetterIdx)
    );
  }

  private increaseMistakesCount(): void {
    if (this.isQuestionCompleted()) return;

    this.questions[this.currentQuestionIdx].mistakesCount += 1;
  }

  private setCurrentQuestionCompleted(): void {
    this.questions[this.currentQuestionIdx].completed = true;
    this.questions[this.currentQuestionIdx].taskLetters = [];
  }

  private isQuestionCompleted(): boolean {
    return this.questions[this.currentQuestionIdx].completed;
  }
}
