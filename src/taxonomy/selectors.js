export const getCategories = (state, lang) => state.entities.entities[lang || 'ja'].categories || {};
export const getTags = (state, lang) => state.entities.entities[lang || 'ja'].tags || {};
