/* eslint-disable @typescript-eslint/no-var-requires */
const { version, appTitle } = require("./package.json");
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          APP_VERSION: `"${version}"`,
          APP_TITLE: `"${appTitle}"`,
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = appTitle;
      return args;
    });
  },
  pwa: {
    name: appTitle,
  },
};
