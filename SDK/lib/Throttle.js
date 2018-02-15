class Throttle {
  constructor(timeout) {
    this.timeout = timeout;
    this.lastSentById = {};
  }

  did(id) {
    this.lastSentById[id] = Date.now();
  }

  shouldThrottle(pingID) {
    if (!this.lastSentById[pingID]) {
      return false;
    }
    return Date.now() - this.lastSentById[pingID] < this.timeout;
  };
}

module.exports = Throttle;
