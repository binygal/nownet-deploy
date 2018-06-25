const simpleGit = require("simple-git/promise");
const path = require("path");

async function pushClientCode(url, config) {
  const clientPath = path.join(process.cwd(), config.clientDir);
  const gitClient = simpleGit(clientPath);
  console.log("checkout to deploy");
  await gitClient.checkout("deploy");
  console.log("pulling master");
  await gitClient.pull("origin", "master");
  console.log("add config");
  await gitClient.add(config.clientConfigFile);
  console.log(`committing new version for ${url}`);
  await gitClient.commit(`new version with url - ${url}`);
  console.log("pushing to deploy");
  await gitClient.push("origin", config.deploymentBranch);
}

module.exports = pushClientCode;
