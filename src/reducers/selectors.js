export const getTags = state => state.entities.tags || {};
export const getCategories = state => state.entities.categories || {};
export const getPosts = (state, filter) => state.pagination.postsByFilter[filter] || {};
