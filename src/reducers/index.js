import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import paginate from './paginate';

const entities = (state = { posts: {}, tags: {}, categories: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
};

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

const pagination = combineReducers({
  postsByFilter: paginate({
    mapActionToKey: action => action.filter,
    types: [
      ActionTypes.POSTS.REQUEST,
      ActionTypes.POSTS.SUCCESS,
      ActionTypes.POSTS.FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  routing,
  entities,
  pagination,
  errorMessage
});

export default rootReducer;
