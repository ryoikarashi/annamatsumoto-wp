export const getMe = (state, lang) => state.entities.entities[lang || 'ja'].me || {};
