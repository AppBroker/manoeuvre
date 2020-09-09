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

    axios.defaults.baseURL = 'https://customermanager.mybluemix.net/api/userservice/';
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    this.config = authenticator.fetchConfig;
    this.trackerConfig = trackerConfig;
    this.oauth = oauth;
    this.api = new Api(new HttpClient(axios));
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
export default tracker;
