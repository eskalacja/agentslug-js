const { assert } = require('chai');
const { AGENTSLUG_API, PING_THROTTLE } = require('../../../SDK/lib/constants');

describe('SDK/lib/constants', () => {
  it('should export constants', () => {
    assert(typeof AGENTSLUG_API === 'string');
    assert(AGENTSLUG_API.indexOf('https') === 0);
    assert(typeof PING_THROTTLE === 'number');
    assert(PING_THROTTLE > 20);
  });
});
