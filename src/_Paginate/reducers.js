import merge from 'lodash/merge';
import union from 'lodash/union';

function paginate({ types, mapActionToKey }) {

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [ requestType, successType, failureType ] = types;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) {

    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl,
          pageCount: state.pageCount + 1
        });
      case failureType:
        return merge({}, state, {
          isFetching: false
        });
      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType: {
        const key = mapActionToKey(action);
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        });
      }
      default:
        return state;
    }
  }
}

import { WORKS } from '../_Work/actions';
import { NOTES } from '../_Note/actions';
import { combineReducers } from 'redux';

export const pagination = combineReducers({
  worksByFilter: paginate({
    mapActionToKey: action => action.filter,
    types: [
      WORKS.REQUEST,
      WORKS.SUCCESS,
      WORKS.FAILURE
    ]
  }),
  notesByFilter: paginate({
    mapActionToKey: action => action.filter,
    types: [
      NOTES.REQUEST,
      NOTES.SUCCESS,
      NOTES.FAILURE
    ]
  })
});
