const deployNewServer = require("./serverDeploy");
const updateClientConfig = require("./updateClientUrl");
const pushClientCode = require("./pushClientCode");

function deploy(config) {
  return deployNewServer(config)
    .then(serverUrl => updateClientConfig(serverUrl, config))
    .then(serverUrl => pushClientCode(serverUrl, config));
}

module.exports = deploy;
