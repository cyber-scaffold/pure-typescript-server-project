const path = require("path");
const WebpackBar = require("webpackbar");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const program_loader = require("../configs/program_loader");

module.exports = {
  target: "node",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(process.cwd(), "./src/"),
      "@@": process.cwd(),
    }
  },
  externalsPresets: { node: true },
  optimization: {
    nodeEnv: false
  },
  module: {
    rules: [].concat(program_loader)
  },
  plugins: [
    new WebpackBar({ name: "编译服务端" }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(process.cwd(), "./src/statics/"),
        to: path.resolve(process.cwd(), "./dist/statics")
      }]
    })
  ]
};