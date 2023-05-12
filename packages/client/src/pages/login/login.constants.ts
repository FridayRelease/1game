import { IUserSigninRequest } from '@/types/user';
import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';

const initValues: IUserSigninRequest = {
  login: '',
  password: '',
};

const loginSchema = yup.object().shape({
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.LOGIN_MIN)
    .max(20, ERROR_MESSAGES.LOGIN_MAX)
    .required(ERROR_MESSAGES.REQUIRED),
  password: yup
    .string()
    .min(8, ERROR_MESSAGES.PASSWORD_MIN)
    .max(40, ERROR_MESSAGES.PASSWORD_MAX)
    .required(ERROR_MESSAGES.REQUIRED),
});

export { initValues, loginSchema };
