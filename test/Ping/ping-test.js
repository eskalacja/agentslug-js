const { assert } = require('chai');
const Ping = require('../../SDK/Ping/index');

describe('Ping', () => {
  it('should instantiate an object with token property', () => {
    const ping = new Ping({ token: 'foo' });
    assert(ping.token === 'foo', 'Token not set.');
  });
});
