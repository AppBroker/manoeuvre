import request from 'request-promise';
import HttpClient from './httpClient';
import Api from './api';
import oauth from './oauth';
import authenticator from './authenticator';
import rateLimiting from './rateLimit';

const { version } = require('../package').version;

const manoeuvre = {};
const accessToken = '12345';

manoeuvre.defaultRequest = request.defaults({
  baseUrl: ' https://customermanager.mybluemix.net/api/userservice/',
  headers: {
    'User-Agent': `manoeuvre v${version}`,
    Authorization: `Bearer ${accessToken}`,
  },
  json: true,
});

manoeuvre.config = authenticator.fetchConfig;
manoeuvre.oauth = oauth;
//manoeuvre.api = new Api(new HttpClient(manoeuvre.defaultRequest));
manoeuvre.rateLimiting = rateLimiting;

// and export
export default manoeuvre;
