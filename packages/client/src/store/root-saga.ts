import { userSage } from '@/features/authentication';

export default function* rootSaga() {
  yield userSage();
}
