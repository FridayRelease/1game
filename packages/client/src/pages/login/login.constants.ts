import { ValidationProps } from '@/features/validation/validator';
import { IUserSigninRequest } from '@/types/user';

const initValues: IUserSigninRequest = {
  login: '',
  password: '',
};

const validationSchema: Record<string, ValidationProps> = {
  login: {
    required: true,
  },
  password: {
    required: true,
  },
};

export { initValues, validationSchema };
