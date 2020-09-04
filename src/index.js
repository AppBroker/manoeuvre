const request = require('request-promise');
const HttpClient = require('./httpClient');
const Api = require('./api');
const oauth = require('./oauth');
const authenticator = require('./authenticator');
const rateLimiting = require('./rateLimit');

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

//const httpClient = new HttpClient(manoeuvre.defaultRequest);

manoeuvre.config = authenticator.fetchConfig;
manoeuvre.oauth = oauth;
//manoeuvre.api = new Api(httpClient);
manoeuvre.rateLimiting = rateLimiting;

// and export
module.exports = manoeuvre;
