import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';
import { PASSWORD_SPEC, PHONE_SPEC } from '@/constant/spec';

const initValues: Record<string, string> = {};

const singSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, ERROR_MESSAGES.NAME_MIN)
    .max(20, ERROR_MESSAGES.NAME_MAX)
    .required(ERROR_MESSAGES.REQUIRED),
  second_name: yup
    .string()
    .min(2, ERROR_MESSAGES.SURNAME_MIN)
    .max(20, ERROR_MESSAGES.SURNAME_MAX)
    .required(ERROR_MESSAGES.REQUIRED),
  email: yup.string().email(ERROR_MESSAGES.INCORRECT_EMAIL).required(ERROR_MESSAGES.REQUIRED),
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.LOGIN_MIN)
    .max(40, ERROR_MESSAGES.PASSWORD_MAX)
    .matches(PASSWORD_SPEC, ERROR_MESSAGES.PASSWORD_VALID)
    .required(ERROR_MESSAGES.REQUIRED)
    .test('is-unique-login-password', ERROR_MESSAGES.UNIQUE_VALUES, function (password) {
      const { login } = this.parent;
      return !(password === login);
    }),
  passwordSecond: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .oneOf([yup.ref('password')], ERROR_MESSAGES.INCORRECT_CONFIRM_PASSWORD),
  phone: yup
    .string()
    .min(10, ERROR_MESSAGES.PHONE_MIN)
    .max(15, ERROR_MESSAGES.PHONE_MAX)
    .matches(PHONE_SPEC, {
      message: ERROR_MESSAGES.INCORRECT_PHONE,
      excludeEmptyString: false,
    })
    .required(ERROR_MESSAGES.REQUIRED),
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.LOGIN_MIN)
    .max(20, ERROR_MESSAGES.LOGIN_MAX)
    .required(ERROR_MESSAGES.REQUIRED),
});

export { initValues, singSchema };
