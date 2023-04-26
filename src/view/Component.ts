import { Nullable } from "../types";
import { createElement } from "../utils";

type Listeners = {
  type: keyof HTMLElementEventMap;
  handler: (evt: Event) => void;
  elementSelector: string;
};

export abstract class Component {
  private element: Nullable<HTMLElement>;

  private readonly listeners: Set<Listeners>;

  constructor() {
    this.element = null;
    this.listeners = new Set();

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
    this.clearHandlers();

    this.element?.remove();
    this.element = null;
  }

  /**
   * Sets handler on components element
   * @param {string} type handler type
   * @param {callback} handler Callback function
   * @param {string} [elementSelector] Css selector of element. If selector is unspecified the handler will be attached on the parent element
   */
  public setHandler({ type, handler, elementSelector }: Listeners): void {
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

  public clearHandlers(): void {
    this.listeners.forEach(({ elementSelector, handler, type }) => {
      document.querySelector(elementSelector)?.removeEventListener(type, handler);
    });
  }

  private saveHandler(handler: Listeners): void {
    this.listeners.add(handler);
  }

  public rerender(): void {
    const oldElement = this.getElement();

    this.element = null;

    const newElement = this.getElement();

    oldElement.replaceWith(newElement);

    this.restoreListeners();
  }

  private restoreListeners(): void {
    Array.from(this.listeners).forEach((handler) => {
      this.setHandler(handler);
      this.listeners.delete(handler);
    });
  }
}
