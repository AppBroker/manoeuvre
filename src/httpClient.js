/* eslint camelcase: 0 */
import querystring from 'querystring';
import fs_extra from 'fs-extra';
import RateLimit from './rateLimit';

// request.debug = true

class HttpClient {
  constructor(request) {
    this.request = request;
  }

  getEndpoint(endpoint, args = {}, done) {
    const options = { url: endpoint };
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
      body: qs,
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
      body: args.body,
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

  requestHelper(options = {}, done) {
    // We need the full response so we can get at the headers
    const reqOptions = { ...options };
    reqOptions.resolveWithFullResponse = true;
    // reject promise with 'StatusCodeError' for non-2xx responses.
    // This would include 3xx redirects and 304 Request-Not-Modified,
    // Neither of which the Strava API is expected to return.
    reqOptions.simple = true;
    let limits;
    let callback;
    // For asCallback to work properly, a function should only be passed to it
    //  if the caller provided one
    if (done) {
      callback = (err, payload) => {
        done(err, payload, limits);
      };
    }
    // Promise.resolve is used to convert the promise returned
    //  to a Bluebird promise
    // asCallback is used to support both Promise and callback-based APIs
    return Promise.resolve(this.request(reqOptions))
      .then((response) => {
        // The old callback API returns returns the current limits
        //  as an extra arg in the callback
        // The newer promise-bsed API updates a global rateLimiting counter
        limits = RateLimit.updateRateLimits(response.headers);
        return Promise.resolve(response.body);
      })
      .catch((e) => {
        if (e.response && e.response.headers) {
          limits = RateLimit.updateRateLimits(e.response.headers);
        }
        return Promise.reject(e);
      })
      .asCallback(callback);
  }
}

export default HttpClient;
