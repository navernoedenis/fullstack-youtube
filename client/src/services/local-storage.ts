const get = (key: string): string | null => {
  return localStorage.getItem(key) ?? null;
};

const set = (key: string, payload: string): void => {
  localStorage.setItem(key, payload);
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

const LocalStorageService = {
  get,
  set,
  remove,
  clearStorage,
};

export default LocalStorageService;
