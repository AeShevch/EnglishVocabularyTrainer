import { MAX_MISTAKES_COUNT, TRAINING_LENGTH } from "../const";
import { TrainingQuestion } from "../types";
import { generateInitialTrainingData, getRandomArrayElements } from "../utils";

export class EnglishVocabularyTrainer {
  public questions: TrainingQuestion[];

  public currentQuestionIdx: number;

  public readonly maxMistakesCount: number = MAX_MISTAKES_COUNT;

  private readonly words: string[];

  constructor(words: string[]) {
    if (!words || !words.length) {
      throw new Error(`No words for training given!`);
    }

    this.words = words;

    this.newTraining();

    this.inputLetter = this.inputLetter.bind(this);
  }

  public newTraining(): void {
    this.currentQuestionIdx = 0;

    const randomTrainingWords = getRandomArrayElements(this.words, TRAINING_LENGTH);

    this.questions = generateInitialTrainingData(randomTrainingWords);
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
    if (stepIdx < 0 || stepIdx >= this.questions.length) {
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
    return this.questions[this.currentQuestionIdx].mistakesCount === this.maxMistakesCount;
  }

  public isLastQuestion(): boolean {
    return this.currentQuestionIdx === this.questions.length - 1;
  }

  private nextLetter(): void {
    if (this.isQuestionCompleted()) return;

    this.questions[this.currentQuestionIdx].currentLetterIdx += 1;
  }

  private increaseMistakesCount(): void {
    if (this.isQuestionCompleted()) return;

    this.questions[this.currentQuestionIdx].mistakesCount += 1;
  }

  private setCurrentQuestionCompleted(): void {
    this.questions[this.currentQuestionIdx].completed = true;
  }

  private isQuestionCompleted(): boolean {
    return this.questions[this.currentQuestionIdx].completed;
  }
}
