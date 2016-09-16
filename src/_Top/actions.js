import { action, createRequestTypes } from '../_App/actions';

export const TOP = createRequestTypes('TOP');

export const top = {
  request: () => action(TOP.REQUEST),
  success: (filter, response) => action(TOP.SUCCESS, {response}),
  failure: (error) => action(TOP.FAILURE, {error})
};

export const LOAD_TOP = 'LOAD_TOP';
export const loadTop = () => action(LOAD_TOP);
