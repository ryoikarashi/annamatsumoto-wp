import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { pagination } from '../_Paginate/reducers';
import { me } from '../_Me/reducers';
import { top } from '../_Top/reducers';

const entities = (
  state = {
    works: {},
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

const rootReducer = combineReducers({
  routing,
  entities,
  pagination,
  me,
  top
});

export default rootReducer;
