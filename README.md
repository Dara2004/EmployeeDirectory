# Setup

## Frontend

1. https://nodejs.org/en/
   install latest LTS version of node js.

2. To install all the dependencies
   `yarn install`

3. To run the frontend locally
   `yarn start`

4. Install prettier and Eslint extensions in VSCode. In Settings, enable "format on save".

## Backend

1. Install the .NET SDK from the above website.
   https://dotnet.microsoft.com/download/dotnet-core/3.1

2. Install VisualStudio (recommended --Windows only) or VSCode

Deployed on AWS at https://8js00bwkge.execute-api.us-west-2.amazonaws.com/test

Swagger API https://localhost:44302/swagger/index.html

## DevOps:

1. Install Terraform
   `brew install tfenv`
   `tfenv install latest`
   `tfenv use latest`

2. Install AWS CLI from https://aws.amazon.com/cli/
   To configure aws:
   `aws configure`
   Get the details from https://cpsc319-hq.slack.com/archives/C01JPCAGLSW/p1610772100000400

3. To publish the function
   `terraform apply`
   If you're using terraform for the first time, also run `terraform init`
   
   
 # New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
