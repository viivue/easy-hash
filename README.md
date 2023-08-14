#  Wellii - Webpack Library Boilerplate

A boilerplate to develop JavaScript library with:

- UMD version
- NPM package
- Multiple dev servers

> CSS file will not be included in production build.

## Examples

- Production
  site: https://wellii.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/3dcd8303-517a-4297-b027-98b9adcc7c5c/deploy-status)](https://app.netlify.com/sites/wellii/deploys)
- Dev
  site: https://wellii-dev.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/9d0e745c-a957-4c34-923f-d74852270174/deploy-status)](https://app.netlify.com/sites/wellii-dev/deploys)
- Distribution files: [/dist](https://github.com/phucbm/webpack-library-boilerplate/tree/main/dist)

## Todos

1. Update `package.json`
    - `name`: output file name
    - `prettyName`: output library name
    - ...
2. Library script start with `src/_index.js`, **do not rename this file**.
3. Edit dev site in folder `dev`
4. Edit production site in folder `web`

## Deployment
```shell
# Install
npm i

# Run production server
npm run web

# Run dev server
npm run dev

# Generate UMD and module version
npm run prod

# Generate UMD and module version then publish NPM package
npm run publish

# Build production site
npm run build

# Build dev site
npm run build-dev
```
