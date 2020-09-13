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
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

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
    return this.api.update(args, this.storeUUID.bind(this));
  }

  stats(args) {
    return this.api.stats(args);
  }

  storeUUID(res) {
    console.log('Storing UUID', res);
    if (!res) {
      throw new Error('Missing: Result is not defined from status downloaded result');
    }
    if (!res.uuId) {
      throw new Error('Missing: Result exists from status downloaded result but uuId does not exist');
    }
    this.uuIdObj = JSON.stringify(res);
    localStorage.setItem('manoeuvre', this.uuIdObj);
  }
}
// and export
export default tracker;
