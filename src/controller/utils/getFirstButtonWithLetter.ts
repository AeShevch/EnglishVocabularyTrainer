export const getFirstButtonWithLetter = (
  container: Element,
  letter: string
): HTMLButtonElement | undefined =>
  Array.from(
    container.querySelectorAll(
      ".js-letter-button"
    ) as NodeListOf<HTMLButtonElement>
  ).find(({ textContent }) => textContent && textContent.trim() === letter);
