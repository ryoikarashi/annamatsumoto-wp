/* eslint-disable no-constant-condition */
import { take, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_WORKS, LOAD_MORE_WORKS, works } from '../_Work/actions';
import { getWorks } from '../_Work/selectors';
import { fetchEntity } from '../_App/sagas';

const firstPageWorksUrl = params => {

  params.slug     = params.hasOwnProperty('slug')     ? params.slug     : '';
  params.category = params.hasOwnProperty('category') ? params.category : '';
  params.tag      = params.hasOwnProperty('tag')      ? params.tag      : '';
  params.search   = params.hasOwnProperty('search')   ? params.search   : '';
  params.year     = params.hasOwnProperty('year')     ? params.year     : '';
  params.month    = params.hasOwnProperty('month')    ? params.month    : '';
  params.day      = params.hasOwnProperty('day')      ? params.day      : '';

  return `works?
    filter[category_name]=${params.category}&
    filter[tag]=${params.tag}&
    filter[s]=${params.search}&
    filter[name]=${params.slug}&
    filter[year]=${params.year}&
    filter[monthnum]=${params.month}&
    filter[day]=${params.day}&
    filter[orderby]=menu_order
  `;
};

/***************************** Subroutines ************************************/

export const fetchWorks = fetchEntity.bind(null, works, api.fetchWorks);

function* loadWorks(filter, params, loadMore) {
  const works = yield select(getWorks, filter, params);

  if (!Object.keys(works).length || loadMore) {
    yield call(
      fetchWorks,
      filter,
      params,
      works.nextPageUrl || firstPageWorksUrl(params)
    );
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export function* watchLoadWorks() {
  while(true) {
    const {filter, params} = yield take(LOAD_WORKS);
    yield fork(loadWorks, filter, params);
  }
}

export function* watchLoadMoreWorks() {
  while(true) {
    const {filter, params} = yield take(LOAD_MORE_WORKS);
    yield fork(loadWorks, filter, params, true);
  }
}
