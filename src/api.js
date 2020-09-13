class Api {
  constructor(client) {
    this.client = client;
    this.statuses = {
      paid: 'paid',
      downloaded: 'downloaded',
    };
  }

  add(args = {}, done) {
    const endpoint = 'affiliate_add';
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
    const uuId = this.retrieveLocalUUID(payload.status);

    payload.body = {
      status: args.status,
      appId: args.appId,
      uuId,
    };
    return this.client.postEndpoint(endpoint, payload, done);
  }

  stats(args, done) {
    const affId = args.affiliate_id;
    const endpoint = `affiliate_stats/${affId}`;
    // TODO change back to get
    return this.client.postEndpoint(endpoint, args, done);
  }

  retrieveLocalUUID(status) {
    this.uuId = null;
    if (status === this.statuses.paid) {
      // Retrieve UUID if exists
      if (localStorage.getItem('manoeuvre')) {
        const manoeuvreStore = JSON.parse(localStorage.getItem('manoeuvre'));
        this.uuId = manoeuvreStore.uuId ? manoeuvreStore.uuId : 'Not Set';
      }
    }
    return this.uuId;
  }
}

export default Api;
