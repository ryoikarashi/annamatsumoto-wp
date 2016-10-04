import { put, call, fork } from 'redux-saga/effects';

import { watchLoadWorks, watchLoadMoreWorks } from '../_Work/sagas';
import { watchLoadNotes, watchLoadMoreNotes } from '../_Note/sagas';
import { watchLoadMe } from '../_Me/sagas';
import { watchLoadTop } from '../_Top/sagas';
import { watchLoadCategories, watchLoadTags } from '../taxonomy/sagas';

export function* fetchEntity(entity, apiFn, id, params, url, lang) {
  yield put(entity.request(id, lang));
  const {response, error} = yield call(apiFn, params, url || id, lang);
  if(response) {
    yield put(entity.success(id, response, lang));
  }
  else {
    yield put(entity.failure(id, error, lang));
  }
}

export default function* root() {
  yield [
    fork(watchLoadWorks),
    fork(watchLoadMoreWorks),
    fork(watchLoadNotes),
    fork(watchLoadMoreNotes),
    fork(watchLoadTags),
    fork(watchLoadCategories),
    fork(watchLoadMe),
    fork(watchLoadTop)
  ]
}
