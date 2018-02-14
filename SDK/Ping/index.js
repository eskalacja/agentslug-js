const SDKClient = require('../lib/SDKClient');
const { PING_THROTTLE } = require('../lib/constants');

const throttleByPingID = {};

const clearThrottle = (pingID) => {
  if (throttleByPingID[pingID]) {
    clearTimeout(throttleByPingID[pingID]);
  }
};

class Ping extends SDKClient {
  send(pingID) {
    return new Promise((resolve, reject) => {
      if (!pingID || pingID < 1) {
        reject(new Error('Invalid pingID. Ping ID must be a number.'));
        return;
      }
      clearThrottle(pingID);
      throttleByPingID[pingID] = setTimeout(() => {
        this.sendPost({
          path: `ping/${pingID}/heartbeat`
        })
          .then(() => {})
          .catch(() => {})
      }, PING_THROTTLE);
      resolve();
    });
  }
}

module.exports = Ping;
