import { getRandomArrayElements } from "utils";

export const getRandomLetters = (letters: string[]): string[] => {
  if (letters.length === 1 || letters.length === 0) return letters;

  const shuffledLetters = getRandomArrayElements(letters);

  return shuffledLetters.join("") === letters.join("")
    ? getRandomLetters(letters)
    : shuffledLetters;
};
