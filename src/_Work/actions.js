import { action, createRequestTypes } from '../_App/actions';

export const WORKS = createRequestTypes('WORKS');
export const works = {
  request: (filter, lang) => action(WORKS.REQUEST, {filter, lang}),
  success: (filter, response, lang) => action(WORKS.SUCCESS, {filter, response, lang}),
  failure: (filter, error, lang) => action(WORKS.FAILURE, {filter, error, lang})
};

export const LOAD_WORKS = 'LOAD_WORKS';
export const loadWorks = (filter, params, lang) => action(LOAD_WORKS, {filter, params, lang});

export const LOAD_MORE_WORKS = 'LOAD_MORE_WORKS';
export const loadMoreWorks = (filter, params, lang) => action(LOAD_MORE_WORKS, {filter, params, lang});
