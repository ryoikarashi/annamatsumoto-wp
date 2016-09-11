/* eslint-disable no-constant-condition */
import { take, fork, select, call } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_ME, me } from '../_Me/actions';
import { getMe } from '../_Me/selectors';
import { fetchEntity } from '../_App/sagas';

/***************************** Subroutines ************************************/
const fetchMe = fetchEntity.bind(null, me, api.fetchMe);

function* loadMe() {
  const me = yield select(getMe);
  if (!Object.keys(me).length)
    yield call(fetchMe);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchLoadMe() {
  while(true) {
     yield take(LOAD_ME);

     yield fork(loadMe);
  }
}
