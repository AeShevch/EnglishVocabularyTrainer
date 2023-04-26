import { TrainingSummary } from "model";

import { Component } from "../Component";

const getResultHTML = ({
  maxMistakes,
  mistakesCount,
  withoutMistakesCount,
}: TrainingSummary): string => {
  const maxMistakesWords = maxMistakes.map(({ word }) => word).join(", ");

  return `
        <div>
          <ul class="list-group mb-3">
            <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">
              <span class="col-auto text-start text-nowrap">Without mistakes:</span>
              <span class="col-auto badge bg-primary rounded-pill">${withoutMistakesCount}</span>
            </li>
            <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">
              <span class="col-auto text-start text-nowrap">Mistakes:</span>
              <span class="col-auto badge bg-primary rounded-pill">${mistakesCount}</span>
            </li>
            ${
              maxMistakesWords &&
              `
                <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">
                  <span class="col-auto text-start text-nowrap"> Maximum number of mistakes:</span>
                  <span class="col-auto badge bg-primary rounded-pill">${maxMistakesWords}</span>
                </li>
              `
            }
          </ul>
        
          <button autofocus type="button" class="js-start-again btn btn-primary">Start again</button>
        </div>
  `;
};

/**
 * Outputs the results of the training session
 */
export class SummaryComponent extends Component {
  private props: TrainingSummary;

  getTemplate(): string {
    return getResultHTML(this.props);
  }

  public setProps(props: TrainingSummary): void {
    this.props = props;
  }
}
