/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects';
import { api } from '../services';
import * as actions from '../actions';
import { getPosts, getTags, getCategories } from '../reducers/selectors';

// each entity defines 3 creators { request, success, failure }
const { posts, tags, categories } = actions;

// url for first page
// urls for next pages will be extracted from the successive loadMore* requests
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
    filter[day]=${params.day}
  `;
};


/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
function* fetchEntity(entity, apiFn, id, params, url) {
  yield put( entity.request(id) );
  const {response, error} = yield call(apiFn, params, url || id);
  if(response)
    yield put( entity.success(id, response) );
  else
    yield put( entity.failure(id, error) );
}

// yeah! we can also bind Generators
export const fetchPosts      = fetchEntity.bind(null, posts, api.fetchPosts);
export const fetchTags       = fetchEntity.bind(null, tags, api.fetchTags);
export const fetchCategories = fetchEntity.bind(null, categories, api.fetchCategories);

// load user unless it is cached
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

// load repo unless it is cached
function* loadTags() {
  const tags = yield select(getTags);
  if (!Object.keys(tags).length)
    yield call(fetchTags);
}

// load repo unless it is cached
function* loadCategories() {
  const categories = yield select(getCategories);
  if (!Object.keys(categories).length)
    yield call(fetchCategories);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// Fetches data for a User : user data + starred repos
function* watchLoadPosts() {
  while(true) {
    const {filter, params} = yield take(actions.LOAD_POSTS);
    yield fork(loadPosts, filter, params);
  }
}

// Fetches data for a Repo: repo data + repo stargazers
function* watchLoadTags() {
  while(true) {
    yield take(actions.LOAD_TAGS);

    yield fork(loadTags);
  }
}

// Fetches data for a Repo: repo data + repo stargazers
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

export default function* root() {
  yield [
    fork(watchLoadPosts),
    fork(watchLoadMorePosts),
    fork(watchLoadTags),
    fork(watchLoadCategories)
  ]
}
