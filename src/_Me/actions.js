import { action, createRequestTypes } from '../_App/actions';

export const ME = createRequestTypes('ME');

export const me = {
  request: () => action(ME.REQUEST),
  success: (filter, response) => action(ME.SUCCESS, {response}),
  failure: (error) => action(ME.FAILURE, {error})
};

export const LOAD_ME = 'LOAD_ME';
export const loadMe = () => action(LOAD_ME);
