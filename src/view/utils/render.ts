import { Component } from "../Component";

/**
 * Renders a component inside a specified container element.
 */
export const render = (
  container: Element,
  component: Component,
  place: "afterBegin" | "beforeEnd" = "beforeEnd"
): void => {
  switch (place) {
    case "afterBegin":
      container.prepend(component.getElement());
      break;
    case "beforeEnd":
    default:
      container.append(component.getElement());
      break;
  }
};
