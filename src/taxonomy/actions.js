import { action, createRequestTypes } from '../_App/actions';

// Categories
export const CATEGORIES = createRequestTypes('CATEGORIES');

export const categories = {
  request: () => action(CATEGORIES.REQUEST),
  success: (filter, response) => action(CATEGORIES.SUCCESS, {response}),
  failure: (error) => action(CATEGORIES.FAILURE, {error})
};

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loadCategories = () => action(LOAD_CATEGORIES);

// Tags
export const TAGS = createRequestTypes('TAGS');

export const tags = {
  request: () => action(TAGS.REQUEST),
  success: (filter, response) => {
    return action(TAGS.SUCCESS, {response})
  },
  failure: (error) => action(TAGS.FAILURE, {error})
};

export const LOAD_TAGS = 'LOAD_TAGS';

export const loadTags = () => action(LOAD_TAGS);
