const path = require("path");

module.exports = [{
  test: /\.(js|jsx|mjs|cjs|ts|tsx)$/,
  exclude: /(node_modules)/,
  use: [{
    loader: "esbuild-loader",
  }]
}];