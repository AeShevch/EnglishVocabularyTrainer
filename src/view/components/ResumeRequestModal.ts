import { Component } from "../Component";

const getRequestModalTemplate = (): string =>
  `<div id="resume-request-modal" class="modal fade show" style="display: block;" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Continue the training?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>You did not finish the previous training session.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Start again</button>
          <button type="button" class="js-resume-training btn btn-primary">Resume training</button>
        </div>
      </div>
    </div>
  </div>`;

export class ResumeRequestModalComponent extends Component {
  getTemplate(): string {
    return getRequestModalTemplate();
  }
}
