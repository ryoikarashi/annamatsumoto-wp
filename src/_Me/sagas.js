/* eslint-disable no-constant-condition */
import { take, fork, select, call } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_ME, me } from '../_Me/actions';
import { getMe } from '../_Me/selectors';
import { fetchEntity } from '../_App/sagas';

/***************************** Subroutines ************************************/
const fetchMe = fetchEntity.bind(null, me, api.fetchMe);

function* loadMe(lang) {
  const me = yield select(getMe, lang);
  if (!Object.keys(me).length)
    yield call(fetchMe, lang);
}

/******************************* WATCHERS *************************************/
export function* watchLoadMe() {
  while(true) {
     const { lang } = yield take(LOAD_ME);

     yield fork(loadMe, lang);
  }
}
