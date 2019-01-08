// https://ros-m.araswat.com/

const WEBPACK_PORT = '4200';
const LOCAL_SERVER_PORT = 'https://ros-m.araswat.com/registry/ros/v1';

// if webpackn dev server is present, replace with local server port to hit local services
// const URL_PREFIX = window.location.origin.replace(WEBPACK_PORT, LOCAL_SERVER_PORT);

// this url will most likely be needed in some form to run searches.
// const url2 = 'http://elastic:changeme@localhost:9200/test_index/test_type/test_update_i'
const URL_PREFIX = 'https://rosm-api.araswat.com';

// TC will fill this in at build time with a given deployment proxy urlrot (if one).
// use root by default so this works with a release package
const serverInstanceRoot = '/';
const token = '?token=abc'

export const buildURL = (url: string, anticache = true): string => {
  // SUPER important: IE11 caches ajax requests, only sending one per unique parameter
  // to prevent this we need to do the equiv of disabling jQuery cache,
  // so we append a unique param at end of url as _timestamp
  // (this is unfortunate: we need to guess if the incoming url already has a ? param)
  const antiCacheParam = anticache ? `${url.indexOf('?') !== -1 ? '&' : '?'}_=${new Date().getTime()}` : '';
  return `${URL_PREFIX}${serverInstanceRoot}${url}`;
};

export const buildWebsocketURL = (endpoint: string): string => {
  // dont forget to change protocol
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  // dont use URL_PREFIX here, we want to slap proto on ourselves
  return `${proto}//${window.location.host.replace(WEBPACK_PORT, LOCAL_SERVER_PORT)}${serverInstanceRoot}${endpoint}`;
};
