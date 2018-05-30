const SDKClient = require('../lib/SDKClient');
const { PING_THROTTLE } = require('../lib/constants');
const Throttle = require('../lib/Throttle');

const throttle = new Throttle(PING_THROTTLE);

class Ping extends SDKClient {
  /**
   * Sends ping to API.
   * @param {number} pingID Ping Id taken from AgentSlug.com.
   * @return {undefined} Returns nothing, fire and forget.
   */
  send(pingID) {
    if (!pingID || typeof pingID !== 'number' || pingID < 1) {
      this.emit('error', new Error('Invalid pingID. Ping ID must be a number.'));
      return;
    }
    if (throttle.shouldThrottle(pingID)) {
      return;
    }
    throttle.did(pingID);
    this.sendPost({
      path: `ping/${pingID}/heartbeat`
    })
      .then(() => {
        this.emit('sent');
      })
      .catch((err) => {
        this.emit('error', err);
      })
  }
}

module.exports = Ping;
