/* eslint-disable @typescript-eslint/no-var-requires */
// from @vue/cli-plugin-unit-mocha/setup.js
require("jsdom-global")(undefined, {
  pretendToBeVisual: true,
  url: "http://localhost",
});

global.localStorage = window.localStorage;
