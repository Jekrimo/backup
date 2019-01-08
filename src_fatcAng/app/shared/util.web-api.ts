///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
const WEBPACK_PORT = "4200";
const LOCAL_SERVER_PORT = "8080";

// if webpackn dev server is present, replace with local server port to hit local services
const URL_PREFIX = window.location.origin.replace(WEBPACK_PORT, LOCAL_SERVER_PORT);

// TC will fill this in at build time with a given deployment proxy urlroot (if one).
// use root by default so this works with a release package
const serverInstanceRoot = "/";

export const buildURL = (url: string, anticache: boolean = true): string => {
  // SUPER important: IE11 caches ajax requests, only sending one per unique parameter
  // to prevent this we need to do the equiv of disabling jQuery cache,
  // so we append a unique param at end of url as _timestamp
  // (this is unfortunate: we need to guess if the incoming url already has a ? param)
  const antiCacheParam = anticache ? `${url.indexOf("?") !== -1 ? "&" : "?"}_=${new Date().getTime()}` : "";
  return `${URL_PREFIX}${serverInstanceRoot}${url}${antiCacheParam}`;
};

export const buildWebsocketURL = (endpoint: string): string => {
  // dont forget to change protocol
  const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
  // dont use URL_PREFIX here, we want to slap proto on ourselves
  return `${proto}//${window.location.host.replace(WEBPACK_PORT, LOCAL_SERVER_PORT)}${serverInstanceRoot}${endpoint}`;
};
