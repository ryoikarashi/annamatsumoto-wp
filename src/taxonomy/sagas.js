/* eslint-disable no-constant-condition */
import { take, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_CATEGORIES, LOAD_TAGS, categories, tags } from '../taxonomy/actions';
import { getCategories, getTags } from '../taxonomy/selectors';
import { fetchEntity } from '../_App/sagas';

/***************************** Subroutines ************************************/
export const fetchTags       = fetchEntity.bind(null, tags, api.fetchTags);
export const fetchCategories = fetchEntity.bind(null, categories, api.fetchCategories);

function* loadCategories() {
  const categories = yield select(getCategories);
  if (!Object.keys(categories).length)
    yield call(fetchCategories);
}

function* loadTags() {
  const tags = yield select(getTags);
  if (!Object.keys(tags).length)
    yield call(fetchTags);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/
export function* watchLoadCategories() {
  while(true) {
    yield take(LOAD_CATEGORIES);

    yield fork(loadCategories);
  }
}

export function* watchLoadTags() {
  while(true) {
    yield take(LOAD_TAGS);

    yield fork(loadTags);
  }
}
