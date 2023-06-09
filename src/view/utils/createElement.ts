/**
 * Creates an HTML element from the given template string.
 */
export const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement("div");

  newElement.innerHTML = template;

  return newElement.firstElementChild as HTMLElement;
};
