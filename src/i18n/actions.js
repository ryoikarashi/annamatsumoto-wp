import { action } from '../_App/actions';

const DEFAULT_LANG = 'ja';

export const LANG = {SWITCH: 'SWITCH_LANG'};

export const lang = {
  switch: (lang) => {
    lang = lang || DEFAULT_LANG;
    return action(LANG.SWITCH, {lang})
  }
};

export const switchLang = (lang) => action(LANG.SWITCH, {lang});
