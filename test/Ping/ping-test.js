const { assert } = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');

/**
 * Dirty tests for now.
 */
describe('Ping', () => {
  let Ping;
  const mockedApiUrl = 'https://example.com';
  const mockedThrottle = 5;
  const postSpy = sinon.spy();
  const setSpy = sinon.spy();
  let endCb = () => {};
  before(() => {
    mock('../../SDK/lib/constants', {
      AGENTSLUG_API: mockedApiUrl,
      PING_THROTTLE: mockedThrottle,
    });
    mock('superagent', (function() {
      this.post = (...args) => {
        postSpy(...args);
        return this;
      };

      this.set = (...args) => {
        setSpy(...args);
        return this;
      };

      this.end = (cb) => {
        endCb(cb);
      };
      return this;
    })());
    Ping = require('../../SDK/Ping/index');
  });
  after(() => {
    mock.stopAll();
  });
  afterEach(() => {
    postSpy.resetHistory();
  });

  let ping;
  it('should instantiate an object with token property', () => {
    ping = new Ping({ token: 'foo' });
    assert(ping.token === 'foo', 'Token not set.');
  });
  describe('.ping', () => {
    it('should send POST message', (done) => {
      endCb = (cb) => {
        return cb();
      };
      ping.once('sent', () => {
        const pathShould = `${mockedApiUrl}/ping/2/heartbeat`;
        const pathIs = postSpy.getCall(0).args[0];
        assert(pathIs === pathShould, `Url is not ${pathShould}, is ${pathIs}`);
        assert(setSpy.getCall(0).args[0] === 'Authorization');
        assert(setSpy.getCall(0).args[1] === `Bearer foo`);
        done();
      });
      ping.send(2);
    });
    it('should emit error', (done) => {
      const thrownErr = new Error('foo');
      endCb = (cb) => {
        return cb(thrownErr);
      };
      ping.send('/foo');
      ping.once('error', (err) => {
        assert(err === thrownErr, 'Error is not correct.');
        done();
      });
    });
    it('should emit error when invalid id is given', (done) => {
      ping.once('error', (err) => {
        assert(err instanceof Error, 'Error is not instance of Error.');
        done();
      });
      ping.send(0)
    });
    it('should throttle POST message', (done) => {
      endCb = (cb) => {
        return cb();
      };
      new Array(10).fill('').map(() => { return ping.send(2)});
      setTimeout(() => {
        assert(postSpy.getCalls().length === 1, 'Did not throttle first 10');
        ping.send(2);
        setTimeout(() => {
          assert(postSpy.getCalls().length === 2, 'After throttle calls count is wrong');
          done();
        }, mockedThrottle);
      }, mockedThrottle);
    });
  });
});
