import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';
import { PHONE_SPEC } from '@/constant/spec';

const profileSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, ERROR_MESSAGES.NAME_MIN)
    .max(20, ERROR_MESSAGES.NAME_MAX),
  second_name: yup
    .string()
    .min(2, ERROR_MESSAGES.SURNAME_MIN)
    .max(20, ERROR_MESSAGES.SURNAME_MAX),
  login: yup
    .string()
    .min(3, ERROR_MESSAGES.LOGIN_MIN)
    .max(20, ERROR_MESSAGES.LOGIN_MAX)
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
