/* eslint-disable no-constant-condition */
import { take, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import { LOAD_NOTES, LOAD_MORE_NOTES, notes } from './actions';
import { getNotes } from './selectors';
import { fetchEntity } from '../_App/sagas';

const firstPageNotesUrl = params => {

  params.slug     = params.hasOwnProperty('slug')     ? params.slug     : '';
  params.category = params.hasOwnProperty('category') ? params.category : '';
  params.tag      = params.hasOwnProperty('tag')      ? params.tag      : '';
  params.search   = params.hasOwnProperty('search')   ? params.search   : '';
  params.year     = params.hasOwnProperty('year')     ? params.year     : '';
  params.month    = params.hasOwnProperty('month')    ? params.month    : '';
  params.day      = params.hasOwnProperty('day')      ? params.day      : '';

  return `notes?
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
const fetchNotes = fetchEntity.bind(null, notes, api.fetchNotes);

function* loadNotes(filter, params, lang, loadMore) {

  const notes = yield select(getNotes, filter, lang);

  if (!Object.keys(notes).length || loadMore) {

    yield call(
      fetchNotes,
      filter,
      params,
      notes.nextPageUrl || firstPageNotesUrl(params),
      lang
    );
  }
}

/******************************* WATCHERS *************************************/
export function* watchLoadNotes() {
  while(true) {
    const {filter, params, lang} = yield take(LOAD_NOTES);
    yield fork(loadNotes, filter, params, lang);
  }
}

export function* watchLoadMoreNotes() {
  while(true) {
    const {filter, params, lang} = yield take(LOAD_MORE_NOTES);
    yield fork(loadNotes, filter, params, lang, true);
  }
}
