export type ValidationProps = {
  min?: number;
  max?: number;
  required?: boolean;
  isEmail?: boolean;
  isUsername?: boolean;
  isPassword?: boolean;
  isPhone?: boolean;
  /** name поля input, для сравнения */
  isRetryPassword?: string;
};

/**
 * Класс для валидации введеных значений формы
 * @category validation
 * */
class Validator {
  isValidLogin(value: string): boolean {
    return this.isValidByRegex([/[0-9a-z-_]{3,20}/i, /[a-z-_]/i], value);
  }

  isValidPassword(value: string): boolean {
    return this.isValidByRegex([/[0-9a-z-_]{8,40}/i, /[A-Z]+/, /\d+/], value);
  }

  isValidEmail(value: string): boolean {
    return this.isValidByRegex(/[0-9a-z-_.]+@[a-z0-9-]+.[a-z]{2,3}/i, value);
  }

  isValidPhone(value: string): boolean {
    return this.isValidByRegex(/^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, value);
  }

  isValidByRegex(regex: RegExp | RegExp[], value: string): boolean {
    if (Array.isArray(regex)) {
      return regex.every(r => r.test(value));
    }

    return regex.test(value);
  }

  isEmpty(value: string): boolean {
    return value === '';
  }

  checkCorrect(value: string, option: ValidationProps = {}): string {
    const RULES = Object.keys(option);

    if (RULES.includes('required') && this.isEmpty(value)) {
      return `Поле не может быть пустое`;
    }

    if (RULES.includes('min') && value.length < option['min']!) {
      return `Минимально символов ${option['min']}`;
    }

    if (RULES.includes('isUsername') && !this.isValidLogin(value)) {
      return `Невалидный логин`;
    }

    if (RULES.includes('isEmail') && !this.isValidEmail(value)) {
      return `Невалидная почта`;
    }

    if (RULES.includes('isPassword') && !this.isValidPassword(value)) {
      return `Невалидный пароль`;
    }

    if (RULES.includes('isPhone') && !this.isValidPhone(value)) {
      return `Невалидный телефон`;
    }

    if (RULES.includes('isRetryPassword') && option['isRetryPassword']) {
      const password = document.getElementsByName(option['isRetryPassword'])[0] as HTMLInputElement;

      if (password && value !== password['value']) {
        return `Пароли не совпадают`;
      }
    }

    return '';
  }
}

const validatorInstance = new Validator();

export { validatorInstance, Validator };
