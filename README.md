# AgentSlug.com node SDK
[![Build Status](https://travis-ci.org/eskalacja/agentslug-node.svg?branch=master)](https://travis-ci.org/eskalacja/agentslug-node)
[![Coverage Status](https://coveralls.io/repos/github/eskalacja/agentslug-node/badge.svg?branch=master)](https://coveralls.io/github/eskalacja/agentslug-node?branch=master)
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
const { Ping } = 'agentslug-node';

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

 
