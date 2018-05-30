# AgentSlug.com node SDK
[![Build Status](https://travis-ci.org/eskalacja/agentslug-node.svg?branch=master)](https://travis-ci.org/eskalacja/agentslug-node)
[![Coverage Status](https://coveralls.io/repos/github/eskalacja/agentslug-node/badge.svg?branch=master)](https://coveralls.io/github/eskalacja/agentslug-node?branch=master)
[![npm version](https://badge.fury.io/js/agentslug.svg)](https://badge.fury.io/js/agentslug)
## Important - this is an alpha version, this readme is a draft as well
If you'd like to use this piece of software, please keep in mind this is an alpha version, `Ping` API still might be changed.
## What is it?
This package is the client SDK for AgentSlug.com services. Currently it supports `Ping` which is a client for AgentSlug.com application uptime monitoring.

## What is Application Uptime Monitoring?
AgentSlug.com provides multiple website/app uptime monitoring tools. The main one is the Uptime Monitoring. A tool which tests a website by sending a HTTP request and checking it's response code and checking if provided keyword can be found in the response body.

The other one, which works in an opposite manner, is the "Application monitoring", here called `Ping`. For this test, AgentSlug.com waits for a ping signal, configured in the AgentSlug.com settings. As long as ping signals come in a regular manner, everything is fine. At the moment there is no pings registered beyond a timeout set for a test, an alarm is triggered (with e-mail and/or Slack notification).

## How to use this package?
### SDK configuration
This software is intended to be used only for registered AgentSlug.com users. In order to use it successfully, you need an API token and configured Application Monitoring test on AgentSlug.com.
### Simplest usage for a single function monitoring.
```js
// Importing Ping
const { Ping } = require('agentslug');
// or:
// const Ping = require('agentslug/Ping');

const API_TOKEN = '[YOUR_API_TOKEN]';
const PING_ID = '[PING_ID_TAKEN_FROM_AGENTSLUG.COM]';
const pingInstance = new Ping({token: API_TOKEN});

// Important function that needs to be monitored.
function somethingImportant() {
  // Doing something important.
  
  // When done, sending ping to AgentSlug.com to inform it that this function finished successfully
  // This function is a "fire and forget" function. It schedules a http request to AS API and returns undefined.
  pingInstance.send(PING_ID);
}

// Example interval for the function.
setInterval(() => somethingImportant, 5000);
```
### Singleton use case for bigger applications with multiple ping configurations
For bigger applications you might want to use our singleton helper to register the Ping client once and use it anywhere.
```js
// init.js or bootstrap.js, whatever runs first in your app
const { initSingleton } = require('agentslug/Ping/singleton');
const API_TOKEN = '[YOUR_API_TOKEN]';
// init a singleton Ping, since next line, every `getSingleton` would return same instance of Ping API Client.
initSingleton({ token: API_TOKEN })
```
```js
// someFunction.js
const { getSingleton } = require('agentslug/Ping/singleton');
const PING_ID = '[PING_ID_TAKEN_FROM_AGENTSLUG.COM_FOR_SOME_FUNCTION]';
// Ping is an instance of previously created Ping.
const ping = getSingleton();
// do something important
ping.send(PING_ID);
```
```js
// otherFunction.js
const { getSingleton } = require('agentslug/Ping/singleton');
const PING_ID = '[PING_ID_TAKEN_FROM_AGENTSLUG.COM_FOR_OTHER_FUNCTION]';
// Ping is an instance of previously created Ping.
const ping = getSingleton();
// do something important
ping.send(PING_ID);
```

## Success / error handling
### Fire and forget
All `Ping.send` functions schedule a http request to AgentSlug.com API, and immediately return to not block current operation. This way your application monitoring should not have much impact on the appliction performance.

Because of that, errors and successes are handled within events.

### Possible events
#### `sent`
Emitted on `Ping` instance when ping was successfully sent. Keep in mind not all `Ping.send` executions would end up in `sent` event because of [throttling](#throttling)
#### `error`
Emitted on `Ping` instance on error. Usually it catches networking errors, e.x. if our API is down, you should expect many logs from this handler.

#### Example usage
```js
const { Ping } = require('agentslug');

const ping = new Ping({ token: 'TOKEN'});

ping.on('error', (err) => {
  logger.error('Ping error', err);
});
pingInstance.on('sent', () => {
  logger.info('Ping sent');
});
```
### Throttling
It's expected that `Ping` client is used in functions which are executed very often. Of course, you should not flood the API with too many requests - that would lead to ban of the client IP.

This SDK is however safe to use since it implements internal throttling.

Whenever `Ping.sent` is called, internal throttling mechanism checks if it's safe to send an http requests to the API or if this call should be skipped.

To be exact, very first `Ping.sent` call always results with http request and all consecutive calls executed in next 20 seconds would be ignored.
