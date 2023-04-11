export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};
