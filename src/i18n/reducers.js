import { LANG } from './actions';

export const lang = (state = { lang: 'ja' }, action) => {
  const { type } = action;

  switch(type) {
    case LANG.SWITCH: {
      return {
        ...state,
        lang: action.lang
      };
    }
    default:
      return state;
  }
};
