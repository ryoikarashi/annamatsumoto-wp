import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { pagination } from '../_Paginate/reducers';
import { me } from '../_Me/reducers';
import { top } from '../_Top/reducers';
import { lang } from '../i18n/reducers';

const content = (
  state = {
    works: {},
    notes: {},
    tags: {},
    categories: {},
    me: {},
    top: {}
  }, action) => {

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

function languages({mapActionToKey}, reducer) {
  return function contentsByKey(state = {}, action) {
    const key = mapActionToKey(action);

    if (typeof key !== 'string') {
      throw new Error('Expected key to be a string.');
    }

    return merge({}, state, {
      [key]: reducer(state[key], action)
    });
  }
}

const entities = combineReducers({
  entities: languages({
    mapActionToKey: action => action.lang || 'ja'
  }, content)
});

const langPagination = combineReducers({
  lang: languages({
    mapActionToKey: action => action.lang || 'ja'
  }, pagination)
})

const rootReducer = combineReducers({
  routing,
  entities,
  pagination: langPagination,
  me,
  top,
  lang
});

export default rootReducer;
