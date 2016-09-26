export const getWorks = (state, filter, lang) => state.pagination.lang[lang || 'ja'].worksByFilter[filter] || {};
