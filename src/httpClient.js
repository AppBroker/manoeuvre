/* eslint camelcase: 0 */
import querystring from 'querystring';
import fs_extra from 'fs-extra';
import RateLimit from './rateLimit';

// request.debug = true

class HttpClient {
  constructor(request) {
    this.request = request;
    this.rateLimit = new RateLimit();
  }

  getEndpoint(endpoint, args = {}, done) {
    const options = {
      url: endpoint,
      data: {},
    };
    if (args.access_token) {
      options.headers = { Authorization: `Bearer ${args.access_token}` };
    }
    return this.requestHelper(options, done);
  }

  putEndpoint(endpoint, args = {}, done) {
    // stringify the body object for passage
    const qs = querystring.stringify(args.body);
    const options = {
      url: endpoint,
      method: 'PUT',
      data: qs,
    };
    if (args.access_token) {
      options.headers = { Authorization: `Bearer ${args.access_token}` };
    }
    // add form data if present
    if (args.form) { options.form = args.form; }
    return this.requestHelper(options, done);
  }

  postEndpoint(endpoint, args = {}, done) {
    const options = {
      url: endpoint,
      method: 'POST',
      data: args,
    };
    if (args.access_token) {
      options.headers = { Authorization: `Bearer ${args.access_token}` };
    }
    // add form data if present
    if (args.form) { options.form = args.form; }
    // add multipart data if present
    if (args.multipart) { options.multipart = args.multipart; }
    return this.requestHelper(options, done);
  }

  deleteEndpoint(endpoint, args = {}, done) {
    // stringify the body object for passage
    const qs = querystring.stringify(args.body);
    const options = {
      url: endpoint,
      method: 'DELETE',
      body: qs,
    };
    if (args.access_token) {
      options.headers = { Authorization: `Bearer ${args.access_token}` };
    }
    return this.requestHelper(options, done);
  }

  postUpload(args = {}, done) {
    const options = {
      url: 'uploads',
      method: 'POST',
      formData: {
        ...args.formData,
        file: fs_extra.createReadStream(args.file),
      },
    };
    if (args.access_token) {
      options.headers = { Authorization: `Bearer ${args.access_token}` };
    }
    return Promise.resolve(this.request.post(options)).asCallback(done);
  }

  async requestHelper(options = {}, done) {
    // We need the full response so we can get at the headers
    const reqOptions = { ...options };
    reqOptions.resolveWithFullResponse = true;
    reqOptions.simple = true;
    let limits;
    try {
      // fetch data from a url endpoint
      const data = await this.request(reqOptions);
      if (done) {
        const callback = (err, payload) => {
          done(err, payload, limits);
        };
        callback();
      }
      return data;
    } catch (error) {
      console.log('error', error);
      // appropriately handle the error
      return error;
    }
  }
}

export default HttpClient;
