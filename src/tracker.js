import request from 'request-promise';
import HttpClient from './httpClient';
import Api from './api';
import oauth from './oauth';
import authenticator from './authenticator';
import rateLimiting from './rateLimit';

const { version } = require('../package').version;

class tracker {
  constructor() {
    const accessToken = '12345';
    this.defaultRequest = request.defaults({
      baseUrl: ' https://customermanager.mybluemix.net/api/userservice/',
      headers: {
        'User-Agent': `manoeuvre v${version}`,
        Authorization: `Bearer ${accessToken}`,
      },
      json: true,
    });

    this.config = authenticator.fetchConfig;
    this.oauth = oauth;
    this.api = new Api(new HttpClient(this.defaultRequest));
    this.rateLimiting = rateLimiting;
  }

  add(args) {
    return this.api.add(args);
  }

  update(args) {
    return this.api.update(args);
  }

  stats(args) {
    return this.api.stats(args);
  }
}
// and export
export { tracker };
