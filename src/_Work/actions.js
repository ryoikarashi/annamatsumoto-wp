import { action, createRequestTypes } from '../_App/actions';

export const WORKS = createRequestTypes('WORKS');
export const works = {
  request: (filter) => action(WORKS.REQUEST, {filter}),
  success: (filter, response) => action(WORKS.SUCCESS, {filter, response}),
  failure: (filter, error) => action(WORKS.FAILURE, {filter, error})
};

export const LOAD_WORKS = 'LOAD_WORKS';
export const loadWorks = (filter, params) => action(LOAD_WORKS, {filter, params});

export const LOAD_MORE_WORKS = 'LOAD_MORE_WORKS';
export const loadMoreWorks = (filter, params) => action(LOAD_MORE_WORKS, {filter, params});
