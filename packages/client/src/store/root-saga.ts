import { userSage } from '@/features/authentication';
import { all } from 'redux-saga/effects';
import { themeSaga } from '@/store/saga';

export default function* rootSaga() {
  yield all([userSage(), themeSaga()]);
}
