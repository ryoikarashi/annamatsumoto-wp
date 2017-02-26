/* eslint-disable no-constant-condition */
import { take, call, fork, select } from 'redux-saga/effects';
import { oneLineTrim } from 'common-tags';
import { api } from '../services';
import { LOAD_WORKS, LOAD_MORE_WORKS, works } from '../_Work/actions';
import { getWorks } from '../_Work/selectors';
import { fetchEntity } from '../_App/sagas';
import moment from 'moment';

function toISO8601(year, month, day) {

  if (year) {
    let time = {};
    time.year = Number(year);
    time.endOf = 'year';

    if (month) {
      time.month = Number(month) - 1;
      time.endOf = 'month';

      if (day) {
        time.day = Number(day);
        time.endOf = 'day';
      }
    }

    let format = 'YYYY-MM-DD[T]HH:mm:ss';

    time.moment = moment({
      year: year,
      month: time.month || 0,
      day: time.day || 0,
      hour: 0,
      minute: 0,
      second: 0
    });

    time.after = time.moment.startOf(time.endOf).format(format);
    time.before = time.moment.endOf(time.endOf).format(format);

    return time;
  }

  return false;
}

const firstPageWorksUrl = params => {

  params.slug       = params.hasOwnProperty('slug')     ? params.slug       : '';
  params.category   = params.hasOwnProperty('category') ? params.category   : undefined;
  params.tag        = params.hasOwnProperty('tag')      ? params.tag        : undefined;
  params.search     = params.hasOwnProperty('search')   ? params.search     : '';
  params.year       = params.hasOwnProperty('year')     ? params.year       : '';
  params.month      = params.hasOwnProperty('month')    ? params.month      : '';
  params.day        = params.hasOwnProperty('day')      ? params.day        : '';

  const time = toISO8601(params.year, params.month, params.day);

  return oneLineTrim`works?
                    ${params.slug.length ? `slug=${params.slug}&` : ''}
                    ${params.category ? `categories=${params.category}&` : ''}
                    ${params.tag ? `tags=${params.tag}&` : ''}
                    search=${params.search}&
                    ${time ? `after=${time.after}&` : ''}
                    ${time ? `before=${time.before}&` : ''}
                    orderBy=menu_order`;
};

/***************************** Subroutines ************************************/
const fetchWorks = fetchEntity.bind(null, works, api.fetchWorks);

function* loadWorks(filter, params, lang, loadMore) {

  const works = yield select(getWorks, filter, lang);

  if (!Object.keys(works).length || loadMore) {

    yield call(
      fetchWorks,
      filter,
      params,
      works.nextPageUrl || firstPageWorksUrl(params),
      lang
    );
  }
}

/******************************* WATCHERS *************************************/
export function* watchLoadWorks() {
  while(true) {
    const {filter, params, lang} = yield take(LOAD_WORKS);
    yield fork(loadWorks, filter, params, lang);
  }
}

export function* watchLoadMoreWorks() {
  while(true) {
    const {filter, params, lang} = yield take(LOAD_MORE_WORKS);
    yield fork(loadWorks, filter, params, lang, true);
  }
}
