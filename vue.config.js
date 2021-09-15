const appTitle = "Breathing Time";

module.exports = {
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
