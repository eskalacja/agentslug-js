const { assert } = require('chai');
const { AGENTSLUG_API, PING_THROTTLE } = require('../../../SDK/lib/constants');

describe('SDK/lib/constants', () => {
  it('should export constants', () => {
    assert(typeof AGENTSLUG_API === 'string', 'AGENTSLUG_API: wrong type');
    assert(AGENTSLUG_API.indexOf('https') === 0, 'AGENTSLUG_API: wrong url');
    assert(typeof PING_THROTTLE === 'number', 'PING_THROTTLE: wrong type');
    assert(PING_THROTTLE >= 20, 'PING_THROTTLE is less than 20');
  });
});
