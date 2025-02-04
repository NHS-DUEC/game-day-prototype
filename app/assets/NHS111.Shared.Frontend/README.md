# 111 online shared frontend

## Installing via npm and authenticating with Azure feeds

When you run `npm install`, this normally fetches frontend packages from the public npm registry by default. In order to provide resilience and optimal speed in the Azure pipelines, packages are now installed from an "Azure feed" which essentially just proxies the npm registry.

This is configured in the `.npmrc` file in this project - forcing the `npm` cli tool to look at our Azure registry instead of the default npm registry.

However in order to use this locally on developers' machines, you need to tell `npm` how to authenticate with Azure. This is achieved with the following steps:

### For Windows command line

1. Obtain the necessary tool to configure an auth token.

   Run `npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false`

2. Navigate to `NHS111/NH111.Shared.Frontend`
3. Run `vsts-npm-auth -config .npmrc`

   This will prompt you to log in with Azure devops. Use your normal creds to do this.
   This is a one-time step - you won't be asked to log in every time.

Once you have completed the above steps, this will create a `.npmrc` in `c:/Users/[YOUR_USERNAME]/.npmrc`. It is this file that contains the private token used to authenticate with Azure feeds.

**This will then allow you to run `npm install`.**

To confirm that the above steps are successful, remove your `node_modules` folder(s) and re-run `npm install`.

### For other terminals

If you are not using the standard windows command line, the above steps likely won't work. You will need to follow the steps at https://dev.azure.com/NHS111Online/111Online/_artifacts/feed/111_NPM_External/connect/npm (Click on "other").

For example, I (Andy) use WSL as my main terminal which is an Ubuntu subsystem. In order to authenticate with Azure, the `.npmrc` file would have to live _inside_ Ubuntu at `~/.npmrc`, not in the Windows path mentioned above. The steps to set this up are slightly more involved and can be found at the link above.

### For Azure pipeline usage

Nothing needs to be done here - Azure automatically sets up the necessary tokens.
