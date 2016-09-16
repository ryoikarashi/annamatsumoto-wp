import { TOP } from '../_Top/actions';

export const top = (state = { isFetching: false }, action) => {
  const { type } = action;

  switch(type) {
    case TOP.REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case TOP.SUCCESS:
    case TOP.FAILURE: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
