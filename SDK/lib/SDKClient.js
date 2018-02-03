const { AGENTSLUG_API } = require('./constants');
/**
 * Client main class.
 * Responsible for handling credentials and shared logic.
 */
class SDKClient {
  static getApiUrl(path) {
    return `${AGENTSLUG_API}/${path}`;
  }
  constructor({ token }) {
    this.token = token;
  }
}

module.exports = SDKClient;
