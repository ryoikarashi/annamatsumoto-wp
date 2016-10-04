export const getNotes = (state, filter, lang) => state.pagination.lang[lang || 'ja'].notesByFilter[filter] || {};
