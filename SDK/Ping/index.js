const superagent = require('superagent');
const SDKClient = require('../lib/SDKClient');

class Ping extends SDKClient {
  send(pingID) {
    return new Promise((resolve, reject) => {
      if (!pingID || pingID < 1) {
        reject(new Error('Invalid pingID. Ping ID must be a number.'));
        return;
      }
      superagent
        .post(this.getApiUrl(`ping/${pingID}/heartbeat`))
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

module.exports = Ping;
