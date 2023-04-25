import { Component } from "../Component";

const getRequestModalTemplate = (): string =>
  `<div id="resume-request-modal" class="modal fade show" style="display: block;background: rgb(71 71 71 / 49%);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Continue the training?</h5>
        </div>
        <div class="modal-body text-start">
          <p>Hey! You didn't finish your previous training session.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="js-close-modal btn btn-secondary" data-bs-dismiss="modal">Start again</button>
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
