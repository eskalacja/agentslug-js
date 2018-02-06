const { AGENTSLUG_API } = require('./constants');
/**
 * Client main class.
 * Responsible for handling credentials and shared logic.
 */
class SDKClient {
  getApiUrl(path) {
    return `${this.apiUrl}/${path}`;
  }
  constructor({ token, apiUrl = AGENTSLUG_API }) {
    this.apiUrl = apiUrl;
    this.token = token;
  }
}

module.exports = SDKClient;
