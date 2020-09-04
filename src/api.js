const Api = (client) => {
  this.client = client;
};
/*
{
    "device_type": "GALAXY S6 Edge",
    "ip_address": "900",
    "status": "900",
    "id": "affid2",
    "config": {"valid_for": 6000}
}
 */
// http://customermanager.mybluemix.net/api/userservice/affiliate_add
Api.prototype.add = (args, done) => {
  const endpoint = 'affiliate_add';
  args.body = {	'device_type': args.device_type,
				'ip_address': args.ip_address,
				'status': args.status,
  }
  if(('config' in args) && ('valid_for' in args.config)){
	  args.config = {'valid_for' : args.config.valid_for};
  }
  return this.client.postEndpoint(endpoint, args, done);
};
/*
{
    "device_type": "GALAXY S6 Edge",
    "ip_address": "10.245.207.125",
    "uuid": "uuid",
    "status": "1",
    "id": "affid"
}
 */
// http://customermanager.mybluemix.net/api/userservice/affiliate_update
Api.prototype.update = (args, done) => {
  const endpoint = 'affiliate_update';
  args.body = {	'device_type': args.device_type,
				'ip_address': args.ip_address,
				'uuid': args.uuid,
				'status': args.status,
				'id': args.id};
  return this.client.postEndpoint(endpoint, args, done);
};

// http://customermanager.mybluemix.net/api/userservice/affiliate_stats/affid
Api.prototype.stats = (args, done) => {
	const affId = args.affiliate_id
	const endpoint = 'affiliate_stats/' + affId;
	// TODO change back to get
	return this.client.postEndpoint(endpoint, args, done);
}

module.exports = Api;
