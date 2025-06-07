export class StorageService<TState> {
  constructor(private readonly storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  saveData<TKey extends keyof TState>(key: TKey, data: TState[TKey]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  removeData<TKey extends keyof TState>(key: TKey): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.removeItem(storageKey);
  }

  getData<TKey extends keyof TState>(
    key: TKey,
    validate?: (data: unknown) => data is TState[TKey]
  ): TState[TKey] | null {
    const storageKey = this.getStorageKey(key.toString());
    const data = localStorage.getItem(storageKey);

    if (data === null) {
      return null;
    }
    try {
      const result: unknown = JSON.parse(data);
      if (validate) {
        return validate(result) ? result : null;
      }
      return result as TState[TKey];
    } catch (error) {
      console.error('Error parsing local storage JSON:', error);
      return null;
    }
  }

  toggleData<TKey extends keyof TState>(key: TKey, data: TState[TKey]): void {
    if (this.getData(key)) {
      this.removeData(key);
    } else {
      this.saveData(key, data);
    }
  }
}

export type StorageState = {
  name: string;
};

export const storageService = new StorageService<StorageState>('UGChat');
