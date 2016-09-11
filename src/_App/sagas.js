import { put, call, fork } from 'redux-saga/effects';

import { watchLoadWorks, watchLoadMoreWorks } from '../_Work/sagas';
import { watchLoadMe } from '../_Me/sagas';
import { watchLoadCategories, watchLoadTags } from '../taxonomy/sagas';

export function* fetchEntity(entity, apiFn, id, params, url) {
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, params, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
}

export default function* root() {
  yield [
    fork(watchLoadWorks),
    fork(watchLoadMoreWorks),
    fork(watchLoadTags),
    fork(watchLoadCategories),
    fork(watchLoadMe)
  ]
}
