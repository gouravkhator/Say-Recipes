# Say Recipes

[![Apache](https://img.shields.io/badge/license-Apache-white.svg?style=for-the-badge&color=%239c833e)](./LICENSE.md)

**Recipes, recipes, recipes!!** **_Ingredients, calories and more!!_** This webapp says a lot about recipes..

## Prerequisites

Make a `.env.local` file, similar to the contents of `.env.sample` file, in the root directory of the project, and paste the environment variables there.

Then, run below:

```sh
npm install
```

## Run and Build the Webapp

In the project directory, you can run:

- `npm run netlify:dev`: Runs `react-scripts start`, but with netlify functions also served in our local environment.
- `npm start`: Runs the webapp in the development server.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the webapp for production to the `build` folder.

## Notes for Developers

- Before deploying to **netlify**, remember below points:

  - Upgrade node and npm to latest version, and also specify node and npm versions in `engines` field in the `package.json` file.
  - Don't even keep any warnings in the output of `npm run build`.

    This is bcoz those warnings are treated as errors, as `process.env.CI = true` is set by most CI servers automatically. If we require to keep the warnings as it is, then we should prefix our build command with `CI= `, which will unset this CI to empty, and it will help build the webapp fine.
