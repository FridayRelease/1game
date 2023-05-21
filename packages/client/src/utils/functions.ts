/**
 * Функция проверяет объект на наличие запией
 *
 * @category helpers
 * @param {Record<string, string>} obj
 * @return boolean true - Объект пуст, false - нет
 */
export const isEmptyObject = (obj: Record<string, string>): boolean => {
  return !!Object.keys(obj).length;
};

/**
 * Функция очищает неглубокий объект от пустых значений
 *
 * @category helpers
 * @param {Record<string, string>} obj
 * @return Record<string, string>
 */
export const clearObject = (obj: Record<string, string>): Record<string, string> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return value ? { ...acc, [key]: value } : acc;
  }, {});
};

/**
 * Форматирование длинной строки.
 *
 * @example truncateText("string",127)
 */
export const truncateText = (
  str: string,
  maxLength: number,
): string | undefined => {
  if (!str || str.length === 0) return undefined;
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
};

