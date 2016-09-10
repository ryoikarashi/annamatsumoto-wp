/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions';
import { getPosts, getTags, getCategories, getMe } from '../reducers/selectors';

const { posts, tags, categories, me } = actions;

const firstPagePostsUrl = params => {

  params.slug     = params.hasOwnProperty('slug')     ? params.slug     : '';
  params.category = params.hasOwnProperty('category') ? params.category : '';
  params.tag      = params.hasOwnProperty('tag')      ? params.tag      : '';
  params.search   = params.hasOwnProperty('search')   ? params.search   : '';
  params.year     = params.hasOwnProperty('year')     ? params.year     : '';
  params.month    = params.hasOwnProperty('month')    ? params.month    : '';
  params.day      = params.hasOwnProperty('day')      ? params.day      : '';

  return `posts?
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

function* fetchEntity(entity, apiFn, id, params, url) {
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, params, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
}

export const fetchPosts      = fetchEntity.bind(null, posts, api.fetchPosts);
export const fetchTags       = fetchEntity.bind(null, tags, api.fetchTags);
export const fetchCategories = fetchEntity.bind(null, categories, api.fetchCategories);
export const fetchMe         = fetchEntity.bind(null, me, api.fetchMe);

function* loadPosts(filter, params, loadMore) {
  const posts = yield select(getPosts, filter, params);

  if (!Object.keys(posts).length || loadMore) {
    yield call(
      fetchPosts,
      filter,
      params,
      posts.nextPageUrl || firstPagePostsUrl(params)
    );
  }
}

function* loadTags() {
  const tags = yield select(getTags);
  if (!Object.keys(tags).length)
    yield call(fetchTags);
}

function* loadCategories() {
  const categories = yield select(getCategories);
  if (!Object.keys(categories).length)
    yield call(fetchCategories);
}

function* loadMe() {
  const me = yield select(getMe);
  if (!Object.keys(me).length)
    yield call(fetchMe);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

function* watchLoadPosts() {
  while(true) {
    const {filter, params} = yield take(actions.LOAD_POSTS);
    yield fork(loadPosts, filter, params);
  }
}

function* watchLoadTags() {
  while(true) {
    yield take(actions.LOAD_TAGS);

    yield fork(loadTags);
  }
}

function* watchLoadCategories() {
  while(true) {
    yield take(actions.LOAD_CATEGORIES);

    yield fork(loadCategories);
  }
}

function* watchLoadMorePosts() {
  while(true) {
    const {filter, params} = yield take(actions.LOAD_MORE_POSTS);
    yield fork(loadPosts, filter, params, true);
  }
}

function* watchLoadMe() {
  while(true) {
    yield take(actions.LOAD_ME);

    yield fork(loadMe);
  }
}

export default function* root() {
  yield [
    fork(watchLoadPosts),
    fork(watchLoadMorePosts),
    fork(watchLoadTags),
    fork(watchLoadCategories),
    fork(watchLoadMe)
  ]
}
