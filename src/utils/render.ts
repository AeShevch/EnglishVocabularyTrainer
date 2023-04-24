import { Component } from "../view";

const enum RenderPlacement {
  Start = `afterBegin`,
  End = `beforeEnd`,
}

/**
 * Inserts dom-element
 * @param {object} container Container for inserting a components markup
 * @param {object} component Component markup
 * @param {string} [place=beforeend] Insert position (optional)
 */
export const render = (
  container: Element,
  component: Component,
  place: `${RenderPlacement}` = `beforeEnd`,
): void => {
  switch (place) {
    case `afterBegin`:
      container.prepend(component.getElement());
      break;
    case `beforeEnd`:
    default:
      container.append(component.getElement());
      break;
  }
};

/**
 * Creates DOM-element from Html-string
 * @param {string} template Html-string
 * @return {ChildNode} DOM-element
 */
export const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;

  return newElement.firstElementChild as HTMLElement;
};
