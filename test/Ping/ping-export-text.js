const { assert } = require('chai');
const Ping = require('../../Ping');
const {
  initSingleton,
  getSingleton,
} = require('../../Ping/singleton');
const PingClass = require('../../SDK/Ping/index');
const singleton = require('../../SDK/Ping/singleton');

describe('agentslug/Ping/* exports', () => {
  it('should export Ping class', () => {
    assert(Ping === PingClass);
  });
  it('should export singleton functions', () => {
    assert(initSingleton === singleton.initSingleton);
    assert(getSingleton === singleton.getSingleton);
  });
});
