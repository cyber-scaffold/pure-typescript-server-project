module.exports = [{
  loader: "style-loader"
}, {
  loader: "css-loader",
  options: {
    modules: {
      exportOnlyLocals: false,
      mode: (resourcePath) => {
        if (/\.(module)/.test(resourcePath)) {
          return "local";
        }
        if (/(node_modules)/.test(resourcePath)) {
          return "global";
        };
        return "global";
      }
    },
    sourceMap: true
  }
}, {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      config: true
    },
    sourceMap: true
  }
}];