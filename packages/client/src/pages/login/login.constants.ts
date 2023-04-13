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
    .min(3, 'Логин должен содержать от 3 символов')
    .max(20, 'Логин не может быть больше 20 символов')
    .required(ERROR_MESSAGES.REQUIRED),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать от 8 символов')
    .max(40, 'Пароль не может быть больше 40 символов')
    .required(ERROR_MESSAGES.REQUIRED),
})

export { initValues, loginSchema };
