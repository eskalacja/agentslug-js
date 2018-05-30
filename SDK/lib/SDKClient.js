const EventEmitter = require('events');
const superagent = require('superagent');
const { AGENTSLUG_API } = require('./constants');

/**
 * Client main class.
 * Responsible for handling credentials and shared logic.
 */
class SDKClient extends EventEmitter {
  /**
   * Api url genertor.
   * @param {string} path Path (without leading slash).
   * @returns {string}
   */
  getApiUrl(path) {
    return `${this.apiUrl}/${path}`;
  }

  /**
   * Constructs the SDK instance.
   * @param {string} token API token.
   * @param {string} [apiUrl = 'https://api.agentslug.com'] API url (optional, intended for dev use only)
   */
  constructor({ token, apiUrl = AGENTSLUG_API }) {
    super();
    this.apiUrl = apiUrl;
    this.token = token;
  }

  /**
   * Sends a POST request to API.
   * @param {string} path Path (without leading slash)
   * @returns {Promise}
   */
  sendPost({ path }) {
    return new Promise((resolve, reject) => {
      superagent
        .post(this.getApiUrl(path))
        .set('Authorization', `Bearer ${this.token}`)
        .end((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        })
    });
  }
}

module.exports = SDKClient;
