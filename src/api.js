const Api = (client) => {
  this.client = client;
};

Api.prototype.add = (args, done) => {
  const endpoint = 'affiliate_add';
  return this.client.postEndpoint(endpoint, args, done);
};

Api.prototype.add = (args, done) => {
  const endpoint = 'affiliate_update';
  return this.client.postEndpoint(endpoint, args, done);
};

module.exports = Api;
