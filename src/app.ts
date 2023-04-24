import { Controller } from "./controller";
import { EnglishVocabularyTrainer, ALL_TRAINING_WORDS } from "./model";
import { Router } from "./router";

const model = new EnglishVocabularyTrainer(ALL_TRAINING_WORDS);
const router = new Router();

const app = new Controller(model, router);

app.run();
