export const getRandomArrayElements = <T = string>(arr: T[], quantity: number): T[] =>
  arr.sort(() => Math.random() - Math.random()).slice(0, quantity);
