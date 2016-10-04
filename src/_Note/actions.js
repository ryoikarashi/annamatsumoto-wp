import { action, createRequestTypes } from '../_App/actions';

export const NOTES = createRequestTypes('NOTES');
export const notes = {
  request: (filter, lang) => action(NOTES.REQUEST, {filter, lang}),
  success: (filter, response, lang) => action(NOTES.SUCCESS, {filter, response, lang}),
  failure: (filter, error, lang) => action(NOTES.FAILURE, {filter, error, lang})
};

export const LOAD_NOTES = 'LOAD_NOTES';
export const loadNotes = (filter, params, lang) => action(LOAD_NOTES, {filter, params, lang});

export const LOAD_MORE_NOTES = 'LOAD_MORE_NOTES';
export const loadMoreNotes = (filter, params, lang) => action(LOAD_MORE_NOTES, {filter, params, lang});
