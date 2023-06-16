import { MESSAGE } from '../src/constants/message';

export const errorMessage = (error: string | unknown = MESSAGE.BASE_ERROR) => {
  return { message: 'error', error: error }
}
