import { Nullable } from "../types";
import { createElement } from "../utils";

type Handler = {
  type: keyof HTMLElementEventMap;
  handler: (evt: Event) => void;
  elementSelector: string;
};

export abstract class Component {
  private element: Nullable<HTMLElement>;

  private readonly handlersBackUp: Set<Handler>;

  constructor() {
    this.element = null;
    this.handlersBackUp = new Set();

    this.rerender = this.rerender.bind(this);
  }

  public abstract getTemplate(): string;

  public getElement(): HTMLElement {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  public unmount(): void {
    this.element?.remove();
    this.element = null;
  }

  /**
   * Sets handler on components element
   * @param {string} type handler type
   * @param {callback} handler Callback function
   * @param {string} [elementSelector] Css selector of element. If selector is unspecified the handler will be attached on the parent element
   */
  public setHandler({ type, handler, elementSelector }: Handler): void {
    this.saveHandler({ type, handler, elementSelector });

    const parentElement = this.getElement();
    let targetElement: Element = parentElement;

    if (elementSelector) {
      const childElement = parentElement.querySelector(elementSelector);

      if (childElement) {
        targetElement = childElement;
      }
    }

    targetElement.addEventListener(type, handler);
  }

  public rerender(): void {
    const oldElement = this.getElement();

    this.element = null;

    const newElement = this.getElement();

    oldElement.replaceWith(newElement);

    this.restoreListeners();
  }

  private saveHandler(handler: Handler): void {
    this.handlersBackUp.add(handler);
  }

  private restoreListeners(): void {
    Array.from(this.handlersBackUp).forEach((handler) => {
      this.setHandler(handler);
      this.handlersBackUp.delete(handler);
    });
  }
}
