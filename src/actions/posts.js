import { REQUEST, SUCCESS, FAILURE } from '../constants';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';
export const LOAD_TAGS = 'LOAD_TAGS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const POSTS = createRequestTypes('POSTS');
export const TAGS = createRequestTypes('TAGS');
export const CATEGORIES = createRequestTypes('CATEGORIES');

function action(type, payload = {}) {
  return { type, ...payload };
}

export const posts = {
  request: (filter) => action(POSTS.REQUEST, {filter}),
  success: (filter, response) => action(POSTS.SUCCESS, {filter, response}),
  failure: (filter, error) => action(POSTS.FAILURE, {filter, error})
};

export const tags = {
  request: () => action(TAGS.REQUEST),
  success: (filter, response) => {
    return action(TAGS.SUCCESS, {response})
  },
  failure: (error) => action(TAGS.FAILURE, {error})
};

export const categories = {
  request: () => action(CATEGORIES.REQUEST),
  success: (filter, response) => action(CATEGORIES.SUCCESS, {response}),
  failure: (error) => action(CATEGORIES.FAILURE, {error})
};
export const loadPosts = (filter, params) => action(LOAD_POSTS, {filter, params});
export const loadMorePosts = (filter, params) => action(LOAD_MORE_POSTS, {filter, params});
export const loadTags = () => action(LOAD_TAGS);
export const loadCategories = () => action(LOAD_CATEGORIES);

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE)
