const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

async function deployNewServer(config) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.env.HOME, config.envVars), (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const parameters = data
        .toString()
        .split(/\r?\n/)
        .filter(p => p);
      const params = parameters.reduce(
        (result, param) => [...result, "-e", param],
        []
      );
      if (config.logLevel === "verbose") {
        console.log(params);
      }
      const workingDir = path.join(process.cwd(), config.serverDir);
      const child = spawn("now", ["--public", ...params], {
        cwd: workingDir
      });
      child.stdout.on("data", spawnData => {
        const serverNameExpression = new RegExp(
          `.*${config.serverPrefix}-.*.now.sh$`
        );
        let dataString = spawnData.toString();
        if (dataString.match(serverNameExpression)) {
          resolve(dataString);
        }
        console.log("data =>", spawnData.toString());
      });
      child.stderr.on("data", childErr => {
        const errorMessage = childErr.toString();
        console.log("new message =>", errorMessage);
        const errorRegex = /.*Error!.*/;
        if (errorMessage.match(errorRegex)) {
          reject(childErr);
        }
      });
      child.on("close", () => console.log("uploading server has finished."));
    });
  });
}

module.exports = deployNewServer;
