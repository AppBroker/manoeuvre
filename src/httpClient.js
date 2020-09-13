import querystring from 'querystring';

class HttpClient {
  constructor(request) {
    this.request = request;
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
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
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
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
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

  async requestHelper(options = {}, done) {
    // We need the full response so we can get at the headers
    const reqOptions = { ...options };
    reqOptions.resolveWithFullResponse = true;
    reqOptions.simple = true;
    try {
      // fetch data from a url endpoint
      const data = await this.request(reqOptions);
      if (done) {
        const callback = (res) => {
          done(res);
        };
        callback(data);
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
