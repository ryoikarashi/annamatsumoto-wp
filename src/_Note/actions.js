import { action, createRequestTypes } from '../_App/actions';

export const NOTES = createRequestTypes('NOTES');
export const notes = {
  request: (filter) => action(NOTES.REQUEST, {filter}),
  success: (filter, response) => action(NOTES.SUCCESS, {filter, response}),
  failure: (filter, error) => action(NOTES.FAILURE, {filter, error})
};

export const LOAD_NOTES = 'LOAD_NOTES';
export const loadWorks = (filter, params) => action(LOAD_NOTES, {filter, params});

export const LOAD_MORE_NOTES = 'LOAD_MORE_NOTES';
export const loadMoreWorks = (filter, params) => action(LOAD_MORE_NOTES, {filter, params});
