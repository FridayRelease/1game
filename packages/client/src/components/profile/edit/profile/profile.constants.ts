import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';
import { PHONE_SPEC } from '@/constant/spec';

const profileSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Имя должно содержать от 2 символов')
    .max(20, 'Имя не может быть больше 20 символов'),
  second_name: yup
    .string()
    .min(2, 'Фамилия должна содержать от 2 символов')
    .max(20, 'Фамилия не может быть больше 20 символов'),
  login: yup
    .string()
    .min(3, 'Логин должен содержать от 3 символов')
    .max(20, 'Логин не может быть больше 20 символов')
    .required(ERROR_MESSAGES.REQUIRED),
  phone: yup
    .string()
    .matches(PHONE_SPEC, {
      message: ERROR_MESSAGES.INCORRECT_PHONE,
      excludeEmptyString: false
  }).required(ERROR_MESSAGES.REQUIRED),
  display_name: yup.string().test('empty-check', ERROR_MESSAGES.EMPTY,
    password => (password ?? '').length == 0
  ),
})

export {
  profileSchema
}
