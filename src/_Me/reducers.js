import { ME } from '../_Me/actions';

export const me = (state = { isFetching: false }, action) => {
  const { type } = action;

  switch(type) {
    case ME.REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ME.SUCCESS:
    case ME.FAILURE: {
      return {
        ...state,
        isFetching: false
      };
    }
    default:
      return state;
  }
};
