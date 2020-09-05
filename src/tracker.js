import axios from 'axios';
import HttpClient from './httpClient';
import Api from './api';
import oauth from './oauth';
import authenticator from './authenticator';
import rateLimiting from './rateLimit';

const { version } = require('../package').version;

class tracker {
  constructor(trackerConfig) {
    const accessToken = '12345';
    this.defaultRequest = axios.defaults({
      baseUrl: ' https://customermanager.mybluemix.net/api/userservice/',
      headers: {
        'User-Agent': `manoeuvre v${version}`,
        Authorization: `Bearer ${accessToken}`,
      },
      json: true,
    });

    this.config = authenticator.fetchConfig;
    this.trackerConfig = trackerConfig;
    this.oauth = oauth;
    this.api = new Api(new HttpClient(this.defaultRequest));
    this.rateLimiting = rateLimiting;
  }

  add(args, callback) {
    const config = this.trackerConfig ? this.trackerConfig : {};
    const payload = { ...args };
    payload.config = config;
    return this.api.add(payload, callback);
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
