const fsExtra = require('fs-extra');

const configPath = 'data/manoeuvre_config';

let token;
let clientId;
let clientSecret;
let redirectUri;

const readConfigFile = () => {
  try {
    let config = fsExtra.readFileSync(configPath, { encoding: 'utf-8' });
    config = JSON.parse(config);
    if (config.access_token) token = config.access_token;
    if (config.client_id) clientId = config.client_id;
    if (config.client_secret) clientSecret = config.client_secret;
    if (config.redirect_uri) redirectUri = config.redirect_uri;
  } catch (err) {
    // Config file does not exist. This may be a valid case if the config is
    // either passed directly as an argument or via environment variables
  }
};

const readEnvironmentVars = () => {
  if (typeof process.env.MANOEUVRE_ACCESS_TOKEN !== 'undefined') { token = process.env.MANOEUVRE_ACCESS_TOKEN; }
  if (typeof process.env.MANOEUVRE_CLIENT_ID !== 'undefined') { clientId = process.env.MANOEUVRE_CLIENT_ID; }
  if (typeof process.env.MANOEUVRE_CLIENT_SECRET !== 'undefined') { clientSecret = process.env.MANOEUVRE_CLIENT_SECRET; }
  if (typeof process.env.MANOEUVRE_REDIRECT_URI !== 'undefined') { redirectUri = process.env.MANOEUVRE_REDIRECT_URI; }
};

const fetchConfig = (config) => {
  if (config) {
    if (config.access_token) token = config.access_token;
    if (config.client_id) clientId = config.client_id;
    if (config.client_secret) clientSecret = config.client_secret;
    if (config.redirect_uri) redirectUri = config.redirect_uri;
  } else {
    readConfigFile();
    readEnvironmentVars();
  }
};

const authenticator = {
  fetchConfig,
  getToken() {
    if (!token) {
      fetchConfig();
    }

    if (token) {
      return token;
    }
    return undefined;
  },
  getClientId() {
    if (!clientId) {
      fetchConfig();
    }

    if (clientId) {
      return clientId;
    }
    console.log('No client id found');
    return undefined;
  },
  getClientSecret() {
    if (!clientSecret) {
      fetchConfig();
    }

    if (clientSecret) {
      return clientSecret;
    }
    console.log('No client secret found');
    return undefined;
  },
  getRedirectUri() {
    if (!redirectUri) {
      fetchConfig();
    }

    if (redirectUri) {
      return redirectUri;
    }
    console.log('No redirectUri found');
    return undefined;
  },
  purge() {
    token = undefined;
    clientId = undefined;
    clientSecret = undefined;
    redirectUri = undefined;
  },
};

export default authenticator;
