/**
 * Client main class.
 * Responsible for handling credentials and shared logic.
 */
class SDKClient {
  constructor({ token }) {
    this.token = token;
  }
}

module.exports = SDKClient;
