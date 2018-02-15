const { assert, } = require('chai');
const Throttle = require('../../../SDK/lib/Throttle');

describe('Throttle', () => {
  let t;
  it('should instantiate object', () => {
    t = new Throttle(2);
    assert(t instanceof Throttle);
    assert(typeof t.lastSentById === 'object');
    assert(typeof t.did === 'function');
    assert(typeof t.shouldThrottle === 'function');
  });
  it('should allow first call', () => {
    assert(t.shouldThrottle(1) === false);
  });
  it('should reject second call', () => {
    t.did(1);
    assert(t.shouldThrottle(1))
  });
  it('should allow consecutive call', () => {
    t.lastSentById[1] = Date.now() - 2;
    assert(t.shouldThrottle(1) === false);
  })
});