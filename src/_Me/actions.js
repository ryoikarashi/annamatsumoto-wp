import { action, createRequestTypes } from '../_App/actions';

export const ME = createRequestTypes('ME');

export const me = {
  request: (lang) => action(ME.REQUEST, {lang}),
  success: (lang, response) => action(ME.SUCCESS, {lang, response}),
  failure: (error, lang) => action(ME.FAILURE, {error, lang})
};

export const LOAD_ME = 'LOAD_ME';
export const loadMe = (lang) => action(LOAD_ME, {lang});
