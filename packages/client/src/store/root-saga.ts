import { userSage } from '@/features/authentication';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([userSage()]);
}
