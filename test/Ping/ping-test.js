const { assert } = require('chai');
const mock = require('mock-require');
const sinon = require('sinon');

/**
 * Dirty tests for now.
 */
describe('Ping', () => {
  let Ping;
  const postSpy = sinon.spy();
  const setSpy = sinon.spy();
  let endCb = () => {};
  before(() => {
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
    mock.stop('superagent');
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
      ping.send(2)
        .then(() => {
          const pathShould = 'https://api.agentslug.com/ping/2/heartbeat';
          const pathIs = postSpy.getCall(0).args[0];
          assert(pathIs === pathShould, `Url is not ${pathShould}, is ${pathIs}`);
          assert(setSpy.getCall(0).args[0] === 'Authorization');
          assert(setSpy.getCall(0).args[1] === `Bearer foo`);
          done();
        })
        .catch(err => {
          assert(false, 'Ping resolved with error.');
          done();
        });
    });
    it('should reject promise', (done) => {
      const thrownErr = new Error('foo');
      endCb = (cb) => {
        return cb(thrownErr);
      };
      ping.send(2)
        .then(() => {
          assert(false, 'Did not reject');
          done();
        })
        .catch(err => {
          assert(err === thrownErr, 'Error is not correct.');
          done();
        })
    });
    it('should reject when invalid id is given', (done) => {
      ping.send(0)
        .then(() => {
          assert(false, 'Did not reject');
          done();
        })
        .catch(err => {
          assert(err instanceof Error, 'Error is not instance of Error.');
          done();
        })
    });
  })
});
