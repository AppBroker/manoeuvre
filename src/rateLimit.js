const RateLimit = {
  requestTime: new Date(), // Date
  shortTermLimit: 0, // Int
  longTermLimit: 0, // Int
  shortTermUsage: 0, // Int
  longTermUsage: 0, // Init
};

const rl = RateLimit;

// should be called as `strava.rateLimiting.exceeded()
// to determine if the most recent request exceeded the rate limit
RateLimit.exceeded = () => {
  if (rl.shortTermUsage >= rl.shortTermLimit) {
    return true;
  }

  if (rl.longTermUsage >= rl.longTermLimit) {
    return true;
  }

  return false;
};

// fractionReached returns the current fraction of rate used.
// The greater of the short and long term limits.
// Should be called as `strava.rateLimiting.fractionReached()`
RateLimit.fractionReached = () => {
  const shortLimitFraction = rl.shortTermUsage / rl.shortTermLimit;
  const longLimitFraction = rl.longTermUsage / rl.longTermLimit;

  if (shortLimitFraction > longLimitFraction) {
    return shortLimitFraction;
  }
  return longLimitFraction;
};

RateLimit.parseRateLimits = (headers) => {
  if (!headers['x-ratelimit-limit'] || !headers['x-ratelimit-usage']) {
    return null;
  }

  const limit = headers['x-ratelimit-limit'].split(',');
  const usage = headers['x-ratelimit-usage'].split(',');
  const radix = 10;

  return {
    shortTermUsage: parseInt(usage[0], radix),
    shortTermLimit: parseInt(limit[0], radix),
    longTermUsage: parseInt(usage[1], radix),
    longTermLimit: parseInt(limit[1], radix),
  };
};

RateLimit.updateRateLimits = (headers) => {
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
};

RateLimit.clear = () => {
  this.requestTime = new Date();
  this.shortTermLimit = 0;
  this.longTermLimit = 0;
  this.shortTermUsage = 0;
  this.longTermUsage = 0;
};

module.exports = RateLimit;