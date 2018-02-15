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
    if (!pingID || pingID < 1) {
      this.emit('error', new Error('Invalid pingID. Ping ID must be a number.'));
      return;
    }
    clearThrottle(pingID);
    throttleByPingID[pingID] = setTimeout(() => {
      this.sendPost({
        path: `ping/${pingID}/heartbeat`
      })
        .then(() => {
          this.emit('sent');
        })
        .catch((err) => {
          this.emit('error', err);
        })
    }, PING_THROTTLE);
  }
}

module.exports = Ping;
