/* eslint-disable no-constant-condition */
import { take, fork, select, call } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_TOP, top } from '../_Top/actions';
import { getTop } from '../_Top/selectors';
import { fetchEntity } from '../_App/sagas';

/***************************** Subroutines ************************************/
const fetchTop = fetchEntity.bind(null, top, api.fetchTop);

function* loadTop(lang) {
  const top = yield select(getTop, lang);
  if (!Object.keys(top).length)
    yield call(
      fetchTop,
      lang
    );
}

/******************************* WATCHERS *************************************/
export function* watchLoadTop() {
  while(true) {
    const { lang } = yield take(LOAD_TOP);

    yield fork(loadTop, lang);
  }
}
