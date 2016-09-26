export const getCategories = (state, lang) => state.entities.entities[lang].categories || {};
export const getTags = (state, lang) => state.entities.entities[lang].tags || {};
