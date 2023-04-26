import { Controller } from "controller";
import { EnglishVocabularyTrainer, ALL_TRAINING_WORDS } from "model";
import { Router } from "router";
import { StorageService } from "services";

import { STORAGE_LS_KEY } from "./const";

const app = new Controller(
  new EnglishVocabularyTrainer(ALL_TRAINING_WORDS),
  new Router(),
  new StorageService(STORAGE_LS_KEY),
);

app.run();
