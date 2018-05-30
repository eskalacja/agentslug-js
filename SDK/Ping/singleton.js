const Ping  = require('./index');

let pingInstance;

/**
 * Inits singleton Ping instance.
 * @param {Object} opts Ping constructor options.
 */
function initSingleton(opts) {
  if (pingInstance) {
    throw new Error('Instance already created. If you need more instances of Ping, please import `Ping` class by yourself.');
  }

  pingInstance = new Ping(opts);
}

/**
 * Gets Ping instance.
 * @returns {Ping}
 */
function getSingleton() {
  if (!pingInstance) {
    throw new Error('Ping instance is not yet created. Please init first with `initInstance`');
  }

  return pingInstance;
}

module.exports = {
  initSingleton,
  getSingleton,
};
