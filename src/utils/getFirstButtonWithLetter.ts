export const getFirstButtonWithLetter = (container: Element, letter: string): Element | undefined =>
  Array.from(container.querySelectorAll(`.js-letter-button`)).find(
    ({ textContent }) => textContent && textContent.trim() === letter,
  );
