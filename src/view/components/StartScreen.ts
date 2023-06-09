import { Component } from "../Component";

const getStartScreenHtml = (): string =>
  `<div>
    <button autofocus type="button" class="js-start-training btn btn-primary">
      Start training
    </button> 
   </div>
`;

/**
 * Start page with training start button
 */
export class StartScreenComponent extends Component {
  public getTemplate(): string {
    return getStartScreenHtml();
  }
}
