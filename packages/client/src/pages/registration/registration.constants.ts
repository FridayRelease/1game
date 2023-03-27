import { ValidationProps } from '@/features/validation/validator';

const initValues: Record<string, string> = {};

const validationSchema: Record<string, ValidationProps> = {
  first_name: {
    required: true,
    min: 6,
  },
  second_name: {
    required: true,
  },
  email: {
    required: true,
  },
  password: {
    required: true,
  },
  passwordSecond: {
    isRetryPassword: 'password',
  },
  phone: {
    required: true,
  },
  login: {
    required: true,
  },
};

export { initValues, validationSchema };
