import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';

const passwordSchema = yup.object().shape({
  old_password: yup.string(),
  new_password: yup.string().test('is-unequal-password', ERROR_MESSAGES.UNEQUAL_PASSWORD, function (newPassword) {
    const { old_password } = this.parent;
    return !(old_password === newPassword);
  }),
  new_password_extra: yup.string().oneOf([yup.ref('new_password')], ERROR_MESSAGES.INCORRECT_CONFIRM_PASSWORD),
});

export { passwordSchema };
