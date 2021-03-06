import axios from 'axios';
import HttpClient from './httpClient';
import Api from './api';
import oauth from './oauth';

const { version } = require('../package').version;

class tracker {
  constructor(trackerConfig) {
    const accessToken = '12345';

    axios.defaults.baseURL = 'https://customermanager.mybluemix.net/api/userservice/';
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

    this.trackerConfig = trackerConfig;
    this.oauth = oauth;
    this.api = new Api(new HttpClient(axios));
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
    console.log('Storing UUID', res.data);
    if (!res && res.data) {
      throw new Error('Missing: Result is not defined from status downloaded result');
    }
    if (!res.data.uuId) {
      throw new Error('Missing: Result exists from status downloaded result but uuId does not exist');
    }
    this.uuIdObj = JSON.stringify(res.data);
    localStorage.setItem('manoeuvre', this.uuIdObj);
  }
}
// and export
export default tracker;
