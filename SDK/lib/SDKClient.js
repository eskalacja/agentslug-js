const superagent = require('superagent');
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
