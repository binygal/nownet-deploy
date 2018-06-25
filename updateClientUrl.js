const fs = require("fs");
const path = require("path");

function updateClientConfig(newServerUrl, config) {
  return new Promise((resolve, reject) => {
    const configFilePath = path.join(
      process.cwd(),
      config.clientDir,
      config.clientConfigFile
    );
    fs.readFile(configFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(
          "error reading config file (Please check the clientDir and the clientConfigFile config properties)",
          err
        );
        return reject();
      }
      const newUrlCode = `const serverUrl = '${newServerUrl}';`;
      let fileCode = data.replace(/^const serverUrl = 'https:.*';/, newUrlCode);
      fs.writeFile(configFilePath, fileCode, "utf8", writeError => {
        if (writeError) {
          console.error("error writing to config file", writeError);
          return reject();
        }
        console.log("config file was updated successfully.");
        resolve(newServerUrl);
      });
    });
  });
}
module.exports = updateClientConfig;
