class Api {
  constructor(client) {
    this.client = client;
  }
/*
const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector;
const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const agent = detector.detect(userAgent)
  return {device: agent.device.model}
*/

  /*
{
    "deviceType": "GALAXY S6 Ed2",
    "ipAddress": "1.2.5",
    "appId": "appId84",
    "affiliateId": "affid84",
    "config": {“validFor”: 6000}
}
	{
		"device_type": "GALAXY S6 Edge",
		"ip_address": "900",
		"status": "900",
		"id": "affid2",
		"config": {"valid_for": 6000}
	}
	*/
  // http://customermanager.mybluemix.net/api/userservice/affiliate_add
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
  // http://customermanager.mybluemix.net/api/userservice/affiliate_stats/affid

  add(args = {}, done) {
    const endpoint = 'affiliate_add';
    // const payload = { ...args };
    // User adds affiliateId and appId, we tale care of other details
    const payload = {
      appId: 'appId845',
      affiliateId: 'affid845',
      config: { validFor: 6000 },
    };
    return this.client.postEndpoint(endpoint, payload, done);
  }

  update(args = {}, done) {
    const endpoint = 'affiliate_update';
    const payload = { ...args };
    payload.body = {
      device_type: args.device_type,
      ip_address: args.ip_address,
      uuid: args.uuid,
      status: args.status,
      id: args.id,
    };
    return this.client.postEndpoint(endpoint, payload, done);
  }

  stats(args, done) {
    const affId = args.affiliate_id;
    const endpoint = `affiliate_stats/${affId}`;
    // TODO change back to get
    return this.client.postEndpoint(endpoint, args, done);
  }
}

export default Api;
