export const setLocalStorage = (key: string, value: string) => {
  if (globalThis?.localStorage) {
    globalThis.localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (globalThis?.localStorage) {
    return JSON.parse(globalThis.localStorage?.getItem(key) || '{}');
  }
  return {};
};
