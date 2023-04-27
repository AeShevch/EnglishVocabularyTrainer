!function(){"use strict";function t(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}class e{constructor(){t(this,"element",void 0),t(this,"listeners",void 0),this.element=null,this.listeners=new Set,this.rerender=this.rerender.bind(this)}getElement(){return this.element||(this.element=(t=>{const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild})(this.getTemplate())),this.element}unmount(){var t;this.clearHandlers(),null===(t=this.element)||void 0===t||t.remove(),this.element=null}setHandler(t){let{type:e,handler:n,elementSelector:r}=t;this.saveHandler({type:e,handler:n,elementSelector:r});const i=this.getElement();let s=i;if(r){const t=i.querySelector(r);t&&(s=t)}s.addEventListener(e,n)}clearHandlers(){this.listeners.forEach((t=>{var e;let{elementSelector:n,handler:r,type:i}=t;null===(e=document.querySelector(n))||void 0===e||e.removeEventListener(i,r)})),this.listeners.clear()}saveHandler(t){this.listeners.add(t)}rerender(){const t=this.getElement();this.element=null;const e=this.getElement();t.replaceWith(e),this.restoreListeners()}restoreListeners(){Array.from(this.listeners).forEach((t=>{this.setHandler(t)}))}}class n extends e{constructor(){var t,e,n;super(...arguments),t=this,n=void 0,(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e="props"))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}getTemplate(){return(t=>{let{questions:e,currentQuestionIdx:n,maxMistakesCount:r}=t;const i=n+1,{letters:s,taskLetters:o,currentLetterIdx:a,mistakesCount:l,completed:u}=e[n],d=u?s:s.slice(0,a);return`\n    <div>\n      <p class="mb-1">\n        Question \n        <span id="current_question">${i}</span> \n          of \n        <span id="total_questions">${e.length}</span>\n      </p>\n      <p class="mb-5">\n        Mistakes \n        <span>${l}</span> \n          of \n        <span>${r}</span>\n      </p>\n      <div class="d-inline-flex flex-column">\n        <div id="answer" class="d-inline-flex justify-content-center bg-light mx-1 mb-3 row gx-2" style="height: 46px; border-radius: 6px">\n         ${d.map((t=>`<div class="col-auto">\n                    <div class="btn btn-primary ${l===r?"btn-danger":"btn-success"}">\n                       ${t}\n                    </div>\n                 </div>\n                `)).join("")}\n          </div>\n          <div id="letters">\n            <div class="container px-4">\n              <div class="js-answer-buttons row gx-2">\n                ${o.map(((t,e)=>`<div class="col-auto">\n                          <button data-index="${e}" type="button" class="js-letter-button btn btn-primary">\n                             ${t}\n                          </button>\n                       </div>\n                      `)).join("")}\n              </div>\n          </div>\n      </div>\n    </div>\n`})(this.props)}setProps(t){this.props=t}}class r extends e{getTemplate(){return'<div>\n    <button autofocus type="button" class="js-start-training btn btn-primary">\n      Start training\n    </button> \n   </div>\n'}}class i extends e{constructor(){var t,e,n;super(...arguments),t=this,n=void 0,(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e="props"))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}getTemplate(){return(t=>{let{maxMistakes:e,mistakesCount:n,withoutMistakesCount:r}=t;const i=e.map((t=>{let{word:e}=t;return e})).join(", ");return`\n        <div>\n          <ul class="list-group mb-3">\n            <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">\n              <span class="col-auto text-start text-nowrap">Without mistakes:</span>\n              <span class="col-auto badge bg-primary rounded-pill">${r}</span>\n            </li>\n            <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">\n              <span class="col-auto text-start text-nowrap">Mistakes:</span>\n              <span class="col-auto badge bg-primary rounded-pill">${n}</span>\n            </li>\n            ${i&&`\n                <li class="list-group-item gx-3 row d-flex justify-content-between align-items-center">\n                  <span class="col-auto text-start text-nowrap"> Maximum number of mistakes:</span>\n                  <span class="col-auto badge bg-primary rounded-pill">${i}</span>\n                </li>\n              `}\n          </ul>\n        \n          <button autofocus type="button" class="js-start-again btn btn-primary">Start again</button>\n        </div>\n  `})(this.props)}setProps(t){this.props=t}}class s extends e{getTemplate(){return'<div id="resume-request-modal" class="modal fade show" style="display: block;background: rgb(71 71 71 / 49%);" tabindex="-1">\n    <div class="modal-dialog modal-dialog-centered">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h5 class="modal-title">Continue the training?</h5>\n        </div>\n        <div class="modal-body text-start">\n          <p>Hey! You didn\'t finish your previous training session.</p>\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="js-close-modal btn btn-secondary" data-bs-dismiss="modal">Start again</button>\n          <button type="button" class="js-resume-training btn btn-primary">Resume last training</button>\n        </div>\n      </div>\n    </div>\n  </div>'}}const o=".js-app-root",a="btn-danger",l=function(t,e){"afterBegin"===(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"beforeEnd")?t.prepend(e.getElement()):t.append(e.getElement())};function u(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const d=(t,e)=>{let[...n]=t;return n.sort((()=>Math.random()-Math.random())).slice(0,e||n.length)},c=t=>{if(1===t.length||0===t.length)return t;const e=d(t);return e.join("")===t.join("")?c(t):e};function h(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function v(t,e,n){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}const b=new class{constructor(t,e,o){u(this,"rootNode",void 0),u(this,"model",void 0),u(this,"startScreenComponent",void 0),u(this,"trainingComponent",void 0),u(this,"summaryComponent",void 0),u(this,"resumeRequestModalComponent",void 0),u(this,"router",void 0),u(this,"storage",void 0),u(this,"nextQuestionTimeoutID",void 0),this.setRootNode(),this.model=t,this.storage=o,this.router=e,this.startScreenComponent=new r,this.trainingComponent=new n,this.summaryComponent=new i,this.resumeRequestModalComponent=new s,this.trainingComponent.setProps(this.model),this.renderStartPage=this.renderStartPage.bind(this),this.renderTrainingPage=this.renderTrainingPage.bind(this),this.renderSummaryPage=this.renderSummaryPage.bind(this),this.startAgain=this.startAgain.bind(this),this.keyPressHandler=this.keyPressHandler.bind(this),this.resumeTrainingClickHandler=this.resumeTrainingClickHandler.bind(this),this.closeModalClickHandler=this.closeModalClickHandler.bind(this),this.unmountAllPages=this.unmountAllPages.bind(this),this.router.onBeforePageChange=this.unmountAllPages}run(){const t=this.storage.get();t&&this.showResumeTrainingModal(t),this.router.addRoute("/",this.renderStartPage).addRoute("/training/:slug",(t=>{let{slug:e}=t;return this.renderTrainingPage(e)}),!0).addRoute("/results",this.renderSummaryPage).start(),this.router.navigateTo("/")}setRootNode(){const t=document.querySelector(o);if(!t)throw new Error(`Root node (${o}) not found!`);this.rootNode=t}setGlobalHandlers(){window.addEventListener("keypress",this.keyPressHandler)}clearGlobalHandlers(){window.removeEventListener("keypress",this.keyPressHandler)}letterClickHandler(t){const e=t.outerText;e&&this.checkLetter(e.trim(),t)}keyPressHandler(t){let{key:e}=t;if(/^[a-zA-Z]$/.test(e)){const t=((t,e)=>Array.from(t.querySelectorAll(".js-letter-button")).find((t=>{let{textContent:n}=t;return n&&n.trim()===e})))(this.rootNode,e);this.checkLetter(e,t)}}resumeTrainingClickHandler(t){this.resumeRequestModalComponent.unmount(),this.model.newTraining(t),this.router.navigateTo(`/training/${this.model.currentQuestionIdx+1}`)}closeModalClickHandler(){this.resumeRequestModalComponent.unmount(),this.storage.clear()}renderStartPage(){l(this.rootNode,this.startScreenComponent),this.startScreenComponent.setHandler({type:"click",handler:()=>{this.model.newTraining(),this.router.navigateTo("/training/1")},elementSelector:".js-start-training"})}renderTrainingPage(t){this.model.currentQuestionIdx=Number(t)-1,l(this.rootNode,this.trainingComponent),this.trainingComponent.setHandler({type:"click",handler:t=>{t.target instanceof HTMLButtonElement&&this.letterClickHandler(t.target)},elementSelector:".js-answer-buttons"}),this.setGlobalHandlers()}renderSummaryPage(){this.storage.clear(),this.summaryComponent.setProps((t=>{const e=t.reduce(((t,e)=>{let{mistakesCount:n}=e;return t>n?t:n}),0);return t.reduce(((t,n)=>({withoutMistakesCount:n.mistakesCount?t.withoutMistakesCount:t.withoutMistakesCount+1,mistakesCount:t.mistakesCount+n.mistakesCount,maxMistakes:n.mistakesCount===e&&0!==e?[...t.maxMistakes,{word:n.letters.join(""),count:e}]:t.maxMistakes})),{withoutMistakesCount:0,mistakesCount:0,maxMistakes:[]})})(this.model.questions)),l(this.rootNode,this.summaryComponent),this.summaryComponent.setHandler({type:"click",handler:()=>this.router.navigateTo("/"),elementSelector:".js-answer-buttons"})}showResumeTrainingModal(t){l(this.rootNode,this.resumeRequestModalComponent),this.resumeRequestModalComponent.setHandler({type:"click",handler:()=>this.resumeTrainingClickHandler(t),elementSelector:".js-resume-training"}),this.resumeRequestModalComponent.setHandler({type:"click",handler:this.closeModalClickHandler,elementSelector:".js-close-modal"})}startAgain(){this.model.newTraining(),this.router.navigateTo("/")}highlightWrongLetter(t){t?(t.classList.add(a),window.setTimeout((()=>{t.classList.remove(a),this.trainingComponent.rerender()}),200)):this.trainingComponent.rerender()}goToNextQuestionWithDelay(){this.nextQuestionTimeoutID||(this.nextQuestionTimeoutID=window.setTimeout((()=>{if(this.nextQuestionTimeoutID=null,!this.model.isLastQuestion())return this.model.nextQuestion(),void this.router.navigateTo(`/training/${this.model.currentQuestionIdx+1}`);this.clearGlobalHandlers(),this.router.navigateTo("/results")}),1500))}checkLetter(t,e){const{isCorrect:n,isCompleted:r}=this.model.inputLetter(t,e?Number(e.dataset.index):void 0);n?this.trainingComponent.rerender():this.highlightWrongLetter(e),r&&this.goToNextQuestionWithDelay(),this.storage.set(this.model.questions)}unmountAllPages(){this.startScreenComponent.unmount(),this.trainingComponent.unmount(),this.summaryComponent.unmount()}}(new class{constructor(t){if(h(this,"questions",void 0),h(this,"currentQuestionIdx",void 0),h(this,"maxMistakesCount",3),h(this,"words",void 0),!t||!t.length)throw new Error("No words for training given!");this.words=t,this.newTraining(),this.inputLetter=this.inputLetter.bind(this)}newTraining(t){if(t)return this.questions=t,void(this.currentQuestionIdx=t.findIndex((t=>{let{completed:e}=t;return!e})));this.currentQuestionIdx=0;const e=d(this.words,6);this.questions=e.map((t=>{const e=t.split("");return{letters:e,taskLetters:c(e),currentLetterIdx:0,mistakesCount:0,completed:!1}}))}inputLetter(t,e){let n=!1,r=!1;return this.isCorrectLetter(t)?(this.nextLetter(e),n=!0):this.increaseMistakesCount(),(this.isLastMistake()||this.isLastLetter())&&(this.setCurrentQuestionCompleted(),r=!0),{isCorrect:n,isCompleted:r}}nextQuestion(){this.changeQuestion(this.currentQuestionIdx+1)}changeQuestion(t){t<0||t>=this.questions.length?console.warn("Wrong step index!"):this.currentQuestionIdx=t}isCorrectLetter(t){const{letters:e,currentLetterIdx:n}=this.questions[this.currentQuestionIdx];return t===e[n]}isLastLetter(){const t=this.questions[this.currentQuestionIdx];return t.currentLetterIdx===t.letters.length}isLastMistake(){return this.questions[this.currentQuestionIdx].mistakesCount===this.maxMistakesCount}isLastQuestion(){return this.currentQuestionIdx===this.questions.length-1}nextLetter(t){if(this.isQuestionCompleted())return;const e=this.questions[this.currentQuestionIdx];e.currentLetterIdx+=1;const n=e.letters[e.currentLetterIdx];e.taskLetters=e.taskLetters.filter(((e,r)=>r!==(t??n)))}increaseMistakesCount(){this.isQuestionCompleted()||(this.questions[this.currentQuestionIdx].mistakesCount+=1)}setCurrentQuestionCompleted(){this.questions[this.currentQuestionIdx].completed=!0,this.questions[this.currentQuestionIdx].taskLetters=[]}isQuestionCompleted(){return this.questions[this.currentQuestionIdx].completed}}(["apple","function","timeout","task","application","data","tragedy","sun","symbol","button","software"]),new class{constructor(){g(this,"routes",[]),g(this,"onBeforePageChange",null)}addRoute(t,e){let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return this.routes.push({path:t,callback:e,isDynamic:n}),this}navigateTo(t){window.history.pushState(null,"",t),this.handleRouteChange(window.location.pathname)}start(){window.addEventListener("popstate",(()=>this.handleRouteChange(window.location.pathname))),this.handleRouteChange(window.location.pathname)}handleRouteChange(t){this.onBeforePageChange&&this.onBeforePageChange(t);for(let e=0;e<this.routes.length;e+=1){const n=this.routes[e];if(n.isDynamic){const e=new RegExp(`^${n.path.replace(/:\w+/g,"([\\w-]+)")}$`),r=t.match(e);if(r){const t=r.slice(1).reduce(((t,e,r)=>p(p({},t),{},{[n.path.split(":")[r+1]]:e})),{});return void n.callback(t)}}else if(n.path===t)return void n.callback()}console.warn(`No route found for ${t}`)}},new class{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.localStorage;v(this,"storage",void 0),v(this,"key",void 0),this.key=t,this.storage=e}set(t){this.storage.setItem(this.key,JSON.stringify(t))}get(){const t=this.storage.getItem(this.key);return t?JSON.parse(t):null}removeItem(){this.storage.removeItem(this.key)}clear(){this.storage.clear()}}("storage"));b.run()}();