import { Schema, arrayOf, normalize } from 'normalizr';
import 'isomorphic-fetch';

function getNextPageUrl(res) {
  const link = res.headers.get('link')

  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)

  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].replace(/ /g, '').slice(1, -1)
}

const API_ROOT = '/wp-json/wp/v2/';

function callApi(endpoint, schema) {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const nextPageUrl = getNextPageUrl(response);

      return Object.assign({},
        normalize(json, schema),
        { nextPageUrl }
      );
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )
}

// Schemas for WP-API responses
const postSchema = new Schema('posts', {
  idAttribute: post => post.slug
});
const postSchemaArray = arrayOf(postSchema);

const tagSchema = new Schema('tags');
const tagSchemaArray = arrayOf(tagSchema);

const categorySchema = new Schema('categories');
const categorySchemaArray = arrayOf(categorySchema);

// api services
export const fetchPosts = (params, url) => callApi(url, postSchemaArray);
export const fetchTags = () => callApi('tags?per_page=100', tagSchemaArray);
export const fetchCategories = () => callApi('categories?per_page=100', categorySchemaArray);
