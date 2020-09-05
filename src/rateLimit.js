class RateLimit {
  constructor() {
    this.requestTime = new Date();
    this.shortTermLimit = 0;
    this.longTermLimit = 0;
    this.shortTermUsage = 0;
    this.longTermUsage = 0;
  }

  // should be called as `strava.rateLimiting.exceeded()
  // to determine if the most recent request exceeded the rate limit
  exceeded() {
    if (this.shortTermUsage >= this.shortTermLimit) {
      return true;
    }

    if (this.longTermUsage >= this.longTermLimit) {
      return true;
    }

    return false;
  }

  // fractionReached returns the current fraction of rate used.
  // The greater of the short and long term limits.
  // Should be called as `strava.rateLimiting.fractionReached()`
  fractionReached() {
    const shortLimitFraction = this.shortTermUsage / this.shortTermLimit;
    const longLimitFraction = this.longTermUsage / this.longTermLimit;

    if (shortLimitFraction > longLimitFraction) {
      return shortLimitFraction;
    }
    return longLimitFraction;
  }

  parseRateLimits(headers) {
    this.headers = headers;
    if (!this.headers['x-ratelimit-limit'] || !this.headers['x-ratelimit-usage']) {
      return null;
    }

    const limit = this.headers['x-ratelimit-limit'].split(',');
    const usage = this.headers['x-ratelimit-usage'].split(',');
    const radix = 10;

    return {
      shortTermUsage: parseInt(usage[0], radix),
      shortTermLimit: parseInt(limit[0], radix),
      longTermUsage: parseInt(usage[1], radix),
      longTermLimit: parseInt(limit[1], radix),
    };
  }

  updateRateLimits(headers) {
    const newLimits = this.parseRateLimits(headers);
    if (newLimits) {
      this.requestDate = new Date();
      this.shortTermLimit = !Number.isNaN(newLimits.shortTermLimit) ? newLimits.shortTermLimit : 0;
      this.shortTermUsage = !Number.isNaN(newLimits.shortTermUsage) ? newLimits.shortTermUsage : 0;
      this.longTermLimit = !Number.isNaN(newLimits.longTermLimit) ? newLimits.longTermLimit : 0;
      this.longTermUsage = !Number.isNaN(newLimits.longTermUsage) ? newLimits.longTermUsage : 0;
    } else {
      this.clear();
    }
    return newLimits;
  }

  clear() {
    this.requestTime = new Date();
    this.shortTermLimit = 0;
    this.longTermLimit = 0;
    this.shortTermUsage = 0;
    this.longTermUsage = 0;
  }
}

export default RateLimit;
