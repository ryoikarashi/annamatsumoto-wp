import { action, createRequestTypes } from '../_App/actions';

// Categories
export const CATEGORIES = createRequestTypes('CATEGORIES');

export const categories = {
  request: (lang) => action(CATEGORIES.REQUEST, {lang}),
  success: (lang, response) => action(CATEGORIES.SUCCESS, {lang, response}),
  failure: (error, lang) => action(CATEGORIES.FAILURE, {error, lang})
};

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const loadCategories = (lang) => action(LOAD_CATEGORIES, {lang});

// Tags
export const TAGS = createRequestTypes('TAGS');

export const tags = {
  request: (lang) => action(TAGS.REQUEST, {lang}),
  success: (lang, response) => action(TAGS.SUCCESS, {lang, response}),
  failure: (error, lang) => action(TAGS.FAILURE, {error, lang})
};

export const LOAD_TAGS = 'LOAD_TAGS';

export const loadTags = (lang) => action(LOAD_TAGS, {lang});
