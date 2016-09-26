import { action, createRequestTypes } from '../_App/actions';

export const TOP = createRequestTypes('TOP');

export const top = {
  request: (lang) => action(TOP.REQUEST, {lang}),
  success: (lang, response) => action(TOP.SUCCESS, {lang, response}),
  failure: (error, lang) => action(TOP.FAILURE, {error, lang})
};

export const LOAD_TOP = 'LOAD_TOP';
export const loadTop = (lang) => action(LOAD_TOP, {lang});
