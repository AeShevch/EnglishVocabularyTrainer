import { Nullable, TrainingQuestion } from "../types";

export class StorageService {
  private readonly storage: Storage;

  private readonly key: string;

  constructor(key: string, storage: Storage = window.localStorage) {
    this.key = key;
    this.storage = storage;
  }

  public set(value: TrainingQuestion[]): void {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  public get(): Nullable<TrainingQuestion[]> {
    const storageJSON = this.storage.getItem(this.key);

    return storageJSON ? JSON.parse(storageJSON) : null;
  }

  public removeItem(): void {
    this.storage.removeItem(this.key);
  }

  public clear(): void {
    this.storage.clear();
  }
}
