import { ValidationProps } from '@/features/validation/validator';

const initValues: Record<string, string> = {};

const validationSchema: Record<string, ValidationProps> = {
  login: {
    required: true,
  },
  password: {
    required: true,
  },
};

export { initValues, validationSchema };
