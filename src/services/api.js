import { Schema, arrayOf, normalize } from 'normalizr';
import appendQuery from 'append-query';
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

function callApi(endpoint, schema, lang = '') {

  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? appendQuery(`${API_ROOT}${endpoint}`, `lang=${lang}`) : endpoint;

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
      response => ({ response }),
      error => ({error: error.message || 'Something bad happened'})
    )
}

// Schemas for WP-API responses
const workSchema = new Schema('works', {
  idAttribute: work => work.slug
});
const workSchemaArray = arrayOf(workSchema);

const tagSchema = new Schema('tags');
const tagSchemaArray = arrayOf(tagSchema);

const categorySchema = new Schema('categories');
const categorySchemaArray = arrayOf(categorySchema);

const meSchema = new Schema('me');
const meSchemaArray = arrayOf(meSchema);

const topSchema = new Schema('top');
const topSchemaArray = arrayOf(topSchema);

// api services
export const fetchWorks      = (params, url, lang) => callApi(url, workSchemaArray, lang);
export const fetchTags       = () => callApi('tags?per_page=100', tagSchemaArray);
export const fetchCategories = () => callApi('categories?per_page=100', categorySchemaArray);
export const fetchMe         = (params, lang) => callApi('pages?filter[name]=me', meSchemaArray, lang);
export const fetchTop        = (params, lang) => callApi('pages?filter[name]=top', topSchemaArray, lang);
