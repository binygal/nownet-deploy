# NowNet deploy

## Tools to keep your side project running for free

NowNet deploy are set of tools used for deploying your side project to now.sh and netlify static website hosting server. While almost any other providers out there will take your money for hosting, those 2 providers will give you a good plan for free that you can easily upgrade when your side project is starting to earn some money.

### How to use

Install the package

```bash
npm i -D nownet-deploy
```

Now create a new js file and add the following code

```js
const nownetDeploy = require("nownet-deploy");

nownetDeploy(deploymentConfiguration);
```

### Configuration object

When deploying a server there are many parameters to config. Most of the time you will have a different folder structure for server and client code and you want to deploy from different locations. Here are the supported property in the configuration object that passed to the deploy method.

| Name             |                                               Value                                                |
| ---------------- | :------------------------------------------------------------------------------------------------: |
| envVars          |                              Path fo the environment variables file.                               |
| serverDir        |       relative path to the root directory of the server (the one that includes package.json)       |
| clientDir        |                             relative path to the client root directory                             |
| clientConfigFile |      relative path to the client config file (This path should be relative to the clientDir)       |
| deploymentBranch |                           The branch configured by Netlify to deply from                           |
| serverPrefix     | Prefix given to server url by now.sh. The url will be- `https://${serverPrefix}-yokbpkezbv.now.sh` |
| logLevel         |                                    Can be "debug" or "verbose"                                     |

## Environment variables

Now.sh is open sourcing all of your code if you upload it to a free server. That's why `nownet-deploy` supports easy way to support them. Create a file with your environment variables in this fashion - variables are separated by new lines and each variable is written like that -

```text
MY_ENVIRONMENT_VARIABLE=myValueToUse
```

provide the path to your environment variable file in the config object using `envVars` property.

## Client Config File

While Netlify let you use your custom domain, now.sh does not, that means that on any deploy you want to change your client to point to the new server url received from now.sh. Your config file must have a single line in the following form so the deploy script can replace it -

```js
const serverUrl = "https://yourServerHash.now.sh";
```

On deployment your serverUrl will be replaced by the real url something like `const serverUrl = 'https://heymoserver-gyjchdhesde.now.sh';`

Here is a suggestion for a config file -

```js
const serverUrl = "https://heymoserver-gyjchdhesde.now.sh";
const config = {
  SERVER_URL:
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : serverUrl
};

export default config;
```
