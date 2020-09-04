import request from 'request-promise';
import HttpClient from './httpClient';
import oauth from './oauth';
import authenticator from './authenticator';

import Api from './api';
import rateLimiting from './rateLimit';

const { version } = require('../package').version;

const manoeuvre = {};

manoeuvre.defaultRequest = request.defaults({
  baseUrl: ' https://customermanager.mybluemix.net/api/userservice/',
  headers: {
    'User-Agent': `manoeuvre v${version}`,
  },
  json: true,
});

manoeuvre.clientConfig = (token, req) => {
  this.access_token = token;

  this.request = req || manoeuvre.defaultRequest;

  this.request = this.request.defaults({
    headers: {
      Authorization: `Bearer ${this.access_token}`,
    },
  });

  const httpClient = new HttpClient(this.request);
  this.api = new Api(httpClient);
  this.rateLimiting = rateLimiting;
};

manoeuvre.config = authenticator.fetchConfig;
manoeuvre.oauth = oauth;

// The original behavior was to use global configuration.
manoeuvre.defaultHttpClient = new HttpClient(manoeuvre.defaultRequest.defaults({
  headers: {
    Authorization: `Bearer ${authenticator.getToken()}`,
  },
}));

manoeuvre.api = new Api(manoeuvre.defaultHttpClient);
manoeuvre.rateLimiting = rateLimiting;

// and export
module.exports = manoeuvre;
