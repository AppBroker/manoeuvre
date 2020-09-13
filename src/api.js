class Api {
  constructor(client) {
    this.client = client;
    this.statuses = {
      paid: 'paid',
      downloaded: 'downloaded',
    };

    this.keys = {
      affiliateId: 'affiliateId',
      appId: 'appId',
      status: 'status',
      uuId: 'uuId',
    };
  }

  checkParamsAssigned(requiredParams, passedArgs) {
    this.requiredKeys = requiredParams;
    this.requiredKeys.forEach((key) => {
      if (!passedArgs[key]) {
        throw new Error(`Missing key: ${key} from passed arguments, please refer to the docs and correct your payload.`);
      }
    });
  }

  add(args = {}, done) {
    const endpoint = 'affiliate_add';
    try {
      this.checkParamsAssigned([this.keys.appId, this.keys.affiliateId], { ...args });
    } catch (e) {
      console.error(e);
    }
    const config = args.config ? args.config : {};
    const payload = {
      appId: args.appId,
      affiliateId: args.affiliateId,
      config,
    };
    return this.client.postEndpoint(endpoint, payload, done);
  }

  update(args = {}, done) {
    const endpoint = 'affiliate_update';
    const payload = { ...args };
    try {
      this.checkParamsAssigned([this.keys.appId, this.keys.status], payload);
    } catch (e) {
      console.error(e);
    }
    if (payload.status === this.statuses.paid) {
      const uuId = this.retrieveLocalUUID();
      payload.uuId = uuId;
    }
    return this.client.postEndpoint(endpoint, payload, done);
  }

  stats(args, done) {
    const affId = args.affiliate_id;
    const endpoint = `affiliate_stats/${affId}`;
    // TODO change back to get
    return this.client.postEndpoint(endpoint, args, done);
  }

  retrieveLocalUUID() {
    this.uuId = null;
    // Retrieve UUID if exists
    if (localStorage.getItem('manoeuvre')) {
      const manoeuvreStore = JSON.parse(localStorage.getItem('manoeuvre'));
      try {
        this.checkParamsAssigned([this.keys.uuId], manoeuvreStore);
      } catch (e) {
        console.error(e);
      }
      this.uuId = manoeuvreStore.uuId;
    } else {
      throw new Error('Missing: Manoeuvre store key');
    }
    return this.uuId;
  }
}

export default Api;
