import axios from 'axios';
import querystring from 'querystring';

const oauth = {};

oauth.getRequestAccessURL = (args) => {
  let url = 'https://customermanager.mybluemix.net/api/userservice/oauth/authorize?';
  const oauthArgs = {
    client_id: '123',
    redirect_uri: '123',
    response_type: 'code',
  };

  if (args.scope) { oauthArgs.scope = args.scope; }
  if (args.state) { oauthArgs.state = args.state; }
  if (args.approval_prompt) { oauthArgs.approval_prompt = args.approval_prompt; }

  const qs = querystring.stringify(oauthArgs);

  url += qs;
  return url;
};

/*
 *  oauth.getToken(authorization_code)
 *
 *  Implement OAuth Token Exchange.
 *
 *  Example Response:
 *
 *  {
 *     "token_type": "Bearer",
 *     "access_token": "987654321234567898765432123456789",
 *     "athlete": {
 *       #{summary athlete representation}
 *     },
 *     "refresh_token": "1234567898765432112345678987654321",
 *     "expires_at": 1531378346,
 *     "state": "STRAVA"
 *   }
 *
 *  Ref: http://developers.strava.com/docs/authentication/
 */
oauth.getToken = (authorizationCode, done) => axios({
  method: 'POST',
  url: 'https://customermanager.mybluemix.net/api/userservice/oauth/token',
  json: true,
  qs: {
    code: authorizationCode,
    client_secret: '123',
    client_id: '123',
    grant_type: 'authorization_code',
  },
}, done);

oauth.deauthorize = (args, done) => {
  const endpoint = 'https://customermanager.mybluemix.net/api/userservice/oauth/deauthorize';

  const url = endpoint;
  const options = {
    url,
    method: 'POST',
    json: true,
    // We want to consider some 30x responses valid as well
    // 'simple' would only consider 2xx responses successful
    simple: false,
    headers: {
      Authorization: `Bearer ${args.access_token}`,
    },
  };

  // Promise.resolve is used to convert the promise returned
  // to a Bluebird promise
  // asCallback is used to support both Promise and callback-based APIs
  return Promise.resolve(axios(options)).asCallback(done);
};

/**
 *
 *    oauth.refreshToken(refreshToken)
 *
 * Returns a promise. (Callback API is not supported)
 *
 * client ID and secret must be pre-configured.
 *
 * Exchange a refresh token for a new access token
 * Structure returned from Strava looks like:
 *
 * {
 *    "access_token": "38c8348fc7f988c39d6f19cf8ffb17ab05322152",
 *    "expires_at": 1568757689,
 *    "expires_in": 21432,
 *    "refresh_token": "583809f59f585bdb5363a4eb2a0ac19562d73f05",
 *    "token_type": "Bearer"
 *  }
 *  Ref: http://developers.strava.com/docs/authentication/#refresh-expired-access-tokens
 */
oauth.refreshToken = (refreshToken) => {
  const options = {
    url: 'https://customermanager.mybluemix.net/api/userservice/oauth/token',
    method: 'POST',
    json: true,
    simple: true,
    qs: {
      refresh_token: refreshToken,
      client_id: '123',
      client_secret: '123',
      grant_type: 'refresh_token',
    },
  };
  return axios(options);
};
export default oauth;
