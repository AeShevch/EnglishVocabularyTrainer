import { Result } from "../../types";
import { Component } from "../Component";

const getResultHTML = ({ maxMistakes, mistakesCount, withoutMistakesCount }: Result): string => {
  const maxMistakesWords = maxMistakes.map(({ word }) => word).join(`, `);

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
            <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">
              <span class="col-auto text-start text-nowrap">Maximum number of mistakes:</span>
              <span class="col-auto badge bg-primary rounded-pill">${maxMistakesWords}</span>
            </li>
          </ul>
          
          <button autofocus type="button" class="js-start-again btn btn-primary">Start again</button>
        </div>
  `;
};

export class ResultsComponent extends Component {
  private result: Result;

  getTemplate(): string {
    return getResultHTML(this.result);
  }

  public bindData(data: Result): void {
    this.result = data;
  }
}
