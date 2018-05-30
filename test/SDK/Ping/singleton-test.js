const { assert } = require('chai');
const sinon = require('sinon');
const Ping = require('../../../SDK/Ping');
const {
  initSingleton,
  getSingleton
} = require('../../../SDK/Ping/singleton');

describe('Ping singleton export', () => {
  it('should throw error on `getInstance` when not inited first', () => {
    assert.throws(getSingleton);
  });
  it('should create a singleton instance', () => {
    initSingleton({ token: 'FOO_TOKEN'});
    const ping = getSingleton();
    const ping2 = getSingleton();
    assert(ping instanceof Ping);
    assert(ping === ping2);
    assert(ping.token === 'FOO_TOKEN');
  });
  it('should throw error on second init try', () => {
    assert.throws(() => initSingleton({ token: 'BAR_TOKEN'}));
  });
});