export const setLocalStorage = (key: string, value: string) => {
  globalThis.localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return JSON.parse(globalThis.localStorage?.getItem(key) || '{}');
};
